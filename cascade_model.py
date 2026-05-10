"""
Sextant Orbital Resilience Framework
Orbital Dependency Cascade Model

Deterministic cascade propagation engine using a dictionary-based system model.
"""

class OrbitalCascadeModel:
    def __init__(self, system_model):
        self.system = system_model

    # ----------------------------
    # TYPE SAFETY HELPER
    # ----------------------------
    def _get_node(self, node):
        """
        Ensures node is always treated as dict safely.
        """
        if isinstance(node, dict):
            return node
        return None

    # ----------------------------
    # CORE FAILURE ENTRY POINT
    # ----------------------------
    def trigger_failure(self, node_id, failure_type="unknown"):
        if node_id not in self.system:
            return

        node = self._get_node(self.system[node_id])
        if not node:
            return

        if node.get("status", "").startswith("failed"):
            return

        node["status"] = f"failed:{failure_type}"

        visited = set()
        self._propagate_failure(node_id, visited)

    # ----------------------------
    # SAFE CASCADE PROPAGATION
    # ----------------------------
    def _propagate_failure(self, failed_node_id, visited):
        if failed_node_id in visited:
            return

        visited.add(failed_node_id)

        for node_id, node in self.system.items():

            node = self._get_node(node)
            if not node:
                continue

            dependencies = node.get("dependencies", [])

            if (
                failed_node_id in dependencies
                and not node.get("status", "").startswith("failed")
            ):
                node["status"] = "degraded:cascade"
                self._propagate_failure(node_id, visited)

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
    # OUTPUT
    # ----------------------------
    def get_cascade_impact(self):
        impact = {"failed": [], "degraded": [], "nominal": []}

        for node_id, node in self.system.items():

            node = self._get_node(node)
            if not node:
                continue

            status = node.get("status", "nominal")

            if status.startswith("failed"):
                impact["failed"].append(node_id)
            elif status.startswith("degraded"):
                impact["degraded"].append(node_id)
            else:
                impact["nominal"].append(node_id)

        return impact

    # ----------------------------
    # RESET
    # ----------------------------
    def reset_system(self):
        for node in self.system.values():
            if isinstance(node, dict):
                node["status"] = "nominal"
