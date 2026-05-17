import secrets
from collections import defaultdict

# API KEY STORAGE (MVP in-memory)
API_KEYS = {}  # api_key -> user_id


def create_api_key(user_id: str) -> str:
    key = secrets.token_hex(16)
    API_KEYS[key] = user_id
    return key


def verify_api_key(api_key: str):
    return API_KEYS.get(api_key)
