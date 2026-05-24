"""
🛰️ Sextant Orbital Resilience Framework
Simulation Context Tagging Layer

This file ensures all API responses are explicitly marked as simulation-only.
"""

SIMULATION_MODE = True
SYSTEM_CONTEXT = "deterministic_simulation_only"


def get_simulation_context():
    return {
        "context": "simulation_only",
        "mode": "cascade_resilience_model",
        "operational_status": "non_operational"
    }
