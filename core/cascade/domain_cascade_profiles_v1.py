"""
🛰️ Domain Cascade Profiles v1
Sextant Orbital Resilience Framework

Defines domain-specific cascade behaviors
and propagation semantics.
"""


DOMAIN_CASCADE_PROFILES = {

    # ---------------------------------
    # ORBITAL DOMAIN
    # ---------------------------------
    "orbital": {

        "cascade_effects": [
            "navigation_degradation",
            "telemetry_loss",
            "timing_desynchronization",
            "route_instability"
        ],

        "propagates_to": [
            "transport"
        ]
    },

    # ---------------------------------
    # TRANSPORT DOMAIN
    # ---------------------------------
    "transport": {

        "cascade_effects": [
            "routing_congestion",
            "schedule_instability",
            "logistics_delay",
            "throughput_degradation"
        ],

        "propagates_to": []
    }
}
