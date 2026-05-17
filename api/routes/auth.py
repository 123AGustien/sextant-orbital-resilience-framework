from fastapi import APIRouter

from core.auth_service import create_api_key
from core.leads import store_lead

router = APIRouter()


@router.post("/create-key")
def create_key(email: str, company: str = "unknown"):

    key = create_api_key(tier="free")

    store_lead(
        email=email,
        company=company,
        api_key=key
    )

    return {
        "status": "success",
        "tier": "free",
        "api_key": key,
        "message": "API key created successfully"
    }
