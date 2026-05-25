"""
🛰️ Sextant Orbital Resilience Framework
Scenario Runner v1 (Schema v2 Compatible)

Executes deterministic scenario evaluation pipeline.
"""

from typing import Dict, Any

from core.evaluation.scenario_evaluator_v1 import ScenarioEvaluatorV1


# ----------------------------
# RUNNER
# ----------------------------

class ScenarioRunnerV1:
    def __init__(self, scenario: Dict[str, Any]):
        self.scenario = scenario

        # Normalize ID (Schema v2 compatible)
        self.scenario_id = scenario.get("scenario_id", scenario.get("id", "unknown"))

        # Evaluator operates on expected_states snapshot
        self.evaluator = ScenarioEvaluatorV1({
            "nodes": scenario.get("nodes", []),
            "expected_states": scenario.get("expected_states", {})
        })

    # ------------------------
    # EXECUTION ENTRY
    # ------------------------
    def run(self) -> Dict[str, Any]:

        # Run evaluation
        metrics = self.evaluator.evaluate()

        # Deterministic output package
        return {
            "scenario_id": self.scenario_id,
            "domain": self.scenario.get("domain", "unknown"),
            "nodes": self.scenario.get("nodes", []),
            "results": metrics,
            "status": "completed_deterministic_run"
        }
