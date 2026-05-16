"""
Sextant Orbital Resilience Framework
Predictive Cascade Engine

Adds probabilistic forecasting over deterministic cascade structure.

This is a simulation-only predictive layer.
"""

class PredictiveCascadeEngine:
    def __init__(self, system_model):
        self.system = system_model

    # ----------------------------------------
    # RISK SCORING MODEL
    # ----------------------------------------
    def compute_failure_risk(self):
        """
        Estimates failure likelihood based on dependency pressure.
        """

        risk_map = {}

        for node_id, node in self.system.items():

            dependencies = node.get("dependencies", [])

            # simple deterministic heuristic model
            risk_score = len(dependencies) * 0.2

            if node.get("status") == "degraded":
                risk_score += 0.5

            if node.get("status", "").startswith("failed"):
                risk_score = 1.0

            risk_map[node_id] = round(min(risk_score, 1.0), 2)

        return risk_map

    # ----------------------------------------
    # HIGH-RISK IDENTIFICATION
    # ----------------------------------------
    def identify_critical_nodes(self, threshold=0.7):
        """
        Returns nodes likely to trigger cascade events.
        """

        risk_map = self.compute_failure_risk()

        critical = [
            node_id
            for node_id, score in risk_map.items()
            if score >= threshold
        ]

        return {
            "risk_map": risk_map,
            "critical_nodes": critical
        }

    # ----------------------------------------
    # CASCADE FORECAST
    # ----------------------------------------
    def forecast_cascade_hotspots(self):
        """
        Identifies structural weak points in the system graph.
        """

        result = self.identify_critical_nodes()

        hotspots = []

        for node_id in result["critical_nodes"]:
            node = self.system[node_id]

            hotspots.append({
                "node": node_id,
                "dependencies": node.get("dependencies", []),
                "risk_score": result["risk_map"][node_id]
            })

        return hotspots
