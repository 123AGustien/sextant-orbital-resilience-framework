import random


class TelecomNode:
    def __init__(self, node_id, bandwidth=100, latency_risk=0.2):
        self.id = node_id
        self.bandwidth = bandwidth
        self.latency_risk = latency_risk
        self.state = "UP"

        # telecom stress indicators
        self.congestion = 0.0
        self.packet_loss_risk = 0.0


class TelecomEngine:

    def __init__(self):
        self.domain = "telecom"
        self.nodes = {}
        self.edges = []
        self.time = 0
        self.history = []

    # -----------------------------
    # BUILD SYSTEM
    # -----------------------------
    def add_node(self, node_id, bandwidth=100, latency_risk=0.2):
        self.nodes[node_id] = TelecomNode(node_id, bandwidth, latency_risk)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -----------------------------
    # FAILURE EVENT
    # -----------------------------
    def fail_node(self, node_id):
        if node_id in self.nodes:
            self.nodes[node_id].state = "DOWN"

    # -----------------------------
    # CONGESTION MODEL
    # -----------------------------
    def calculate_congestion(self, node):
        congestion = 0.0

        for from_id, to_id, weight in self.edges:
            if to_id == node.id:
                from_node = self.nodes.get(from_id)

                if from_node and from_node.state == "DOWN":
                    congestion += weight

        node.congestion = min(1.0, congestion)

    # -----------------------------
    # STRESS MODEL
    # -----------------------------
    def compute_stress(self, node):
        node.packet_loss_risk = node.congestion * node.latency_risk
        return node.packet_loss_risk

    # -----------------------------
    # CASCADE PROPAGATION
    # -----------------------------
    def propagate(self):
        newly_down = set()

        for node in self.nodes.values():
            if node.state != "UP":
                continue

            self.calculate_congestion(node)
            stress = self.compute_stress(node)

            probability = min(1.0, stress + (node.latency_risk * 0.3))

            if random.random() < probability:
                newly_down.add(node.id)

        for nid in newly_down:
            self.nodes[nid].state = "DOWN"

        return newly_down

    # -----------------------------
    # NETWORK HEALTH INDEX
    # -----------------------------
    def network_health_index(self):
        total = len(self.nodes)
        if total == 0:
            return 0.0

        up = sum(1 for n in self.nodes.values() if n.state == "UP")
        return up / total

    # -----------------------------
    # STEP EXECUTION
    # -----------------------------
    def step(self):
        self.time += 1

        newly_down = self.propagate()
        nhi = self.network_health_index()

        snapshot = {
            "time": self.time,
            "newly_down": list(newly_down),
            "network_health_index": nhi,
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
            node.state = "UP"
            node.congestion = 0.0
            node.packet_loss_risk = 0.0
