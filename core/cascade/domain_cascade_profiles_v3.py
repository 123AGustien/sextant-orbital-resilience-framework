"""
🌐 Domain Cascade Profiles v3
Energy domain integrated into cascade system.
"""

DOMAIN_CASCADE_PROFILES = {

    "energy": {
        "impacts": ["transport", "cloud", "maritime"],

        "failure_map": {
            "GRID_FAILURE": [
                "TRANSPORT_SIGNAL_DISRUPTION",
                "CLOUD_SERVICE_OUTAGE"
            ],

            "SUBSTATION_FAILURE": [
                "REGIONAL_BLACKOUT",
                "COMMUNICATION_LATENCY_SPIKE"
            ],

            "LOAD_OVERLOAD": [
                "CASCADING_POWER_DROP",
                "SYSTEM_WIDE_DEGRADATION"
            ]
        }
    }
}
