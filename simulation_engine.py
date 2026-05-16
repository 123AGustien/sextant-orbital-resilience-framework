import json
from datetime import datetime

from cascade_model import OrbitalCascadeModel
from predictive_cascade_engine import PredictiveCascadeEngine


class SimulationEngine:
    """
    Core deterministic simulation engine for Sextant Orbital Resilience Framework.

    Integrates:
    - Cascade propagation model
    - Predictive risk engine
    - Deterministic event trace logging
    """

    def __init__(self):
        self.state = {}
        self.scenario = {}
        self.event_log = []

        self.cascade_model = None
        self.predictor = None

    # -------------------------------------------------
    # SCENARIO LOADING
    # -------------------------------------------------
    def load_scenario(self, filepath: str):
        with open(filepath, "r") as f:
            self.scenario = json.load(f)

        self.state = self.scenario.get("system_state", {})

        system_model = self.state.get("nodes", {})

        self.cascade_model = OrbitalCascadeModel(system_model)
        self.predictor = PredictiveCascadeEngine(system_model)

        self._log_event(
            "scenario_loaded",
            "Scenario loaded with cascade + predictive engines initialised"
        )

    # -------------------------------------------------
    # EVENT LOGGING
    # -------------------------------------------------
    def _log_event(self, event_type: str, description: str, data=None):
        self.event_log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": event_type,
            "description": description,
            "data": data if data is not None else {}
        })

    # -------------------------------------------------
    # SIMULATION STEP
    # -------------------------------------------------
    def step(self, t: int):
        nodes = self.state.get("nodes", {})

        # -------------------------
        # 🧠 PREDICTION PHASE
        # -------------------------
        prediction = self.predictor.identify_critical_nodes()

        self._log_event(
            "prediction",
            f"Risk evaluation at step {t}",
            prediction
        )

        # -------------------------
        # CASCADE INJECTION (t=0 only)
        # -------------------------
        if t == 0 and nodes and self.cascade_model:
            failed_node = list(nodes.keys())[-1]

            self.cascade_model.trigger_failure(
                failed_node,
                "simulation_injection"
            )

            self._log_event(
                "cascade_triggered",
                f"Failure injected at {failed_node}"
            )

        # -------------------------
        # STEP EVENT
        # -------------------------
        self._log_event(
            "step",
            f"Simulation step {t} executed"
        )

    # -------------------------------------------------
    # SIMULATION EXECUTION
    # -------------------------------------------------
    def run(self):
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
# ENTRY POINT (SAFE LOCAL EXECUTION ONLY)
# -------------------------------------------------
if __name__ == "__main__":
    engine = SimulationEngine()

    engine.load_scenario("scenarios/baseline_scenario.json")

    result = engine.run()

    print(json.dumps(result, indent=2))
