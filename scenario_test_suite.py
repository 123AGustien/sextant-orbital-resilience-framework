"""
Sextant Orbital Resilience Framework
Scenario Test Suite

Runs predefined mission scenarios to validate:
- cascade propagation correctness
- governance decisions
- system stability under multiple failure conditions
"""

from mission_simulation_runtime import MissionSimulationRuntime
from scenario_engine import ScenarioEngine
from orbital_mechanics_layer import OrbitalMechanicsLayer


class ScenarioTestSuite:
    def __init__(self):
        self.runtime = MissionSimulationRuntime()
        self.mechanics = OrbitalMechanicsLayer()
        self.scenario_engine = ScenarioEngine(self.runtime, self.mechanics)

    def setup(self):
        """
        Initializes baseline constellation for all tests.
        """
        self.runtime.build_sample_constellation()

    def test_ground_station_failure(self):
        """
        Scenario 1: Single ground station outage
        """
        scenario = [
            {"time": 0, "event": ("ground_outage", "GS-1")}
        ]

        return self.scenario_engine.run_scenario(scenario)

    def test_satellite_failure_chain(self):
        """
        Scenario 2: Satellite failure cascade
        """
        scenario = [
            {"time": 0, "event": ("satellite_failure", "SAT-1")},
            {"time": 5, "event": ("satellite_failure", "SAT-2")}
        ]

        return self.scenario_engine.run_scenario(scenario)

    def test_mixed_failure_scenario(self):
        """
        Scenario 3: Mixed orbital disruption
        """
        scenario = [
            {"time": 0, "event": ("ground_outage", "GS-1")},
            {"time": 3, "event": ("link_degradation", "SAT-1")},
            {"time": 6, "event": ("satellite_failure", "SAT-2")}
        ]

        return self.scenario_engine.run_scenario(scenario)

    def run_all_tests(self):
        """
        Executes full regression suite.
        """
        self.setup()

        print("\n🧪 RUNNING ORBITAL RESILIENCE TEST SUITE")
        print("========================================")

        results = {
            "ground_station_failure": self.test_ground_station_failure(),
            "satellite_failure_chain": self.test_satellite_failure_chain(),
            "mixed_failure_scenario": self.test_mixed_failure_scenario()
        }

        print("\n✅ TEST SUITE COMPLETE")
        return results


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":

    suite = ScenarioTestSuite()
    results = suite.run_all_tests()

    print("\n📊 TEST RESULTS SUMMARY")
    print("========================")
    print(results)
