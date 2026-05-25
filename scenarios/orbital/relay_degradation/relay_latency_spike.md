# 🛰️ Relay Degradation Scenario (Latency Spike)

## Domain
Orbital Infrastructure Resilience Simulation

---

## Scenario Name
Relay Latency Spike

---

## Purpose
This scenario models degradation in an orbital relay node where communication is still active, but latency increases significantly, causing delayed propagation across the system.

---

## System Nodes

- satellite_A (source node)
- relay_satellite_B (degraded relay node)
- ground_station_1 (destination node)

---

## Dependency Structure

satellite_A → relay_satellite_B → ground_station_1

---

## Initial Condition

relay_satellite_B experiences performance degradation (not full failure)

---

## Degradation Behavior

- relay_satellite_B introduces increased latency
- message propagation becomes delayed and unstable
- system remains partially functional but unreliable

---

## Propagation Effects

- satellite_A continues transmitting
- relay_satellite_B processes data with delay
- ground_station_1 receives intermittent or delayed signals

---

## Expected System States

- satellite_A: HEALTHY
- relay_satellite_B: DEGRADED
- ground_station_1: DEGRADED (intermittent)

---

## Resilience Objective

Evaluate system tolerance to non-fatal relay degradation and identify threshold where latency becomes system-breaking.

---

## Notes

This scenario represents early-stage failure behavior before full system collapse.
