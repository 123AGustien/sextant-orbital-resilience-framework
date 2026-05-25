# 🛰️ Orbital Scenario Schema Standard (v1)

## Purpose
This document defines a unified structure for all orbital resilience scenarios in the Sextant framework.

It ensures all scenarios are:
- machine-readable
- structurally consistent
- comparable across failure types
- compatible with simulation engine evaluation

---

## 🧱 Standard Scenario Structure

Every scenario MUST include the following fields:

### 1. Identity Layer
- Scenario Name
- Domain
- Failure Type Classification

---

### 2. System Model Layer
- Nodes
- Roles (optional but recommended)
- Dependency Structure

---

### 3. Failure Definition Layer
- Initial Condition
- Failure Trigger
- Failure Type (hard / soft / systemic)

---

### 4. Propagation Layer
- How failure spreads
- Dependency impact rules
- Secondary effects

---

### 5. State Model Layer

Allowed node states:

- HEALTHY
- DEGRADED
- FAILED
- RECOVERING

---

### 6. Outcome Layer
- Expected system states
- System degradation summary
- Cascade description

---

### 7. Resilience Layer
- Objective of the scenario
- What is being tested
- Stress condition type

---

## 🧭 Standard Rule

All scenarios MUST be deterministic in description:
- same input → same outcome
- no probabilistic ambiguity in scenario definition

---

## 🚫 Forbidden in Scenario Files

- real-world operational control logic
- live system integration instructions
- external API execution behavior
- ambiguous failure definitions

---

## 🛰️ Design Principle

Scenarios are not instructions.

They are structured **failure models for simulation only**.
