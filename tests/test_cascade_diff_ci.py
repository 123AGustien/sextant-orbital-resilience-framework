"""
Sextant Orbital Resilience Framework
v1.2 Cascade Diff CI

Determinism enforcement gate:
Ensures identical inputs produce identical cascade outputs.
"""

from core.simulation_engine import SimulationEngine
from orchestration.system_flow_controller import SystemFlowController
from runtime.unified_runtime import UnifiedRuntime


class CascadeDiffCI:
    """
    Runs deterministic comparison between two simulation executions.
    """

    def __init__(self):
        self.runtime = UnifiedRuntime()
        self.engine = SimulationEngine()
        self.controller = SystemFlowController(self.engine, self.runtime)

    # -----------------------------
    # CORE TEST EXECUTION
    # -----------------------------
    def run_diff_test(self, scenario):
        """
        Executes scenario twice and compares outputs.
        """

        # First run
        result_1 = self.controller.execute(scenario)

        # Reset runtime (critical for determinism)
        self.runtime.reset()

        # Second run
        result_2 = self.controller.execute(scenario)

        # Compare deterministic outputs
        diff_report = self.compare(result_1, result_2)

        return diff_report

    # -----------------------------
    # COMPARISON ENGINE
    # -----------------------------
    def compare(self, r1, r2):
        """
        Strict structural comparison of simulation outputs.
        """

        issues = []

        if r1["simulation"]["failed_nodes"] != r2["simulation"]["failed_nodes"]:
            issues.append("CASCADE_DRIFT: failed_nodes mismatch")

        if r1["governance"]["status"] != r2["governance"]["status"]:
            issues.append("GOVERNANCE_DRIFT: status mismatch")

        if r1["scenario"] != r2["scenario"]:
            issues.append("SCENARIO_CORRUPTION: scenario mismatch")

        return {
            "deterministic": len(issues) == 0,
            "issues": issues,
            "run_1": r1,
            "run_2": r2
        }


# -----------------------------
# CLI ENTRYPOINT (USED BY CI)
# -----------------------------
if __name__ == "__main__":

    test_scenario = {
        "scenario_name": "ci_determinism_test",
        "nodes": ["A", "B", "C"],
        "dependencies": [
            {"from": "A", "to": "B"},
            {"from": "B", "to": "C"}
        ],
        "initial_failure": "A"
    }

    ci = CascadeDiffCI()
    report = ci.run_diff_test(test_scenario)

    print("\n🧪 CASCADE DIFF REPORT")
    print("=" * 40)

    print("Deterministic:", report["deterministic"])

    if report["issues"]:
        print("\n❌ Issues detected:")
        for i in report["issues"]:
            print("-", i)
        exit(1)

    print("\n✔ No drift detected — system deterministic")
