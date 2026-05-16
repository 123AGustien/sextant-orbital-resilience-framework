from fastapi import APIRouter
from pydantic import BaseModel
from core.engine import Engine
from core.scenario_loader import ScenarioLoader

router = APIRouter()


class RunScenarioRequest(BaseModel):
    scenario_name: str


@router.post("/run-scenario")
def run_scenario(request: RunScenarioRequest):
    """
    Executes deterministic cascade simulation using Sextant Engine.

    Flow:
    scenario file → loader → engine → cascade simulation → result
    """

    scenario_path = f"scenarios/{request.scenario_name}.json"

    # Load scenario (validation / metadata layer)
    loader = ScenarioLoader()
    scenario = loader.load(scenario_path)

    # Run engine (core simulation layer)
    engine = Engine(scenario_path)
    result = engine.run()

    return {
        "status": "success",
        "scenario": request.scenario_name,
        "nodes": len(scenario.get("nodes", [])),
        "result": result
    }
