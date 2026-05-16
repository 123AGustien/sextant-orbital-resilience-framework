from fastapi import APIRouter
from pydantic import BaseModel
from core.engine import Engine

router = APIRouter()


class RunScenarioRequest(BaseModel):
    scenario_name: str


@router.post("/run-scenario")
def run_scenario(request: RunScenarioRequest):
    """
    Executes deterministic cascade simulation.
    """

    scenario_path = f"scenarios/{request.scenario_name}.json"

    engine = Engine(scenario_path)
    result = engine.run()

    return {
        "status": "success",
        "scenario": request.scenario_name,
        "result": result
    }
