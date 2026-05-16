from fastapi import FastAPI
from api.server import app as simulation_app
from api.risk import router as risk_router

app = FastAPI(
    title="Sextant Orbital Resilience API Gateway",
    version="1.0.0"
)

# Mount simulation service under namespace
app.mount("/simulation", simulation_app)

# Risk API (clean namespace)
app.include_router(risk_router, prefix="/risk")
