class Node:
    def __init__(self, node_id):
        self.id = node_id
        self.dependencies = []
        self.failed = False


class DependencyGraph:
    def __init__(self):
        self.nodes = {}

    def add_node(self, node_id):
        self.nodes[node_id] = Node(node_id)

    def add_dependency(self, a, b):
        # a depends on b
        self.nodes[a].dependencies.append(b)
