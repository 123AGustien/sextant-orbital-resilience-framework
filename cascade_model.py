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

    # ----------------------------
    # CORE FAILURE ENTRY POINT
    # ----------------------------
    def trigger_failure(self, node_id, failure_type="unknown"):
        """
        Marks a node as failed and triggers cascade propagation.
        """
        if node_id not in self.system.nodes:
            return

        node = self.system.nodes[node_id]

        # Prevent re-processing already failed nodes
        if node.status.startswith("failed"):
            return

        node.set_status(f"failed:{failure_type}")

        # Start cascade propagation with safety tracking
        visited = set()
        self._propagate_failure(node, visited)

    # ----------------------------
    # SAFE CASCADE PROPAGATION
    # ----------------------------
    def _propagate_failure(self, failed_node, visited):
        """
        Propagates failure through dependency graph safely (cycle-resistant).
        """
        if failed_node in visited:
            return

        visited.add(failed_node)

        for node in self.system.nodes.values():

            # Ensure dependency exists and is not already failed
            if (
                failed_node in node.dependencies
                and not node.status.startswith("failed")
            ):
                node.set_status("degraded:cascade")

                # Continue propagation safely
                self._propagate_failure(node, visited)

    # ----------------------------
    # SIMULATION HELPERS
    # ----------------------------
    def simulate_ground_station_outage(self, station_id):
        self.trigger_failure(station_id, "ground_outage")

    def simulate_satellite_failure(self, satellite_id):
        self.trigger_failure(satellite_id, "satellite_failure")

    def simulate_link_degradation(self, node_id):
        self.trigger_failure(node_id, "link_degradation")

    # ----------------------------
    # SYSTEM STATE OUTPUT
    # ----------------------------
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

    # ----------------------------
    # RESET FUNCTION
    # ----------------------------
    def reset_system(self):
        """
        Resets all nodes to nominal state.
        """
        for node in self.system.nodes.values():
            node.set_status("nominal")
