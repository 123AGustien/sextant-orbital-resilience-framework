"""
Sextant Orbital Resilience Framework
System Flow Controller

This module orchestrates deterministic execution across
the Nine-Layer Operational Abstraction Stack.

It does NOT implement logic — it sequences existing layers.
"""

from cascade_model import OrbitalCascadeModel
from system_reconfiguration_engine import SystemReconfigurationEngine


class SystemFlowController:
    """
    Central orchestration layer for system execution flow.
    """

    def __init__(self, system_model, topology_engine=None):
        self.cascade = OrbitalCascadeModel(system_model)
        self.reconfig = SystemReconfigurationEngine(topology_engine)

    # ----------------------------------------
    # MAIN EXECUTION PIPELINE
    # ----------------------------------------
    def run_failure_event(self, node_id, failure_type="unknown"):
        """
        Executes full deterministic system response cycle.
        """

        # 1. Cascade detection phase
        self.cascade.trigger_failure(node_id, failure_type)

        # 2. Extract impact
        impact = self.cascade.get_cascade_impact()

        # 3. Reconfiguration decision
        self.reconfig.execute_reconfiguration(impact)

        return impact

    # ----------------------------------------
    # RESET SYSTEM STATE
    # ----------------------------------------
    def reset(self):
        self.cascade.reset_system()
