class OrbitalCascadeModel:
    def __init__(self, system_model):
        self.system = system_model

    def trigger_failure(self, node_id, failure_type="unknown"):
        if node_id not in self.system.nodes:
            return

        node = self.system.nodes[node_id]

        if node.status.startswith("failed"):
            return

        node.set_status(f"failed:{failure_type}")

        visited = set()
        self._propagate_failure(node_id, visited)

    def _propagate_failure(self, failed_node_id, visited):
        if failed_node_id in visited:
            return

        visited.add(failed_node_id)

        for node_id, node in self.system.nodes.items():

            if (
                failed_node_id in node.dependencies
                and not node.status.startswith("failed")
            ):
                node.set_status("degraded:cascade")

                self._propagate_failure(node_id, visited)

    def simulate_ground_station_outage(self, station_id):
        self.trigger_failure(station_id, "ground_outage")

    def simulate_satellite_failure(self, satellite_id):
        self.trigger_failure(satellite_id, "satellite_failure")

    def simulate_link_degradation(self, node_id):
        self.trigger_failure(node_id, "link_degradation")

    def get_cascade_impact(self):
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
        for node in self.system.nodes.values():
            node.set_status("nominal")
