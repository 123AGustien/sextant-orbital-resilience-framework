"""
Sextant Orbital Resilience Framework
v1.2 Runtime Bridge Layer

This layer connects Flow Controller ↔ Unified Runtime.
It ensures all orchestration writes are deterministic and traceable.
"""

class UnifiedRuntimeBridge:
    """
    Bridge between orchestration and runtime state system.
    """

    def __init__(self, runtime):
        self.runtime = runtime

    # -----------------------------
    # SCENARIO BINDING
    # -----------------------------
    def bind_scenario(self, scenario_name: str):
        self.runtime.update("last_scenario", scenario_name)
        self.runtime.tick()

    # -----------------------------
    # RESULT COMMIT
    # -----------------------------
    def commit_result(self, result: dict):
        self.runtime.update("last_result", result)
        self.runtime.update("status", "completed")

    # -----------------------------
    # SNAPSHOT HOOK (CI USE)
    # -----------------------------
    def snapshot(self):
        return self.runtime.snapshot()
