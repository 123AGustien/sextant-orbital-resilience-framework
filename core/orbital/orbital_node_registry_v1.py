"""
🛰️ Orbital Node Registry v1
Sextant Orbital Resilience Framework

Defines valid orbital system node types.
"""


ORBITAL_NODE_TYPES = {

    # ---------------------------------
    # SATELLITE SYSTEMS
    # ---------------------------------

    "SATELLITE",
    "BACKUP_SATELLITE",
    "RELAY_SATELLITE",

    # ---------------------------------
    # NAVIGATION SYSTEMS
    # ---------------------------------

    "NAVIGATION_CORE",
    "STAR_TRACKER",
    "INERTIAL_GUIDANCE_UNIT",

    # ---------------------------------
    # COMMUNICATION SYSTEMS
    # ---------------------------------

    "TELEMETRY_NODE",
    "SIGNAL_RELAY",
    "GROUND_LINK_INTERFACE",

    # ---------------------------------
    # POWER SYSTEMS
    # ---------------------------------

    "SOLAR_ARRAY",
    "POWER_DISTRIBUTION_NODE",

    # ---------------------------------
    # CONTROL SYSTEMS
    # ---------------------------------

    "MISSION_CONTROL_INTERFACE",
    "AUTONOMOUS_RECOVERY_NODE"
}
