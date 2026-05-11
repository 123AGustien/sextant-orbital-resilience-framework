# 📄 Annex D — Output Interpretation Framework

## 🧭 Purpose

This annex defines how simulation outputs are structured, interpreted, and evaluated within the Sextant Orbital Resilience Framework.

It translates raw simulation states into **resilience-readable system intelligence**.

---

## 🧠 Core Principle

Simulation outputs represent:

> The state evolution of a dependency-driven system under cascade stress conditions.

Outputs are not logs — they are **structured system state interpretations**.

---

## 📊 1. System State Classification

Each simulation state is classified into one of the following:

- **Nominal** → system operating normally  
- **Degraded** → partial performance loss  
- **Stressed** → active instability present  
- **Cascade Active** → propagation ongoing  
- **Critical** → multi-node systemic degradation  
- **Collapsed** → system-wide failure state  

---

## 📈 2. Resilience Scoring Model

System resilience is evaluated using a qualitative index:

- **High Resilience** → isolated or no cascade propagation  
- **Moderate Resilience** → contained degradation  
- **Low Resilience** → multi-node cascade activity  
- **Failed Resilience** → uncontrolled propagation or collapse  

---

## 🌊 3. Cascade Impact Mapping

Outputs must include:

- origin node of failure  
- propagation path  
- affected dependency layers  
- final system state  

---

## 🔁 4. Temporal Output Structure

Each simulation step produces:

- active events  
- node state changes  
- cascade propagation updates  
- system evaluation snapshot  

---

## 🧩 5. Output Format Rule

All outputs must remain:

- deterministic  
- reproducible  
- structured  
- time-step aligned  

No ambiguous or free-form interpretation is allowed in simulation outputs.

---

## 🧠 6. Interpretation Layer Separation

This framework strictly separates:

- **Simulation Layer** → generates state changes  
- **Interpretation Layer** → evaluates system meaning  

Interpretation must NOT alter simulation logic.

---

## 📌 7. Failure Signature Model

Each cascade produces a traceable signature:

- origin node  
- propagation chain  
- severity classification  
- stabilization outcome  

This enables reproducible forensic analysis of system behaviour.

---

## 🧭 Summary

This annex defines:

- how system outputs are classified  
- how resilience is measured  
- how cascade impact is interpreted  
- how results remain reproducible and structured
