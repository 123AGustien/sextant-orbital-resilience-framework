# 🛰️ Sextant Orbital Engine v1 — API Contract

## Overview
This document defines the production interface for the Orbital Resilience Simulation Engine.

The system provides deterministic simulation of orbital system failures and cascade propagation across satellite networks.

---

## 🌐 Endpoint

### POST `/run-scenario`

---

## 📥 Request Schema

```json
{
  "scenario_id": "string",
  "orbit_type": "LEO | MEO | GEO",
  "nodes": [
    {
      "id": "A",
      "type": "satellite",
      "state": "HEALTHY"
    }
  ],
  "edges": [
    {
      "from": "A",
      "to": "B",
      "weight": 1.0
    }
  ],
  "initial_failure": "A"
}
