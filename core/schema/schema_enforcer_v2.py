"""
🛰️ Sextant Orbital Resilience Framework
Schema Enforcement Engine v2 (Hardened)

Adds structural + referential + state integrity validation.
"""

from typing import Dict, Any


class SchemaEnforcerV2:
    """
    Validates full scenario integrity across domains.
    """

    ALLOWED_DOMAINS = {
        "orbital",
        "telecom",
        "maritime",
        "energy",
        "cloud"
    }

    ALLOWED_STATES = {
        "HEALTHY",
        "DEGRADED",
        "FAILED",
        "RECOVERING"
    }

    REQUIRED_FIELDS = {
        "scenario_id",
        "domain",
        "nodes",
        "dependencies",
        "initial_state",
        "expected_states"
    }

    # ----------------------------
    # MAIN ENTRY
    # ----------------------------
    def validate(self, scenario: Dict[str, Any]) -> Dict[str, Any]:

        self._check_required_fields(scenario)
        self._check_domain(scenario)
        self._check_structure(scenario)
        self._check_state_maps(scenario)
        self._check_dependency_integrity(scenario)

        return scenario

    # ----------------------------
    # FIELD CHECK
    # ----------------------------
    def _check_required_fields(self, scenario):
        for field in self.REQUIRED_FIELDS:
            if field not in scenario:
                raise ValueError(f"Schema Error: Missing field '{field}'")

    # ----------------------------
    # DOMAIN CHECK
    # ----------------------------
    def _check_domain(self, scenario):
        if scenario["domain"] not in self.ALLOWED_DOMAINS:
            raise ValueError(f"Invalid domain: {scenario['domain']}")

    # ----------------------------
    # STRUCTURE CHECK
    # ----------------------------
    def _check_structure(self, scenario):
        if not isinstance(scenario["nodes"], list):
            raise ValueError("nodes must be a list")

        if not isinstance(scenario["dependencies"], dict):
            raise ValueError("dependencies must be a dict")

        if not isinstance(scenario["initial_state"], dict):
            raise ValueError("initial_state must be a dict")

        if not isinstance(scenario["expected_states"], dict):
            raise ValueError("expected_states must be a dict")

    # ----------------------------
    # STATE VALIDATION
    # ----------------------------
    def _check_state_maps(self, scenario):

        nodes = set(scenario["nodes"])

        for node, state in scenario["initial_state"].items():
            if node not in nodes:
                raise ValueError(f"Unknown node in initial_state: {node}")
            if state not in self.ALLOWED_STATES:
                raise ValueError(f"Invalid state {state} for {node}")

        for node, state in scenario["expected_states"].items():
            if node not in nodes:
                raise ValueError(f"Unknown node in expected_states: {node}")
            if state not in self.ALLOWED_STATES:
                raise ValueError(f"Invalid state {state} for {node}")

    # ----------------------------
    # DEPENDENCY INTEGRITY
    # ----------------------------
    def _check_dependency_integrity(self, scenario):

        nodes = set(scenario["nodes"])

        for node, deps in scenario["dependencies"].items():

            if node not in nodes:
                raise ValueError(f"Dependency defined for unknown node: {node}")

            if not isinstance(deps, list):
                raise ValueError(f"Dependencies for {node} must be a list")

            for dep in deps:
                if dep not in nodes:
                    raise ValueError(
                        f"Invalid dependency: {node} depends on unknown node {dep}"
                    )
