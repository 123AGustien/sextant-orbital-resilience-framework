"""
Sextant Orbital Resilience Framework
v1.2 Flow Controller (Enterprise Control Plane)

This layer introduces strict orchestration boundaries:
Scenario → Validation → Execution → Evaluation → Reporting
"""

class SystemFlowController:
    """
    Central orchestration control-plane for deterministic simulation execution.
    """

    def __init__(self, runtime, simulation_engine, scenario_engine, governance):
        self.runtime = runtime
        self.simulation_engine = simulation_engine
        self.scenario_engine = scenario_engine
        self.governance = governance

    # =========================================================
    # PUBLIC ENTRYPOINT
    # =========================================================
    def execute(self, scenario: dict) -> dict:
        """
        Executes full deterministic simulation pipeline.
        """

        self._validate_scenario(scenario)

        normalized_scenario = self.scenario_engine.prepare(scenario)

        simulation_result = self.simulation_engine.run(normalized_scenario)

        governance_result = self._evaluate(simulation_result)

        return self._build_response(
            scenario=scenario,
            simulation=simulation_result,
            governance=governance_result
        )

    # =========================================================
    # VALIDATION LAYER (PRE-FLIGHT GATE)
    # =========================================================
    def _validate_scenario(self, scenario: dict) -> None:
        if not isinstance(scenario, dict):
            raise ValueError("Scenario must be a dictionary")

        required_keys = ["nodes", "dependencies", "initial_failure"]

        for key in required_keys:
            if key not in scenario:
                raise ValueError(f"Missing required field: {key}")

    # =========================================================
    # GOVERNANCE EVALUATION LAYER
    # =========================================================
    def _evaluate(self, simulation_result: dict):
        if not self.governance:
            return {"status": "governance_disabled"}

        return self.governance.evaluate_mission_state()

    # =========================================================
    # RESPONSE BUILDER (STANDARDIZED OUTPUT CONTRACT)
    # =========================================================
    def _build_response(self, scenario, simulation, governance):
        return {
            "scenario_name": scenario.get("scenario_name"),
            "simulation": simulation,
            "governance": governance,
            "status": "completed_v1.2_flow"
        }
