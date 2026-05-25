from domains.orbital.orbital_engine import OrbitalEngine
from domains.financial.financial_engine import FinancialEngine

# -----------------------------------------
# DOMAIN EXECUTION MAP
# -----------------------------------------
DOMAIN_MAP = {
    "orbital": OrbitalEngine,
    "financial": FinancialEngine
}

# -----------------------------------------
# DOMAIN ROUTER (IMPORTANT)
# -----------------------------------------
def get_engine(domain: str):
    """
    Returns initialized engine for a given domain.
    """
    if domain not in DOMAIN_MAP:
        raise ValueError(f"Unknown domain: {domain}")

    return DOMAIN_MAP[domain]()
