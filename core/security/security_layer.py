"""
🛡️ Sextant Security Layer
Deterministic Simulation Hardening Boundary
"""

import re
from fastapi import HTTPException

# ----------------------------
# AUTH CONFIG
# ----------------------------

VALID_TOKENS = {"SIM-ENGINE-ACCESS-KEY"}

def verify_auth(token: str):
    if token not in VALID_TOKENS:
        raise HTTPException(status_code=401, detail="Unauthorized access")


# ----------------------------
# INPUT SANITIZER
# ----------------------------

def sanitize_payload(payload: dict):

    dangerous_patterns = [
        r"<script.*?>",
        r"DROP\s+TABLE",
        r"SELECT\s+\*",
        r"__import__",
        r"os\.system",
        r"eval\(",
    ]

    text = str(payload).lower()

    for pattern in dangerous_patterns:
        if re.search(pattern, text):
            raise HTTPException(
                status_code=400,
                detail="Malicious payload detected"
            )

    return payload


# ----------------------------
# SIMULATION BOUNDARY
# ----------------------------

def simulation_context():
    return {
        "mode": "deterministic_simulation_only",
        "production_access": False,
        "external_network": False,
        "data_policy": "synthetic_only"
    }
