from fastapi import FastAPI

from api.v1.orbital_engine import OrbitalEngineV1

from core.cascade.cross_domain_cascade_engine_v2 import CrossDomainCascadeEngineV2
from core.cascade.cascade_severity_engine_v1 import CascadeSeverityEngineV1

from core.trace.execution_trace_v1 import ExecutionTraceV1
from core.trace.cascade_trace_adapter_v1 import CascadeTraceAdapterV1


# ----------------------------
# APP INITIALIZATION
# ----------------------------

simulation_app = FastAPI(title="Simulation Engine")

engine = OrbitalEngineV1()

cascade_engine = CrossDomainCascadeEngineV2()
severity_engine = CascadeSeverityEngineV1()
trace_adapter = CascadeTraceAdapterV1()


# ----------------------------
# MAIN ENDPOINT
# ----------------------------

@simulation_app.post("/run-scenario")
def run_scenario(payload: dict):

    # 🧾 TRACE START
    tracer = ExecutionTraceV1()
    trace_id = tracer.start_trace(payload)

    # 🚀 RUN BASE ENGINE (if still required by OrbitalEngineV1 logic)
    base_output = engine.run_scenario(payload)
    tracer.log_event(trace_id, "BASE_EXECUTION_COMPLETE", base_output)

    # 🛰️ CASCADE ENGINE
    scenario = cascade_engine.propagate(payload)
    tracer.log_event(trace_id, "CASCADE_COMPLETE", scenario["cascade_result"])

    # 📊 SEVERITY ENGINE
    scenario = severity_engine.evaluate(scenario)
    tracer.log_event(trace_id, "SEVERITY_COMPLETE", scenario["cascade_severity"])

    # 🧭 TRACE CASCADE LIFECYCLE
    trace_adapter.log_cascade(tracer, trace_id, scenario)

    # 🧾 TRACE END
    tracer.end_trace(trace_id, scenario)

    # 📤 RESPONSE
    return {
        "status": "success",
        "trace_id": trace_id,
        "base_output": base_output,
        "output": scenario
    }
