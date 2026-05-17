from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional

import json
from pathlib import Path

from core.billing import log_usage
from core.cascade import CascadeEngine
from core.auth import verify_api_key

router = APIRouter()


class ScenarioRequest(BaseModel):
    scenario_id: str
    user_id: Optional[str] = "anonymous"


# ----------------------------
# Load Scenario File
# ----------------------------
def load_scenario(scenario_id: str):
    path = Path("scenarios") / f"{scenario_id}.json"

    if not path.exists():
        raise HTTPException(status_code=404, detail="Scenario not found")

    with open(path, "r") as f:
        return json.load(f)


# ----------------------------
# RUN SCENARIO (PROTECTED API)
# ----------------------------
@router.post("/run-scenario")
def run_scenario(
    req: ScenarioRequest,
    x_api_key: str = Header(None)
):

    # STEP 1 — AUTH CHECK
    user_id = verify_api_key(x_api_key)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid API key")

    # STEP 2 — billing
    log_usage(user_id, cost=1)

    # STEP 3 — load scenario
    scenario = load_scenario(req.scenario_id)

    # STEP 4 — run engine
    engine = CascadeEngine(
        nodes=scenario["nodes"],
        dependencies=scenario["dependencies"]
    )

    result = engine.run(scenario["initial_failure"])

    # STEP 5 — response
    return {
        "status": "success",
        "user": user_id,
        "scenario_id": req.scenario_id,
        "billing": "logged",
        "simulation": result
    }
