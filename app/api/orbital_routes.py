from fastapi import APIRouter
from app.api.gateway import enforce_enterprise_access
from app.db.session import SessionLocal
from app.models.user import User

router = APIRouter()


@router.post("/run-orbital")
def run_orbital(user_id: str):

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            return {"status": "user_not_found"}

        # 🔐 GATE ENFORCEMENT (REAL CONTROL POINT)
        enforce_enterprise_access(user)

        # 🛰️ ORBITAL EXECUTION (SAFE TO RUN)
        result = {
            "status": "orbital_executed",
            "user": user.id
        }

        return result

    finally:
        db.close()
