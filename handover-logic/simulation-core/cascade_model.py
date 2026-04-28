# Sextant Orbital Resilience Framework
# Simulation Core: Cascading Failure Model (Deterministic)

from dataclasses import dataclass
from typing import Dict, List

# -----------------------------
# System State Definition
# -----------------------------

@dataclass
class SystemState:
    orbital_health: float        # 0.0 - 1.0
    comms_health: float          # satellite-to-ground link
    ai_confidence: float         # AI decision confidence
    ground_system_health: float  # infrastructure stability

    def overall_risk(self) -> float:
        """
        Simple deterministic risk aggregation.
        Lower values = higher risk.
        """
        return (self.orbital_health +
                self.comms_health +
                self.ai_confidence +
                self.ground_system_health) / 4


# -----------------------------
# Cascade Simulation Engine
# -----------------------------

class CascadeSimulationEngine:

    def __init__(self, state: SystemState):
        self.state = state
        self.events: List[str] = []

    def inject_anomaly(self, component: str, severity: float):
        """
        Introduce disturbance into a subsystem.
        severity: 0.0 (low) - 1.0 (critical)
        """

        self.events.append(f"Anomaly injected into {component} | severity={severity}")

        if component == "orbital":
            self.state.orbital_health -= severity * 0.6
            self.state.comms_health -= severity * 0.3

        elif component == "comms":
            self.state.comms_health -= severity * 0.7
            self.state.ai_confidence -= severity * 0.2

        elif component == "ai":
            self.state.ai_confidence -= severity * 0.8
            self.state.ground_system_health -= severity * 0.2

        elif component == "ground":
            self.state.ground_system_health -= severity * 0.9
            self.state.comms_health -= severity * 0.1

        self._apply_bounds()

    def propagate_cascade(self):
        """
        Deterministic cascade propagation logic.
        """

        risk = self.state.overall_risk()

        if risk < 0.3:
            self.events.append("CRITICAL: High cascade probability detected")

            self.state.comms_health -= 0.1
            self.state.ai_confidence -= 0.1

            self.events.append("Cascade propagation activated")

        elif risk < 0.6:
            self.events.append("WARNING: Moderate instability detected")

        else:
            self.events.append("SYSTEM STABLE")

        self._apply_bounds()

    def _apply_bounds(self):
        """
        Ensures system values remain within valid range.
        """
        self.state.orbital_health = max(0.0, min(1.0, self.state.orbital_health))
        self.state.comms_health = max(0.0, min(1.0, self.state.comms_health))
        self.state.ai_confidence = max(0.0, min(1.0, self.state.ai_confidence))
        self.state.ground_system_health = max(0.0, min(1.0, self.state.ground_system_health))

    def report(self) -> Dict:
        """
        Returns system snapshot for governance + audit layer.
        """

        return {
            "orbital_health": self.state.orbital_health,
            "comms_health": self.state.comms_health,
            "ai_confidence": self.state.ai_confidence,
            "ground_system_health": self.state.ground_system_health,
            "overall_risk": self.state.overall_risk(),
            "events": self.events
        }
