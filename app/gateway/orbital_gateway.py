from fastapi import HTTPException
from app.models.user import User


def run_orbital_gateway(user: User, payload: dict, orbital_engine):

    if user.plan == "free":
        raise HTTPException(
            status_code=403,
            detail="Upgrade required"
        )

    return orbital_engine.run(payload)
