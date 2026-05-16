from core.simulation_engine import SimulationEngine


def extract_cascade_signature(result):
    """
    Converts simulation output into a comparable cascade fingerprint.
    """

    failed = result.get("failed_nodes", [])

    return {
        "failed_nodes": tuple(sorted(failed)),
        "failure_count": len(failed),
    }


def test_cascade_diff_ci():
    engine = SimulationEngine()

    scenario = {
        "scenario_name": "cascade_diff_test",
        "nodes": ["SAT-1", "SAT-2", "SAT-3", "GS-1"],
        "dependencies": [
            {"from": "SAT-1", "to": "SAT-2"},
            {"from": "SAT-2", "to": "SAT-3"},
            {"from": "SAT-3", "to": "GS-1"}
        ],
        "initial_failure": "SAT-1"
    }

    # Run 1
    result_a = engine.run(scenario)
    sig_a = extract_cascade_signature(result_a)

    # Run 2
    result_b = engine.run(scenario)
    sig_b = extract_cascade_signature(result_b)

    assert sig_a == sig_b, (
        f"❌ CASCADE DIVERGENCE DETECTED\n"
        f"A={sig_a}\nB={sig_b}"
    )

    print("✔ Cascade Diff CI PASSED")
