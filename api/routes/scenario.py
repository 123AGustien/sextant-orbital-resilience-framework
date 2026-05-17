from fastapi import APIRouter, Depends
from core.auth import verify_api_key
from api.v1.orbital_engine import OrbitalEngineV1

router = APIRouter()

engine = OrbitalEngineV1()


@router.post("/run")
def run_scenario(payload: dict, api_key: str = Depends(verify_api_key)):
    return engine.run_scenario(payload)
