# 🛰️ Structure Rules — Sextant Orbital Resilience Framework

## Core Principle

Each directory has a single responsibility.

---

## 📁 scenarios/

Input-only layer.
Contains simulation definitions only.

No execution logic allowed.

---

## 📁 core/

Simulation engine only.

No API logic, no scenario definitions.

---

## 📁 api/

Request handling and response formatting only.

No simulation math or graph logic.

---

## 📁 governance/

System rules, boundaries, and constraints.

No execution code.

---

## 🚫 Violation Rule

Mixing responsibilities across folders is not allowed.

All modules must remain isolated.
