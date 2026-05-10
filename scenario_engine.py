"""
Sextant Orbital Resilience Framework
Scenario Engine Layer

Generates and executes structured mission scenarios such as:
- ground station outages
- satellite failures
- network degradation events
- multi-step cascade sequences over time

This layer transforms the system from static simulation
into scenario-driven orbital mission modelling.
"""

class ScenarioEngine:
    def __init__(self, runtime, mechanics):
        """
        runtime: MissionSimulationRuntime
        mechanics: OrbitalMechanicsLayer
        """
        self.runtime = runtime
        self.mechanics = mechanics

        self.scenario_log = []

    def run_scenario(self, scenario_steps):
        """
        Executes a sequence of time-based mission events.

        scenario_steps format:
        [
            {"time": 0, "event": ("ground_outage", "GS-1")},
            {"time": 5, "event": ("satellite_failure", "SAT-1")}
        ]
        """

        results = []

        for step in scenario_steps:

            target_time = step["time"]
            event_type, node_id = step["event"]

            # Advance time to scenario event
            self.mechanics.advance_time(target_time - self.mechanics.time_step)

            # Execute event
            result = self._execute_event(event_type, node_id)

            # Evaluate system state after event
            evaluation = self.runtime.governance.evaluate_mission_state()

            results.append({
                "time": self.mechanics.time_step,
                "event": step["event"],
                "evaluation": evaluation
            })

            self.scenario_log.append(results[-1])

        return results

    def _execute_event(self, event_type, node_id):
        """
        Maps scenario event types to cascade engine actions.
        """

        if event_type == "ground_outage":
            self.runtime.cascade.simulate_ground_station_outage(node_id)

        elif event_type == "satellite_failure":
            self.runtime.cascade.simulate_satellite_failure(node_id)

        elif event_type == "link_degradation":
            self.runtime.cascade.simulate_link_degradation(node_id)

        return {
            "status": "executed",
            "event": event_type,
            "target": node_id
        }

    def get_scenario_log(self):
        """
        Returns full scenario execution history.
        """
        return self.scenario_log

    def reset(self):
        """
        Clears scenario history.
        """
        self.scenario_log = []
        self.mechanics.reset_time()
