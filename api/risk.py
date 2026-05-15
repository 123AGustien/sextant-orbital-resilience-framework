from fastapi import APIRouter
from core.engine import SimulationEngine
from core.scenario_loader import load_scenario

router = APIRouter()
engine = SimulationEngine()


@router.post("/risk-score")
def risk_score(scenario_name: str):
    """
    Runs a scenario and returns a deterministic risk score.

    Parameters:
        scenario_name (str): Name of scenario file (without .json)

    Returns:
        dict: Risk score + status
    """

    scenario = load_scenario(f"scenarios/{scenario_name}.json")
    result = engine.run(scenario)

    return {
        "risk_score": len(result["failed_nodes"]),
        "status": "computed"
    }
