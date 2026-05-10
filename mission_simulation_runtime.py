"""
Sextant Orbital Resilience Framework
Mission Simulation Runtime Layer

Provides deterministic scenario execution wrapper for cascade simulation.
"""

class MissionSimulationRuntime:
    def __init__(self, cascade_model=None):
        self.cascade = cascade_model
        self.state = {}
        self.results = {}

    # ---------------------------------
    # SCENARIO EXECUTION ENTRY POINT
    # ---------------------------------
    def run_scenario(self, scenario: dict):
        """
        Executes a scenario in deterministic mode.
        """

        self.state = scenario.get("system_state", {})

        events = scenario.get("events", [])

        for event in events:
            self._execute_event(event)

        return {
            "final_state": self.state,
            "results": self.results
        }

    # ---------------------------------
    # EVENT HANDLER
    # ---------------------------------
    def _execute_event(self, event: dict):
        event_type = event.get("type")
        node_id = event.get("node_id")

        if not self.cascade:
            return

        if event_type == "ground_outage":
            self.cascade.simulate_ground_station_outage(node_id)

        elif event_type == "satellite_failure":
            self.cascade.simulate_satellite_failure(node_id)

        elif event_type == "link_degradation":
            self.cascade.simulate_link_degradation(node_id)

    # ---------------------------------
    # OPTIONAL RESET
    # ---------------------------------
    def reset(self):
        self.state = {}
        self.results = {}
