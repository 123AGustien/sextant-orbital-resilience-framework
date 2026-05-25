"""
🚆 Transport Failure Profiles v1
Sextant Orbital Resilience Framework

Defines transport-specific failure semantics
and operational impact descriptions.
"""


TRANSPORT_FAILURE_PROFILES = {

    # ---------------------------------
    # ROUTE CONGESTION FAILURE
    # ---------------------------------

    "ROUTE_CONGESTION": {

        "severity": "MEDIUM",

        "effects": [
            "traffic_accumulation",
            "routing_delay",
            "throughput_reduction"
        ],

        "recommended_action": (
            "ACTIVATE_CONGESTION_MITIGATION"
        )
    },

    # ---------------------------------
    # NODE FAILURE
    # ---------------------------------

    "NODE_FAILURE": {

        "severity": "HIGH",

        "effects": [
            "route_breakdown",
            "logistics_disruption",
            "service_interruption"
        ],

        "recommended_action": (
            "REROUTE_LOGISTICS_PATHS"
        )
    },

    # ---------------------------------
    # SCHEDULE DESYNC
    # ---------------------------------

    "SCHEDULE_DESYNC": {

        "severity": "MEDIUM",

        "effects": [
            "timing_misalignment",
            "dispatch_delay",
            "supply_chain_latency"
        ],

        "recommended_action": (
            "ENABLE_DELAY_BUFFERING"
        )
    },

    # ---------------------------------
    # THROUGHPUT COLLAPSE
    # ---------------------------------

    "THROUGHPUT_COLLAPSE": {

        "severity": "CRITICAL",

        "effects": [
            "system_bottleneck",
            "network_stall",
            "logistics_gridlock"
        ],

        "recommended_action": (
            "EMERGENCY_REDIRECT_NODE"
        )
    },

    # ---------------------------------
    # SIGNAL FAILURE
    # ---------------------------------

    "SIGNAL_FAILURE": {

        "severity": "HIGH",

        "effects": [
            "communication_loss",
            "tracking_loss",
            "coordination_failure"
        ],

        "recommended_action": (
            "ACTIVATE_BACKUP_ROUTING"
        )
    }
}
