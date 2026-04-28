import json
from orchestrator.system_orchestrator import SystemOrchestrator


def load_scenarios(file_path="scenarios.json"):
    with open(file_path, "r") as f:
        return json.load(f)


def main():

    orchestrator = SystemOrchestrator()
    scenarios = load_scenarios()

    print("\n=== SEXTANT ORBITAL RESILIENCE SIMULATION ===\n")

    for scenario in scenarios:

        anomaly = scenario["anomaly_component"]
        severity = scenario["severity"]

        print(f"Running scenario: {anomaly} | severity: {severity}")

        report = orchestrator.run_scenario(anomaly, severity)

        print("Result:", report)
        print("-" * 50)


if __name__ == "__main__":
    main()
