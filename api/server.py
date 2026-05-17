from fastapi import FastAPI

from api.routes.scenario import router as scenario_router
from core.billing import log_usage, get_bill

app = FastAPI(title="Sextant Orbital Resilience Framework")

# Register routes
app.include_router(scenario_router)


@app.get("/billing")
def billing(user_id: str):
    return get_bill(user_id)
