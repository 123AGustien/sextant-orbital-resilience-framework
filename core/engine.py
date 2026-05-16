from core.graph import DependencyGraph
from core.cascade import trigger_failure


class SimulationEngine:
    """
    Sextant Orbital Resilience Framework
    v1.1 Polished Simulation Engine

    Deterministic graph-based cascade simulation core.

    Responsibilities:
    - Build dependency graph from scenario
    - Execute deterministic cascade propagation
    - Return structured simulation result

    Note:
    This engine is used by orchestration layers (FlowController)
    as a deterministic execution backend.
    """

    def __init__(self):
        self.graph = DependencyGraph()

    # ---------------------------------------------
    # SCENARIO EXECUTION
    # ---------------------------------------------
    def run(self, scenario: dict) -> dict:
        """
        Executes a deterministic cascade simulation.

        Args:
            scenario (dict): {
                "scenario_name": str,
                "nodes": list,
                "dependencies": list,
                "initial_failure": str
            }

        Returns:
            dict: structured simulation result
        """

        self._reset_graph()

        # -----------------------------------------
        # 1. BUILD NODES
        # -----------------------------------------
        for node in scenario.get("nodes", []):
            self.graph.add_node(node)

        # -----------------------------------------
        # 2. BUILD DEPENDENCY GRAPH
        # -----------------------------------------
        for dep in scenario.get("dependencies", []):
            self.graph.add_dependency(dep["from"], dep["to"])

        # -----------------------------------------
        # 3. EXECUTE CASCADE
        # -----------------------------------------
        failed_nodes = trigger_failure(
            self.graph,
            scenario.get("initial_failure")
        )

        # -----------------------------------------
        # 4. RETURN STRUCTURED OUTPUT
        # -----------------------------------------
        return {
            "scenario_name": scenario.get("scenario_name", "unnamed"),
            "status": "complete",
            "metrics": {
                "node_count": len(scenario.get("nodes", [])),
                "dependency_count": len(scenario.get("dependencies", [])),
                "failed_node_count": len(failed_nodes)
            },
            "failed_nodes": failed_nodes
        }

    # ---------------------------------------------
    # INTERNAL RESET
    # ---------------------------------------------
    def _reset_graph(self):
        """
        Ensures deterministic execution per run.
        Prevents state leakage between scenarios.
        """
        self.graph = DependencyGraph()
