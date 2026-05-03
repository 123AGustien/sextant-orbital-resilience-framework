class AIInterpretationLayer:
    """
    Translates simulation event logs and resilience metrics
    into structured system-level explanations.

    This is NOT generative AI — it is deterministic interpretation logic
    designed for auditability and research reproducibility.
    """

    def __init__(self):
        pass

    def interpret(self, event_log: list, metrics: dict = None):
        """
        Produces structured system interpretation.
        """

        cascade_events = 0
        steps = 0
        failure_points = []

        # ----------------------------
        # ANALYSE EVENT LOG
        # ----------------------------
        for event in event_log:
            etype = event.get("event_type", "")

            if etype == "step":
                steps += 1

            if etype == "cascade_triggered":
                cascade_events += 1
                failure_points.append(event.get("description", ""))

        # ----------------------------
        # SYSTEM CLASSIFICATION
        # ----------------------------
        if cascade_events == 0:
            system_state = "stable"
        elif cascade_events < 3:
            system_state = "degraded"
        else:
            system_state = "unstable"

        # ----------------------------
        # INTERPRETATION OUTPUT
        # ----------------------------
        interpretation = {
            "system_state": system_state,
            "analysis_summary": self._generate_summary(
                steps, cascade_events, failure_points
            ),
            "key_events": failure_points,
            "observed_cascades": cascade_events,
            "total_steps": steps
        }

        # Optional integration with resilience metrics
        if metrics:
            interpretation["resilience_context"] = self._interpret_metrics(metrics)

        return interpretation

    # ----------------------------
    # INTERNAL SUMMARY ENGINE
    # ----------------------------
    def _generate_summary(self, steps, cascades, failures):
        if cascades == 0:
            return "System operated without cascade propagation. No structural degradation observed."

        return (
            f"System executed {steps} steps with {cascades} cascade event(s). "
            f"Failure propagation detected across dependent nodes. "
            f"Key affected transitions: {len(failures)}."
        )

    # ----------------------------
    # METRICS INTERPRETATION
    # ----------------------------
    def _interpret_metrics(self, metrics: dict):
        score = metrics.get("resilience_score", 0)
        stability = metrics.get("system_stability_index", 0)

        if score > 80:
            grade = "high_resilience"
        elif score > 50:
            grade = "moderate_resilience"
        else:
            grade = "low_resilience"

        return {
            "resilience_grade": grade,
            "resilience_score": score,
            "stability_index": stability
        }
