"""
🚆 Transport Trace Events v1
Sextant Orbital Resilience Framework

Defines standardized transport trace events
for execution logging and replay systems.
"""


TRANSPORT_TRACE_EVENTS = {

    # ---------------------------------
    # CONGESTION EVENTS
    # ---------------------------------

    "CONGESTION_DETECTED",

    "CONGESTION_MITIGATION_ACTIVATED",

    "TRAFFIC_REROUTE_INITIATED",

    # ---------------------------------
    # NODE EVENTS
    # ---------------------------------

    "NODE_FAILURE_DETECTED",

    "NODE_RECOVERY_STARTED",

    "NODE_BACKUP_ACTIVATED",

    # ---------------------------------
    # ROUTING EVENTS
    # ---------------------------------

    "ROUTE_BREAKDOWN_DETECTED",

    "LOGISTICS_REROUTE_EXECUTED",

    "ALTERNATE_PATH_SELECTED",

    # ---------------------------------
    # SCHEDULE EVENTS
    # ---------------------------------

    "SCHEDULE_DESYNC_DETECTED",

    "DELAY_BUFFERING_ENABLED",

    "TIMING_REALIGNMENT_COMPLETED",

    # ---------------------------------
    # SYSTEM EVENTS
    # ---------------------------------

    "THROUGHPUT_COLLAPSE_DETECTED",

    "EMERGENCY_REDIRECT_ACTIVATED",

    "TRANSPORT_SYSTEM_STABILIZED"
}
