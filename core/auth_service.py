import secrets


def create_api_key(tier: str = "free"):

    prefix = "sx"

    if tier == "pro":
        prefix = "sxpro"

    token = secrets.token_hex(16)

    return f"{prefix}_{token}"
