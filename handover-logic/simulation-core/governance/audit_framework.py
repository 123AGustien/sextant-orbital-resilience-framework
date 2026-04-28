# Sextant Orbital Resilience Framework
# Governance Layer: Audit & Traceability Engine

from datetime import datetime
from typing import List, Dict, Any


class AuditEvent:
    def __init__(self, event_type: str, description: str, severity: str = "INFO"):
        self.timestamp = datetime.utcnow().isoformat()
        self.event_type = event_type
        self.description = description
        self.severity = severity

    def to_dict(self) -> Dict[str, Any]:
        return {
            "timestamp": self.timestamp,
            "event_type": self.event_type,
            "description": self.description,
            "severity": self.severity
        }


# -----------------------------
# Governance Audit Engine
# -----------------------------

class GovernanceAuditEngine:

    def __init__(self):
        self.log: List[AuditEvent] = []

    def record_event(self, event_type: str, description: str, severity: str = "INFO"):
        """
        Records all system activity (AI + simulation + human actions)
        """
        event = AuditEvent(event_type, description, severity)
        self.log.append(event)

    def log_ai_decision(self, module: str, output: str, confidence: float):
        self.record_event(
            event_type="AI_DECISION",
            description=f"{module} | output={output} | confidence={confidence}",
            severity="INFO"
        )

    def log_simulation(self, scenario: str, result: str):
        self.record_event(
            event_type="SIMULATION",
            description=f"scenario={scenario} | result={result}",
            severity="INFO"
        )

    def log_human_override(self, operator: str, action: str):
        self.record_event(
            event_type="HUMAN_OVERRIDE",
            description=f"operator={operator} | action={action}",
            severity="CRITICAL"
        )

    def log_escalation(self, level: int, reason: str):
        self.record_event(
            event_type="ESCALATION",
            description=f"level={level} | reason={reason}",
            severity="WARNING"
        )

    def export_log(self) -> List[Dict[str, Any]]:
        """
        Returns full audit trail for compliance / review
        """
        return [event.to_dict() for event in self.log]

    def summary(self) -> Dict[str, int]:
        """
        Simple governance summary for dashboards
        """
        return {
            "total_events": len(self.log),
            "ai_decisions": len([e for e in self.log if e.event_type == "AI_DECISION"]),
            "simulations": len([e for e in self.log if e.event_type == "SIMULATION"]),
            "human_overrides": len([e for e in self.log if e.event_type == "HUMAN_OVERRIDE"]),
            "escalations": len([e for e in self.log if e.event_type == "ESCALATION"]),
        }
