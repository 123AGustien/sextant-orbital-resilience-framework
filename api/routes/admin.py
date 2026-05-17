from fastapi import APIRouter, HTTPException

from core.admin import verify_admin
from core.leads import get_leads
from core.billing import get_usage

router = APIRouter()


@router.get("/dashboard")
def dashboard(admin_token: str):

    # Verify admin access
    if not verify_admin(admin_token):
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )

    # Load all leads
    leads = get_leads()

    enriched_clients = []

    # Attach usage data
    for lead in leads:

        usage = get_usage(lead["api_key"])

        enriched_clients.append({
            "email": lead["email"],
            "company": lead["company"],
            "api_key": lead["api_key"],
            "usage": usage
        })

    # Return dashboard data
    return {
        "status": "success",
        "total_leads": len(leads),
        "clients": enriched_clients
    }
