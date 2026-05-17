from fastapi import APIRouter
from pydantic import BaseModel

from core.billing import log_usage
from core.cascade import run_cascade  # we will assume this exists

router = APIRouter()


class ScenarioRequest(BaseModel):
    scenario_id: str
    user_id: str = "anonymous"


@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest):

    # STEP 1 — log billing usage
    log_usage(req.user_id, cost=1)

    # STEP 2 — run simulation engine
    result = run_cascade(req.scenario_id)

    # STEP 3 — return structured response
    return {
        "status": "ok",
        "scenario_id": req.scenario_id,
        "user": req.user_id,
        "billing": "logged",
        "simulation": result
    }
