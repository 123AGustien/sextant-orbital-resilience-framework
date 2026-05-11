# 🛰️ Sextant Orbital Resilience Framework
# Cascade Trace Logger (Execution Visibility Layer)

class CascadeTraceLogger:

    def __init__(self):
        self.trace = []

    def log_event(self, step, node_id, event_type, state_before, state_after):
        self.trace.append({
            "step": step,
            "node_id": node_id,
            "event": event_type,
            "before": state_before,
            "after": state_after
        })

    def log_dependency_trigger(self, source, target):
        self.trace.append({
            "event": "dependency_trigger",
            "source": source,
            "target": target
        })

    def get_trace(self):
        return self.trace

    def print_trace(self):
        print("\n🌊 CASCADE TRACE OUTPUT\n")
        for event in self.trace:
            print(event)
