# 🛰️ Orbital Layer – Measurable Simulation Artifact

## Purpose
This document defines the single measurable output produced by the Orbital Systems layer of the Sextant Orbital Resilience Framework.

It enables deterministic evaluation of orbital-to-ground dependency structures in simulation environments.

---

## 🧪 Simulation Artifact

### 📊 Orbital Connectivity Resilience Score (OCRS)

The Orbital Layer produces a deterministic scalar metric:

OCRS = (C_stable × (1 - L_failure)) / (D_critical + ε)

---

## 📡 Parameters

- C_stable: stable satellite-to-ground links during simulation
- L_failure: proportion of failed links under stress injection
- D_critical: weighted critical dependency impact
- ε: numerical stability constant

---

## ⚙️ Outputs

- OCRS (primary resilience score)
- link degradation curve over time
- cascade propagation depth (orbital nodes)
- recovery latency estimate (ground-to-orbit)

---

## 📉 Interpretation

- 0.80 – 1.00 → Highly resilient orbital network
- 0.50 – 0.79 → Moderate degradation under stress
- 0.20 – 0.49 → High cascade vulnerability
- 0.00 – 0.19 → Structural instability

---

## 🛰️ Scope

Used for:
- satellite network resilience modelling
- ground-to-space dependency simulation
- orbital communications stress testing
- academic and institutional research evaluation

---

## ⚠️ Constraints

- simulation-only artifact
- no operational system control
- sandbox execution required

---

## 📌 Design Principles

- deterministic outputs
- reproducible simulation
- transparent dependency modelling
- cross-layer compatibility (cascade + observability)

---
