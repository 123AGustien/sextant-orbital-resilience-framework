class CascadeEngine:
    def __init__(self, nodes, dependencies):
        self.nodes = nodes
        self.dependencies = dependencies

        # node states: HEALTHY | DEGRADED | FAILED | RECOVERING
        self.state = {n: "HEALTHY" for n in nodes}

        # dependency map (A ← B means B depends on A)
        self.reverse_map = {}
        for d in dependencies:
            self.reverse_map.setdefault(d["to"], []).append(d["from"])

        self.recovery_timer = {n: 0 for n in nodes}

    def fail_node(self, node):
        if self.state[node] == "FAILED":
            return

        self.state[node] = "FAILED"
        self.recovery_timer[node] = 2  # recovery delay steps

    def degrade_node(self, node):
        if self.state[node] == "HEALTHY":
            self.state[node] = "DEGRADED"

    def recover_node(self, node):
        if self.state[node] == "RECOVERING":
            self.state[node] = "HEALTHY"
            self.recovery_timer[node] = 0

    def propagate(self, failed_nodes):
        next_failures = set()

        for node in failed_nodes:
            for dependent in self.reverse_map.get(node, []):
                if self.state[dependent] != "FAILED":
                    self.state[dependent] = "DEGRADED"
                    next_failures.add(dependent)

        return next_failures

    def update_recovery(self):
        for node in self.nodes:
            if self.state[node] == "FAILED":
                self.recovery_timer[node] -= 1

                if self.recovery_timer[node] <= 0:
                    self.state[node] = "RECOVERING"

    def run(self, initial_failure):
        timeline = []

        current_failed = {initial_failure}
        step = 1

        while current_failed or any(
            s in ["FAILED", "DEGRADED", "RECOVERING"] for s in self.state.values()
        ):

            # 1. Apply failures
            for n in current_failed:
                self.fail_node(n)

            # 2. Propagation
            next_failed = self.propagate(current_failed)

            # 3. Recovery tick
            self.update_recovery()

            # 4. Snapshot state
            timeline.append({
                "step": step,
                "failed_this_step": list(current_failed),
                "states": dict(self.state)
            })

            current_failed = next_failed
            step += 1

            # safety break (avoid infinite loops)
            if step > 20:
                break

        return {
            "initial_failure": initial_failure,
            "timeline": timeline,
            "final_states": dict(self.state)
        }
