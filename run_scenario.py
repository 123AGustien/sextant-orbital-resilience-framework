# 🛰️ Sextant Orbital Resilience Framework
# Scenario Runner (Root Entry Point)

import json
from scenario_engine import ScenarioEngine

def main():
    print("🛰️ Starting Sextant Scenario Simulation...\n")

    engine = ScenarioEngine()

    # Load scenario from file (single source of truth)
    with open("scenarios/example_scenario.json", "r") as f:
        scenario = json.load(f)

    print("📦 Scenario Loaded")

    result = engine.run(scenario)

    print("\n📊 FINAL OUTPUT")
    print(result)

if __name__ == "__main__":
    main()
