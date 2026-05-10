# 🛰️ OrbitalCascadeModel  
## Sextant Orbital Resilience Framework

A deterministic cascade propagation engine for simulating failure spread across orbital systems including satellites, ground stations, and communication links.

---

## ⚙️ Overview

The `OrbitalCascadeModel` models how failures propagate through a dependency graph of orbital infrastructure.

It supports:
- Failure injection
- Recursive cascade propagation
- Cycle-safe traversal
- Standardised simulation API for scenario engine integration

---

## 🧩 Core Class

```python
class OrbitalCascadeModel:
    def __init__(self, system_model):
        self.system = system_model
