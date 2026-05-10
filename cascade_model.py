# 🛰️ Sextant Orbital Resilience Framework  
## Orbital Dependency Cascade Model

Simulates failure propagation across satellite constellations,  
ground infrastructure, and communication networks.

---

## ⚙️ OrbitalCascadeModel

```python
class OrbitalCascadeModel:
    def __init__(self, system_model):
        """
        system_model: OrbitalSystemModel instance
        """
        self.system = system_model
