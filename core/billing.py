from collections import defaultdict
from datetime import datetime

USAGE = defaultdict(int)


def log_usage(api_key: str, cost: int = 1):
    USAGE[api_key] += cost


def get_usage(api_key: str):
    return {
        "api_key": api_key,
        "total_runs": USAGE[api_key],
        "cost_usd": USAGE[api_key] * 0.05,
        "currency": "USD",
        "timestamp": datetime.utcnow().isoformat()
    }
