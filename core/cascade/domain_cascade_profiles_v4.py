"""
🌐 Domain Cascade Profiles v4
Cloud domain integrated into cascade system.
"""

DOMAIN_CASCADE_PROFILES = {

    "cloud": {
        "impacts": ["energy", "transport", "maritime"],

        "failure_map": {

            "API_GATEWAY_FAILURE": [
                "SERVICE_OUTAGE",
                "AUTHENTICATION_FAILURE"
            ],

            "DATABASE_CLUSTER_FAILURE": [
                "DATA_UNAVAILABLE",
                "SYSTEM_WIDE_LATENCY"
            ],

            "COMPUTE_CLUSTER_FAILURE": [
                "WORKLOAD_BACKLOG",
                "CASCADING_SERVICE_DEGRADATION"
            ]
        }
    }
}
