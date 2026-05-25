# 🛰️ Orbital Resilience Metrics Standard (v1)

## Purpose
This document defines measurable indicators for evaluating system resilience within the Sextant Orbital Simulation Framework.

These metrics allow comparison between different scenarios and quantify cascade behavior.

---

# 📊 1. Cascade Depth Index (CDI)

## Definition
Measures how far a failure propagates through dependency layers.

## Interpretation
- Low CDI → localized failure
- High CDI → system-wide cascade

## Conceptual Model
Failure spreads step-by-step across dependency chains.

---

# 🧭 2. System Stability Index (SSI)

## Definition
Represents overall system health after a failure event.

## Scale
- 1.0 → fully stable
- 0.0 → complete system collapse

## Interpretation
Higher degradation across nodes reduces SSI.

---

# ⚡ 3. Degradation Rate (DR)

## Definition
Measures how quickly system nodes transition from HEALTHY → DEGRADED → FAILED.

## Interpretation
- Fast DR → rapid cascade collapse
- Slow DR → contained failure spread

---

# 🧩 4. Fragmentation Index (FI)

## Definition
Measures how disconnected the system becomes after failure propagation.

## Interpretation
- Low FI → system remains connected
- High FI → system splits into isolated clusters

---

# 🔁 5. Recovery Potential Score (RPS)

## Definition
Estimates how easily the system can recover after failure.

## Depends on:
- remaining HEALTHY nodes
- redundancy in dependencies
- connectivity density

---

# 🛰️ 6. Composite Resilience Score (CRS)

## Definition
A combined indicator of system resilience.

## Conceptual Formula:

CRS = (SSI + RPS) - (CDI + FI + DR)

---

# 🚫 Important Constraint

These metrics are:
- descriptive
- simulation-based
- non-operational

They do NOT represent real-world control parameters.

---

# 🧠 Design Principle

The purpose of metrics is not prediction.

It is:
> structured comparison of simulated failure behavior
