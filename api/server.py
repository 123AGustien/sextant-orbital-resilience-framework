from core.billing import log_usage import FastAPI
from api.routes.scenario import router as scenario_router

app = FastAPI(title="Sextant Orbital Resilience Framework")

# Register routes
app.include_router(scenario_router)
