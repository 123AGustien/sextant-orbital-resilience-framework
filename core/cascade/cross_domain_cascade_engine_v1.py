"""
🛰️ Cross-Domain Cascade Engine v1
Sextant Orbital Resilience Framework

Simulates failure propagation across system domains.
"""

from typing import Dict, Any, List


class CrossDomainCascadeEngineV1:

    CASCADE_MAP = {
        "orbital": ["telecom"],
        "telecom": ["cloud"],
        "maritime": ["energy"],
        "energy": ["cloud"],
        "cloud": []
    }

    def propagate(self, scenario: Dict[str, Any]) -> Dict[str, Any]:

        failed_nodes = [
            node for node, state in scenario["initial_state"].items()
            if state == "FAILED"
        ]

        affected_domains = {scenario["domain"]}
        cascade_log = []

        frontier = [scenario["domain"]]

        while frontier:
            current = frontier.pop()

            for next_domain in self.CASCADE_MAP.get(current, []):

                if next_domain not in affected_domains:
                    affected_domains.add(next_domain)

                    cascade_log.append({
                        "from": current,
                        "to": next_domain,
                        "reason": "dependency_cascade"
                    })

                    frontier.append(next_domain)

        scenario["cascade_result"] = {
            "affected_domains": list(affected_domains),
            "cascade_log": cascade_log,
            "failed_nodes": failed_nodes
        }

        return scenario
