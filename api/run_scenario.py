"""
🛰️ Sextant Orbital Resilience Framework
API Layer v1

Exposes deterministic scenario execution via FastAPI.
"""

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any

from core.scenarios.scenario_loader_v1 import ScenarioLoaderV1
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

    # Inject directly (already structured JSON)
    runner = ScenarioRunnerV1(scenario_data)

    result = runner.run()

    return {
        "status": "success",
        "output": result
    }


# ----------------------------
# LOCAL TEST
# ----------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
