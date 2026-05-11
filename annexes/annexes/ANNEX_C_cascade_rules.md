# 📄 Annex C — Cascade Behaviour Rules

---

## 🧭 Purpose

This annex defines how failures propagate through the system after dependency evaluation (Annex B).

It describes the **deterministic cascade propagation engine** of the Sextant Orbital Resilience Framework.

---

## 🧠 Core Concept

The system operates as a **deterministic cascade propagation network**, where:

- failures are never isolated  
- every node is part of a dependency graph  
- impact propagates through defined relationships only  

A single failure can expand into multi-layer system effects.

---

## 🌊 1. Cascade Lifecycle Model

```text
Node Failure  
→ Dependency Impact  
→ Cascade Propagation  
→ Multi-node Degradation  
→ System Stabilisation
