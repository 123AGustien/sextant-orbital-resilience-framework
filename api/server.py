from fastapi import FastAPI
from api.v1.orbital_engine import OrbitalEngineV1

simulation_app = FastAPI(title="Sextant Simulation Engine v1")

engine = OrbitalEngineV1()


@simulation_app.post("/run-scenario")
def run_scenario(payload: dict):
    return engine.run_scenario(payload)
