## 🔁 Scenario Execution Flow

Client Request
    ↓
api/main.py (Gateway)
    ↓
├── api/server.py → /run-scenario
└── api/risk.py   → /risk-score
    ↓
core.engine
    ↓
simulation output

```text
INPUT SCENARIO
    │
    ▼
SCENARIO VALIDATION (scenario_validator)
    │
    ▼
SCENARIO LOADING (scenario_engine)
    │
    ▼
SIMULATION INITIALISATION (simulation_engine)
    │
    ▼
DEPENDENCY EVALUATION (cascade_model / dependency logic)
    │
    ▼
CASCADE PROPAGATION (cascade_model)
    │
    ▼
NODE STATE UPDATES (system state transitions)
    │
    ▼
TRACE LOGGING (optional) (cascade_trace_logger)
    │
    ▼
OUTPUT GENERATION (report_generator)
    │
    ▼
FINAL RESULT (resilience score + cascade report)
