# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Scenario Runner (Root Execution Entry Point)

---

## 🧠 Purpose

This script is the **primary execution entry point** for deterministic scenario simulation within the Sextant Orbital Resilience Framework.

It connects the core system layers:

- 🧩 Mission Simulation Runtime  
- 🛰️ Orbital Mechanics Layer  
- ⚙️ Scenario Engine  

and produces a **final resilience output based on cascade evaluation and system state transitions**.

---

## ⚙️ System Dependencies

The runner requires the following core modules:

- `MissionSimulationRuntime`
- `OrbitalMechanicsLayer`
- `ScenarioEngine`

All dependencies must be initialised before execution begins.

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
(scenario_validator)
        │
        ▼
RUN SIMULATION
(simulation_engine + cascade_model)
        │
        ▼
EVALUATE SYSTEM STATE TRANSITIONS
(node state updates)
        │
        ▼
OPTIONAL TRACE LOGGING
(cascade_trace_logger)
        │
        ▼
GENERATE FINAL REPORT
(report_generator)
        │
        ▼
OUTPUT FINAL RESULT
(resilience score + cascade analysis)
