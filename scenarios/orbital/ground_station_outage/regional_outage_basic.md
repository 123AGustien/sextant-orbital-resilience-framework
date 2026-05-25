# 🛰️ Ground Station Outage Scenario (Regional Failure)

## Domain
Orbital Infrastructure Resilience Simulation

---

## Scenario Name
Regional Ground Station Outage

---

## Purpose
This scenario models failure at the ground infrastructure level where a ground station becomes unavailable, affecting all dependent orbital communication links routed through it.

---

## System Nodes

- satellite_A (orbital relay node)
- satellite_B (communication relay node)
- ground_station_1 (primary ground control node)

---

## Dependency Structure

satellite_A → satellite_B → ground_station_1

---

## Initial Condition

ground_station_1 becomes unavailable due to regional outage.

---

## Failure Behavior

- ground_station_1 is fully non-operational
- upstream satellites continue operating
- no uplink/downlink termination is possible through affected station

---

## Propagation Effects

- satellite_B loses downstream communication endpoint
- satellite_A experiences reduced confirmation feedback loops
- system enters disconnected operational mode

---

## Expected System States

- satellite_A: DEGRADED (no confirmation path)
- satellite_B: DEGRADED (relay isolation)
- ground_station_1: FAILED

---

## Resilience Objective

Evaluate system behavior under loss of terrestrial control endpoint and assess fallback dependency paths.

---

## Notes

This scenario represents infrastructure-level failure where orbital assets remain functional but lose ground connectivity.
