"""
🛰️ Sextant Orbital Resilience Framework
Scenario Runner v1

This module executes deterministic scenarios and passes them
through the ScenarioEvaluatorV1 to produce resilience reports.
"""

from typing import Dict, Any

from core.evaluation.scenario_evaluator_v1 import ScenarioEvaluatorV1


# ----------------------------
# SCENARIO RUNNER
# ----------------------------

class ScenarioRunnerV1:
    def __init__(self, scenario: Dict[str, Any]):
        self.scenario = scenario
        self.evaluator = ScenarioEvaluatorV1(scenario)

    # ------------------------
    # EXECUTE PIPELINE
    # ------------------------
    def run(self) -> Dict[str, Any]:
        """
        Runs full evaluation pipeline:
        Scenario → Evaluation → Metrics Output
        """

        result = self.evaluator.evaluate()

        return {
            "scenario_id": self.scenario.get("id", "unknown"),
            "nodes": self.scenario.get("nodes", []),
            "results": result,
            "status": "completed_deterministic_run"
        }


# ----------------------------
# SIMPLE TEST ENTRY (OPTIONAL)
# ----------------------------

if __name__ == "__main__":
    sample_scenario = {
        "id": "test_scenario_001",
        "nodes": ["satellite_A", "satellite_B"],
        "expected_states": {
            "satellite_A": "HEALTHY",
            "satellite_B": "DEGRADED"
        }
    }

    runner = ScenarioRunnerV1(sample_scenario)
    output = runner.run()

    print(output)
