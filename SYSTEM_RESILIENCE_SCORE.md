# 🧭 System Resilience Score (SRS)

## 🧩 System Role

The System Resilience Score (SRS) is a **cross-layer deterministic index** that evaluates overall system resilience across the Sextant Orbital Resilience Framework.

It integrates outputs from:

- 🛰️ Orbital Layer → OCRS (Connectivity Stability)
- 📡 Observability Layer → DHTI (Trace Completeness)
- 💥 Cascade Layer → CPI (Failure Propagation Intensity)

---

## 📊 Core Definition

### Primary Equation

SRS is defined as:

SRS = f(OCRS, DHTI, CPI)

---

### Deterministic Expansion

SRS = OCRS × DHTI × (1 - CPI)

---

## 📡 Component Definitions

### 🛰️ OCRS – Orbital Connectivity Resilience Score
Measures stability of orbital-to-ground communication links under stress conditions.

Range: 0.0 → 1.0

---

### 📡 DHTI – Dependency Health Trace Index
Measures completeness and consistency of system observability and dependency tracing.

Range: 0.0 → 1.0

---

### 💥 CPI – Cascade Propagation Index
Measures intensity of failure propagation across system dependency graphs.

Range: 0.0 → 1.0

- High CPI → strong cascade amplification
- Low CPI → isolated or contained failures

---

## ⚙️ Computation Pipeline

### Step 1 — Collect Layer Outputs
- OCRS from Orbital Layer
- DHTI from Observability Layer
- CPI from Cascade Engine

---

### Step 2 — Normalize Inputs
All inputs must satisfy:

- OCRS ∈ [0, 1]
- DHTI ∈ [0, 1]
- CPI ∈ [0, 1]

---

### Step 3 — Convert Instability to Stability

Cascade impact is inverted:

Stability Factor = (1 - CPI)

---

### Step 4 — Final Computation

SRS = OCRS × DHTI × (1 - CPI)

---

## 📉 Interpretation Scale

| SRS Range | System State |
|------------|--------------|
| 0.80 – 1.00 | Highly resilient |
| 0.50 – 0.79 | Moderately stable |
| 0.20 – 0.49 | Degraded resilience |
| 0.00 – 0.19 | Critical instability |

---

## 🧠 System Meaning

- OCRS → physical / communication stability
- DHTI → observability and trace fidelity
- CPI → cascade fragility and systemic amplification

---

## ⚠️ Design Constraints

- Fully deterministic under identical inputs
- Sandbox-only simulation metric
- No live system interaction
- Must remain cross-reproducible across all simulation layers

---
