"""
🌐 Cross-Domain Registry v1
Sextant Orbital Resilience Framework

Defines interaction mapping between domains.
"""


CROSS_DOMAIN_RELATIONSHIPS = {

    # ---------------------------------
    # ORBITAL IMPACTS TRANSPORT
    # ---------------------------------

    "orbital": {
        "impacts": ["transport"],

        "mappings": {
            "SIGNAL_LOSS": [
                "TRANSPORT_SIGNAL_FAILURE",
                "ROUTE_SYNCHRONIZATION_DELAY"
            ],

            "ORBITAL_DRIFT": [
                "SCHEDULE_DESYNC",
                "DISPATCH_LATENCY"
            ],

            "POWER_FAILURE": [
                "THROUGHPUT_COLLAPSE",
                "LOGISTICS_DISRUPTION"
            ]
        }
    },

    # ---------------------------------
    # TRANSPORT IMPACTS ORBITAL
    # ---------------------------------

    "transport": {
        "impacts": ["orbital"],

        "mappings": {
            "THROUGHPUT_COLLAPSE": [
                "TELEMETRY_BACKPRESSURE",
                "GROUND_SYNC_DELAY"
            ],

            "NODE_FAILURE": [
                "MISSION_CONTROL_DEGRADED_MODE"
            ],

            "SCHEDULE_DESYNC": [
                "ORBITAL_TIMING_DRIFT"
            ]
        }
    }
}
