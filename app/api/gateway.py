from fastapi import HTTPException
from app.models.user import User


def enforce_enterprise_access(user: User):

    if user.plan != "enterprise":
        raise HTTPException(status_code=403, detail="Enterprise plan required")

    if user.contract_status != "active":
        raise HTTPException(status_code=403, detail="Active contract required")

    if user.nda_status != "signed":
        raise HTTPException(status_code=403, detail="NDA not signed")
