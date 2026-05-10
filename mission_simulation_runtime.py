"""
Sextant Orbital Resilience Framework
Mission Simulation Runtime (Orchestrator)

This module serves as the unified execution entry point for the
orbital resilience simulation stack, integrating:

- Orbital system model (nodes + dependencies)
- Cascade failure engine
- AI mission interpretation layer
- Governance decision layer

This is a deterministic simulation environment for research and
conceptual validation of orbital system resilience.
"""

from orbital_system_model import OrbitalSystemModel
from cascade_model import OrbitalCascadeModel
from ai_interpretation_layer import MissionResilienceInterpreter
from mission_governance import MissionGovernanceLayer


class MissionSimulationRuntime:
    def __init__(self):
        """
        Initialize full orbital simulation stack.
        """

        self.system = OrbitalSystemModel()
        self.cascade = OrbitalCascadeModel(self.system)
        self.interpreter = MissionResilienceInterpreter(
            self.system,
            self.cascade
        )
        self.governance = MissionGovernanceLayer(
            self.system,
            self.cascade,
            self.interpreter
        )

    def build_sample_constellation(self):
        """
        Constructs a minimal satellite constellation model
        for simulation purposes.
        """

        # Space segment
        self.system.add_node("SAT-1", "satellite")
        self.system.add_node("SAT-2", "satellite")

        # Ground segment
        self.system.add_node("GS-1", "ground_station")

        # Dependency relationships
        self.system.link_dependency("SAT-1", "GS-1")
        self.system.link_dependency("SAT-2", "GS-1")

    def run_failure_scenario(self):
        """
        Executes a controlled orbital failure scenario:

        - Simulates ground station outage
        - Triggers cascade propagation
        - Runs interpretation layer
        - Applies governance decision logic
        """

        # Trigger primary failure event
        self.cascade.simulate_ground_station_outage("GS-1")

        # Evaluate full mission state
        return self.governance.evaluate_mission_state()

    def reset(self):
        """
        Resets system state for repeatable simulation runs.
        """
        self.cascade.reset_system()


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":

    runtime = MissionSimulationRuntime()

    print("\n🛰️ Initializing Orbital Resilience Simulation...\n")

    runtime.build_sample_constellation()

    result = runtime.run_failure_scenario()

    print("🧭 MISSION SIMULATION OUTPUT")
    print("====================================")
    print(result)

    runtime.reset()

    print("\n🔄 System reset complete. Ready for next run.\n")
