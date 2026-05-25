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

    # 🧪 1. SCHEMA ENFORCEMENT (STRUCTURE LAYER)
    schema = SchemaEnforcerV2()
    validated_schema = schema.validate(scenario_data)

    # 🧭 2. GOVERNANCE AUDIT (RULES + TRACE LAYER)
    guard = GovernanceAuditV1()
    validated_scenario = guard.validate(validated_schema)

    # 🚀 3. SCENARIO EXECUTION
    runner = ScenarioRunnerV1(validated_scenario)
    result = runner.run()

    # 📤 RESPONSE
    return {
        "status": "success",
        "output": result,
        "audit_log": guard.get_audit_log()
    }


# ----------------------------
# LOCAL TEST
# ----------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
