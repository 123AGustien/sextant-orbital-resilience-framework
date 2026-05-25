import random


class SatelliteNode:
    def __init__(self, node_id, link_capacity=100, failure_risk=0.2):
        self.id = node_id
        self.link_capacity = link_capacity
        self.failure_risk = failure_risk
        self.state = "ACTIVE"

        # communication stress indicators
        self.signal_degradation = 0.0
        self.routing_latency = 0.0


class SatelliteEngine:

    def __init__(self):
        self.domain = "satellite"
        self.nodes = {}
        self.edges = []
        self.time = 0
        self.history = []

    # -----------------------------
    # BUILD SYSTEM
    # -----------------------------
    def add_node(self, node_id, link_capacity=100, failure_risk=0.2):
        self.nodes[node_id] = SatelliteNode(node_id, link_capacity, failure_risk)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -----------------------------
    # FAILURE EVENT
    # -----------------------------
    def fail_node(self, node_id):
        if node_id in self.nodes:
            self.nodes[node_id].state = "DEGRADED"

    # -----------------------------
    # SIGNAL MODEL
    # -----------------------------
    def calculate_signal_degradation(self, node):
        degradation = 0.0

        for from_id, to_id, weight in self.edges:
            if to_id == node.id:
                from_node = self.nodes.get(from_id)

                if from_node and from_node.state != "ACTIVE":
                    degradation += weight

        node.signal_degradation = min(1.0, degradation)

    # -----------------------------
    # ROUTING STRESS MODEL
    # -----------------------------
    def compute_routing_latency(self, node):
        node.routing_latency = node.signal_degradation * node.failure_risk
        return node.routing_latency

    # -----------------------------
    # CASCADE PROPAGATION
    # -----------------------------
    def propagate(self):
        newly_failed = set()

        for node in self.nodes.values():
            if node.state != "ACTIVE":
                continue

            self.calculate_signal_degradation(node)
            stress = self.compute_routing_latency(node)

            probability = min(1.0, stress + (node.failure_risk * 0.25))

            if random.random() < probability:
                newly_failed.add(node.id)

        for nid in newly_failed:
            self.nodes[nid].state = "DEGRADED"

        return newly_failed

    # -----------------------------
    # SATELLITE HEALTH INDEX
    # -----------------------------
    def satellite_health_index(self):
        total = len(self.nodes)
        if total == 0:
            return 0.0

        active = sum(1 for n in self.nodes.values() if n.state == "ACTIVE")
        return active / total

    # -----------------------------
    # STEP EXECUTION
    # -----------------------------
    def step(self):
        self.time += 1

        newly_failed = self.propagate()
        shi = self.satellite_health_index()

        snapshot = {
            "time": self.time,
            "newly_failed": list(newly_failed),
            "satellite_health_index": shi,
            "states": {n.id: n.state for n in self.nodes.values()}
        }

        self.history.append(snapshot)
        return snapshot

    # -----------------------------
    # RESET
    # -----------------------------
    def reset(self):
        self.time = 0
        self.history = []

        for node in self.nodes.values():
            node.state = "ACTIVE"
            node.signal_degradation = 0.0
            node.routing_latency = 0.0
