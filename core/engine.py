from core.scenario_loader import ScenarioLoader
from core.graph import DependencyGraph
from core.cascade import CascadeEngine


class Engine:
    """
    Unified deterministic simulation engine.

    Single entry point for:
    - scenario loading
    - graph construction
    - cascade execution
    """

    def __init__(self, scenario_path: str):
        self.scenario_path = scenario_path

        self.loader = ScenarioLoader()
        self.scenario = self.loader.load(scenario_path)

        self.graph = DependencyGraph()
        self.cascade = CascadeEngine(self.graph)

        self.state = {}

        self._build_graph()
        self._initialize_state()

    def _build_graph(self):
        """
        Build dependency graph from scenario definition.
        """

        for node in self.scenario.get("nodes", []):
            self.graph.add_node(
                node.get("id"),
                node.get("type", "generic")
            )

        for dep in self.scenario.get("dependencies", []):
            source = dep.get("source")
            target = dep.get("target")

            if source and target:
                self.graph.add_dependency(source, target)

    def _initialize_state(self):
        """
        Initialize deterministic system state.
        """

        # default state from graph
        for node_id, node in self.graph.nodes.items():
            self.state[node_id] = node.state

        # override with scenario initial conditions
        initial = self.scenario.get("initial_conditions", {})
        if isinstance(initial, dict):
            for node_id, state in initial.items():
                if node_id in self.state:
                    self.state[node_id] = state

    def run(self):
        """
        Execute deterministic simulation.

        Returns:
            dict: simulation results
        """

        results = {
            "failed_nodes": [],
            "final_state": {}
        }

        initial_failures = self.scenario.get("failures", [])
        if not isinstance(initial_failures, list):
            initial_failures = []

        for node_id in initial_failures:
            if node_id not in self.state:
                continue

            failed, self.state = self.cascade.trigger_failure(
                node_id,
                self.state
            )
            results["failed_nodes"].extend(failed)

        results["final_state"] = self.state

        return results
