# Sextant Orbital Resilience Framework
# Orchestrator: System Integration Layer

from simulation_core.cascade_model import CascadeSimulationEngine, SystemState
from governance.audit_framework import GovernanceAuditEngine


class SystemOrchestrator:

    def __init__(self):
        # Initial system state (baseline safe condition)
        self.state = SystemState(
            orbital_health=1.0,
            comms_health=1.0,
            ai_confidence=1.0,
            ground_system_health=1.0
        )

        self.simulation = CascadeSimulationEngine(self.state)
        self.governance = GovernanceAuditEngine()

    def run_scenario(self, anomaly_component: str, severity: float):
        """
        Full system execution pipeline:
        1. Inject anomaly
        2. Run cascade simulation
        3. Log governance events
        4. Evaluate system state
        """

        # Step 1 — Inject anomaly
        self.simulation.inject_anomaly(anomaly_component, severity)

        # Step 2 — Run cascade propagation
        self.simulation.propagate_cascade()

        # Step 3 — Get system report
        report = self.simulation.report()

        # Step 4 — Log simulation event
        self.governance.log_simulation(
            scenario=f"{anomaly_component}_severity_{severity}",
            result=f"risk={report['overall_risk']}"
        )

        # Step 5 — Check escalation condition
        if report["overall_risk"] < 0.5:
            self.governance.log_escalation(
                level=2,
                reason="System instability detected - human review recommended"
            )

        return report

    def trigger_human_override(self, operator: str, action: str):
        """
        Manual intervention hook
        """
        self.governance.log_human_override(operator, action)
        return "OVERRIDE_LOGGED"

    def get_audit_trail(self):
        """
        Returns full system traceability
        """
        return self.governance.export_log()
