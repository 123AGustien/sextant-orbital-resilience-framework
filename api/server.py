from fastapi import FastAPI
from core.engine import SimulationEngine
from core.scenario_loader import load_scenario

app = FastAPI(title="Sextant Orbital Simulation API")

engine = SimulationEngine()


@app.post("/run-scenario")
def run_scenario(scenario_name: str):
    """
    Runs a deterministic cascade simulation.

    Parameters:
        scenario_name (str): Name of scenario file (without .json)

    Returns:
        dict: Simulation result including cascade outcome
    """

    scenario = load_scenario(f"scenarios/{scenario_name}.json")
    result = engine.run(scenario)

    return {
        "status": "success",
        "scenario": scenario_name,
        "result": result
    }
