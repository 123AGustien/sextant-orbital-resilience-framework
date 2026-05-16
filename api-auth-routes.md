# API Auth Routes (Sextant SaaS Layer)

This module defines the authentication endpoints for the Sextant Orbital Resilience SaaS API.

It enables:
- API key creation
- user onboarding
- tier assignment (free/pro)
- SaaS access provisioning

---

# 🧭 Purpose

The API Auth Routes module acts as the **entry point into the SaaS system**.

Users interact with this layer to obtain API keys before accessing:
- `/simulation/*`
- `/risk/*`

---

# 🔐 Endpoint: Create API Key

## POST `/auth/create-key`

Creates a new API key for a user.

---

## Request Body

```json
{
  "user": "string",
  "tier": "free"
}
