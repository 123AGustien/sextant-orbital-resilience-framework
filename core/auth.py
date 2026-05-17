import secrets
from fastapi import Header, HTTPException

API_KEYS = {}  # api_key -> user_id


def create_api_key(user_id: str) -> str:
    key = secrets.token_hex(16)
    API_KEYS[key] = user_id
    return key


def verify_api_key(api_key: str):
    return API_KEYS.get(api_key)


def require_api_key(x_api_key: str = Header(None)):
    """
    FastAPI dependency:
    - blocks request if API key is missing or invalid
    - returns user_id if valid
    """

    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key")

    user = verify_api_key(x_api_key)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid API key")

    return user
