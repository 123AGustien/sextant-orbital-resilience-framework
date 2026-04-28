# Sextant Orbital Resilience Framework
# Demo Runner: End-to-End System Execution

from orchestrator.system_orchestrator import SystemOrchestrator


def main():
    print("\n🛰 Sextant Orbital Resilience Framework - DEMO RUN\n")

    system = SystemOrchestrator()

    # -----------------------------
    # Step 1: Inject Scenario
    # -----------------------------
    print("Injecting anomaly into orbital subsystem...\n")

    result = system.run_scenario(
        anomaly_component="orbital",
        severity=0.7
    )

    # -----------------------------
    # Step 2: Output Simulation Result
    # -----------------------------
    print("📊 SYSTEM STATE REPORT")
    print("--------------------------------")

    for k, v in result.items():
        print(f"{k}: {v}")

    # -----------------------------
    # Step 3: Simulate Human Override
    # -----------------------------
    print("\n👤 Triggering Human Override...\n")

    system.trigger_human_override(
        operator="Mission_Controller_01",
        action="Reduce orbital load / initiate safe mode"
    )

    # -----------------------------
    # Step 4: Audit Trail Output
    # -----------------------------
    print("\n🧾 GOVERNANCE AUDIT TRAIL")
    print("--------------------------------")

    audit = system.get_audit_trail()

    for entry in audit:
        print(entry)

    print("\n✅ DEMO COMPLETE - SYSTEM EXECUTION SUCCESSFUL\n")


if __name__ == "__main__":
    main()
