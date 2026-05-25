"""
🚆 Transport Recovery Engine v1
Sextant Orbital Resilience Framework

Defines recovery logic for transport system failures
based on severity-aware failure profiles.
"""

from typing import Dict, Any

from core.transport.transport_failure_profiles_v1 import (
    TRANSPORT_FAILURE_PROFILES
)


class TransportRecoveryEngineV1:

    # ---------------------------------
    # MAIN ENTRY
    # ---------------------------------

    def recover(
        self,
        failure_type: str
    ) -> Dict[str, Any]:

        if failure_type not in TRANSPORT_FAILURE_PROFILES:

            raise ValueError(
                f"Unknown transport failure: {failure_type}"
            )

        profile = TRANSPORT_FAILURE_PROFILES[
            failure_type
        ]

        severity = profile["severity"]

        recovery_action = profile["recommended_action"]

        recovery_status = self._determine_status(severity)

        return {

            "failure_type": failure_type,

            "severity": severity,

            "recovery_action": recovery_action,

            "recovery_status": recovery_status
        }

    # ---------------------------------
    # STATUS LOGIC
    # ---------------------------------

    def _determine_status(
        self,
        severity: str
    ) -> str:

        if severity == "CRITICAL":
            return "EMERGENCY_RECOVERY_REQUIRED"

        if severity == "HIGH":
            return "IMMEDIATE_INTERVENTION_REQUIRED"

        if severity == "MEDIUM":
            return "MONITOR_AND_STABILIZE"

        return "STABLE"
