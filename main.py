from core.engine import SimulationEngine


def main():
    print("🛰️ Sextant Orbital Resilience Framework Starting...\n")

    engine = SimulationEngine()

    # Example deterministic scenario
    scenario = {
        "scenario_name": "baseline_cascade_test",
        "nodes": ["A", "B", "C", "D"],
        "dependencies": [
            {"from": "B", "to": "A"},
            {"from": "C", "to": "B"},
            {"from": "D", "to": "C"}
        ],
        "initial_failure": "A"
    }

    result = engine.run(scenario)

    print("\n📊 SIMULATION RESULT")
    print("====================")
    print(result)


if __name__ == "__main__":
    main()
