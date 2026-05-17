from collections import defaultdict
import time

# in-memory usage store (upgrade to DB later)
USAGE = defaultdict(list)

# simple limits (SaaS tier simulation)
LIMITS = {
    "free": 10,   # 10 requests
    "pro": 100    # 100 requests
}

def log_request(api_key: str):
    USAGE[api_key].append(time.time())

def get_usage(api_key: str):
    return len(USAGE[api_key])

def check_limit(api_key: str, tier="free"):
    return get_usage(api_key) < LIMITS[tier]
