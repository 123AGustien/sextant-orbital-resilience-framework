from fastapi import APIRouter
from core.auth_service import create_api_key

router = APIRouter()


@router.post("/create-key")
def create_key(tier: str = "free"):
    key = create_api_key(tier)
    return {
        "api_key": key,
        "tier": tier,
        "status": "active"
    }
