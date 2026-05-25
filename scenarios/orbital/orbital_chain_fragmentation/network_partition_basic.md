# 🛰️ Orbital Chain Fragmentation Scenario (Network Partition)

## Domain
Orbital Infrastructure Resilience Simulation

---

## Scenario Name
Basic Orbital Network Partition

---

## Purpose
This scenario models a structural failure where the orbital communication network becomes fragmented into disconnected sub-networks, preventing full system-wide connectivity.

---

## System Nodes

- satellite_A (cluster 1 node)
- satellite_B (bridge node)
- satellite_C (cluster 2 node)
- ground_station_1 (control endpoint)

---

## Dependency Structure

satellite_A ↔ satellite_B ↔ satellite_C → ground_station_1

---

## Initial Condition

satellite_B fails as a bridging node, splitting the network into disconnected segments.

---

## Failure Behavior

- satellite_B is removed from communication topology
- satellite_A and satellite_C lose direct connectivity
- network splits into isolated clusters

---

## Propagation Effects

- cluster 1 (satellite_A) operates without visibility of cluster 2
- cluster 2 (satellite_C → ground_station_1) continues partial operation
- system-wide coordination is lost

---

## Expected System States

- satellite_A: DEGRADED (isolated cluster)
- satellite_B: FAILED
- satellite_C: DEGRADED (partial isolation)
- ground_station_1: DEGRADED (reduced network completeness)

---

## Resilience Objective

Evaluate system robustness under topology fragmentation and assess the impact of losing bridge nodes in orbital networks.

---

## Notes

This scenario represents structural network failure where the system is not fully down, but fragmented into independent operational islands.
