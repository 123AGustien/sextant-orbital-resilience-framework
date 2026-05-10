"""
Sextant Orbital Resilience Framework
Orbital Dependency Cascade Model

Simulates failure propagation across satellite constellations,
ground infrastructure, and communication networks.
"""

class OrbitalCascadeModel:
    def __init__(self, system_model):
        """
        system_model: OrbitalSystemModel instance
        """
        self.system = system_model

    def trigger_failure(self, node_id, failure_type="unknown"):
        """
        Marks a node as failed and triggers cascade propagation.
        """
        if node_id not in self.system.nodes:
            return

        node = self.system.nodes[node_id]
        node.set_status(f"failed:{failure_type}")

        # Start cascade propagation
        self._propagate_failure(node)

    def _propagate_failure(self, failed_node):
        """
        Propagates failure through dependency graph.
        """
        for node in self.system.nodes.values():

            # If this node depends on the failed node
            if failed_node in node.dependencies:

                # Only propagate if not already failed
                if not node.status.startswith("failed"):
                    node.set_status("degraded:cascade")

                    # Continue cascading recursively
                    self._propagate_failure(node)

    def simulate_ground_station_outage(self, station_id):
        """
        Simulates loss of a ground station and its systemic impact.
        """
        self.trigger_failure(station_id, "ground_outage")

    def simulate_satellite_failure(self, satellite_id):
        """
        Simulates onboard satellite failure.
        """
        self.trigger_failure(satellite_id, "satellite_failure")

    def simulate_link_degradation(self, node_id):
        """
        Simulates communication degradation event.
        """
        self.trigger_failure(node_id, "link_degradation")

    def get_cascade_impact(self):
        """
        Returns system-wide impact summary after cascade events.
        """
        impact = {
            "failed": [],
            "degraded": [],
            "nominal": []
        }

        for node_id, node in self.system.nodes.items():
            if node.status.startswith("failed"):
                impact["failed"].append(node_id)
            elif node.status.startswith("degraded"):
                impact["degraded"].append(node_id)
            else:
                impact["nominal"].append(node_id)

        return impact

    def reset_system(self):
        """
        Resets all nodes to nominal state.
        """
        for node in self.system.nodes.values():
            node.set_status("nominal")
