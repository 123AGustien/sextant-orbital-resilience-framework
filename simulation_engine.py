import json

def load_scenarios(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

def run_simulation(scenarios):
    results = []

    for scenario in scenarios.get("scenarios", []):
        result = {
            "id": scenario.get("id"),
            "status": "simulated",
            "risk_score": scenario.get("risk_score", 0),
            "notes": "baseline propagation model"
        }
        results.append(result)

    return results


if __name__ == "__main__":
    base = load_scenarios("scenarios.json")

    output = run_simulation(base)

    print(json.dumps(output, indent=2))
