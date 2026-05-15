from core.graph import DependencyGraph
from core.cascade import trigger_failure


class SimulationEngine:
    def __init__(self):
        self.graph = DependencyGraph()

    def run(self, scenario):
        """
        Runs a deterministic cascade simulation from a scenario input.
        """

        # 1. Build nodes
        for node in scenario["nodes"]:
            self.graph.add_node(node)

        # 2. Build dependencies
        for dep in scenario["dependencies"]:
            self.graph.add_dependency(dep["from"], dep["to"])

        # 3. Trigger cascade
        failed_nodes = trigger_failure(
            self.graph,
            scenario["initial_failure"]
        )

        # 4. Return structured result
        return {
            "scenario": scenario["scenario_name"],
            "failed_nodes": failed_nodes,
            "status": "complete"
        }
