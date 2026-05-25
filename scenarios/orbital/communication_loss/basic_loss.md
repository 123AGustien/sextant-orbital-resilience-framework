# 🛰️ Communication Loss Scenario (Basic)

## Domain
Orbital Infrastructure Resilience Simulation

---

## Scenario Name
Basic Communication Loss

---

## Purpose
This scenario models a simple failure where a communication node in an orbital dependency chain fails, causing degradation in downstream connectivity.

---

## System Nodes

- satellite_A (upstream relay node)
- satellite_B (intermediate relay node)
- ground_station_1 (terminal node)

---

## Dependency Structure

satellite_A → satellite_B → ground_station_1

---

## Initial Failure Condition

satellite_B fails

---

## Propagation Behavior

When satellite_B fails:
- satellite_A loses relay capability to downstream systems
- ground_station_1 loses communication feed
- system transitions into degraded connectivity state

---

## Expected System States

- satellite_A: DEGRADED
- satellite_B: FAILED
- ground_station_1: DEGRADED

---

## Resilience Objective

Evaluate how quickly the system loses connectivity and whether alternative routing or redundancy could restore communication.

---

## Notes

This is a baseline deterministic scenario used to validate cascade behavior in orbital communication networks.
