from collections import defaultdict
from datetime import datetime

USAGE_STORE = defaultdict(int)
COST_STORE = defaultdict(float)


def log_usage(user_id: str, cost: int = 1):
    USAGE_STORE[user_id] += 1
    COST_STORE[user_id] += cost * 0.05  # $0.05 per run


def get_bill(user_id: str):
    return {
        "user": user_id,
        "total_runs": USAGE_STORE[user_id],
        "amount_due": round(COST_STORE[user_id], 4),
        "currency": "USD",
        "timestamp": datetime.utcnow().isoformat()
    }
