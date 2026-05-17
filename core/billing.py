from core.db import get_conn

FREE_LIMIT = 100


def get_usage(api_key: str):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT usage_count, tier FROM api_keys WHERE key=?", (api_key,))
    row = cur.fetchone()

    conn.close()

    if not row:
        return None

    return {
        "count": row[0],
        "tier": row[1]
    }


def increment_usage(api_key: str):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        UPDATE api_keys
        SET usage_count = usage_count + 1
        WHERE key=?
    """, (api_key,))

    conn.commit()
    conn.close()
