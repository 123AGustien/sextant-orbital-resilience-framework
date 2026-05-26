# 🧭 Sextant Orbital Resilience Framework
## Deterministic Dependency Cascade Simulation Engine

---

## 1. Overview

The Sextant Orbital Resilience Framework is a deterministic simulation environment for modeling dependency-driven cascade behavior in complex distributed systems.

It enables structured analysis of system resilience under controlled and reproducible stress conditions using a sandbox-isolated execution model.

The framework is designed for research, benchmarking, and resilience evaluation purposes only and does not interact with live operational systems.

---

## 2. Core Capabilities

- Deterministic dependency graph simulation  
- Cascade failure propagation modeling  
- Multi-step system state evolution  
- Node-state transition analysis  
- Reproducible containerized execution (Docker)  

---

## 3. System States

Each simulated node exists in one of the following states:

- `HEALTHY`
- `DEGRADED`
- `FAILED`
- `RECOVERING`

These states evolve deterministically based on dependency rules and simulation inputs.

---

## 4. Design Principles

### Deterministic Execution
All simulation outputs are fully reproducible given identical inputs.

### Sandbox Isolation
The framework operates in a controlled environment with no interaction with external or production systems.

### Structural Transparency
All dependencies and transitions are explicitly defined and observable.

### Reproducibility
Execution is fully containerized using Docker to ensure consistent results across environments.

### Non-Operational Boundary
This system is strictly a simulation framework and not a control or production system.

---

## 5. Intended Use

This framework is intended for:

- Infrastructure resilience research  
- Dependency graph modeling  
- Cascade failure simulation  
- Controlled stress testing scenarios  
- Academic and institutional evaluation  

---

## 6. Out of Scope

This framework is explicitly not intended for:

- Live production system control  
- Real-time operational decision-making  
- Integration with mission-critical infrastructure  
- Autonomous control of external systems  

---

## 7. System Architecture

Client Request  
→ API Gateway (`/run-scenario`)  
→ Scenario Loader  
→ Cascade Simulation Engine  
→ State Propagation System  
→ Timeline Generator  
→ JSON Response Output  

---

## 8. Execution

Run the simulation using Docker:

```bash
docker compose up --build
