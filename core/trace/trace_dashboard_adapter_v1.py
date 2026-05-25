"""
🛰️ Sextant Orbital Resilience Framework
Trace Dashboard Adapter v1

Converts execution traces into UI-ready visualization payloads.
"""

from typing import List, Dict, Any


class TraceDashboardAdapterV1:
    def __init__(self, trace: List[Dict[str, Any]]):
        self.trace = trace

    # ----------------------------
    # TIMELINE FORMAT (UI)
    # ----------------------------
    def get_timeline(self) -> List[Dict[str, Any]]:
        return [
            {
                "index": i,
                "event": item.get("event"),
                "timestamp": item.get("timestamp")
            }
            for i, item in enumerate(self.trace)
        ]

    # ----------------------------
    # NODE GRAPH FORMAT (UI)
    # ----------------------------
    def get_graph(self) -> Dict[str, Any]:

        nodes = []
        edges = []

        for i, item in enumerate(self.trace):
            node_id = f"n{i}"

            nodes.append({
                "id": node_id,
                "label": item.get("event")
            })

            if i > 0:
                edges.append({
                    "from": f"n{i-1}",
                    "to": node_id
                })

        return {
            "nodes": nodes,
            "edges": edges
        }

    # ----------------------------
    # FAILURE VIEW (UI FILTER)
    # ----------------------------
    def get_failures(self) -> List[Dict[str, Any]]:

        failure_keywords = {"FAILED", "DEGRADED", "ERROR"}

        failures = []

        for item in self.trace:
            data_blob = str(item.get("data", "")) + str(item.get("result", ""))

            if any(k in data_blob.upper() for k in failure_keywords):
                failures.append(item)

        return failures

    # ----------------------------
    # FULL DASHBOARD PAYLOAD
    # ----------------------------
    def build_dashboard(self) -> Dict[str, Any]:
        return {
            "timeline": self.get_timeline(),
            "graph": self.get_graph(),
            "failures": self.get_failures()
        }
