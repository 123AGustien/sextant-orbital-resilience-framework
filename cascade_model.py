def propagate_failure(event):
    """
    Simple deterministic cascade model
    """

    base_risk = event.get("risk_score", 0)

    # propagation logic (simplified)
    communication_layer_impact = base_risk * 1.2
    ground_system_impact = communication_layer_impact * 1.5
    governance_delay_factor = 0.8

    final_risk = ground_system_impact * governance_delay_factor

    return {
        "event_id": event.get("id"),
        "initial_risk": base_risk,
        "comm_layer_risk": communication_layer_impact,
        "ground_risk": ground_system_impact,
        "final_system_risk": final_risk,
        "status": "cascade_mode_simulated"
    }
