from mission_simulation_runtime import MissionSimulationRuntime
from scenario_engine import ScenarioEngine
from orbital_mechanics_layer import OrbitalMechanicsLayer

class MissionOrchestrator:
    """
    Single control plane for Sextant Orbital Resilience Framework
    """

    def __init__(self):
        self.runtime = MissionSimulationRuntime()
        self.mechanics = OrbitalMechanicsLayer()
        self.engine = ScenarioEngine(self.runtime, self.mechanics)

    def run_mission(self):
        """
        Single entry point for all simulations.
        """

        self.runtime.build_sample_constellation()

        scenarios = [
            [{"time": 0, "event": ("ground_outage", "GS-1")}],
            [
                {"time": 0, "event": ("satellite_failure", "SAT-1")},
                {"time": 5, "event": ("satellite_failure", "SAT-2")}
            ]
        ]

        all_results = []

        for s in scenarios:
            result = self.engine.run_scenario(s)
            all_results.append(result)

        print("\n🛰️ MISSION COMPLETE")
        return all_results


if __name__ == "__main__":
    orchestrator = MissionOrchestrator()
    orchestrator.run_mission()
