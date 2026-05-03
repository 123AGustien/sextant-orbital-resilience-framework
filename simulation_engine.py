
import json
from datetime import datetime
from cascade_model import CascadeModel


class SimulationEngine:
    """
    Core deterministic simulation engine for the Sextant Orbital Resilience Framework.

    Responsibilities:
    - Scenario loading and initialization
    - Deterministic execution loop
    - Event trace generation
    - Cascade failure injection (simulation-level)
    """

    def __init__(self):
        self.state = {}
        self.scenario = {}
        self.event_log = []
        self.cascade_model = None

    # -------------------------------------------------
    # SCENARIO LOADING
    # -------------------------------------------------
    def load_scenario(self, filepath: str):
        """
        Load and initialise simulation scenario from JSON file.
        """

        with open(filepath, "r") as f:
            self.scenario = json.load(f)

        self.state = self.scenario.get("system_state", {})

        dependencies = self.state.get("dependencies", {})

        self.cascade_model = CascadeModel(dependencies)

        self._log_event(
            "scenario_loaded",
            "Scenario successfully loaded and cascade model initialised"
        )

    # -------------------------------------------------
    # EVENT LOGGING
    # -------------------------------------------------
    def _log_event(self, event_type: str, description: str):
        """
        Appends structured event entry to simulation trace.
        """

        self.event_log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": event_type,
            "description": description
        })

    # -------------------------------------------------
    # SIMULATION STEP
    # -------------------------------------------------
    def step(self, t: int):
        """
        Single deterministic simulation step.

        Handles:
        - Cascade injection (t = 0)
        - Event logging
        """

        nodes = self.state.get("nodes", [])

        # -------------------------
        # CASCADE INJECTION (t=0 only)
        # -------------------------
        if t == 0 and nodes and self.cascade_model:
            failed_node = nodes[-1]

            affected_nodes = self.cascade_model.propagate_failure(failed_node)

            self._log_event(
                "cascade_triggered",
                f"Failure injected at {failed_node}; affected nodes: {affected_nodes}"
            )

        # -------------------------
        # STANDARD STEP EVENT
        # -------------------------
        self._log_event(
            "step",
            f"Simulation step {t} executed"
        )

    # -------------------------------------------------
    # SIMULATION EXECUTION
    # -------------------------------------------------
    def run(self):
        """
        Executes full deterministic simulation lifecycle.

        Returns:
        - final system state
        - event log for downstream analysis
        """

        duration = self.scenario.get("environment", {}).get("duration", 0)

        self._log_event("start", "Simulation lifecycle initiated")

        for t in range(duration):
            self.step(t)

        self._log_event("end", "Simulation lifecycle completed")

        return {
            "execution_metadata": {
                "duration": duration,
                "steps_executed": duration
            },
            "final_state": self.state,
            "event_log": self.event_log
        }


# -------------------------------------------------
# EXECUTION ENTRY POINT (LOCAL TESTING ONLY)
# -------------------------------------------------
if __name__ == "__main__":

    engine = SimulationEngine()

    engine.load_scenario("scenarios/baseline_scenario.json")

    result = engine.run()

    print(json.dumps(result, indent=2))
