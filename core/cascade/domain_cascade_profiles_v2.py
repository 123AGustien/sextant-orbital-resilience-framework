"""
🌐 Domain Cascade Profiles v2
Adds Maritime integration into cascade system.
"""

DOMAIN_CASCADE_PROFILES = {

    "maritime": {
        "impacts": ["energy", "transport"],

        "failure_map": {
            "NAVIGATION_FAILURE": [
                "PORT_CONGESTION",
                "ROUTE_DEVIATION"
            ],

            "ENGINE_FAILURE": [
                "SCHEDULE_DELAY",
                "FLEET_DISRUPTION"
            ],

            "RADAR_FAILURE": [
                "SITUATIONAL_BLINDNESS",
                "COLLISION_RISK_INCREASE"
            ]
        }
    }
}
