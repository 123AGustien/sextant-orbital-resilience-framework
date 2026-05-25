# 🛰️ Schema Enforcement Engine v2  
## Sextant Orbital Resilience Framework

---

## 🧭 Overview

The Schema Enforcement Engine v2 is a core validation layer of the Sextant Orbital Resilience Framework.

It ensures that all scenario definitions are structurally valid, referentially consistent, and state-complete before execution.

This module acts as the **first gate in the deterministic execution pipeline**, preventing malformed or inconsistent scenarios from entering simulation or evaluation stages.

---

## 📍 File Location

core/schema/schema_enforcer_v2.py

---

## 🧠 System Role

The Schema Enforcer operates as a **pre-execution integrity gate**.

It is responsible for validating:

- Structural correctness of scenario definitions
- Domain legitimacy
- Node consistency across all mappings
- Dependency integrity
- State validity

---

## 🚫 Non-Responsibilities

This module does NOT:

- Execute simulations
- Modify scenario behavior
- Perform evaluation or scoring
- Generate traces or logs
- Apply governance logic

---

## ⚙️ Core Validation Functions

The engine enforces five major validation layers:

### 1. Required Field Validation
Ensures all mandatory fields exist:
- scenario_id
- domain
- nodes
- dependencies
- initial_state
- expected_states

---

### 2. Domain Validation
Ensures scenario belongs to a valid system category:

- orbital
- telecom
- maritime
- energy
- cloud

---

### 3. Structural Validation
Ensures correct data types:
- nodes → list
- dependencies → dict
- initial_state → dict
- expected_states → dict

---

### 4. State Validation
Ensures all node states are valid and consistent:

Allowed states:
- HEALTHY
- DEGRADED
- FAILED
- RECOVERING

Rules:
- All nodes must exist in state mappings
- No unknown nodes allowed in state definitions

---

### 5. Dependency Integrity Validation
Ensures graph consistency:

Rules:
- All dependency nodes must exist in node list
- Dependencies must be lists
- No references to unknown nodes allowed

---

## 📥 Input Structure

```json
{
  "scenario_id": "orbital_cascade_v1",
  "domain": "orbital",
  "nodes": [
    "satellite_A",
    "satellite_B"
  ],
  "dependencies": {
    "satellite_B": ["satellite_A"]
  },
  "initial_state": {
    "satellite_A": "HEALTHY",
    "satellite_B": "DEGRADED"
  },
  "expected_states": {
    "satellite_A": "HEALTHY",
    "satellite_B": "DEGRADED"
  }
}
