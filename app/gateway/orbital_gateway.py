from fastapi import HTTPException
from app.models.user import User


def run_orbital_gateway(user: User, payload: dict, orbital_engine):

    # 1. block free users
    if user.plan == "free":
        raise HTTPException(status_code=403, detail="Upgrade required")

    # 2. usage limit check
    if user.usage_count >= user.usage_limit:
        raise HTTPException(status_code=429, detail="Usage limit reached")

    # 3. run orbital engine
    result = orbital_engine.run(payload)

    # 4. increment usage
    user.usage_count += 1

    return result
