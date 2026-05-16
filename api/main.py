from fastapi import FastAPI
from api.server import app as simulation_app
from api.risk import router as risk_router

# Main API gateway
app = FastAPI(title="Sextant Orbital Resilience API Gateway")

# Mount simulation under a namespace (IMPORTANT FIX)
app.mount("/simulation", simulation_app)

# Register risk scoring endpoints
app.include_router(risk_router, prefix="/risk")
