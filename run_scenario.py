# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Scenario Runner (Root Execution Entry Point)

---

## 🧠 Purpose

This script is the primary execution entry point for deterministic scenario simulation within the Sextant Orbital Resilience Framework.

It connects the core system layers:

- 🧩 Mission Simulation Runtime  
- 🛰️ Orbital Mechanics Layer  
- ⚙️ Scenario Engine  

and produces a final resilience output based on cascade evaluation and system state transitions.

---

## ⚙️ System Dependencies

The Scenario Runner requires the following core modules to be initialised before execution:

- MissionSimulationRuntime  
- OrbitalMechanicsLayer  
- ScenarioEngine  
- ScenarioValidator (validation layer)  
- SimulationEngine (execution layer)  
- CascadeModel (dependency propagation)  
- ReportGenerator (output layer)  

All dependencies must be resolved before runtime begins to ensure deterministic behaviour.

---

## 🔁 Execution Flow (Deterministic Pipeline)

```text
INITIALISE DEPENDENCIES
        │
        ▼
CREATE RUNTIME CONTEXT
(MissionSimulationRuntime)
        │
        ▼
LOAD ORBITAL MECHANICS ENGINE
(OrbitalMechanicsLayer)
        │
        ▼
INITIALISE SCENARIO ENGINE
(ScenarioEngine)
        │
        ▼
LOAD DEFAULT SCENARIO
        │
        ▼
VALIDATE SCENARIO STRUCTURE
(ScenarioValidator)
        │
        ▼
INITIALISE SIMULATION ENGINE
(SimulationEngine)
        │
        ▼
RUN DEPENDENCY EVALUATION
(CascadeModel)
        │
        ▼
EXECUTE CASCADE PROPAGATION
(CascadeModel)
        │
        ▼
APPLY NODE STATE UPDATES
(System State Transition Engine)
        │
        ▼
OPTIONAL TRACE LOGGING
(CascadeTraceLogger)
        │
        ▼
GENERATE OUTPUT REPORT
(ReportGenerator)
        │
        ▼
RETURN FINAL RESULT
(Resilience Score + Cascade Analysis)
