import random


class FinancialNode:
    def __init__(self, node_id, capital=100, risk=0.2):
        self.id = node_id
        self.capital = capital
        self.risk = risk
        self.state = "HEALTHY"

        # financial stress indicators
        self.exposure = 0.0
        self.liquidity_pressure = 0.0


class FinancialEngine:

    def __init__(self):
        self.domain = "financial"
        self.nodes = {}
        self.edges = []
        self.time = 0
        self.history = []

    # -----------------------------
    # BUILD SYSTEM
    # -----------------------------
    def add_node(self, node_id, capital=100, risk=0.2):
        self.nodes[node_id] = FinancialNode(node_id, capital, risk)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -----------------------------
    # FAILURE (DEFAULT EVENT)
    # -----------------------------
    def default_node(self, node_id):
        if node_id in self.nodes:
            self.nodes[node_id].state = "DEFAULTED"

    # -----------------------------
    # EXPOSURE MODEL
    # -----------------------------
    def calculate_exposure(self, node):
        exposure = 0.0

        for from_id, to_id, weight in self.edges:
            if to_id == node.id:
                from_node = self.nodes.get(from_id)

                if from_node and from_node.state == "DEFAULTED":
                    exposure += weight

        node.exposure = min(1.0, exposure)

    # -----------------------------
    # STRESS MODEL
    # -----------------------------
    def compute_stress(self, node):
        liquidity_pressure = node.exposure * node.risk
        return liquidity_pressure

    # -----------------------------
    # CASCADE PROPAGATION
    # -----------------------------
    def propagate(self):
        newly_defaulted = set()

        for node in self.nodes.values():
            if node.state != "HEALTHY":
                continue

            self.calculate_exposure(node)
            stress = self.compute_stress(node)

            # probability of default
            probability = min(1.0, stress + (node.risk * 0.3))

            if random.random() < probability:
                newly_defaulted.add(node.id)

        for nid in newly_defaulted:
            self.nodes[nid].state = "DEFAULTED"

        return newly_defaulted

    # -----------------------------
    # SYSTEM METRIC
    # -----------------------------
    def financial_stability_index(self):
        total = len(self.nodes)
        if total == 0:
            return 0.0

        healthy = sum(1 for n in self.nodes.values() if n.state == "HEALTHY")
        return healthy / total

    # -----------------------------
    # MAIN STEP
    # -----------------------------
    def step(self):
        self.time += 1

        newly_defaulted = self.propagate()

        fsi = self.financial_stability_index()

        snapshot = {
            "time": self.time,
            "newly_defaulted": list(newly_defaulted),
            "financial_stability_index": fsi,
            "states": {n.id: n.state for n in self.nodes.values()}
        }

        self.history.append(snapshot)
        return snapshot
