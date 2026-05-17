from fastapi import APIRouter
from pydantic import BaseModel

from core.billing import log_usage
from core.cascade import CascadeEngine

router = APIRouter()


class ScenarioRequest(BaseModel):
    scenario_id: str
    user_id: str = "anonymous"

    # required for simulation
    nodes: list[str]
    dependencies: list[dict]
    initial_failure: str


@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest):

    # STEP 1 — billing
    log_usage(req.user_id, cost=1)

    # STEP 2 — run cascade engine properly
    engine = CascadeEngine(
        nodes=req.nodes,
        dependencies=req.dependencies
    )

    result = engine.run(req.initial_failure)

    # STEP 3 — response
    return {
        "status": "ok",
        "scenario_id": req.scenario_id,
        "user": req.user_id,
        "billing": "logged",
        "simulation": result
    }
