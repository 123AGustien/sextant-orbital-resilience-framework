import uuid
from core.db import get_conn


def create_api_key(tier: str = "free"):
    key = str(uuid.uuid4())

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO api_keys (key, usage_count, tier) VALUES (?, 0, ?)",
        (key, tier)
    )

    conn.commit()
    conn.close()

    return key
