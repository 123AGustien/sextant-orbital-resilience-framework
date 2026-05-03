class ResilienceModel:
    """
    Computes resilience metrics from simulation event logs.
    Designed for deterministic post-simulation evaluation.
    """

    def __init__(self):
        pass

    def evaluate(self, event_log: list):
        """
        Returns structured resilience metrics
        """

        total_steps = 0
        cascade_events = 0
        failures = 0

        for event in event_log:
            event_type = event.get("event_type", "")

            if event_type == "step":
                total_steps += 1

            if event_type == "cascade_triggered":
                cascade_events += 1
                failures += 1

        # ----------------------------
        # RESILIENCE SCORE (0–100)
        # ----------------------------
        if total_steps == 0:
            resilience_score = 0
        else:
            disruption_ratio = cascade_events / total_steps
            resilience_score = max(0, 100 - (disruption_ratio * 100))

        # ----------------------------
        # SYSTEM STABILITY INDEX
        # ----------------------------
        stability_index = max(0, 100 - (failures * 20))

        # ----------------------------
        # CASCADE SEVERITY
        # ----------------------------
        cascade_severity = cascade_events

        return {
            "resilience_score": round(resilience_score, 2),
            "system_stability_index": round(stability_index, 2),
            "cascade_severity_index": cascade_severity,
            "total_steps": total_steps
        }
