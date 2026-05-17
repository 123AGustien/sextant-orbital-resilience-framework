from fastapi import FastAPI
from api.server import router as simulation_router
from api.risk import router as risk_router
from api.middleware import api_key_middleware

app = FastAPI(
    title="Sextant Orbital Resilience API",
    version="1.0.0"
)

# -------------------------
# Health Check (Render)
# -------------------------
@app.get("/")
def health():
    return {
        "status": "online",
        "service": "sextant-orbital-resilience-api"
    }

# -------------------------
# API Key Middleware (SAAS LAYER)
# -------------------------
@app.middleware("http")
async def auth_middleware(request, call_next):
    return await api_key_middleware(request, call_next)

# -------------------------
# Modules
# -------------------------
app.include_router(simulation_router, prefix="/simulation")
app.include_router(risk_router, prefix="/risk")
