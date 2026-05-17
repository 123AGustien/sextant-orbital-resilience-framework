class CascadeEngine:
    def __init__(self, nodes, dependencies):
        self.nodes = nodes
        self.dependencies = dependencies

        self.state = {n: "HEALTHY" for n in nodes}

        self.reverse_map = {}
        for d in dependencies:
            self.reverse_map.setdefault(d["to"], []).append(d["from"])

        self.recovery_timer = {n: 0 for n in nodes}

    def fail_node(self, node):
        self.state[node] = "FAILED"
        self.recovery_timer[node] = 2

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

        while current_failed:
            for n in current_failed:
                self.fail_node(n)

            next_failed = self.propagate(current_failed)
            self.update_recovery()

            timeline.append({
                "step": step,
                "failed": list(current_failed),
                "states": dict(self.state)
            })

            current_failed = next_failed
            step += 1

            if step > 20:
                break

        return {
            "initial_failure": initial_failure,
            "timeline": timeline,
            "final_states": dict(self.state)
        }
