from dataclasses import dataclass

@dataclass
class SystemState:
    orbital_health: float
    comms_health: float
    ai_confidence: float
    ground_system_health: float


class CascadeSimulationEngine:

    def __init__(self, state: SystemState):
        self.state = state
        self.anomaly = None
        self.severity = 0.0

    def inject_anomaly(self, component: str, severity: float):
        self.anomaly = component
        self.severity = severity

    def propagate_cascade(self):

        if self.anomaly == "orbital_sensor":
            self.state.orbital_health -= 0.3 * self.severity
            self.state.comms_health -= 0.2 * self.severity

        elif self.anomaly == "comms_failure":
            self.state.comms_health -= 0.5 * self.severity
            self.state.ai_confidence -= 0.2 * self.severity

        elif self.anomaly == "ground_system":
            self.state.ground_system_health -= 0.4 * self.severity
            self.state.ai_confidence -= 0.1 * self.severity

        # clamp values
        self.state.orbital_health = max(0, min(1, self.state.orbital_health))
        self.state.comms_health = max(0, min(1, self.state.comms_health))
        self.state.ai_confidence = max(0, min(1, self.state.ai_confidence))
        self.state.ground_system_health = max(0, min(1, self.state.ground_system_health))

    def report(self):

        avg_risk = 1 - (
            self.state.orbital_health +
            self.state.comms_health +
            self.state.ai_confidence +
            self.state.ground_system_health
        ) / 4

        return {
            "orbital_health": self.state.orbital_health,
            "comms_health": self.state.comms_health,
            "ai_confidence": self.state.ai_confidence,
            "ground_system_health": self.state.ground_system_health,
            "overall_risk": round(avg_risk, 3)
        }
