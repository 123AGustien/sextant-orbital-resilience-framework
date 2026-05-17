from fastapi import FastAPI

from api.routes.auth import router as auth_router
from api.routes.scenario import router as scenario_router
from core.billing import get_usage

app = FastAPI(title="Sextant Orbital Resilience Framework")

# ROUTES
app.include_router(auth_router)
app.include_router(scenario_router)


# BILLING ENDPOINT
@app.get("/billing")
def billing(api_key: str):
    return get_usage(api_key)
