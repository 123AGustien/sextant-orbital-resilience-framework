"""
🛰️ Orbital Scenario Rules v1
Sextant Orbital Resilience Framework

Defines deterministic rules for each orbital scenario.
"""


ORBITAL_SCENARIO_RULES = {


    "SIGNAL_LOSS": {

        "trigger":
            "LOSS_OF_PRIMARY_SIGNAL",

        "risk_level":
            "HIGH",

        "checks": [

            "VERIFY_BACKUP_LINK",

            "CHECK_RELAY_AVAILABILITY",

            "ASSESS_TELEMETRY_CONTINUITY"

        ],

        "decision":
            "SWITCH_TO_BACKUP_SATELLITE"

    },


    "ORBITAL_DRIFT": {

        "trigger":
            "TRAJECTORY_DEVIATION",

        "risk_level":
            "MEDIUM",

        "checks": [

            "VERIFY_ORBIT_POSITION",

            "CHECK_NAVIGATION_CORE",

            "CALCULATE_CORRECTION_PATH"

        ],

        "decision":
            "INITIATE_TRAJECTORY_CORRECTION"

    },


    "TELEMETRY_CORRUPTION": {

        "trigger":
            "DATA_INTEGRITY_FAILURE",

        "risk_level":
            "MEDIUM",

        "checks": [

            "VERIFY_SENSOR_DATA",

            "ENABLE_SIGNAL_FILTERING",

            "REDUCE_TELEMETRY_RATE"

        ],

        "decision":
            "ENABLE_LOW_BAND_TELEMETRY"

    },


    "POWER_FAILURE": {

        "trigger":
            "PRIMARY_POWER_LOSS",

        "risk_level":
            "CRITICAL",

        "checks": [

            "VERIFY_POWER_SOURCE",

            "PROTECT_CRITICAL_SYSTEMS",

            "INITIATE_RECOVERY_MODE"

        ],

        "decision":
            "ACTIVATE_POWER_RECOVERY_MODE"

    },


    "INERTIAL_DESYNCHRONIZATION": {

        "trigger":
            "GUIDANCE_ALIGNMENT_FAILURE",

        "risk_level":
            "HIGH",

        "checks": [

            "VERIFY_STAR_TRACKER",

            "CHECK_INERTIAL_GUIDANCE",

            "RESTORE_ORIENTATION_REFERENCE"

        ],

        "decision":
            "RECALIBRATE_INERTIAL_GUIDANCE"

    }

}