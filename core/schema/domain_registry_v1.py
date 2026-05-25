# 🌐 Domain Registry v1  
## Sextant Orbital Resilience Framework

---

## 🧭 Overview

The Domain Registry defines all valid system categories used in the Sextant Orbital Resilience Framework.

Every scenario must belong to one approved domain to ensure consistent validation, governance, and execution behavior.

---

## 📍 File Location

core/schema/domain_registry_v1.py

---

## 🧩 Supported Domains

### 🛰️ orbital
Space-based systems, including:

- Satellites  
- Orbital constellations  
- Space probes  
- Navigation and inertial systems  

---

### 📡 telecom
Communication infrastructure systems, including:

- Cellular networks  
- Internet backbone systems  
- Signal routing infrastructure  
- Data transmission systems  

---

### 🚢 maritime
Marine and shipping systems, including:

- Cargo fleets  
- Naval vessels  
- Port operations  
- Maritime logistics networks  

---

### ⚡ energy
Power generation and distribution systems, including:

- Electrical grids  
- Power plants  
- Transmission systems  
- Load balancing networks  

---

### ☁️ cloud
Distributed computing systems, including:

- Cloud infrastructure  
- Data centers  
- Microservices architectures  
- Virtualized compute systems  

---

### 🚆 transport
Mobility and logistics systems, including:

- Rail networks  
- Road transport systems  
- Air traffic systems  
- Public transit systems  
- Freight and logistics routing  

---

## 🧠 System Role

The Domain Registry is used across:

- Schema validation (domain enforcement)
- Governance risk classification
- Scenario execution routing
- CI pipeline validation gates

---

## 🚫 Invalid Domains

Any domain not listed here will:

- Fail schema validation  
- Trigger governance rejection  
- Block CI execution  

---

## 🛰️ Design Principle

> “Every scenario must exist within a defined operational universe.”

---

## 🔧 Expansion Policy

New domains must:
- Be added here first  
- Be supported in SchemaEnforcerV2  
- Be mapped in GovernanceAuditV2  
- Pass CI validation before use
