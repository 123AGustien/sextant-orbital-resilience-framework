from orchestrator.system_orchestrator import SystemOrchestrator

def main():

    system = SystemOrchestrator()

    # Example scenario injection
    result = system.run_scenario(
        anomaly_component="orbital_sensor",
        severity=0.7
    )

    print("\n=== SYSTEM OUTPUT ===")
    print(result)

    # Audit trail check
    audit = system.get_audit_trail()

    print("\n=== AUDIT LOG ===")
    print(audit)


if __name__ == "__main__":
    main()
