"""
🛰️ Sextant Orbital Resilience Framework
Scenario Evaluator v1

Core evaluation engine for computing resilience metrics
from deterministic simulation scenarios.
"""

from typing import Dict


# ----------------------------
# STATE SCORING MODEL
# ----------------------------

STATE_SCORE = {
    "HEALTHY": 1.0,
    "DEGRADED": 0.5,
    "FAILED": 0.0,
    "RECOVERING": 0.7
}


# ----------------------------
# SCENARIO EVALUATOR
# ----------------------------

class ScenarioEvaluatorV1:
    def __init__(self, scenario: Dict):
        self.scenario = scenario
        self.expected_states = scenario.get("expected_states", {})

    # ------------------------
    # SYSTEM STABILITY INDEX
    # ------------------------
    def compute_ssi(self) -> float:
        if not self.expected_states:
            return 0.0

        total = sum(
            STATE_SCORE.get(state, 0.0)
            for state in self.expected_states.values()
        )

        return total / len(self.expected_states)

    # ------------------------
    # CUMULATIVE FAILURE INDEX
    # ------------------------
    def compute_cdi(self) -> int:
        return sum(
            1 for state in self.expected_states.values()
            if state != "HEALTHY"
        )

    # ------------------------
    # FRAGMENTATION INDEX
    # ------------------------
    def compute_fi(self) -> float:
        total = len(self.expected_states)
        if total == 0:
            return 0.0

        healthy = sum(
            1 for state in self.expected_states.values()
            if state == "HEALTHY"
        )

        return 1 - (healthy / total)

    # ------------------------
    # DEGRADATION RATE
    # ------------------------
    def compute_dr(self) -> float:
        total = len(self.expected_states)
        if total == 0:
            return 0.0

        failed = sum(
            1 for state in self.expected_states.values()
            if state == "FAILED"
        )

        degraded = sum(
            1 for state in self.expected_states.values()
            if state == "DEGRADED"
        )

        return (failed + 0.5 * degraded) / total

    # ------------------------
    # COMPOSITE RESILIENCE SCORE
    # ------------------------
    def compute_crs(self) -> float:
        ssi = self.compute_ssi()
        cdi = self.compute_cdi()
        fi = self.compute_fi()
        dr = self.compute_dr()

        return ssi - (0.2 * cdi + fi + dr)

    # ------------------------
    # FULL EVALUATION REPORT
    # ------------------------
    def evaluate(self) -> Dict:
        return {
            "SSI": self.compute_ssi(),
            "CDI": self.compute_cdi(),
            "FI": self.compute_fi(),
            "DR": self.compute_dr(),
            "CRS": self.compute_crs()
        }
