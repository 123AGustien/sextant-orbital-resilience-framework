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
        self.anomaly_factor = 0.0

    def inject_anomaly(self, component: str, severity: float):
        self.anomaly_factor = severity

        # simple degradation model
        if component == "orbital":
            self.state.orbital_health -= severity
        elif component == "comms":
            self.state.comms_health -= severity
        elif component == "ai":
            self.state.ai_confidence -= severity
        elif component == "ground":
            self.state.ground_system_health -= severity

    def propagate_cascade(self):

        avg_health = (
            self.state.orbital_health +
            self.state.comms_health +
            self.state.ai_confidence +
            self.state.ground_system_health
        ) / 4

        # cascade effect (system-wide degradation)
        if avg_health < 0.7:
            self.state.ai_confidence *= 0.95
            self.state.comms_health *= 0.97

        if avg_health < 0.5:
            self.state.orbital_health *= 0.95
            self.state.ground_system_health *= 0.95

    def report(self):

        overall_risk = 1 - (
            self.state.orbital_health +
            self.state.comms_health +
            self.state.ai_confidence +
            self.state.ground_system_health
        ) / 4

        return {
            "overall_risk": round(overall_risk, 3),
            "state": self.state
        }
