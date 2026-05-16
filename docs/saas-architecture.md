# Sextant SaaS Architecture (Production Blueprint)

This document defines the full system architecture of the Sextant Orbital Resilience Framework when deployed as a SaaS API platform.

---

# 🧭 System Overview

The platform is structured as a **layered deterministic simulation SaaS system**.

```text id="system_overview"
Client
  ↓
API Gateway (FastAPI)
  ↓
Authentication Layer
  ↓
Usage & Billing Layer
  ↓
Core Simulation Engine
  ↓
Risk & Cascade Models
  ↓
Response Output
