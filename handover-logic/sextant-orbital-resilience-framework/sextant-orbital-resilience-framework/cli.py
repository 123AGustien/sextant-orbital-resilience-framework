# Sextant Orbital Resilience Framework
# CLI Interface: Operational Control Mode

from orchestrator.system_orchestrator import SystemOrchestrator


def print_header():
    print("\n🛰 SEXTANT ORBITAL RESILIENCE FRAMEWORK - CLI MODE")
    print("----------------------------------------------------\n")


def get_input():
    print("Select anomaly component:")
    print("1 - orbital")
    print("2 - comms")
    print("3 - ai")
    print("4 - ground\n")

    choice = input("Enter choice (1-4): ")

    mapping = {
        "1": "orbital",
        "2": "comms",
        "3": "ai",
        "4": "ground"
    }

    component = mapping.get(choice, "orbital")

    severity = float(input("Enter severity (0.0 - 1.0): "))

    return component, severity


def main():

    print_header()

    system = SystemOrchestrator()

    component, severity = get_input()

    print(f"\n⚠ Running scenario: {component} | severity={severity}\n")

    # Run simulation
    result = system.run_scenario(component, severity)

    # Output system state
    print("\n📊 SYSTEM REPORT")
    print("--------------------------------")

    for k, v in result.items():
        print(f"{k}: {v}")

    # Ask for human override
    print("\n👤 Human Override Check")
    decision = input("Trigger override? (y/n): ")

    if decision.lower() == "y":
        operator = input("Operator ID: ")
        action = input("Action: ")

        system.trigger_human_override(operator, action)

        print("\n✅ Override logged successfully")

    # Final audit output
    print("\n🧾 GOVERNANCE AUDIT SUMMARY")
    print("--------------------------------")

    audit = system.get_audit_trail()

    for entry in audit:
        print(entry)

    print("\n🔚 SESSION COMPLETE\n")


if __name__ == "__main__":
    main()
