class CascadeEngine:
    def __init__(self, nodes, dependencies):
        self.nodes = set(nodes)
        self.dependencies = dependencies
        self.failed = set()

        # build reverse dependency map
        self.reverse_map = {}
        for d in dependencies:
            self.reverse_map.setdefault(d["to"], []).append(d["from"])

    def fail_node(self, node):
        if node in self.failed:
            return

        self.failed.add(node)

        # propagate failure
        for dependent in self.reverse_map.get(node, []):
            self.fail_node(dependent)

    def run(self, initial_failure):
        self.fail_node(initial_failure)

        return {
            "initial_failure": initial_failure,
            "failed_nodes": list(self.failed),
            "healthy_nodes": list(self.nodes - self.failed)
        }
