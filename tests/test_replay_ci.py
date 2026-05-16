import json
from core.simulation_engine import SimulationEngine


def run_once(engine, scenario):
    result = engine.run(scenario)
    return json.dumps(result, sort_keys=True)


def test_replay_determinism():
    engine1 = SimulationEngine()
    engine2 = SimulationEngine()

    scenario = {
        "scenario_name": "replay_test",
        "nodes": ["SAT-1", "SAT-2", "GS-1"],
        "dependencies": [
            {"from": "SAT-1", "to": "SAT-2"},
            {"from": "SAT-2", "to": "GS-1"}
        ],
        "initial_failure": "SAT-1"
    }

    output_1 = run_once(engine1, scenario)
    output_2 = run_once(engine2, scenario)

    assert output_1 == output_2, "❌ NON-DETERMINISTIC BEHAVIOR DETECTED"

    print("✔ Replay CI deterministic check PASSED")
