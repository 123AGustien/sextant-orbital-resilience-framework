class DomainRouter:

    def __init__(self):
        self.domain_map = {
            "energy": "domains.energy.energy_engine",
            "financial": "domains.financial.financial_engine",
            "maritime": "domains.maritime.maritime_engine",
            "satellite": "domains.satellite.satellite_engine",
            "telecom": "domains.telecom.telecom_engine",
            "transport": "domains.transport.transport_engine",
        }

    def resolve(self, payload: dict):
        """
        Determines which domain engine should process the scenario.
        """

        domain = payload.get("domain")

        if not domain:
            return None

        return self.domain_map.get(domain)
