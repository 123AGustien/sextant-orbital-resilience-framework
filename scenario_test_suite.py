from mission_simulation_runtime import MissionSimulationRuntime
from scenario_engine import ScenarioEngine
from orbital_mechanics_layer import OrbitalMechanicsLayer

import json
from datetime import datetime


class ScenarioTestSuite:
    """
    Sextant Orbital Resilience Framework
    Scenario Validation Test Suite

    Executes deterministic multi-scenario system validation runs.
    """

    def __init__(self):
        self.runtime = MissionSimulationRuntime()
        self.mechanics = OrbitalMechanicsLayer()
        self.scenario_engine = ScenarioEngine(self.runtime, self.mechanics)

    # ----------------------------------------
    # SYSTEM INITIALISATION
    # ----------------------------------------
    def setup(self):
        self.runtime.build_sample_constellation()

    # ----------------------------------------
    # MAIN TEST EXECUTION
    # ----------------------------------------
    def run_all_tests(self):
        self.setup()

        print("\n🧪 RUNNING ORBITAL TEST SUITE")
        print("=" * 40)

        scenarios = [
            [{"time": 0, "event": ("ground_outage", "GS-1")}],

            [
                {"time": 0, "event": ("satellite_failure", "SAT-1")},
                {"time": 5, "event": ("satellite_failure", "SAT-2")}
            ],

            [
                {"time": 0, "event": ("ground_outage", "GS-1")},
                {"time": 3, "event": ("link_degradation", "SAT-1")}
            ]
        ]

        results = []

        # ----------------------------------------
        # SCENARIO EXECUTION LOOP
        # ----------------------------------------
        for scenario in scenarios:
            result = self.scenario_engine.run_scenario(scenario)
            results.append(result)

        # ----------------------------------------
        # ARTIFACT GENERATION
        # ----------------------------------------
        report = {
            "timestamp": datetime.utcnow().isoformat(),
            "system": "Sextant Orbital Resilience Framework v1.1",
            "scenario_count": len(scenarios),
            "results": results
        }

        # ----------------------------------------
        # SAVE REPORT (deterministic artifact)
        # ----------------------------------------
        with open("mission_report.json", "w") as f:
            json.dump(report, f, indent=2)

        print("\n✅ TEST SUITE COMPLETE - REPORT GENERATED")

        return results


# ----------------------------------------
# ENTRY POINT
# ----------------------------------------
if __name__ == "__main__":
    suite = ScenarioTestSuite()
    suite.run_all_tests()
