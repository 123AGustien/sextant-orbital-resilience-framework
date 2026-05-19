from fastapi import APIRouter, HTTPException
from app.db.session import SessionLocal
from app.models.user import User
import uuid

router = APIRouter()


@router.post("/governance/activate-contract")
def activate_contract(user_id: str):

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # assign contract identity
        user.contract_id = f"CTR-{uuid.uuid4().hex[:10]}"

        # activate governance layer
        user.contract_status = "active"
        user.nda_status = "signed"

        # optional: ensure enterprise alignment
        user.plan = "enterprise"

        db.commit()

        return {
            "status": "contract_activated",
            "contract_id": user.contract_id
        }

    finally:
        db.close()
