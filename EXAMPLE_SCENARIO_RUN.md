# 🛰️ Sextant Orbital Resilience Framework  
## 📄 Example Scenario Run — Cascade Simulation Demonstration

---

## 🧭 Purpose

This document demonstrates how the Sextant Orbital Resilience Framework executes a deterministic cascade simulation using a simplified orbital dependency model.

It shows:
- input structure
- dependency relationships
- cascade propagation
- system state evolution
- final interpretation

---

## 🧪 Scenario Definition

We simulate a simplified orbital communication network:

### 🧱 Nodes

| Node ID | Type | Criticality |
|--------|------|-------------|
| SAT-A | satellite | high |
| SAT-B | satellite | medium |
| GS-1 | ground_station | high |
| RELAY-1 | relay | medium |

---

## 🔗 Dependency Graph

- SAT-A → depends on RELAY-1  
- SAT-B → depends on RELAY-1  
- RELAY-1 → depends on GS-1  
- GS-1 → independent root node  

---

## ⚙️ Initial Conditions

| Node | State |
|------|------|
| GS-1 | nominal |
| RELAY-1 | nominal |
| SAT-A | nominal |
| SAT-B | nominal |

---

## 💥 Event Trigger (t = 0)

```text id="event1"
GS-1 transitions → degraded
