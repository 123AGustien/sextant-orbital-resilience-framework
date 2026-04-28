from cascade_model import CascadeSimulationEngine, SystemState
from governance.audit_framework import GovernanceAuditEngine


class SystemOrchestrator:

    def __init__(self):
        self.state = SystemState(
            orbital_health=1.0,
            comms_health=1.0,
            ai_confidence=1.0,
            ground_system_health=1.0
        )

        self.simulation = CascadeSimulationEngine(self.state)
        self.governance = GovernanceAuditEngine()

    def run_scenario(self, anomaly_component: str, severity: float):

        self.simulation.inject_anomaly(anomaly_component, severity)
        self.simulation.propagate_cascade()

        report = self.simulation.report()

        self.governance.log_simulation(
            scenario=f"{anomaly_component}_severity_{severity}",
            result=f"risk={report['overall_risk']}"
        )

        # FIXED ESCALATION LOGIC
        if report["overall_risk"] >= 0.5:
            self.governance.log_escalation(
                level=2,
                reason="System instability detected - human review required"
            )

        return report

    def trigger_human_override(self, operator: str, action: str):
        self.governance.log_human_override(operator, action)
        return "OVERRIDE_LOGGED"

    def get_audit_trail(self):
        return self.governance.export_log()
