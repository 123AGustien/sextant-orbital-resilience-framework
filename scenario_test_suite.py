from mission_simulation_runtime import MissionSimulationRuntime
from scenario_engine import ScenarioEngine
from orbital_mechanics_layer import OrbitalMechanicsLayer

class ScenarioTestSuite:
    def __init__(self):
        self.runtime = MissionSimulationRuntime()
        self.mechanics = OrbitalMechanicsLayer()
        self.scenario_engine = ScenarioEngine(self.runtime, self.mechanics)

    def setup(self):
        self.runtime.build_sample_constellation()

    def run_all_tests(self):
        self.setup()

        print("\n🧪 RUNNING ORBITAL TEST SUITE")
        print("=============================")

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

        for s in scenarios:
            results.append(self.scenario_engine.run_scenario(s))

        print("\n✅ TEST SUITE COMPLETE")
        return results


if __name__ == "__main__":
    suite = ScenarioTestSuite()
    suite.run_all_tests()
