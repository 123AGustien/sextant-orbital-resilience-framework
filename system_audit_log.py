"""
Sextant Orbital Resilience Framework
System Audit Log

Provides deterministic event tracking for all major system layers.

This module ensures full traceability of simulation execution.
"""

import time


class SystemAuditLog:
    """
    Central deterministic audit trail for system events.
    """

    def __init__(self):
        self.logs = []

    # ----------------------------------------
    # CORE LOG ENTRY
    # ----------------------------------------
    def record(self, layer, event_type, data=None):
        """
        Records a structured system event.
        """

        entry = {
            "timestamp": time.time(),
            "layer": layer,
            "event_type": event_type,
            "data": data or {}
        }

        self.logs.append(entry)

    # ----------------------------------------
    # QUERY FUNCTIONS
    # ----------------------------------------
    def get_logs(self):
        return self.logs

    def filter_by_layer(self, layer_name):
        return [log for log in self.logs if log["layer"] == layer_name]

    def filter_by_event(self, event_type):
        return [log for log in self.logs if log["event_type"] == event_type]

    # ----------------------------------------
    # RESET
    # ----------------------------------------
    def reset(self):
        self.logs = []
