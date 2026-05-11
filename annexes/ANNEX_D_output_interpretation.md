# 📄 Annex D — Output Interpretation Framework

---

## 🧭 Purpose

This annex defines how raw simulation outputs are interpreted into meaningful system-level results.

It transforms:

- node states
- cascade traces
- dependency outcomes

into:

> resilience metrics, system classification, and analytical reports

---

## 🧠 Core Concept

The system output is not just a result — it is a **structured interpretation of system resilience under stress conditions**.

---

## 📊 1. Output Components

A simulation produces three primary outputs:

### 1. Node State Map
- Final state of all nodes
- Nominal / Degraded / Failed classification

### 2. Cascade Trace (optional)
- Step-by-step propagation history
- Failure origin tracking

### 3. Resilience Score
- Aggregated system stability metric

---

## 🧮 2. Resilience Scoring Model

Resilience is calculated based on:

- number of failed nodes
- severity of dependency failures
- cascade depth
- system recovery behaviour

### Example scoring logic:

- 100 → fully stable system
- 70–99 → minor degradation
- 40–69 → moderate cascade impact
- 1–39 → severe system disruption
- 0 → total system failure

---

## 🧩 3. System Classification Output

Each run is classified into:

- 🟢 Stable System
- 🟡 Degraded System
- 🔴 Cascading Failure System
- ⚫ Critical Collapse State

Classification is deterministic and derived from resilience score thresholds.

---

## 🔁 4. Relationship to Cascade Layer

Annex D depends on:

- Annex C → cascade propagation results
- Annex B → dependency evaluation states

It does NOT modify system behaviour — only interprets results.

---

## 📈 5. Reporting Structure

Final output report includes:

- system state summary
- cascade timeline
- resilience score
- critical failure nodes
- dependency breakdown

---

## 🛰️ Summary

Annex D defines:

- how results are interpreted
- how resilience is quantified
- how system behaviour is classified

It is the **analytical layer of the framework**.
