def interpret_cascade_result(cascade_result):
    """
    Secondary AI interpretation layer
    Converts raw cascade simulation into structured insight
    """

    final_risk = cascade_result.get("final_system_risk", 0)

    if final_risk < 30:
        status = "LOW RISK - Stable Conditions"
        action = "Monitor only"
    elif final_risk < 70:
        status = "MEDIUM RISK - Degradation Detected"
        action = "Increase monitoring + prepare mitigation"
    else:
        status = "HIGH RISK - Cascade Escalation"
        action = "Immediate human-in-the-loop review required"

    return {
        "event_id": cascade_result.get("event_id"),
        "risk_score": final_risk,
        "status": status,
        "recommended_action": action,
        "system_mode": "secondary_ai_interpretation_layer"
    }
