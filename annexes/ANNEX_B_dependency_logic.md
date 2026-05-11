# 📄 Annex B — Dependency Model Logic

---

## 🧭 Purpose

This annex defines how dependencies between system nodes are evaluated within the Sextant Orbital Resilience Framework.

It forms the logical bridge between:

- Annex A → Input Structure
- Annex C → Cascade Behaviour

It ensures all system behaviour is derived from explicit dependency relationships.

---

## 🧠 Core Concept

The system operates as a **deterministic dependency graph**, where:

- Nodes represent system components
- Edges represent dependency relationships
- Node state is derived from upstream dependencies

A node does not operate in isolation — its state is fully determined by its dependency inputs.

---

## 🔗 1. Dependency Definition Model

Each node explicitly declares dependencies:

```json
{
  "node_id": "A",
  "dependencies": ["B", "C"]
}
