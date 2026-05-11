# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Scenario Runner (Root Execution Entry Point)

---

## 🧠 Purpose

The Scenario Runner is the **primary deterministic execution entry point** for scenario simulation within the Sextant Orbital Resilience Framework.

It orchestrates all core system layers to produce a reproducible resilience output based on dependency evaluation and cascade propagation.

---

## 🧩 System Architecture Layers

The runner integrates the following core modules:

- MissionSimulationRuntime (execution context layer)  
- OrbitalMechanicsLayer (system physics / behaviour model)  
- ScenarioEngine (scenario orchestration layer)  
- ScenarioValidator (input validation layer)  
- SimulationEngine (runtime execution layer)  
- CascadeModel (dependency + propagation engine)  
- ReportGenerator (output synthesis layer)  
- CascadeTraceLogger (optional observability layer)  

---

## ⚙️ Deterministic Execution Rules

All runs must follow these principles:

- Identical inputs MUST produce identical outputs  
- No hidden state mutations across runs  
- All dependencies MUST be explicitly initialised  
- Execution order MUST remain fixed  
- Cascade propagation MUST be fully traceable  

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
(or injected scenario input)

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
(CascadeModel - dependency graph resolution)

        │
        ▼
EXECUTE CASCADE PROPAGATION
(CascadeModel - failure / influence spread)

        │
        ▼
APPLY NODE STATE UPDATES
(System State Transition Layer)

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
- Resilience Score
- Cascade Impact Map
- System State Summary
