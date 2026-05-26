from fastapi import FastAPI

from api.v1.orbital_engine import OrbitalEngineV1
from core.cascade.cross_domain_cascade_engine_v2 import CrossDomainCascadeEngineV2
from core.cascade.cascade_severity_engine_v1 import CascadeSeverityEngineV1

from core.trace.execution_trace_v1 import ExecutionTraceV1
from core.trace.cascade_trace_adapter_v1 import CascadeTraceAdapterV1

from api.incident_loader import IncidentLoader
from core.simulation_context import get_simulation_context

from api.schemas.run_scenario_schema import ScenarioRequest


# ----------------------------
# APP INITIALISATION
# ----------------------------

simulation_app = FastAPI(title="Sextant Simulation Engine")

engine = OrbitalEngineV1()
cascade_engine = CrossDomainCascadeEngineV2()
severity_engine = CascadeSeverityEngineV1()
trace_adapter = CascadeTraceAdapterV1()


# ----------------------------
# MAIN SIMULATION ENDPOINT
# ----------------------------

@simulation_app.post("/run-scenario")
def run_scenario(request: ScenarioRequest):

    # 🧾 Start trace for observability
    tracer = ExecutionTraceV1()
    trace_id = tracer.start_trace(request.payload)

    incident_id = request.incident_id

    # ============================
    # INCIDENT MODE (REPLAY)
    # ============================
    if incident_id:

        incident = IncidentLoader.load_incident(incident_id)

        tracer.log_event(trace_id, "INCIDENT_MODE", incident_id)
        tracer.log_event(trace_id, "INCIDENT_LOADED", incident)

        tracer.end_trace(trace_id, incident)

        return {
            "status": "success",
            "mode": "incident_simulation",
            "simulation_context": get_simulation_context(),
            "trace_id": trace_id,
            "incident_id": incident_id,
            "incident": incident
        }

    # ============================
    # STANDARD SIMULATION FLOW
    # ============================

    base_output = engine.run_scenario(request.payload)
    tracer.log_event(trace_id, "BASE_MODEL_COMPLETE", base_output)

    scenario = cascade_engine.propagate(request.payload)
    tracer.log_event(trace_id, "CASCADE_MODEL_COMPLETE", scenario["cascade_result"])

    scenario = severity_engine.evaluate(scenario)
    tracer.log_event(trace_id, "SEVERITY_ASSESSMENT_COMPLETE", scenario["cascade_severity"])

    trace_adapter.log_cascade(tracer, trace_id, scenario)

    tracer.end_trace(trace_id, scenario)

    return {
        "status": "success",
        "mode": "scenario_simulation",
        "simulation_context": get_simulation_context(),
        "trace_id": trace_id,
        "base_output": base_output,
        "output": scenario
    }
