ADMIN_TOKEN = "sextant-admin-2026"


def verify_admin(token: str):
    return token == ADMIN_TOKEN
