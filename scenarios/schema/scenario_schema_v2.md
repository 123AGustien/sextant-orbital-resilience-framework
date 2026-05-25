# 🛰️ Scenario Schema v2  
## Sextant Orbital Resilience Framework

---

## 🧭 Overview

Scenario Schema v2 defines the **standard structure for all deterministic resilience simulations** within the Sextant system.

It ensures that all scenarios are:

- structurally consistent
- machine-parseable
- cross-domain compatible
- governance-compliant

---

## 📍 Purpose

This schema acts as a **contract between scenario definition and simulation engine**.

It guarantees that every scenario behaves predictably regardless of domain.

---

## 🧱 Core Structure

All scenarios MUST follow this structure:

```json id="schemajson1"
{
  "scenario_id": "string",
  "domain": "orbital | telecom | maritime | energy | cloud",
  "version": "v2",
  "nodes": [],
  "dependencies": {},
  "initial_state": {},
  "failure_conditions": {},
  "expected_states": {}
}
