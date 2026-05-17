from fastapi import APIRouter

router = APIRouter()


# -------------------------
# UPGRADE REQUEST ENDPOINT
# -------------------------
@router.post("/request-upgrade")
def request_upgrade(email: str, company: str = "unknown", api_key: str = None):

    return {
        "status": "received",
        "message": "Upgrade request submitted successfully",
        "email": email,
        "company": company,
        "api_key": api_key,
        "next_step": "Our team will contact you for enterprise access or invoice setup"
    }
