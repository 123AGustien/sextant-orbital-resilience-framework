from fastapi import FastAPI

from api.routes.scenario import router as scenario_router
from core.billing import log_usage, get_bill

app = FastAPI(title="Sextant Orbital Resilience Framework")

# Register routes
app.include_router(scenario_router)


@app.get("/billing")
def billing(user_id: str):
    return get_bill(user_id)

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

    # ----------------------------
    # STEP 1 — AUTH (API KEY)
    # ----------------------------
    user_id = user["user"]
    tier = user["tier"]

    # ----------------------------
    # STEP 2 — BILLING
    # ----------------------------
    log_usage(user_id, cost=1)

    # ----------------------------
    # STEP 3 — SIMULATION ENGINE
    # ----------------------------
    engine = CascadeEngine(
        nodes=req.nodes,
        dependencies=req.dependencies
    )

    result = engine.run(req.initial_failure)

    # ----------------------------
    # STEP 4 — RESPONSE
    # ----------------------------
    return {
        "status": "success",
        "scenario_id": req.scenario_id,
        "user": user_id,
        "tier": tier,
        "billing": {
            "charged": 1,
            "currency": "usage-unit"
        },
        "simulation": result
    }
