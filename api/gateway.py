from fastapi import FastAPI
from api.server import app as simulation_app
from api.risk import router as risk_router

app = FastAPI(title="Sextant Orbital Resilience API")

@app.get("/")
def health():
    return {"status": "online"}

app.mount("/simulation", simulation_app)
app.include_router(risk_router, prefix="/risk")
