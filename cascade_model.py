class OrbitalCascadeModel:
    def __init__(self, system_model):
        self.system = system_model

    # ----------------------------
    # CORE FAILURE ENTRY POINT
    # ----------------------------
    def trigger_failure(self, node_id, failure_type="unknown"):
        if node_id not in self.system.nodes:
            return

        node = self.system.nodes[node_id]

        if node.status.startswith("failed"):
            return

        node.set_status(f"failed:{failure_type}")

        visited = set()
        self._propagate_failure(node_id, visited)

    # ----------------------------
    # SAFE CASCADE PROPAGATION
    # ----------------------------
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
