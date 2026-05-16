class RiskModel:
    def score(self, failed_nodes, total_nodes):
        """
        Simple deterministic risk score model.
        """

        if total_nodes == 0:
            return 0

        return len(failed_nodes) / total_nodes
