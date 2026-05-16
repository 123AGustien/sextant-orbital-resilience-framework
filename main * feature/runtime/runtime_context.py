"""
Sextant Orbital Resilience Framework
v1.1 Runtime Context Layer

Provides a shared deterministic state container for all system modules:

- SimulationEngine
- CascadeModel
- PredictiveEngine
- FlowController
- ScenarioEngine
- Dashboard
"""

from datetime import datetime


class RuntimeContext:
    """
    Central shared system state container.

    Ensures deterministic synchronization across all framework layers.
    """

    def __init__(self):
        self.system_model = {}
        self.cascade_state = {}
        self.prediction_state = {}
        self.governance_state = {}

        self.event_log = []
        self.metadata = {
            "created_at": datetime.utcnow().isoformat(),
            "version": "v1.1"
        }

    # -----------------------------------------
    # STATE UPDATE
    # -----------------------------------------
    def update_system_model(self, model: dict):
        self.system_model = model
        self._log("system_model_updated")

    def update_cascade_state(self, state: dict):
        self.cascade_state = state
        self._log("cascade_state_updated")

    def update_prediction_state(self, state: dict):
        self.prediction_state = state
        self._log("prediction_state_updated")

    def update_governance_state(self, state: dict):
        self.governance_state = state
        self._log("governance_state_updated")

    # -----------------------------------------
    # EVENT LOGGING
    # -----------------------------------------
    def _log(self, event_type: str, data=None):
        self.event_log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "event": event_type,
            "data": data or {}
        })

    # -----------------------------------------
    # SNAPSHOT
    # -----------------------------------------
    def snapshot(self):
        return {
            "system_model": self.system_model,
            "cascade_state": self.cascade_state,
            "prediction_state": self.prediction_state,
            "governance_state": self.governance_state,
            "event_log": self.event_log,
            "metadata": self.metadata
        }
