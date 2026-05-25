# 🧮 Core Evaluation Module

## Sextant Orbital Resilience Framework

---

## 🧭 Purpose

The `core/evaluation/` module is responsible for computing resilience metrics from deterministic simulation scenarios.

It converts scenario outputs into structured quantitative indicators.

---

## 🧠 Role in System Architecture

This module sits between:

- 🛰️ Simulation Core (scenario execution + state propagation)
- 📊 Metrics Layer (SSI, CDI, FI, DR, CRS computation)

---

## ⚙️ Responsibilities

### 1. Scenario Analysis
Reads structured scenario definitions and expected system states.

### 2. Metric Computation
Calculates key resilience indicators:

- System Stability Index (SSI)
- Cascade Depth Index (CDI proxy)
- Fragmentation Index (FI)
- Degradation Rate (DR)
- Composite Resilience Score (CRS)

### 3. Output Generation
Produces structured evaluation reports for comparison across scenarios.

---

## 🧩 Key Component

### ScenarioEvaluatorV1

Located at:
