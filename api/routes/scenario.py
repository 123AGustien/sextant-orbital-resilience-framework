from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ScenarioRequest(BaseModel):
    scenario_id: str

@router.post("/run-scenario")
def run_scenario(req: ScenarioRequest):
    return {
        "status": "ok",
        "scenario_id": req.scenario_id,
        "message": "endpoint active (engine not wired yet)"
    }
