"""
🛰️ Sextant Orbital Resilience Framework
Schema Enforcement Engine v2

Ensures all scenarios conform to Schema v2 before execution.
"""

from typing import Dict, Any


class SchemaEnforcerV2:
    """
    Validates structural compliance of scenarios.
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
        "failure_conditions",
        "expected_states"
    }

    # ----------------------------
    # MAIN VALIDATION ENTRY
    # ----------------------------
    def validate(self, scenario: Dict[str, Any]) -> Dict[str, Any]:

        # 1. Check required fields
        for field in self.REQUIRED_FIELDS:
            if field not in scenario:
                raise ValueError(f"Schema Error: Missing field '{field}'")

        # 2. Validate domain
        if scenario["domain"] not in self.ALLOWED_DOMAINS:
            raise ValueError(
                f"Schema Error: Invalid domain '{scenario['domain']}'"
            )

        # 3. Validate expected states
        for node, state in scenario["expected_states"].items():
            if state not in self.ALLOWED_STATES:
                raise ValueError(
                    f"Schema Error: Invalid state '{state}' for node '{node}'"
                )

        # 4. Validate initial states
        for node, state in scenario["initial_state"].items():
            if state not in self.ALLOWED_STATES:
                raise ValueError(
                    f"Schema Error: Invalid initial state '{state}' for node '{node}'"
                )

        return scenario
