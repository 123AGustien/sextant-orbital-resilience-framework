# 📄 Annex C — Cascade Behaviour Rules

## 🧭 Purpose

This annex defines how failures propagate, escalate, and stabilise within the Sextant Orbital Resilience Framework.

It governs the **dynamic behaviour of cascade events** across the dependency graph.

---

## 🌊 Core Principle

A cascade is a **state propagation event triggered by dependency degradation or failure**, which may expand across multiple system layers.

---

## ⚙️ 1. Cascade Trigger Conditions

A cascade is initiated when:

- A node transitions from `nominal → degraded`
- A node transitions from `degraded → failed`
- A critical dependency fails

---

## 🔁 2. Propagation Rule

When a node enters a degraded or failed state:

1. Identify all dependent nodes
2. Evaluate dependency sensitivity
3. Propagate impact downstream
4. Recalculate dependent node states

---

## 📉 3. Cascade Intensity Levels

Cascade severity is classified as:

- **Low** → isolated degradation
- **Medium** → limited multi-node impact
- **High** → multi-layer propagation
- **Critical** → system-wide cascading failure

---

## 🧠 4. Amplification Rule

Cascade intensity increases when:

- multiple dependencies fail simultaneously  
- a high-criticality node fails  
- recursive dependency depth is high  

---

## 🧱 5. Containment Logic

Cascade propagation may be limited by:

- system boundary constraints  
- simulation sandbox limits  
- predefined stability thresholds (future extension)

Containment does NOT reverse failure — it limits propagation.

---

## ⏱️ 6. Temporal Propagation Model

- Cascades are evaluated in discrete time steps  
- Each step processes:
  - new failures
  - propagation effects
  - stabilization checks  

---

## 🔄 7. Stabilization Rule

A cascade stabilises when:

- no new node state changes occur in a time step  
- all downstream effects have been resolved  
- system reaches equilibrium state  

---

## 📌 8. Deterministic Constraint

For identical inputs:

- cascade behaviour is fully reproducible  
- no randomness or probabilistic variation exists  
- propagation order is consistent across executions  

---

## 🧭 Summary

This annex defines:

- how cascades begin  
- how they propagate  
- how intensity is measured  
- how they stabilise  
- how determinism is preserved
