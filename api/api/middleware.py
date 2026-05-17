from fastapi import Request, HTTPException
from core.auth import validate_api_key
from core.usage import log_request, check_limit

async def api_key_middleware(request: Request, call_next):

    # Only protect SaaS endpoints
    if request.url.path.startswith("/simulation") or request.url.path.startswith("/risk"):

        api_key = request.headers.get("x-api-key")

        # 1. Validate key
        if not api_key or not validate_api_key(api_key):
            raise HTTPException(
                status_code=401,
                detail="Invalid or missing API key"
            )

        # 2. Check usage limit BEFORE execution
        if not check_limit(api_key, tier="free"):
            raise HTTPException(
                status_code=429,
                detail="API limit reached (upgrade required)"
            )

        # 3. Log request (only if allowed)
        log_request(api_key)

    return await call_next(request)
