FINAL WIRING FIX – Auth → Tier → Middleware Enforcement Chain (SaaS Security Layer)

This document defines the final enforcement chain that powers the Sextant SaaS security system.

---

# 🧭 SYSTEM FLOW OVERVIEW

All protected API requests follow this deterministic security pipeline:

```text
API Request
   ↓
API Key Extraction (x-api-key)
   ↓
validate_api_key()
   ↓
get_tier()
   ↓
check_limit(tier)
   ↓
log_request()
   ↓
Simulation / Risk Engine Execution
