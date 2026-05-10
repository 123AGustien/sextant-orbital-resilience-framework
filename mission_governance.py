class MissionGovernanceLayer:
    def __init__(self, runtime=None, cascade=None, mechanics=None):
        """
        Accepts optional system references for full simulation context.
        Keeps backward compatibility with CI runs.
        """

        self.runtime = runtime
        self.cascade = cascade
        self.mechanics = mechanics

        self.state_history = []

    def evaluate_mission_state(self, cascade_data=None):
        """
        Evaluates mission health state based on actual cascade signals.
        """

        has_signal = bool(cascade_data)

        if not has_signal:
            status = "nominal"
            risk = "low"
        else:
            event_count = len(cascade_data) if isinstance(cascade_data, (list, tuple)) else 1

            if event_count == 1:
                status = "single_event"
                risk = "low"
            elif event_count <= 3:
                status = "multi_event"
                risk = "medium"
            else:
                status = "cascade_active"
                risk = "high"

        result = {
            "mission_status": status,
            "risk_level": risk,
            "note": "Governance evaluation complete"
        }

        self.state_history.append(result)

        return result
