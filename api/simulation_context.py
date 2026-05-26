"""
🛰️ Sextant Orbital Resilience Framework
Simulation Context & Governance Tagging Layer
"""

SIMULATION_MODE = True
SYSTEM_CONTEXT = "deterministic_simulation_only"
IS_SANDBOX = True
ALLOW_EXTERNAL_NETWORK = False


def get_simulation_context():
    """
    Returns execution safety + governance metadata
    used across API + incident simulation modules.
    """
    return {
        "context": SYSTEM_CONTEXT,
        "mode": "cascade_resilience_model",
        "execution": "sandbox_isolated",
        "operational_status": "non_operational",
        "simulation_mode": SIMULATION_MODE,
        "network_policy": "egress_disabled",
        "data_policy": "synthetic_only"
    }
