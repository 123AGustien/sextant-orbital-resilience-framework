import random

class MaritimeNode:
    def __init__(self, node_id, capacity=1.0):
        self.id = node_id
        self.capacity = capacity
        self.state = "HEALTHY"
        self.delay = 0


class MaritimeEngine:

    def __init__(self):
        self.nodes = {}
        self.edges = []
        self.time = 0

    # -------------------------
    # BUILD SYSTEM
    # -------------------------
    def add_node(self, node_id, capacity=1.0):
        self.nodes[node_id] = MaritimeNode(node_id, capacity)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -------------------------
    # FAILURE INJECTION
    # -------------------------
    def fail_node(self, node_id):
        if node_id in self.nodes:
            self.nodes[node_id].state = "FAILED"

    # -------------------------
    # ROUTING LOGIC
    # -------------------------
    def propagate(self):
        for from_id, to_id, weight in self.edges:
            a = self.nodes.get(from_id)
            b = self.nodes.get(to_id)

            if not a or not b:
                continue

            if a.state == "FAILED":
                delay_impact = weight * a.capacity
                if random.random() < delay_impact:
                    b.state = "DEGRADED"
                    b.delay += 1

    # -------------------------
    # STEP
    # -------------------------
    def step(self):
        self.propagate()
        self.time += 1

        return {
            "time": self.time,
            "states": {n.id: n.state for n in self.nodes.values()},
            "delays": {n.id: n.delay for n in self.nodes.values()}
        }
