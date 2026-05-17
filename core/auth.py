from fastapi import Header, HTTPException
from core.billing import get_usage, increment_usage


FREE_LIMIT = 100


def verify_api_key(x_api_key: str = Header(None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key")

    usage = get_usage(x_api_key)

    if usage is None:
        raise HTTPException(status_code=401, detail="Invalid API key")

    if usage["tier"] == "free" and usage["count"] >= FREE_LIMIT:
        raise HTTPException(
            status_code=403,
            detail="Free tier limit exceeded. Upgrade required."
        )

    increment_usage(x_api_key)

    return x_api_key
