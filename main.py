from fastapi import FastAPI

from api.routes.auth import router as auth_router
from api.routes.scenario import router as scenario_router
from api.routes.admin import router as admin_router

from core.billing import get_usage


# -------------------------
# APP INITIALIZATION
# -------------------------
app = FastAPI(
    title="Sextant Orbital Resilience Framework",
    version="1.5.0",
    description="Deterministic orbital + systemic risk simulation API with monetization layer"
)


# -------------------------
# ROUTE REGISTRATION
# -------------------------
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(scenario_router, prefix="/scenario", tags=["Simulation"])
app.include_router(admin_router, prefix="/admin", tags=["Admin"])


# -------------------------
# BILLING / USAGE ENDPOINT
# -------------------------
@app.get("/billing")
def billing(api_key: str):
    usage = get_usage(api_key)

    if usage is None:
        return {
            "status": "error",
            "message": "Invalid API key"
        }

    return {
        "api_key": api_key,
        "usage_count": usage["count"],
        "tier": usage["tier"],
        "status": "active"
    }
