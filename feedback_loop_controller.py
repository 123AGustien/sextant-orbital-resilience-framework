"""
Sextant Orbital Resilience Framework
Feedback Loop Controller

This module introduces a deterministic feedback cycle
between Governance and Supervisory layers.

It enables system self-consistency validation.
"""

class FeedbackLoopController:
    """
    Closed-loop validation between governance decisions
    and supervisory analysis.
    """

    def __init__(self, governance_layer, supervisory_layer):
        self.governance = governance_layer
        self.supervisory = supervisory_layer

    # ----------------------------------------
    # VALIDATION LOOP
    # ----------------------------------------
    def validate_system_state(self, system_state):
        """
        Supervisory layer evaluates system state,
        governance validates or rejects interpretation.
        """

        analysis = self.supervisory.analyze(system_state)

        decision = self.governance.validate(analysis)

        return {
            "analysis": analysis,
            "governance_decision": decision
        }

    # ----------------------------------------
    # RE-EVALUATION LOOP
    # ----------------------------------------
    def re_evaluate_if_needed(self, system_state):
        """
        If governance flags instability,
        supervisory layer re-analyzes system.
        """

        result = self.validate_system_state(system_state)

        if result["governance_decision"] == "unstable":
            return self.supervisory.analyze(system_state)

        return result["analysis"]
