import json
from datetime import datetime
from cascade_model import CascadeModel


class SimulationEngine:
    """
    Core deterministic simulation engine for the Sextant Orbital Resilience Framework.
    Handles scenario loading, execution loop, and event trace generation.
    """

    def __init__(self):
        self.state = {}
        self.scenario = {}
        self.event_log = []
        self.cascade_model = None

    # ----------------------------
    # SCENARIO LOADING
    # ----------------------------
    def load_scenario(self, filepath: str):
        """Load and initialize scenario from JSON file"""
        with open(filepath, "r") as f:
            self.scenario = json.load(f)

        self.state = self.scenario.get("system_state", {})

        dependencies = self.state.get("dependencies", {})
        self.cascade_model = CascadeModel(dependencies)

        self._log_event("scenario_loaded", "Scenario successfully loaded and initialized")

    # ----------------------------
    # EVENT LOGGING
    # ----------------------------
    def _log_event(self, event_type: str, description: str):
        self.event_log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": event_type,
            "description": description
        })

    # ----------------------------
    # SIMULATION STEP
    # ----------------------------
    def step(self, t: int):
        """
        Single deterministic simulation step.
        Future extensions: AI interpretation + advanced system dynamics.
        """

        nodes = self.state.get("nodes", [])

        # Minimal cascade injection (time-triggered example)
        if t == 0 and nodes and self.cascade_model:
            failed_node = nodes[-1]

            affected_nodes = self.cascade_model.propagate_failure(failed_node)

            self._log_event(
                "cascade_triggered",
                f"Failure injected at {failed_node}, affected nodes: {affected_nodes}"
            )

        self._log_event("step", f"Simulation step {t} executed")

    # ----------------------------
    # RUN SIMULATION
    # ----------------------------
    def run(self):
        """Execute full simulation lifecycle"""

        duration = self.scenario.get("environment", {}).get("duration", 0)

        self._log_event("start", "Simulation started")

        for t in range(duration):
            self.step(t)

        self._log_event("end", "Simulation completed")

        return {
            "final_state": self.state,
            "event_log": self.event_log
        }


# ----------------------------
# EXECUTION ENTRY POINT
# ----------------------------
if __name__ == "__main__":

    engine = SimulationEngine()

    engine.load_scenario("scenarios/baseline_scenario.json")

    result = engine.run()

    print(json.dumps(result, indent=2))
