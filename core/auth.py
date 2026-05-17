from fastapi import Header, HTTPException
from core.billing import get_usage, increment_usage

FREE_LIMIT = 100  # per month (example)


def verify_api_key(x_api_key: str = Header(None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key")

    usage = get_usage(x_api_key)

    if usage is None:
        raise HTTPException(status_code=401, detail="Invalid API key")

    # enforce free tier limit
    if usage["count"] >= FREE_LIMIT:
        raise HTTPException(
            status_code=403,
            detail="Usage limit exceeded. Upgrade plan required."
        )

    # increment usage
    increment_usage(x_api_key)

    return x_api_key
