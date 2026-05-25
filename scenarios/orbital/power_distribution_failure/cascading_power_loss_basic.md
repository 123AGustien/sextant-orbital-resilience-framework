# 🛰️ Power Distribution Failure Scenario (Cascading Energy Loss)

## Domain
Orbital Infrastructure Resilience Simulation

---

## Scenario Name
Cascading Power Loss Basic

---

## Purpose
This scenario models a cascading power failure in orbital infrastructure where energy instability leads to progressive degradation across multiple dependent nodes in the system.

---

## System Nodes

- satellite_A (power source / relay node)
- satellite_B (intermediate processing node)
- satellite_C (downstream relay node)
- ground_station_1 (final endpoint)

---

## Dependency Structure

satellite_A → satellite_B → satellite_C → ground_station_1

---

## Initial Condition

satellite_A experiences power instability leading to reduced energy output.

---

## Failure Behavior

- satellite_A begins partial power loss
- downstream nodes receive reduced operational capacity
- system-wide performance degrades progressively

---

## Propagation Effects

- satellite_B enters DEGRADED state due to insufficient power input
- satellite_C experiences unstable processing conditions
- ground_station_1 receives intermittent or incomplete data streams

---

## Expected System States

- satellite_A: DEGRADED (power instability)
- satellite_B: DEGRADED
- satellite_C: DEGRADED
- ground_station_1: DEGRADED

---

## Resilience Objective

Evaluate how energy instability propagates through dependent orbital systems and identify cascade amplification points.

---

## Notes

This scenario represents systemic energy dependency failure where instability propagates gradually across the entire network rather than a single-point failure.
