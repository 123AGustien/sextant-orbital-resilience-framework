import os

REPO_STRUCTURE = {
    "core": [
        "simulation_engine.py",
        "time_controller.py",
        "state_space.py",
        "configuration.py",
        "constants.py"
    ],
    "simulation": [
        "run_simulation.py",
        "scenario_executor.py",
        "perturbation_engine.py",
        "environment_builder.py"
    ],
    "models": [
        "cascade_model.py",
        "dependency_graph.py",
        "risk_propagation_model.py",
        "system_dynamics_model.py"
    ],
    "interfaces": [
        "ai_interpretation_layer.py",
        "decision_engine.py",
        "output_formatter.py",
        "insight_generator.py"
    ],
    "tests": [
        "test_engine.py",
        "test_cascade_model.py",
        "test_scenarios.py",
        "test_ai_layer.py"
    ],
    "examples": [
        "basic_run.py",
        "stress_test_run.py",
        "cascade_failure_demo.py"
    ],
    "docs": [
        "overview.md",
        "architecture.md",
        "simulation_model.md",
        "scenario_design.md",
        "safety_scope.md",
        "trial_manoeuvre_spec.md"
    ],
    "scenarios": [
        "base_scenario.json",
        "stress_test_scenario.json",
        "high_dependency_scenario.json",
        "space_domain_simulation.json"
    ]
}

ROOT_FILES = [
    "README.md",
    "LICENSE",
    "requirements.txt",
    ".gitignore"
]

def create_structure():
    print("Creating Sextant Protocol repository structure...\n")

    for folder, files in REPO_STRUCTURE.items():
        os.makedirs(folder, exist_ok=True)
        print(f"[OK] Folder created: {folder}")

        for file in files:
            path = os.path.join(folder, file)
            with open(path, "w") as f:
                f.write("")
            print(f"    └── {path}")

    for file in ROOT_FILES:
        with open(file, "w") as f:
            f.write("")
        print(f"[OK] Root file created: {file}")

    print("\nDone.")

if __name__ == "__main__":
    create_structure()
