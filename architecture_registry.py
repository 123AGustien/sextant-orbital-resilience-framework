"""
Sextant Orbital Resilience Framework
Architecture Registry

This module defines the authoritative mapping between
system components and the Nine-Layer Operational Abstraction Stack.

Deterministic reference registry only.
"""

ARCHITECTURE_STACK = {
    "sensor_layer": [],
    "relay_layer": [],
    "dependency_layer": ["orbital_system_model.py"],
    "cascade_layer": ["cascade_model.py"],
    "transition_layer": ["topology_transition.py"],
    "isolation_layer": ["system_reconfiguration_engine.py"],
    "recovery_layer": [],
    "governance_layer": ["mission_governance.py"],
    "supervisory_layer": ["ai_interpretation_layer.py"],
}


def get_layer(layer_name: str):
    """
    Returns module mapping for a given architecture layer.
    """
    return ARCHITECTURE_STACK.get(layer_name, [])
