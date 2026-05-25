from orchestration.domain_registry import get_engine


class CrossDomainOrchestrator:

    def __init__(self):
        self.engines = {}
        self.time = 0
        self.global_log = []

    # -----------------------------------------
    # REGISTER DOMAIN
    # -----------------------------------------
    def register_domain(self, domain_name: str):
        self.engines[domain_name] = get_engine(domain_name)

    # -----------------------------------------
    # SEED INITIAL FAILURE
    # -----------------------------------------
    def inject_event(self, domain, node_id, event_type="FAIL"):
        engine = self.engines.get(domain)

        if not engine:
            return

        if hasattr(engine, "fail_node"):
            engine.fail_node(node_id)

        if hasattr(engine, "default_node"):
            engine.default_node(node_id)

    # -----------------------------------------
    # CROSS-DOMAIN COUPLING LOGIC
    # -----------------------------------------
    def propagate_cross_domain_effects(self):
        """
        Simple v1 coupling rules:
        - Orbital failure → Financial stress increase
        - Financial default → Orbital resilience drop
        """

        orbital = self.engines.get("orbital")
        financial = self.engines.get("financial")

        if orbital and financial:

            orbital_failed = [
                n for n, s in orbital.nodes.items()
                if getattr(s, "state", None) == "failed"
            ]

            financial_defaulted = [
                n for n, s in financial.nodes.items()
                if getattr(s, "state", None) == "DEFAULTED"
            ]

            # Orbital → Financial shock
            if len(orbital_failed) > 0:
                for node in financial.nodes.values():
                    node.risk = min(1.0, node.risk + 0.05 * len(orbital_failed))

            # Financial → Orbital feedback
            if len(financial_defaulted) > 0:
                for node in orbital.nodes.values():
                    node.resilience = max(0.1, node.resilience - 0.05 * len(financial_defaulted))

    # -----------------------------------------
    # STEP EXECUTION (GLOBAL TICK)
    # -----------------------------------------
    def step(self):
        self.time += 1

        results = {}

        # 1. run all domains
        for name, engine in self.engines.items():
            results[name] = engine.step()

        # 2. apply cross-domain effects
        self.propagate_cross_domain_effects()

        snapshot = {
            "time": self.time,
            "domains": results
        }

        self.global_log.append(snapshot)
        return snapshot
