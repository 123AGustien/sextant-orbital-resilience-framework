from cascade_model import CascadeSimulationEngine, SystemState
from governance.audit_framework import GovernanceAuditEngine


class SystemOrchestrator:

    def __init__(self):
        # 🛰 Initial orbital system state (baseline safe condition)
        self.state = SystemState(
            orbital_health=1.0,
            comms_health=1.0,
            ai_confidence=1.0,
            ground_system_health=1.0
        )

        # Core engines
        self.simulation = CascadeSimulationEngine(self.state)
        self.governance = GovernanceAuditEngine()

    # -----------------------------
    # 🧭 MAIN EXECUTION PIPELINE
    # -----------------------------
    def run_scenario(self, anomaly_component: str, severity: float):

        # Step 1 — Inject anomaly into system
        self.simulation.inject_anomaly(anomaly_component, severity)

        # Step 2 — Cascade propagation simulation
        self.simulation.propagate_cascade()

        # Step 3 — System-wide risk report
        report = self.simulation.report()

        # Step 4 — Governance logging (traceability layer)
        self.governance.log_simulation(
            scenario=f"{anomaly_component}_severity_{severity}",
            result=f"risk={report['overall_risk']}"
        )

        # Step 5 — Escalation logic (human-in-loop trigger)
        if report["overall_risk"] >= 0.5:
            self.governance.log_escalation(
                level=2,
                reason="System instability detected - human review required"
            )

        return report

    # -----------------------------
    # 🧑‍🚀 HUMAN OVERRIDE LAYER
    # -----------------------------
    def trigger_human_override(self, operator: str, action: str):

        self.governance.log_human_override(operator, action)

        return {
            "status": "OVERRIDE_LOGGED",
            "operator": operator,
            "action": action
        }

    # -----------------------------
    # 📊 AUDIT EXPORT LAYER
    # -----------------------------
    def get_audit_trail(self):

        return self.governance.export_log()

    # -----------------------------
    # 🛰 OPTIONAL: SCENARIO ENTRY POINT (for GitHub demo)
    # -----------------------------
    def execute_from_scenario(self, scenario: dict):

        anomaly = scenario.get("anomaly_component", "unknown")
        severity = scenario.get("severity", 0.0)

        return self.run_scenario(anomaly, severity)
