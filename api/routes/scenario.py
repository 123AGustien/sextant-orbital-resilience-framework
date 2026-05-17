from fastapi import APIRouter, Depends
from pydantic import BaseModel

from core.billing import log_usage
from core.cascade import CascadeEngine
from core.auth import require_api_key

router = APIRouter()


class ScenarioRequest(BaseModel):
    scenario_id: str
    nodes: list[str]
    dependencies: list[dict]
    initial_failure: str


@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest, user=Depends(require_api_key)):

    user_id = user["user"]
    tier = user["tier"]

    # STEP 1 — billing
    log_usage(user_id, cost=1)

    # STEP 2 — run simulation engine
    engine = CascadeEngine(
        nodes=req.nodes,
        dependencies=req.dependencies
    )

    result = engine.run(req.initial_failure)

    # STEP 3 — response
    return {
        "status": "ok",
        "scenario_id": req.scenario_id,
        "user": user_id,
        "tier": tier,
        "billing": "logged",
        "simulation": result
    }
