# 📄 Annex C — Cascade Behaviour Rules

---

## 🧭 Purpose

This annex defines how failures and degradations propagate through the dependency graph defined in Annex B.

It specifies how local node failures evolve into system-wide cascade events.

---

## 🧠 Core Concept

A cascade is a **deterministic propagation of state changes** across dependent nodes.

When a node changes state, its effect propagates downstream through all dependent relationships.

---

## 🔁 1. Cascade Trigger Conditions

A cascade is triggered when:

- A node enters **FAILED** state
- A node enters **DEGRADED** state with high criticality
- A dependency threshold violation occurs

---

## 🌊 2. Propagation Rule

When a node changes state:

- All downstream dependent nodes are notified
- Each dependent node re-evaluates its state
- Changes propagate recursively

This forms a **chain reaction model**.

---

## ⚙️ 3. Cascade Evaluation Logic

For each affected node:

- Collect dependency states
- Apply Annex B evaluation rules
- Update node state

Propagation continues until:

- no further state changes occur
- or system reaches equilibrium

---

## 🧩 4. Cascade Depth Control

To prevent infinite propagation loops:

- Each cascade event has a maximum depth
- Re-evaluation stops when no state change occurs

This ensures deterministic termination.

---

## 🔗 5. Relationship to Dependency Layer

Annex C depends directly on Annex B:

- Dependency graph defines structure
- Cascade rules define dynamic behaviour

---

## 🛰️ 6. System Stabilisation Condition

System stabilises when:

- no node changes state in a propagation cycle
- all dependency evaluations converge

At this point:

> cascade event is considered resolved

---

## 📊 Summary

Annex C defines:

- how failures spread
- how propagation chains form
- how system reaches stability

It is the **dynamic execution engine of the dependency model**.
