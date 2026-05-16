from fastapi import FastAPI
from api.server import router as simulation_router
from api.risk import router as risk_router

app = FastAPI(
    title="Sextant Orbital Resilience API",
    version="1.0.0"
)

# Health check (Render uses this often)
@app.get("/")
def health():
    return {"status": "online"}

# Simulation endpoints
app.include_router(simulation_router, prefix="/simulation")

# Risk endpoints
app.include_router(risk_router, prefix="/risk")
