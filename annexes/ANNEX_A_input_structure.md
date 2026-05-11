# 📄 Annex A — Input Structure Specification

## 🧭 Purpose

This annex defines the formal input schema used by the Sextant Orbital Resilience Framework for deterministic simulation execution.

It ensures all simulation inputs are:

- structured  
- reproducible  
- dependency-aware  
- machine-interpretable  

---

## 🧱 1. Node Schema

Each system component is represented as a node:

```json
{
  "node_id": "unique_identifier",
  "type": "satellite | ground_station | relay | subsystem",
  "status": "nominal | degraded | failed",
  "dependencies": ["node_id_1", "node_id_2"],
  "metadata": {
    "criticality": "low | medium | high",
    "region": "optional_domain_tag"
  }
}
