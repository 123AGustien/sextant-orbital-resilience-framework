from fastapi import FastAPI
from api.server import simulation_app
from api.risk import router as risk_router

app = FastAPI(title="Sextant Orbital Resilience API Gateway")

# Simulation engine mounted under /simulation
app.mount("/simulation", simulation_app)

# Risk scoring module
app.include_router(risk_router)
