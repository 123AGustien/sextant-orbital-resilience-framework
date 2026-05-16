
Sextant Orbital Resilience Framework
v1.2 Unified Runtime Context (Root Level Control State)

This is the single source of truth for system-wide runtime state.
"""

class UnifiedRuntime:
    """
    Central deterministic state container for orchestration + simulation layers.
    """

    def __init__(self):
        self.system = None
        self.cascade = None
        self.governance = None

        self.state = {
            "cycle": 0,
            "status": "initialized",
            "last_scenario": None,
            "last_result": None
        }

    # -----------------------------
    # REGISTRATION HOOKS
    # -----------------------------
    def register_system(self, system):
        self.system = system

    def register_cascade(self, cascade):
        self.cascade = cascade

    def register_governance(self, governance):
        self.governance = governance

    # -----------------------------
    # STATE CONTROL
    # -----------------------------
    def update(self, key, value):
        self.state[key] = value

    def tick(self):
        self.state["cycle"] += 1

    # -----------------------------
    # SNAPSHOT (CI + DEBUG CORE)
    # -----------------------------
    def snapshot(self):
        return {
            "system": self.system.get_system_state() if self.system else None,
            "cascade": self.cascade.get_cascade_impact() if self.cascade else None,
            "governance": (
                self.governance.evaluate_mission_state()
                if self.governance else None
            ),
            "runtime": self.state
        }

    # -----------------------------
    # RESET (REPLAY SAFE MODE)
    # -----------------------------
    def reset(self):
        self.state = {
            "cycle": 0,
            "status": "reset",
            "last_scenario": None,
            "last_result": None
        }
