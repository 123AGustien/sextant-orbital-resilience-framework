# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Architecture Diagram (System Flow Map)

---

## 🧭 Purpose

This document provides a visual representation of how the Sextant Orbital Resilience Framework operates across its layered architecture.

It shows:

- system layers  
- data flow direction  
- cascade propagation logic  
- interpretation pipeline  

---

## 🧠 High-Level System Flow

```text id="flow1"
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
