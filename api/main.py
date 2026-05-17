from fastapi import FastAPI
from api.v1.orbital_engine import OrbitalEngineV1

simulation_app = FastAPI(title="Simulation Engine")

engine = OrbitalEngineV1()


@simulation_app.post("/run-scenario")
def run_scenario(payload: dict):
    return engine.run_scenario(payload)
