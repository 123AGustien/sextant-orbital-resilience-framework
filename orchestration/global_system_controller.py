from orchestration.cross_domain_orchestrator import CrossDomainOrchestrator


class GlobalSystemController:

    def __init__(self):
        self.orchestrator = CrossDomainOrchestrator()
        self.time = 0
        self.global_risk_history = []

    # -----------------------------------------
    # REGISTER ALL SYSTEM DOMAINS
    # -----------------------------------------
    def initialize_system(self):
        self.orchestrator.register_domain("orbital")
        self.orchestrator.register_domain("financial")

    # -----------------------------------------
    # OPTIONAL: SEED SYSTEM EVENTS
    # -----------------------------------------
    def inject_initial_conditions(self, events=None):
        """
        events format:
        [
            {"domain": "orbital", "node": "A"},
            {"domain": "financial", "node": "B"}
        ]
        """

        if not events:
            return

        for event in events:
            self.orchestrator.inject_event(
                event["domain"],
                event["node"]
            )

    # -----------------------------------------
    # GLOBAL RISK CALCULATION (SYSTEM LEVEL)
    # -----------------------------------------
    def compute_global_risk(self, snapshot):

        orbital = snapshot["domains"].get("orbital", {})
        financial = snapshot["domains"].get("financial", {})

        # ORBITAL RISK
        orbital_failed = len(orbital.get("newly_failed", []))
        orbital_total = len(orbital.get("states", {})) or 1
        orbital_risk = orbital_failed / orbital_total

        # FINANCIAL RISK
        financial_defaulted = len(financial.get("newly_defaulted", []))
        financial_total = len(financial.get("states", {})) or 1
        financial_risk = financial_defaulted / financial_total

        # CROSS SYSTEM AGGREGATION
        global_risk = (orbital_risk * 0.5) + (financial_risk * 0.5)

        return {
            "orbital_risk": orbital_risk,
            "financial_risk": financial_risk,
            "global_risk": global_risk
        }

    # -----------------------------------------
    # SINGLE SYSTEM TICK
    # -----------------------------------------
    def step(self):
        self.time += 1

        # 1. run full orchestration step
        snapshot = self.orchestrator.step()

        # 2. compute global risk
        risk = self.compute_global_risk(snapshot)

        # 3. store history
        self.global_risk_history.append({
            "time": self.time,
            **risk
        })

        # 4. attach risk to output
        snapshot["global_risk"] = risk

        return snapshot
