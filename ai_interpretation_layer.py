"""
Sextant Orbital Resilience Framework
Mission Resilience Interpreter Layer

Translates orbital system state and cascade outcomes into
mission-level insights, health scoring, and operational interpretation.
"""

class MissionResilienceInterpreter:
    def __init__(self, system_model, cascade_model):
        self.system = system_model
        self.cascade = cascade_model

    def analyze_constellation_health(self):
        """
        Evaluates overall constellation health state.
        """
        impact = self.cascade.get_cascade_impact()

        total_nodes = len(self.system.nodes)
        failed = len(impact["failed"])
        degraded = len(impact["degraded"])

        health_score = (total_nodes - failed - (0.5 * degraded)) / total_nodes

        if health_score > 0.85:
            status = "healthy"
        elif health_score > 0.6:
            status = "degraded"
        else:
            status = "critical"

        return {
            "status": status,
            "health_score": round(health_score, 3),
            "failed_nodes": impact["failed"],
            "degraded_nodes": impact["degraded"]
        }

    def analyze_coverage_integrity(self):
        """
        Simplified coverage integrity estimation.
        """
        failed = len(self.cascade.get_cascade_impact()["failed"])
        total = len(self.system.nodes)

        coverage = 1 - (failed / total)

        return {
            "coverage_integrity": round(coverage, 3)
        }

    def detect_cascade_risk(self):
        """
        Identifies whether system is in active cascade state.
        """
        degraded = len(self.cascade.get_cascade_impact()["degraded"])

        if degraded > 3:
            risk = "high_cascade_risk"
        elif degraded > 0:
            risk = "elevated_risk"
        else:
            risk = "stable"

        return {
            "cascade_risk": risk
        }

    def generate_mission_report(self):
        """
        Full mission-level interpretation output.
        """
        health = self.analyze_constellation_health()
        coverage = self.analyze_coverage_integrity()
        risk = self.detect_cascade_risk()

        return {
            "mission_status": health["status"],
            "health_score": health["health_score"],
            "coverage": coverage["coverage_integrity"],
            "cascade_risk": risk["cascade_risk"],
            "failed_nodes": health["failed_nodes"],
            "degraded_nodes": health["degraded_nodes"]
        }
