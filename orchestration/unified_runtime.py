"""
Sextant Orbital Resilience Framework
v1.1 Unified Runtime

Single entrypoint that bootstraps:

- RuntimeContext
- SimulationEngine
- CascadeModel
- PredictiveEngine
- ScenarioEngine
- SystemFlowController
- Observability layer
"""

from runtime.runtime_context import RuntimeContext
from orchestration.system_flow_controller import SystemFlowController


class UnifiedRuntime:
    """
    Master bootstrapper for full deterministic system execution.
    """

    def __init__(self):
        self.runtime = RuntimeContext()
        self.flow = SystemFlowController(self.runtime)

        # injected modules
        self.simulation = None
        self.cascade = None
        self.predictor = None
        self.governance = None
        self.scenario_engine = None
        self.audit = None

    # -----------------------------------------
    # MODULE REGISTRATION
    # -----------------------------------------
    def register_simulation(self, simulation_engine):
        self.simulation = simulation_engine
        self.flow.attach_simulation(simulation_engine)

    def register_cascade(self, cascade_model):
        self.cascade = cascade_model
        self.flow.attach_cascade(cascade_model)

    def register_predictor(self, predictor):
        self.predictor = predictor
        self.flow.attach_predictor(predictor)

    def register_governance(self, governance):
        self.governance = governance
        self.flow.attach_governance(governance)

    def register_audit(self, audit_logger):
        self.audit = audit_logger
        self.flow.attach_audit(audit_logger)

    def register_scenario_engine(self, scenario_engine):
        self.scenario_engine = scenario_engine

    # -----------------------------------------
    # BOOT SEQUENCE
    # -----------------------------------------
    def bootstrap(self):
        """
        Initializes system into deterministic runtime mode.
        """

        print("\n🛰️ Sextant v1.1 Unified Runtime Booting...")
        print("=========================================")

        if self.simulation:
            print("✔ Simulation Engine attached")

        if self.cascade:
            print("✔ Cascade Model attached")

        if self.predictor:
            print("✔ Predictive Engine attached")

        if self.governance:
            print("✔ Governance Layer attached")

        if self.audit:
            print("✔ Audit Logger attached")

        print("✔ Flow Controller active")
        print("✔ Runtime Context initialized")

        return "BOOT_COMPLETE"

    # -----------------------------------------
    # RUN SYSTEM
    # -----------------------------------------
    def run(self, duration: int = 10):
        """
        Executes full system lifecycle.
        """

        self.bootstrap()

        print("\n🚀 Running deterministic orchestration...\n")

        result = self.flow.run(duration)

        print("\n✅ System execution complete")

        return result


# -----------------------------------------
# ENTRY POINT
# -----------------------------------------
if __name__ == "__main__":

    runtime = UnifiedRuntime()

    # NOTE: in real setup these would be injected
    print("⚠ Modules not attached — runtime in scaffold mode")

    runtime.run(5)
