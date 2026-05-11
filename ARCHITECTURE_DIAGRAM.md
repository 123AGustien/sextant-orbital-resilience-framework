---

## 🛰️ System Behaviour Model

The framework operates as:

> A deterministic, layered cascade propagation engine over a dependency graph.

---

## 🔁 Key Flow Properties

- top-down evaluation of system state  
- recursive cascade propagation  
- deterministic execution ordering  
- separation of logic layers  

---

## 🧭 Summary

This diagram represents:

- how data enters the system  
- how dependencies are evaluated  
- how cascades propagate  
- how outputs are generated  

It provides a complete structural map of the framework in a single view.

```
                 ┌──────────────────────┐
                 │   INPUT SCENARIO     │
                 │  (Annex A Format)    │
                 └─────────┬────────────┘
                           │
                           ▼
        ┌────────────────────────────────────┐
        │  DEPENDENCY EVALUATION ENGINE     │
        │        (Annex B Logic)            │
        └─────────┬─────────────────────────┘
                  │
                  ▼
        ┌────────────────────────────────────┐
        │   CASCADE PROPAGATION ENGINE      │
        │        (Annex C Rules)            │
        └─────────┬─────────────────────────┘
                  │
                  ▼
        ┌────────────────────────────────────┐
        │   SYSTEM STATE UPDATE LAYER       │
        │   (Node State Transitions)        │
        └─────────┬─────────────────────────┘
                  │
                  ▼
        ┌────────────────────────────────────┐
        │ OUTPUT INTERPRETATION ENGINE      │
        │        (Annex D Logic)            │
        └─────────┬─────────────────────────┘
                  │
                  ▼
        ┌────────────────────────────────────┐
        │   RESILIENCE SCORING OUTPUT       │
        │   + CASCADE ANALYSIS REPORT       │
        └────────────────────────────────────┘
```

---

# 🌊 Cascade Flow Representation

## Cascade Lifecycle Model

The system evolves through a deterministic cascade sequence:

Node Failure  
→ Dependency Impact  
→ Cascade Propagation  
→ Multi-node Degradation  
→ System Stabilisation


---

## 🧪 Example Scenario Execution

This framework can be evaluated using controlled simulation inputs.

### Example Input Scenario

- Satellite A: nominal  
- Satellite B: dependent on A  
- Ground Station C: dependent on B  

### Injected Event

Satellite A → failure event

### Expected System Behaviour

1. Satellite A transitions to failed state  
2. Dependency Impact propagates to Satellite B  
3. Satellite B enters degraded state  
4. Ground Station C experiences secondary degradation  
5. System stabilisation phase begins after cascade resolution  

### Outcome

- full cascade traceability is preserved  
- all state transitions are deterministic  
- no hidden or external influence exists

