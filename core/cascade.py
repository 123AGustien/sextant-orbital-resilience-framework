class CascadeEngine:
    def __init__(self, nodes, dependencies):
        self.nodes = set(nodes)
        self.dependencies = dependencies

        self.reverse_map = {}
        for d in dependencies:
            self.reverse_map.setdefault(d["to"], []).append(d["from"])

    def step_propagate(self, current_failed):
        """Compute next wave of failures"""
        next_failed = set()

        for node in current_failed:
            for dependent in self.reverse_map.get(node, []):
                next_failed.add(dependent)

        return next_failed

    def run(self, initial_failure):
        timeline = []

        # S1
        current = {initial_failure}
        all_failed = set()

        step = 1

        while current:
            all_failed.update(current)

            timeline.append({
                "step": step,
                "failed_this_step": list(current),
                "total_failed": list(all_failed)
            })

            current = self.step_propagate(current) - all_failed
            step += 1

        return {
            "initial_failure": initial_failure,
            "timeline": timeline,
            "final_failed_nodes": list(all_failed),
            "healthy_nodes": list(self.nodes - all_failed)
        }
