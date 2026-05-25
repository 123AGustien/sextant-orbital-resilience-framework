from orchestration.domain_registry import get_engine


class CrossDomainOrchestrator:
    def __init__(self):
        self.engines = {}
        self.time = 0
        self.global_log = []

    # -----------------------------
    # REGISTER DOMAIN
    # -----------------------------
    def register_domain(self, domain_name: str):
        self.engines[domain_name] = get_engine(domain_name)

    # -----------------------------
    # SEED INITIAL EVENT
    # -----------------------------
    def inject_event(self, domain, node_id):
        engine = self.engines.get(domain)
        if not engine:
            return

        if hasattr(engine, "fail_node"):
            engine.fail_node(node_id)

        if hasattr(engine, "default_node"):
            engine.default_node(node_id)

    # -----------------------------
    # CROSS-DOMAIN COUPLING (STABLE v1)
    # -----------------------------
    def propagate_cross_domain_effects(self):
        orbital = self.engines.get("orbital")
        financial = self.engines.get("financial")

        if not orbital or not financial:
            return

        orbital_failed = [
            n for n in orbital.nodes.values()
            if getattr(n, "state", None) in ["FAILED", "DEFAULTED", "failed", "defaulted"]
        ]

        financial_defaulted = [
            n for n in financial.nodes.values()
            if getattr(n, "state", None) in ["DEFAULTED", "defaulted"]
        ]

        # Orbital → Financial impact
        if orbital_failed:
            shock = 0.05 * len(orbital_failed)
            for node in financial.nodes.values():
                if hasattr(node, "risk"):
                    node.risk = min(1.0, node.risk + shock)

        # Financial → Orbital impact
        if financial_defaulted:
            stress = 0.05 * len(financial_defaulted)
            for node in orbital.nodes.values():
                if hasattr(node, "risk"):
                    node.risk = min(1.0, getattr(node, "risk", 0.2) + stress)

    # -----------------------------
    # GLOBAL STEP
    # -----------------------------
    def step(self):
        self.time += 1

        results = {}

        for name, engine in self.engines.items():
            results[name] = engine.step()

        self.propagate_cross_domain_effects()

        snapshot = {
            "time": self.time,
            "domains": results
        }

        self.global_log.append(snapshot)
        return snapshot
