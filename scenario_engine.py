"""
Sextant Orbital Resilience Framework
Scenario Engine Layer

Generates and executes structured mission scenarios such as:
- ground station outages
- satellite failures
- network degradation events
- multi-step cascade sequences over time
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

    # -----------------------------------
    # MAIN SCENARIO EXECUTION LOOP
    # -----------------------------------
    def run_scenario(self, scenario_steps):
        results = []

        for step in scenario_steps:

            target_time = step["time"]
            event_type, node_id = step["event"]

            # Advance simulation time
            self.mechanics.advance_time(
                target_time - self.mechanics.time_step
            )

            # Execute event safely
            result = self._execute_event(event_type, node_id)

            # Evaluate system state AFTER event (guarded)
            evaluation = None
            if hasattr(self.runtime, "governance") and self.runtime.governance:
                evaluation = self.runtime.governance.evaluate_mission_state()

            results.append({
                "time": self.mechanics.time_step,
                "event": step["event"],
                "execution": result,
                "evaluation": evaluation
            })

            self.scenario_log.append(results[-1])

        return results

    # -----------------------------------
    # EVENT EXECUTOR (SAFE GUARDED)
    # -----------------------------------
    def _execute_event(self, event_type, node_id):
        """
        Maps scenario event types to cascade engine actions.
        """

        cascade = getattr(self.runtime, "cascade", None)

        if not cascade:
            return {
                "status": "skipped",
                "reason": "cascade_not_initialized",
                "event": event_type,
                "target": node_id
            }

        if event_type == "ground_outage":
            cascade.simulate_ground_station_outage(node_id)

        elif event_type == "satellite_failure":
            cascade.simulate_satellite_failure(node_id)

        elif event_type == "link_degradation":
            cascade.simulate_link_degradation(node_id)

        return {
            "status": "executed",
            "event": event_type,
            "target": node_id
        }

    # -----------------------------------
    # LOGGING
    # -----------------------------------
    def get_scenario_log(self):
        return self.scenario_log

    # -----------------------------------
    # RESET
    # -----------------------------------
    def reset(self):
        self.scenario_log = []
        self.mechanics.reset_time()
