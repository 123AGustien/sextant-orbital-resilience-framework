from handover_logic.orchestrator.system_orchestrator import SystemOrchestrator


def run_simulation():

    system = SystemOrchestrator()

    scenarios = [
        ("orbital_sensor", 0.3),
        ("comms_failure", 0.6),
        ("ground_system", 0.8)
    ]

    results = []

    for anomaly, severity in scenarios:

        result = system.run_scenario(anomaly, severity)
        results.append(result)

        print("\n--- SCENARIO RESULT ---")
        print(result)

    print("\n=== FINAL AUDIT ===")
    print(system.get_audit_trail())

    return results


if __name__ == "__main__":
    run_simulation()
