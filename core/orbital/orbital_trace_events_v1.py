"""
🛰️ Orbital Trace Events v1
Sextant Orbital Resilience Framework

Defines standardized orbital trace events.
"""


ORBITAL_TRACE_EVENTS = {

    # ---------------------------------
    # SIGNAL EVENTS
    # ---------------------------------

    "SIGNAL_LOSS_DETECTED",

    "SIGNAL_RECOVERY_STARTED",

    "LOW_BAND_TELEMETRY_ENABLED",

    # ---------------------------------
    # NAVIGATION EVENTS
    # ---------------------------------

    "ORBITAL_DRIFT_DETECTED",

    "TRAJECTORY_CORRECTION_INITIATED",

    "INERTIAL_GUIDANCE_RECALIBRATION",

    # ---------------------------------
    # RECOVERY EVENTS
    # ---------------------------------

    "BACKUP_SATELLITE_ENGAGED",

    "RECOVERY_MODE_ACTIVATED",

    "STABILIZATION_SEQUENCE_STARTED",

    # ---------------------------------
    # POWER EVENTS
    # ---------------------------------

    "POWER_FAILURE_DETECTED",

    "POWER_RECOVERY_SEQUENCE_STARTED",

    # ---------------------------------
    # SYSTEM EVENTS
    # ---------------------------------

    "AUTONOMOUS_RECOVERY_TRIGGERED",

    "MISSION_CONTROL_OVERRIDE",

    "ORBITAL_SYSTEM_STABILIZED"
}
