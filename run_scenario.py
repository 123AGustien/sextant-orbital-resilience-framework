# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Scenario Runner (Root Execution Entry Point)

---

## 🧠 Purpose

This script is the **primary execution entry point** for running a deterministic scenario simulation.

It connects:
- Simulation runtime
- Orbital mechanics layer
- Scenario engine

and produces a final resilience output.

---

## ⚙️ Execution Flow

```text
INITIALISE DEPENDENCIES
        │
        ▼
CREATE RUNTIME CONTEXT (MissionSimulationRuntime)
        │
        ▼
LOAD MECHANICS ENGINE (OrbitalMechanicsLayer)
        │
        ▼
INITIALISE SCENARIO ENGINE
        │
        ▼
LOAD DEFAULT SCENARIO
        │
        ▼
RUN SIMULATION
        │
        ▼
PRINT FINAL OUTPUT
