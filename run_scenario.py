# 🛰️ Sextant Orbital Resilience Framework
# Scenario Runner (Root Entry Point)

from scenario_engine import ScenarioEngine

def main():
    print("🛰️ Starting Sextant Scenario Simulation...\n")

    engine = ScenarioEngine()

    # Load default or test scenario
    scenario = engine.load_default_scenario()

    print("📦 Scenario Loaded")
    
    result = engine.run(scenario)

    print("\n📊 FINAL OUTPUT")
    print(result)

if __name__ == "__main__":
    main()
