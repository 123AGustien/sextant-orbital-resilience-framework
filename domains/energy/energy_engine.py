import random


class EnergyNode:
    def __init__(self, node_id, capacity=100, load_risk=0.2):
        self.id = node_id
        self.capacity = capacity
        self.load_risk = load_risk
        self.state = "ACTIVE"

        # energy stress indicators
        self.load = 0.0
        self.overload_risk = 0.0


class EnergyEngine:

    def __init__(self):
        self.domain = "energy"
        self.nodes = {}
        self.edges = []
        self.time = 0
        self.history = []

    # -----------------------------
    # BUILD SYSTEM
    # -----------------------------
    def add_node(self, node_id, capacity=100, load_risk=0.2):
        self.nodes[node_id] = EnergyNode(node_id, capacity, load_risk)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -----------------------------
    # FAILURE EVENT
    # -----------------------------
    def fail_node(self, node_id):
        if node_id in self.nodes:
            self.nodes[node_id].state = "FAILED"

    # -----------------------------
    # LOAD PROPAGATION
    # -----------------------------
    def calculate_load(self, node):
        load = 0.0

        for from_id, to_id, weight in self.edges:
            if to_id == node.id:
                from_node = self.nodes.get(from_id)

                if from_node and from_node.state == "FAILED":
                    load += weight

        node.load = min(1.0, load)

    # -----------------------------
    # STRESS MODEL
    # -----------------------------
    def compute_stress(self, node):
        node.overload_risk = node.load * node.load_risk
        return node.overload_risk

    # -----------------------------
    # CASCADE PROPAGATION
    # -----------------------------
    def propagate(self):
        newly_failed = set()

        for node in self.nodes.values():
            if node.state != "ACTIVE":
                continue

            self.calculate_load(node)
            stress = self.compute_stress(node)

            probability = min(1.0, stress + (node.load_risk * 0.3))

            if random.random() < probability:
                newly_failed.add(node.id)

        for nid in newly_failed:
            self.nodes[nid].state = "FAILED"

        return newly_failed

    # -----------------------------
    # GRID STABILITY INDEX
    # -----------------------------
    def grid_stability_index(self):
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
        gsi = self.grid_stability_index()

        snapshot = {
            "time": self.time,
            "newly_failed": list(newly_failed),
            "grid_stability_index": gsi,
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
            node.load = 0.0
            node.overload_risk = 0.0
