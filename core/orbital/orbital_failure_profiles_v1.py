"""
🛰️ Orbital Failure Profiles v1
Sextant Orbital Resilience Framework

Defines orbital-specific failure semantics.
"""


ORBITAL_FAILURE_PROFILES = {

    # ---------------------------------
    # SIGNAL FAILURE
    # ---------------------------------

    "SIGNAL_LOSS": {

        "severity": "HIGH",

        "effects": [
            "telemetry_disruption",
            "navigation_instability",
            "relay_failure"
        ],

        "recommended_action": (
            "SWITCH_TO_BACKUP_SATELLITE"
        )
    },

    # ---------------------------------
    # ORBITAL DRIFT
    # ---------------------------------

    "ORBITAL_DRIFT": {

        "severity": "MEDIUM",

        "effects": [
            "trajectory_deviation",
            "navigation_desync"
        ],

        "recommended_action": (
            "INITIATE_TRAJECTORY_CORRECTION"
        )
    },

    # ---------------------------------
    # TELEMETRY CORRUPTION
    # ---------------------------------

    "TELEMETRY_CORRUPTION": {

        "severity": "MEDIUM",

        "effects": [
            "data_integrity_loss",
            "signal_noise"
        ],

        "recommended_action": (
            "ENABLE_LOW_BAND_TELEMETRY"
        )
    },

    # ---------------------------------
    # POWER FAILURE
    # ---------------------------------

    "POWER_FAILURE": {

        "severity": "CRITICAL",

        "effects": [
            "system_shutdown",
            "communication_loss",
            "navigation_failure"
        ],

        "recommended_action": (
            "ACTIVATE_POWER_RECOVERY_MODE"
        )
    },

    # ---------------------------------
    # INERTIAL DESYNCHRONIZATION
    # ---------------------------------

    "INERTIAL_DESYNCHRONIZATION": {

        "severity": "HIGH",

        "effects": [
            "guidance_instability",
            "orientation_failure"
        ],

        "recommended_action": (
            "RECALIBRATE_INERTIAL_GUIDANCE"
        )
    }
}
