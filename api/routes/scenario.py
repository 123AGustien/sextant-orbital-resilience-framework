from fastapi import APIRouter, Depends
from pydantic import BaseModel

from core.auth import require_api_key
from core.billing import log_usage
from core.cascade import CascadeEngine

router = APIRouter()


class ScenarioRequest(BaseModel):
    scenario_id: str
    nodes: list[str]
    dependencies: list[dict]
    initial_failure: str


@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest, user_id: str = Depends(require_api_key)):

    # STEP 1 — billing
    log_usage(user_id, cost=1)

    # STEP 2 — engine
    engine = CascadeEngine(
        nodes=req.nodes,
        dependencies=req.dependencies
    )

    result = engine.run(req.initial_failure)

    # STEP 3 — response
    return {
        "status": "ok",
        "user": user_id,
        "scenario_id": req.scenario_id,
        "simulation": result
    }
