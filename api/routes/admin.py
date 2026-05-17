from fastapi import APIRouter, HTTPException
from core.admin import verify_admin
from core.leads import get_leads
from core.billing import get_usage

router = APIRouter()


@router.get("/dashboard")
def dashboard(admin_token: str):

    if not verify_admin(admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    leads = get_leads()

    enriched = []
    for lead in leads:
        usage = get_usage(lead["api_key"])
        enriched.append({
            **lead,
            "usage": usage
        })

    return {
        "total_leads": len(leads),
        "clients": enriched
    }
