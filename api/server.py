from fastapi import FastAPI

from api.routes.scenario import router as scenario_router
from core.billing import log_usage

app = FastAPI(title="Sextant Orbital Resilience Framework")

# Register routes
app.include_router(scenario_router)
