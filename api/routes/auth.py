from fastapi import APIRouter
from core.auth_service import create_api_key
from core.leads import store_lead

router = APIRouter()


@router.post("/create-key")
def create_key(email: str, company: str = "unknown"):

    key = create_api_key(tier="free")

    store_lead(email, company, key)

    return {
        "api_key": key,
        "tier": "free",
        "status": "active",
        "message": "Added to waitlist. Pro billing coming soon.",
        "contact_email": email,
        "company": company
    }
