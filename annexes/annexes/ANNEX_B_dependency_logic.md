# 📄 Annex B — Dependency Model Logic

## 🧭 Purpose

This annex defines the deterministic logic governing how dependencies between nodes influence system behaviour within the Sextant Orbital Resilience Framework.

It specifies how state changes propagate through a structured dependency graph.

---

## 🧠 Core Principle

System behaviour is determined by **directed dependency influence**, where:

> A node’s state is a function of the states of the nodes it depends on.

---

## 🔗 1. Dependency Definition

A dependency relationship is defined as:

- Node A depends on Node B  
- Node B influences the operational state of Node A  

Formally:

```text id="dep1"
B → A (B influences A)
