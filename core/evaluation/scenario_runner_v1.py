"""
🛰️ Sextant Orbital Resilience Framework
Scenario Runner v1 (Loader Integrated)

Now supports loading scenarios via ScenarioLoaderV1.
"""

from typing import Dict, Any

from core.evaluation.scenario_evaluator_v1 import ScenarioEvaluatorV1


# ----------------------------
# RUNNER
# ----------------------------

class ScenarioRunnerV1:
    def __init__(self, scenario: Dict[str, Any]):
        self.scenario = scenario
        self.evaluator = ScenarioEvaluatorV1(scenario)

    def run(self) -> Dict[str, Any]:
        result = self.evaluator.evaluate()

        return {
            "scenario_id": self.scenario.get("id", "unknown"),
            "nodes": self.scenario.get("nodes", []),
            "results": result,
            "status": "completed_deterministic_run"
        }
