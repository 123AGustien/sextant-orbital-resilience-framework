import sqlite3

DB_PATH = "orbital.db"


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS api_keys (
            key TEXT PRIMARY KEY,
            usage_count INTEGER DEFAULT 0,
            tier TEXT DEFAULT 'free'
        )
    """)
    return conn
