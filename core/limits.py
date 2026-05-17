from core.billing import get_usage


FREE_LIMIT = 100


def check_limit(api_key: str):

    usage = get_usage(api_key)

    if not usage:
        return {
            "allowed": False,
            "reason": "invalid_api_key"
        }

    count = usage.get("count", 0)
    tier = usage.get("tier", "free")

    # Pro users bypass limit
    if tier == "pro":
        return {
            "allowed": True,
            "remaining": "unlimited"
        }

    remaining = FREE_LIMIT - count

    if remaining <= 0:
        return {
            "allowed": False,
            "reason": "limit_exceeded",
            "message": "Upgrade required to continue using API"
        }

    return {
        "allowed": True,
        "remaining": remaining
    }
