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
        if node_id not in self.system.nodes:
            return

        node = self.system.nodes[node_id]

        if node.status.startswith("failed"):
            return

        node.set_status(f"failed:{failure_type}")

        visited = set()
        self._propagate_failure(node, visited)

    # ----------------------------
    # SAFE CASCADE PROPAGATION
    # ----------------------------
    def _propagate_failure(self, failed_node, visited):
        if failed_node in visited:
            return

        visited.add(failed_node)

        for node in self.system.nodes.values():

            if (
                failed_node in node.dependencies
                and not node.status.startswith("failed")
            ):
                node.set_status("degraded:cascade")
                self._propagate_failure(node, visited)
