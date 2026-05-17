from fastapi import FastAPI

from api.routes.scenario import router as scenario_router
from api.routes.auth import router as auth_router
from api.routes.billing import router as billing_router

app = FastAPI(title="Sextant Orbital Resilience Framework")

# Register routers
app.include_router(scenario_router)
app.include_router(auth_router)
app.include_router(billing_router)


@app.get("/")
def health():
    return {"status": "ok"}
