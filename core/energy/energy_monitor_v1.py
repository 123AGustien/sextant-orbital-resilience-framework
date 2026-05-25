"""
📡 Energy Monitor Layer v1
Sextant Orbital Resilience Framework
"""

class EnergyMonitorV1:

    def evaluate(self, node_states: dict) -> dict:

        status = {
            "healthy": [],
            "degraded": [],
            "failed": []
        }

        for node, state in node_states.items():

            if state == "HEALTHY":
                status["healthy"].append(node)

            elif state == "DEGRADED":
                status["degraded"].append(node)

            elif state == "FAILED":
                status["failed"].append(node)

        return {
            "domain": "energy",
            "status": status
        }
