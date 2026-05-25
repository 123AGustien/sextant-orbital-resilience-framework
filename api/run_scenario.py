"""
🛰️ Sextant Orbital Resilience Framework
API Layer v1

Exposes deterministic scenario execution via FastAPI.
"""

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any

from core.schema.schema_enforcer_v2 import SchemaEnforcerV2
from core.governance.governance_audit_v1 import GovernanceAuditV1
from core.evaluation.scenario_runner_v1 import ScenarioRunnerV1
from core.trace.execution_trace_v1 import ExecutionTraceV1


app = FastAPI(title="Sextant Orbital Resilience API")


# ----------------------------
# INPUT MODEL
# ----------------------------

class ScenarioRequest(BaseModel):
    scenario: Dict[str, Any]


# ----------------------------
# MAIN ENDPOINT
# ----------------------------

@app.post("/run-scenario")
def run_scenario(request: ScenarioRequest):

    scenario_data = request.scenario

    # 🧾 TRACE INIT
    tracer = ExecutionTraceV1()
    trace_id = tracer.start_trace(scenario_data)

    # 🧪 1. SCHEMA ENFORCEMENT
    schema = SchemaEnforcerV2()
    validated_schema = schema.validate(scenario_data)
    tracer.log_event(trace_id, "SCHEMA_VALIDATED", validated_schema)

    # 🧭 2. GOVERNANCE AUDIT
    guard = GovernanceAuditV1()
    validated_scenario = guard.validate(validated_schema)
    tracer.log_event(trace_id, "GOVERNANCE_VALIDATED", guard.get_audit_log())

    # 🚀 3. EXECUTION
    runner = ScenarioRunnerV1(validated_scenario)
    result = runner.run()
    tracer.log_event(trace_id, "EXECUTION_COMPLETE", result)

    # 🧾 TRACE END
    tracer.end_trace(trace_id, result)

    # 📤 RESPONSE
    return {
        "status": "success",
        "trace_id": trace_id,
        "output": result,
        "audit_log": guard.get_audit_log(),
        "trace": tracer.export_trace()
    }


# ----------------------------
# LOCAL TEST
# ----------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
