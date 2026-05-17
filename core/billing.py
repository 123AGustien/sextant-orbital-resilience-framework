# simple in-memory usage store (upgrade later to DB)
USAGE_DB = {}


def get_usage(api_key: str):
    return USAGE_DB.get(api_key, {"count": 0})


def increment_usage(api_key: str):
    if api_key not in USAGE_DB:
        USAGE_DB[api_key] = {"count": 0}

    USAGE_DB[api_key]["count"] += 1
