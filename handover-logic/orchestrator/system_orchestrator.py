# Sextant Orbital Resilience Framework
# System Orchestrator: Integration Layer

from handover_logic.simulation_core.cascade_model import CascadeSimulationEngine, SystemState
from handover_logic.governance.audit_framework import GovernanceAuditEngine


class SystemOrchestrator:

    def __init__(self):
        # Initial safe system state
        self.state = SystemState(
            orbital_health=1.0,
            comms_health=1.0,
            ai_confidence=1.0,
            ground_system_health=1.0
        )

        # Core engines
        self.simulation = CascadeSimulationEngine(self.state)
        self.governance = GovernanceAuditEngine()

    def run_scenario(self, anomaly_component: str, severity: float):
        """
        1. Inject anomaly
        2. Run cascade simulation
        3. Generate system report
        4. Log governance event
        5. Evaluate risk state
        """

        # Step 1: Inject anomaly
        self.simulation.inject_anomaly(anomaly_component, severity)

        # Step 2: Propagate cascade effects
        self.simulation.propagate_cascade()

        # Step 3: Generate report
        report = self.simulation.report()

        # Step 4: Log simulation result
        self.governance.log_simulation(
            scenario=f"{anomaly_component}_severity_{severity}",
            result=f"risk={report['overall_risk']}"
        )

        # Step 5: Escalation logic (fixed)
        if report["overall_risk"] >= 0.5:
            self.governance.log_escalation(
                level=2,
                reason="System instability detected - human review required"
            )

        return report

    def trigger_human_override(self, operator: str, action: str):
        """
        Manual override interface
        """
        self.governance.log_human_override(operator, action)
        return "OVERRIDE_LOGGED"

    def get_audit_trail(self):
        """
        Returns full system audit log
        """
        return self.governance.export_log()
