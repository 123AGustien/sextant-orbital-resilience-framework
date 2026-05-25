"""
🛰️ Orbital Recovery Engine v1
Sextant Orbital Resilience Framework

Defines orbital recovery sequencing
and stabilization behavior.
"""

from typing import Dict, Any

from core.orbital.orbital_failure_profiles_v1 import (
    ORBITAL_FAILURE_PROFILES
)


class OrbitalRecoveryEngineV1:
    """
    Handles orbital recovery actions.
    """

    # ---------------------------------
    # MAIN ENTRY
    # ---------------------------------

    def recover(
        self,
        failure_type: str
    ) -> Dict[str, Any]:

        if failure_type not in ORBITAL_FAILURE_PROFILES:

            raise ValueError(
                f"Unknown orbital failure: {failure_type}"
            )

        profile = ORBITAL_FAILURE_PROFILES[
            failure_type
        ]

        recovery_action = profile[
            "recommended_action"
        ]

        severity = profile[
            "severity"
        ]

        recovery_status = self._determine_status(
            severity
        )

        return {

            "failure_type": failure_type,

            "severity": severity,

            "recovery_action": recovery_action,

            "recovery_status": recovery_status
        }

    # ---------------------------------
    # RECOVERY STATUS LOGIC
    # ---------------------------------

    def _determine_status(
        self,
        severity: str
    ) -> str:

        if severity == "CRITICAL":
            return "RECOVERY_REQUIRED"

        if severity == "HIGH":
            return "STABILIZATION_REQUIRED"

        if severity == "MEDIUM":
            return "MONITOR_AND_RECOVER"

        return "STABLE"
