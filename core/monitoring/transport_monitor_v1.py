"""
🚆 Transport Monitor v1
Sextant Orbital Resilience Framework

Observes transport system health signals.
"""

from typing import Dict, Any


class TransportMonitorV1:

    HEALTH_STATES = {
        "HEALTHY",
        "DEGRADED",
        "FAILED",
        "RECOVERING"
    }

    # ---------------------------------
    # MAIN MONITOR ENTRY
    # ---------------------------------

    def evaluate(self, nodes: Dict[str, Any]) -> Dict[str, Any]:

        status_report = {}

        for node, state in nodes.items():

            if state not in self.HEALTH_STATES:
                raise ValueError(
                    f"Invalid state for {node}: {state}"
                )

            status_report[node] = {
                "state": state,
                "signal": self._derive_signal(state)
            }

        return {
            "domain": "transport",
            "status_report": status_report
        }

    # ---------------------------------
    # SIGNAL INTERPRETATION
    # ---------------------------------

    def _derive_signal(self, state: str) -> str:

        if state == "HEALTHY":
            return "STABLE_FLOW"

        if state == "DEGRADED":
            return "CONGESTION_WARNING"

        if state == "FAILED":
            return "ROUTE_FAILURE"

        return "RECOVERY_MODE_ACTIVE"
