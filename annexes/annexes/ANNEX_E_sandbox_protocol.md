# 📄 Annex E — Sandbox Engagement Protocol

---

## 🧭 Purpose

This annex defines how external environments (labs, researchers, evaluation systems) interact with the Sextant Orbital Resilience Framework.

It ensures all engagement is:

- controlled  
- non-operational  
- deterministic  
- sandbox-contained  

---

## 🧠 Core Principle

The framework does NOT execute real-world operations.

It only:

> simulates system behaviour inside a structured dependency and cascade model.

---

## 🧱 1. Sandbox Boundary Definition

All interactions MUST remain within a sandbox environment.

### Allowed:
- simulation inputs  
- structured dependency graphs  
- scenario testing  
- resilience evaluation  

### Not allowed:
- real system control  
- live infrastructure interaction  
- operational command execution  
- external system modification  

---

## 🔗 2. Interaction Model

External labs interact with the framework through a strict pipeline:

### 📥 Input Side
- Annex A → scenario definition  
- structured node graph  
- dependency mapping  

### 📤 Output Side
- Annex C → cascade results  
- Annex D → resilience scoring  
- system state classification  

---

## ⚙️ 3. Role Separation Model

### 🧠 Framework Role
- executes deterministic simulation  
- evaluates dependencies  
- propagates cascades  
- generates structured outputs  

### 🧪 External Lab Role
- provides input scenarios  
- interprets outputs  
- validates model behaviour  
- performs research analysis  

---

## 🔄 4. Execution Pipeline

```text id="sandbox_flow"
Lab Scenario Input  
→ Framework Validation (Annex A)  
→ Dependency Evaluation (Annex B)  
→ Cascade Propagation (Annex C)  
→ Output Interpretation (Annex D)  
→ Structured Result Return
