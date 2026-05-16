class Node:
    """
    Represents a deterministic system node in the dependency graph.
    """

    def __init__(self, node_id: str, node_type: str = "generic"):
        self.id = node_id
        self.type = node_type

        # Nodes this node depends on OR influences (we define direction at graph level)
        self.dependencies = []

        # deterministic state
        self.state = "healthy"  # healthy | degraded | failed


class DependencyGraph:
    """
    Deterministic dependency graph for cascade simulation.

    Design principle:
    - Graph stores structure only
    - Engine/Cascade handles state transitions
    """

    def __init__(self):
        self.nodes = {}

    def add_node(self, node_id: str, node_type: str = "generic"):
        if node_id not in self.nodes:
            self.nodes[node_id] = Node(node_id, node_type)

    def add_dependency(self, source: str, target: str):
        """
        Defines directional dependency:

        source → target

        Meaning:
        Failure at source propagates to target.
        """

        if source not in self.nodes:
            self.add_node(source)

        if target not in self.nodes:
            self.add_node(target)

        # prevent duplicate edges (important for deterministic behavior)
        if target not in self.nodes[source].dependencies:
            self.nodes[source].dependencies.append(target)

    def get_downstream(self, node_id: str):
        """
        Returns deterministic downstream nodes.
        """
        node = self.nodes.get(node_id)
        if not node:
            return []

        return node.dependencies

    def get_state(self):
        """
        Snapshot of current system state.
        """
        return {
            node_id: node.state
            for node_id, node in self.nodes.items()
        }
