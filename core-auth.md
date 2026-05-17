import uuid

# temporary in-memory user store (replace with DB later)
API_KEYS = {
    "test-key": {
        "user": "demo-user",
        "tier": "free"
    }
}

def generate_api_key() -> str:
    return str(uuid.uuid4())

def create_user_api_key(user: str, tier: str = "free") -> str:
    key = generate_api_key()

    API_KEYS[key] = {
        "user": user,
        "tier": tier
    }

    return key

def validate_api_key(key: str) -> bool:
    return key in API_KEYS

def get_user(key: str):
    return API_KEYS.get(key)

def get_tier(key: str) -> str:
    user = get_user(key)

    if not user:
        return "free"

    return user.get("tier", "free")
