# 🛰️ Sextant Orbital Resilience Framework

Deterministic cascade simulation and resilience modelling framework for orbital infrastructure systems.

---

## 📌 Current Release

### 🧊 Stable Baseline
**v0.2-stable-freeze**

This release establishes the deterministic runtime baseline for orbital cascade simulation, including:

- OrbitalCascadeModel propagation engine
- MissionSimulationRuntime execution layer
- ScenarioEngine orchestration pipeline
- CI-safe deterministic execution flow

---

## 🌿 Development Branch

- `feature/governance-layer-v1`

Active development for governance and mission intelligence expansion.

---

## 🏗️ System Architecture

The framework is composed of four core layers:

### 1. Orbital Cascade Layer
- Deterministic failure propagation
- Dependency-based cascade simulation
- Recursive impact traversal

### 2. Mission Runtime Layer
- Scenario execution engine
- Event-driven simulation interface
- Deterministic state management

### 3. Scenario Engine Layer
- Time-sequenced mission events
- Multi-step failure simulation
- System state evaluation pipeline

### 4. Governance Layer (In Development)
- Mission health evaluation
- System resilience scoring
- Policy-driven simulation control

---

## ⚙️ Core Capabilities

- Deterministic cascade propagation across dependency graphs
- Ground station, satellite, and link failure simulation
- Recursive cascade safety handling
- Scenario-based mission execution
- CI-integrated simulation validation
- System-wide impact assessment

---

## 🧪 Simulation Model

The system operates on a dictionary-based deterministic model:

```python
{
  "node_id": {
    "status": "nominal | failed:* | degraded:*",
    "dependencies": ["other_node_ids"]
  }
}
