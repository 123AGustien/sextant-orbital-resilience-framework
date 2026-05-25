import random


class TransportNode:
    def __init__(self, node_id, capacity=100, criticality=0.5):
        self.id = node_id
        self.capacity = capacity
        self.criticality = criticality

        # state
        self.state = "NORMAL"

        # metrics
        self.throughput = random.uniform(0.6, 1.0)
        self.congestion = 0.0
        self.schedule_delay = 0.0

        # control flags
        self.mitigated = False
        self.rerouted = False


class TransportEngine:

    def __init__(self):
        self.nodes = {}
        self.edges = []
        self.time = 0
        self.history = []

    # -----------------------------------------
    # BUILD SYSTEM
    # -----------------------------------------
    def add_node(self, node_id, capacity=100, criticality=0.5):
        self.nodes[node_id] = TransportNode(node_id, capacity, criticality)

    def add_edge(self, from_id, to_id, weight=0.5):
        self.edges.append((from_id, to_id, weight))

    # -----------------------------------------
    # MONITOR LAYER
    # -----------------------------------------
    def monitor(self, node):
        incoming_load = 0.0

        for f, t, w in self.edges:
            if t == node.id:
                incoming_load += w

        node.congestion = min(1.0, incoming_load / (node.capacity / 100))
        node.schedule_delay = node.congestion * random.uniform(0.5, 1.5)

        return {
            "node": node.id,
            "congestion": node.congestion,
            "throughput": node.throughput,
            "delay": node.schedule_delay
        }

    # -----------------------------------------
    # CONTINGENCY LAYER
    # -----------------------------------------
    def contingency(self, node):
        actions = []

        # reroute logic
        if node.congestion > 0.7:
            node.rerouted = True
            node.congestion *= 0.6
            actions.append("reroute_logistics_paths")

        # buffering logic
        if node.schedule_delay > 0.5:
            node.schedule_delay *= 0.7
            actions.append("delay_propagation_buffering")

        # mitigation mode
        if node.congestion > 0.85:
            node.mitigated = True
            node.throughput = min(1.0, node.throughput + 0.1)
            actions.append("congestion_mitigation_mode")

        return actions

    # -----------------------------------------
    # CASCADE BEHAVIOR
    # -----------------------------------------
    def propagate(self):
        affected = []

        for node in self.nodes.values():
            if node.congestion > 0.8:
                node.state = "DEGRADED"
                affected.append(node.id)

            if node.congestion > 0.95:
                node.state = "CRITICAL"
                affected.append(node.id)

        return affected

    # -----------------------------------------
    # SYSTEM STEP
    # -----------------------------------------
    def step(self):
        self.time += 1

        monitor_output = []
        contingency_output = []

        # MONITOR → CONTINGENCY
        for node in self.nodes.values():
            m = self.monitor(node)
            monitor_output.append(m)

            actions = self.contingency(node)
            contingency_output.append({
                "node": node.id,
                "actions": actions
            })

        # CASCADE OUTPUT
        affected = self.propagate()

        snapshot = {
            "time": self.time,
            "monitor": monitor_output,
            "contingency": contingency_output,
            "cascade": affected,
            "states": {n.id: n.state for n in self.nodes.values()}
        }

        self.history.append(snapshot)
        return snapshot
