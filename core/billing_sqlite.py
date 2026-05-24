import sqlite3
import os
from datetime import datetime

# -------------------------
# ENSURE DATA DIRECTORY EXISTS
# -------------------------
os.makedirs("data", exist_ok=True)

# -------------------------
# DATABASE CONFIG
# -------------------------
DB_PATH = "data/usage.db"

FREE_LIMIT = 100


# -------------------------
# INITIALIZE DATABASE
# -------------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usage (
            api_key TEXT PRIMARY KEY,
            count INTEGER NOT NULL DEFAULT 0,
            tier TEXT NOT NULL DEFAULT 'free',
            updated_at TEXT
        )
    """)

    conn.commit()
    conn.close()


# -------------------------
# GET API USAGE
# -------------------------
def get_usage(api_key: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT api_key, count, tier FROM usage WHERE api_key = ?",
        (api_key,)
    )

    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "api_key": row[0],
        "count": row[1],
        "tier": row[2]
    }


# -------------------------
# INCREMENT USAGE COUNTER
# -------------------------
def increment_usage(api_key: str, tier: str = "free"):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO usage (api_key, count, tier, updated_at)
        VALUES (?, 1, ?, ?)
        ON CONFLICT(api_key)
        DO UPDATE SET
            count = count + 1,
            updated_at = ?
    """, (
        api_key,
        tier,
        datetime.utcnow().isoformat(),
        datetime.utcnow().isoformat()
    ))

    conn.commit()
    conn.close()


# -------------------------
# CHECK FREE TIER LIMIT
# -------------------------
def is_limit_exceeded(api_key: str):
    usage = get_usage(api_key)

    if not usage:
        return False

    return (
        usage["tier"] == "free"
        and usage["count"] >= FREE_LIMIT
    )
