from typing import Dict, Any, List


class OrbitalEngineV1:
    """
    Deterministic Orbital Cascade Simulation Engine v1
    """

    def run_scenario(self, scenario: Dict[str, Any]) -> Dict[str, Any]:

        nodes = scenario.get("nodes", [])
        edges = scenario.get("edges", [])
        initial_failure = scenario.get("initial_failure")

        failed_nodes = set()
        degraded_nodes = set()

        if initial_failure:
            failed_nodes.add(initial_failure)

        timeline: List[Dict[str, Any]] = []

        # STEP 0 — baseline
        timeline.append({
            "step": 0,
            "failed_nodes": [],
            "degraded_nodes": []
        })

        # STEP 1 — propagation phase
        for edge in edges:
            if edge["from"] in failed_nodes:
                degraded_nodes.add(edge["to"])

        # STEP 2 — collapse phase (deterministic)
        for node in list(degraded_nodes):
            failed_nodes.add(node)

        timeline.append({
            "step": 1,
            "failed_nodes": list(failed_nodes),
            "degraded_nodes": list(degraded_nodes)
        })

        return {
            "scenario_id": scenario.get("scenario_id", "unknown"),
            "status": "completed",
            "timeline": timeline,
            "final_state": {
                "stable": len(degraded_nodes) == 0,
                "failed_count": len(failed_nodes)
            }
        }
