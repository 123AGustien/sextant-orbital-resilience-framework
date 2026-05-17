from fastapi import APIRouter
from core.auth_service import create_api_key

router = APIRouter()


@router.post("/create-key")
def create_key(email: str, company: str = "unknown"):
    key = create_api_key(tier="free")

    return {
        "api_key": key,
        "tier": "free",
        "status": "active",
        "message": "You are on the waitlist. Billing will be enabled for Pro tier access later.",
        "contact_email": email,
        "company": company
    }
