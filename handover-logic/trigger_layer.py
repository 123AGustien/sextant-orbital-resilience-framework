# Sextant Orbital Resilience Framework
# Trigger Layer: System Entry Controller

from orchestrator.system_orchestrator import SystemOrchestrator


class TriggerLayer:
    """
    Central execution layer responsible for triggering
    simulation scenarios and retrieving system audit data.
    """

    def __init__(self):
        self.system = SystemOrchestrator()

    def run_default_scenarios(self):
        """
        Execute a predefined set of baseline simulation scenarios.
        """

        scenarios = [
            ("orbital_sensor", 0.3),
            ("comms_failure", 0.6),
            ("ground_system", 0.8),
        ]

        results = []

        for anomaly, severity in scenarios:
            result = self.system.run_scenario(anomaly, severity)
            results.append(result)

            print("\n--- SCENARIO RESULT ---")
            print(result)

        print("\n=== FINAL AUDIT TRAIL ===")
        print(self.system.get_audit_trail())

        return results

    def run_single_scenario(self, anomaly: str, severity: float):
        """
        Execute a single simulation scenario manually.
        """
        return self.system.run_scenario(anomaly, severity)

    def get_system_audit(self):
        """
        Retrieve the complete governance audit log.
        """
        return self.system.get_audit_trail()
