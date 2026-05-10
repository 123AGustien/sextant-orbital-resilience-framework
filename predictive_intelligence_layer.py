"""
Sextant Orbital Resilience Framework
Predictive Intelligence Layer

Adds lightweight forecasting on top of:
- cascade model
- system dependency graph
- governance state outputs

Purpose:
Predict likely failure propagation paths before execution.
"""

class PredictiveIntelligenceLayer:
    def __init__(self, system, cascade):
        self.system = system
        self.cascade = cascade

    def score_node_risk(self, node_id):
        """
        Assigns a simple risk score based on:
        - number of dependencies
        - dependency centrality (how many nodes rely on it)
        """

        dependencies = self.system.get_dependencies(node_id)
        dependents = self.system.get_dependents(node_id)

        risk_score = len(dependencies) * 0.6 + len(dependents) * 1.2

        return {
            "node": node_id,
            "risk_score": risk_score
        }

    def predict_next_failure_candidates(self):
        """
        Ranks system nodes by likely failure impact if disrupted.
        """

        nodes = self.system.get_all_nodes()

        scored = [
            self.score_node_risk(node)
            for node in nodes
        ]

        ranked = sorted(scored, key=lambda x: x["risk_score"], reverse=True)

        return ranked

    def simulate_what_if_failure(self, node_id):
        """
        Simulates impact of a hypothetical node failure.
        """

        original_state = self.system.snapshot_state()

        self.cascade.simulate_failure(node_id)

        impact = self.cascade.get_cascade_impact()

        self.system.restore_state(original_state)

        return {
            "hypothetical_failure": node_id,
            "impact": impact
        }

    def generate_risk_report(self):
        """
        Produces a mission-level predictive risk summary.
        """

        ranked = self.predict_next_failure_candidates()

        top_risk = ranked[:3]

        return {
            "top_risk_nodes": top_risk,
            "summary": "Highest dependency concentration nodes identified."
        }
