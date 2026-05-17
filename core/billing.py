from collections import defaultdict
from datetime import datetime

USAGE_STORE = defaultdict(int)

def log_usage(user_id: str, cost: int = 1):
    USAGE_STORE[user_id] += cost

def get_bill(user_id: str):
    return {
        "user": user_id,
        "total_runs": USAGE_STORE[user_id],
        "amount_due": USAGE_STORE[user_id] * 0.05,
        "currency": "USD",
        "timestamp": datetime.utcnow().isoformat()
    }
