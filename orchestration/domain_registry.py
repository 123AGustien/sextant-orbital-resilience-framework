from domains.orbital.orbital_engine import OrbitalEngine
from domains.financial.financial_engine import FinancialEngine
from domains.telecom.telecom_engine import TelecomEngine
from domains.energy.energy_engine import EnergyEngine

# -----------------------------------------
# DOMAIN EXECUTION MAP
# -----------------------------------------
DOMAIN_MAP = {
    "orbital": OrbitalEngine,
    "financial": FinancialEngine,
    "telecom": TelecomEngine,
    "energy": EnergyEngine
}

# -----------------------------------------
# DOMAIN ROUTER (CORE DISPATCHER)
# -----------------------------------------
def get_engine(domain: str):
    """
    Returns initialized engine for a given domain.

    Used by:
    - orchestration layer
    - scenario runtime
    - cascade simulation engine
    """

    engine_class = DOMAIN_MAP.get(domain)

    if engine_class is None:
        raise ValueError(
            f"[DOMAIN_ROUTER] Unknown domain: {domain}. "
            f"Supported domains: {', '.join(DOMAIN_MAP.keys())}"
        )

    return engine_class()
