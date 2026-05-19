from fastapi import HTTPException
from app.models.user import User


def run_orbital_gateway(user: User, payload: dict, orbital_engine):

    # 1. PLAN ENFORCEMENT (PayPal-controlled)
    if user.plan not in ["pro", "enterprise"]:
        raise HTTPException(
            status_code=403,
            detail="Upgrade required via PayPal"
        )

    # 2. USAGE LIMIT CHECK
    if user.usage_count >= user.usage_limit:
        raise HTTPException(
            status_code=429,
            detail="Usage limit reached"
        )

    # 3. RUN ORBITAL ENGINE
    result = orbital_engine.run(payload)

    # 4. INCREMENT USAGE
    user.usage_count += 1

    return result
