# Sextant Orbital Resilience Framework
# Trigger Layer: System Entry Control

from handover_logic.orchestrator.system_orchestrator import SystemOrchestrator


class TriggerLayer:

    def __init__(self):
        self.system = SystemOrchestrator()

    def run_default_scenarios(self):
        """
        Executes predefined baseline test scenarios
        """

        scenarios = [
            ("orbital_sensor", 0.3),
            ("comms_failure", 0.6),
            ("ground_system", 0.8)
        ]

        results = []

        for anomaly, severity in scenarios:
            result = self.system.run_scenario(anomaly, severity)
            results.append(result)

            print("\n--- SCENARIO RESULT ---")
            print(result)

        print("\n=== FINAL AUDIT ===")
        print(self.system.get_audit_trail())

        return results

    def run_single_scenario(self, anomaly: str, severity: float):
        """
        Manual trigger for one scenario
        """
        return self.system.run_scenario(anomaly, severity)

    def get_system_audit(self):
        """
        Returns full audit log
        """
        return self.system.get_audit_trail()
