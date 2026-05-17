from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

import json
from pathlib import Path

from core.billing import log_usage
from core.cascade import CascadeEngine

router = APIRouter()


# ----------------------------
# Request Schema
# ----------------------------
class ScenarioRequest(BaseModel):
    scenario_id: str
    user_id: str = "anonymous"

    # Optional override (for testing only)
    nodes: Optional[list[str]] = None
    dependencies: Optional[list[dict]] = None
    initial_failure: Optional[str] = None


# ----------------------------
# Scenario Loader
# ----------------------------
def load_scenario(scenario_id: str):
    path = Path("scenarios") / f"{scenario_id}.json"

    if not path.exists():
        raise HTTPException(
            status_code=404,
            detail=f"Scenario '{scenario_id}' not found"
        )

    with open(path, "r") as f:
        return json.load(f)


# ----------------------------
# Run Simulation Endpoint
# ----------------------------
@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest):

    # STEP 1 — billing (track usage per request)
    log_usage(req.user_id, cost=1)

    # STEP 2 — load scenario (file-driven system)
    scenario = load_scenario(req.scenario_id)

    # STEP 3 — allow override (optional dev mode)
    nodes = req.nodes or scenario["nodes"]
    dependencies = req.dependencies or scenario["dependencies"]
    initial_failure = req.initial_failure or scenario["initial_failure"]

    # STEP 4 — run cascade engine
    engine = CascadeEngine(
        nodes=nodes,
        dependencies=dependencies
    )

    result = engine.run(initial_failure)

    # STEP 5 — structured response (SaaS-ready format)
    return {
        "status": "success",
        "scenario_id": req.scenario_id,
        "user_id": req.user_id,
        "billing": {
            "logged": True,
            "cost": 1
        },
        "simulation": result
    }
