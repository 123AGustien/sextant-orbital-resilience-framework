class OrbitalCascadeModel:
    def __init__(self, system_model):
        # system_model is a dict now
        self.system = system_model

    def trigger_failure(self, node_id, failure_type="unknown"):
        if node_id not in self.system:
            return

        node = self.system[node_id]

        if node.get("status", "").startswith("failed"):
            return

        node["status"] = f"failed:{failure_type}"

        visited = set()
        self._propagate_failure(node_id, visited)

    def _propagate_failure(self, failed_node_id, visited):
        if failed_node_id in visited:
            return

        visited.add(failed_node_id)

        for node_id, node in self.system.items():

            dependencies = node.get("dependencies", [])

            if failed_node_id in dependencies and not node.get("status", "").startswith("failed"):
                node["status"] = "degraded:cascade"
                self._propagate_failure(node_id, visited)

    # REQUIRED HELPERS (scenario engine compatibility)
    def simulate_ground_station_outage(self, station_id):
        self.trigger_failure(station_id, "ground_outage")

    def simulate_satellite_failure(self, satellite_id):
        self.trigger_failure(satellite_id, "satellite_failure")

    def simulate_link_degradation(self, node_id):
        self.trigger_failure(node_id, "link_degradation")

    def get_cascade_impact(self):
        impact = {"failed": [], "degraded": [], "nominal": []}

        for node_id, node in self.system.items():
            status = node.get("status", "nominal")

            if status.startswith("failed"):
                impact["failed"].append(node_id)
            elif status.startswith("degraded"):
                impact["degraded"].append(node_id)
            else:
                impact["nominal"].append(node_id)

        return impact

    def reset_system(self):
        for node in self.system.values():
            node["status"] = "nominal"
