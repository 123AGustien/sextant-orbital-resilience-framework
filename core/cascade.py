class CascadeEngine:
    """
    Deterministic cascade propagation engine.

    Responsibilities:
    - Execute failure propagation
    - Maintain deterministic traversal order
    - Operate only on graph abstraction + state map
    """

    def __init__(self, graph):
        self.graph = graph

    def trigger_failure(self, initial_failure: str, state: dict):
        """
        Triggers deterministic failure cascade from a single node.

        Args:
            initial_failure (str): Node ID where failure starts
            state (dict): System state map {node_id: state}

        Returns:
            tuple:
                - failed_nodes (list)
                - updated_state (dict)
        """

        queue = [initial_failure]
        failed_nodes = []
        visited = set()

        while queue:
            current = queue.pop(0)

            if current in visited:
                continue
            visited.add(current)

            if current not in state:
                continue

            # deterministic state transition
            if state[current] == "failed":
                continue

            state[current] = "failed"
            failed_nodes.append(current)

            # propagate downstream
            for neighbor in self.graph.get_downstream(current):
                if state.get(neighbor) != "failed":
                    queue.append(neighbor)

        return failed_nodes, state
