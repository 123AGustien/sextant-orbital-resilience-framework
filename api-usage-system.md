# API Usage System (Sextant SaaS Layer)

This module defines the usage tracking and quota enforcement system for the Sextant Orbital Resilience API.

It is a core component of the SaaS monetization layer.

---

# 🧭 Purpose

The API Usage System ensures:

- Controlled API consumption per user
- Tier-based limits (free / pro)
- Request tracking per API key
- Foundation for billing and subscription enforcement

---

# 📊 System Overview

Each API request is:

1. Authenticated via API key
2. Logged into usage store
3. Checked against tier limits
4. Allowed or blocked accordingly

---

# 🧠 Core Logic

## In-Memory Usage Store

```python id="usage_store"
USAGE = defaultdict(list)
