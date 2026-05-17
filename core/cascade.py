# Sextant Orbital Resilience Framework
# Deterministic Cascade Simulation Engine

from typing import Dict, List, Set


class CascadeEngine:
    """
    Deterministic dependency cascade simulation engine.

    States:
        HEALTHY
        DEGRADED
        FAILED
        RECOVERING
    """

    def __init__(self, nodes: List[str], dependencies: List[Dict]):
        self.nodes = nodes
        self.dependencies = dependencies

        # Initial system state
        self.state: Dict[str, str] = {n: "HEALTHY" for n in nodes}

        # Reverse dependency map: node → upstream dependencies
        self.reverse_map: Dict[str, List[str]] = {}

        for d in dependencies:
            self.reverse_map.setdefault(d["to"], []).append(d["from"])

        # Recovery tracking (deterministic delay system)
        self.recovery_timer: Dict[str, int] = {n: 0 for n in nodes}

    # -----------------------------
    # CORE STATE TRANSITIONS
    # -----------------------------

    def fail_node(self, node: str):
        if self.state[node] == "FAILED":
            return

        self.state[node] = "FAILED"
        self.recovery_timer[node] = 2  # fixed deterministic recovery delay

    def degrade_node(self, node: str):
        if self.state[node] == "HEALTHY":
            self.state[node] = "DEGRADED"

    def recover_node(self, node: str):
        if self.state[node] == "RECOVERING":
            self.state[node] = "HEALTHY"
            self.recovery_timer[node] = 0

    # -----------------------------
    # CASCADE PROPAGATION LOGIC
    # -----------------------------

    def propagate(self, failed_nodes: Set[str]) -> Set[str]:
        """
        S1 → S2 → S3 propagation logic:
        - First hit: HEALTHY → DEGRADED
        - Second hit: DEGRADED → FAILED
        """

        next_failures = set()

        for node in failed_nodes:
            for dependent in self.reverse_map.get(node, []):

                if self.state[dependent] == "HEALTHY":
                    self.state[dependent] = "DEGRADED"

                elif self.state[dependent] == "DEGRADED":
                    self.state[dependent] = "FAILED"
                    next_failures.add(dependent)

        return next_failures

    # -----------------------------
    # RECOVERY SYSTEM
    # -----------------------------

    def update_recovery(self):
        for node in self.nodes:

            # FAILED → RECOVERING
            if self.state[node] == "FAILED":
                self.recovery_timer[node] -= 1

                if self.recovery_timer[node] <= 0:
                    self.state[node] = "RECOVERING"

            # RECOVERING → HEALTHY
            elif self.state[node] == "RECOVERING":
                self.state[node] = "HEALTHY"
                self.recovery_timer[node] = 0

            # DEGRADED → self-heal (optional stabilisation)
            elif self.state[node] == "DEGRADED":
                self.state[node] = "HEALTHY"

    # -----------------------------
    # SIMULATION ENGINE
    # -----------------------------

    def run(self, initial_failure: str, max_steps: int = 20):
        timeline = []

        current_failed = {initial_failure}
        step = 1

        while step <= max_steps:

            # 1. Apply failures
            for node in current_failed:
                self.fail_node(node)

            # 2. Propagate cascade
            next_failed = self.propagate(current_failed)

            # 3. Recovery tick
            self.update_recovery()

            # 4. Snapshot state
            timeline.append({
                "step": step,
                "failed_this_step": list(current_failed),
                "states": dict(self.state)
            })

            # Stop condition: system stable
            if not next_failed and all(s == "HEALTHY" for s in self.state.values()):
                break

            current_failed = next_failed
            step += 1

        return {
            "initial_failure": initial_failure,
            "timeline": timeline,
            "final_states": dict(self.state)
        }
