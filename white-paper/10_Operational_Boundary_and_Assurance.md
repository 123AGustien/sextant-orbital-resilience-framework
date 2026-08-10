10. Operational Boundary and Assurance

10.1 Purpose

The Sextant Protocol™ Orbital Resilience Framework is a research and simulation environment.

This section defines the boundary between:

- research;
- simulation;
- decision-support;
- engineering validation;
- assurance; and
- operational spacecraft systems.

The purpose is to prevent simulated capability from being incorrectly interpreted as operational capability.

The governing principle is:

SIMULATION BEFORE OPERATION

---

10.2 Operational Boundary

The current Sextant Protocol™ Orbital Resilience Framework does not claim operational authority over spacecraft or mission systems.

The framework is not:

- a spacecraft autopilot;
- a flight-control system;
- a guidance system;
- a navigation system;
- an attitude-control system;
- a propulsion controller;
- an autonomous collision-avoidance system;
- a certified mission-control system;
- or a replacement for qualified spacecraft operators.

Its purpose is research, simulation, validation and decision-support investigation.

---

10.3 No Live Spacecraft Connection

The current research implementation does not claim a live connection to spacecraft.

No operational authority is assigned to:

- OrbitalEngineV1;
- ManoeuvreEngineV1;
- FailsafeTransitionEngineV1;
- ValidationCoreV1;
- MemoryCoreV1;
- AuditCoreV1;
- Golden Rule Engine; or
- Captain AI Lena.

Any displayed manoeuvre, recovery pathway, state transition or recommendation is a simulated research representation.

---

10.4 Simulated Action Versus Operational Action

The distinction between simulated and operational action is fundamental.

The framework may simulate:

- anomaly recognition;
- state transitions;
- recovery pathways;
- communication recovery;
- stabilization;
- escalation;
- decision-support; and
- recovery readiness.

However:

SIMULATED ACTION ≠ OPERATIONAL ACTION

A simulation result does not authorize physical execution.

---

10.5 Human Operational Authority

The current architecture preserves human or mission authority as the final operational decision boundary.

The conceptual pathway is:

OBSERVATION
      ↓
VERIFICATION
      ↓
ASSESSMENT
      ↓
RECOVERY RECOMMENDATION
      ↓
HUMAN / MISSION AUTHORITY
      ↓
AUTHORIZED OPERATIONAL DECISION

The framework does not convert an assessment into an operational command.

The governing principle is:

HUMAN OPERATIONAL AUTHORITY = FINAL

---

10.6 Decision-Support Boundary

The framework may provide decision-support information including:

- system status;
- anomaly classification;
- severity assessment;
- resilience indicators;
- validation results;
- recovery-pathway simulations;
- warnings;
- uncertainty indicators;
- audit information; and
- historical state information.

These outputs are intended to support technical investigation.

They are not substitutes for:

- mission procedures;
- qualified personnel;
- certified systems;
- operational command structures;
- engineering authority; or
- regulatory requirements.

---

10.7 Assurance Levels

Research maturity should not be confused with operational assurance.

A conceptual progression is:

CONCEPT
   ↓
PROTOTYPE
   ↓
REPEATABLE SIMULATION
   ↓
SCENARIO VALIDATION
   ↓
INDEPENDENT REPRODUCTION
   ↓
HIGH-FIDELITY SIMULATION
   ↓
HARDWARE-IN-THE-LOOP
   ↓
INDEPENDENT V&V
   ↓
SYSTEM ASSURANCE
   ↓
MISSION-SPECIFIC QUALIFICATION

The current framework occupies the research and simulation stages.

Movement toward later stages would require substantial additional evidence.

---

10.8 Assurance Is Application-Specific

No single validation result can establish universal spacecraft safety.

Assurance depends upon factors including:

- mission type;
- spacecraft architecture;
- operating environment;
- hardware;
- software;
- communications;
- navigation;
- propulsion;
- control systems;
- failure modes;
- human procedures;
- cybersecurity;
- regulatory requirements; and
- mission risk tolerance.

Therefore, any future operational application would require a mission-specific assurance programme.

---

10.9 System Safety Boundary

The framework does not claim to guarantee system safety.

A simulated resilience score or risk classification should not be interpreted as:

- probability of mission survival;
- probability of spacecraft failure;
- collision probability;
- probability of successful recovery;
- or certified safety margin.

Such interpretations would require appropriate physical models, validated data and engineering assurance.

The research distinction is:

RESILIENCE METRIC ≠ CERTIFIED SAFETY METRIC

---

10.10 Model Fidelity Boundary

Simulation results depend upon the models used.

Potential limitations include:

- simplified orbital mechanics;
- simplified communications behaviour;
- abstracted telemetry;
- simulated sensor information;
- simplified power relationships;
- simplified state transitions;
- assumed dependencies;
- limited environmental representation; and
- incomplete spacecraft-specific information.

A model may be useful for research without being sufficient for operational control.

Therefore:

MODEL OUTPUT ≠ REAL-WORLD GUARANTEE

---

10.11 Software Assurance Boundary

The presence of structured software architecture does not make the framework safety-critical software.

Future higher-assurance development would require consideration of:

- formal requirements;
- architecture assurance;
- code review;
- static analysis;
- automated testing;
- regression testing;
- configuration control;
- dependency management;
- vulnerability assessment;
- build reproducibility;
- software lifecycle controls; and
- independent verification.

The present research implementation should remain classified according to its actual assurance evidence.

---

10.12 Cybersecurity Boundary

Deterministic behaviour does not inherently provide cybersecurity.

The framework therefore makes no assumption that deterministic processing is automatically secure.

Future operational research would need to investigate:

- authentication;
- authorization;
- command-path isolation;
- communication security;
- telemetry integrity;
- software supply-chain security;
- dependency vulnerabilities;
- audit protection;
- malicious input;
- compromised components;
- state manipulation; and
- recovery from cybersecurity events.

The fundamental principle is:

DETERMINISTIC ≠ SECURE

---

10.13 Command-Path Isolation

Any future integration research should preserve a strong separation between research decision-support and operational command pathways.

A conceptual boundary is:

RESEARCH / SIMULATION ENVIRONMENT
             ↓
       ASSESSMENT
             ↓
        VALIDATION
             ↓
      HUMAN DECISION
             ↓
     AUTHORIZED SYSTEM
             ↓
   OPERATIONAL COMMAND PATH

The research framework should not be assumed to have access to an operational command pathway.

Any future connection would require dedicated architecture, security, authorization and assurance controls.

---

10.14 Recovery Boundary

Recovery pathways generated by the framework are simulated research outputs.

Examples may include:

- communication recovery;
- backup communication selection;
- stabilization;
- diagnostic escalation;
- recovery readiness;
- maintenance of safe state; and
- simulated recovery sequencing.

These pathways must not be interpreted as approved spacecraft procedures.

The governing distinction remains:

RECOVERY RECOMMENDATION ≠ RECOVERY AUTHORIZATION

---

10.15 Autonomous Execution Boundary

The current framework does not claim autonomous spacecraft execution authority.

Captain AI Lena is treated within this research context as a supervisory decision-support concept.

The conceptual sequence is:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
ARBITRATE
   ↓
RECOMMEND
   ↓
HUMAN DECISION
   ↓
SIMULATED ACTION
   ↓
UPDATE

Any future autonomous execution would require a separate assurance programme.

---

10.16 Future Autonomy Assurance

Before autonomous operational execution could be considered, future research would need to address:

- formal system requirements;
- hazard analysis;
- failure-mode analysis;
- safety architecture;
- software assurance;
- cybersecurity assurance;
- human factors;
- authority boundaries;
- fail-safe behaviour;
- independent verification and validation;
- mission-specific testing;
- operational procedures; and
- applicable regulatory requirements.

The research direction therefore remains:

SUPERVISORY INTELLIGENCE FIRST

followed only after appropriate assurance by:

AUTONOMOUS EXECUTION

---

10.17 Regulatory Boundary

The Sextant Protocol™ research framework does not represent regulatory approval.

Nothing within the framework constitutes:

- spacecraft certification;
- flight qualification;
- mission authorization;
- navigation approval;
- guidance approval;
- collision-avoidance approval;
- autonomous-control approval;
- safety certification; or
- regulatory acceptance.

Any future operational application would require assessment by the appropriate authorities and mission stakeholders.

---

10.18 Specialist Review Requirement

Higher-assurance development should involve appropriately qualified specialists.

Potential disciplines include:

- spacecraft systems engineering;
- orbital mechanics;
- flight dynamics;
- guidance and control;
- navigation;
- communications;
- software assurance;
- cybersecurity;
- systems safety;
- human factors;
- mission operations;
- reliability engineering; and
- regulatory assurance.

The research framework is intended to provide material that specialists can challenge and evaluate.

---

10.19 Evidence Threshold

Progression toward higher assurance should be based on evidence rather than presentation quality.

Evidence may include:

- repeatable experiments;
- independent reproduction;
- fault-injection results;
- baseline comparisons;
- high-fidelity simulation;
- human-in-the-loop studies;
- hardware-in-the-loop testing;
- independent verification and validation;
- specialist review;
- documented limitations; and
- mission-specific testing.

The principle is:

EVIDENCE BEFORE ASSURANCE

---

10.20 Operational Integration Gate

Any future proposal to connect the framework to operational infrastructure should pass through an explicit integration gate.

A conceptual gate is:

RESEARCH PROPOSAL
      ↓
SYSTEM REQUIREMENTS
      ↓
HAZARD / RISK ANALYSIS
      ↓
CYBERSECURITY ASSESSMENT
      ↓
SOFTWARE ASSURANCE
      ↓
INDEPENDENT V&V
      ↓
HARDWARE / SYSTEM TESTING
      ↓
MISSION-SPECIFIC REVIEW
      ↓
AUTHORIZATION
      ↓
CONTROLLED INTEGRATION

Failure to satisfy an applicable gate should prevent progression to the next stage.

---

10.21 Operational Disengagement

Any future integrated research environment should provide mechanisms to disengage the research framework from operational pathways.

Potential safeguards may include:

- explicit authorization gates;
- command-path isolation;
- safe-state transition;
- independent shutdown;
- communication isolation;
- audit logging;
- operator override; and
- configuration rollback.

These concepts would require detailed engineering before being relied upon in an operational environment.

---

10.22 Failure Does Not Equal Safe State

A critical assurance principle is that a software failure should not automatically be assumed to produce a safe operational state.

Future engineering must explicitly determine:

- failure behaviour;
- degraded behaviour;
- unavailable-module behaviour;
- conflicting-output behaviour;
- communication-loss behaviour;
- validation failure behaviour;
- memory failure behaviour; and
- audit failure behaviour.

The research framework therefore does not claim:

FAILURE = SAFE

Safety behaviour must be demonstrated through appropriate engineering analysis and testing.

---

10.23 Uncertainty Boundary

Decision-support should communicate uncertainty where practical.

Potential uncertainty sources include:

- incomplete information;
- conflicting inputs;
- degraded telemetry;
- model limitations;
- insufficient validation;
- ambiguous state;
- missing historical information; and
- unknown system dependencies.

A high-confidence software output should not automatically be interpreted as high-confidence knowledge of the physical spacecraft.

The distinction is:

SOFTWARE CONFIDENCE ≠ PHYSICAL CERTAINTY

---

10.24 Human Factors Boundary

Technically correct decision-support may still produce poor outcomes if users misunderstand the information.

Future research should therefore examine:

- information presentation;
- alarm fatigue;
- workload;
- automation bias;
- over-trust;
- under-trust;
- uncertainty comprehension;
- recovery recommendation interpretation;
- conflicting information; and
- decision timing.

The framework should be designed to support human judgment rather than encourage unquestioned acceptance.

---

10.25 Operational Readiness Claims

The following claims should not be made on the basis of the current research framework alone:

- flight ready;
- mission ready;
- safety certified;
- autonomous spacecraft ready;
- operationally validated;
- spacecraft qualified;
- collision-avoidance ready;
- flight-control ready; or
- regulatory approved.

Such claims require evidence and authorization appropriate to the intended application.

---

10.26 Research-to-Operation Transition

If future research supports consideration of operational integration, the transition should be gradual.

A conceptual pathway is:

RESEARCH
   ↓
VALIDATED RESEARCH RESULT
   ↓
HIGH-FIDELITY SIMULATION
   ↓
HARDWARE-IN-THE-LOOP
   ↓
CONTROLLED NON-OPERATIONAL INTEGRATION
   ↓
MISSION-SPECIFIC ASSURANCE
   ↓
AUTHORIZED OPERATIONAL DEPLOYMENT

Each transition should be independently justified.

---

10.27 Operational Boundary Statement

The current Sextant Protocol™ Orbital Resilience Framework is:

A DETERMINISTIC ORBITAL-TO-GROUND RESILIENCE RESEARCH AND SIMULATION FRAMEWORK

It is not:

A CERTIFIED SPACECRAFT CONTROL SYSTEM

It provides:

- research;
- simulation;
- validation;
- structured assessment;
- recovery-pathway simulation;
- decision-support;
- memory continuity;
- auditability; and
- human-authority preservation.

It does not provide certified operational spacecraft control.

---

10.28 Assurance Statement

The project adopts the following assurance principle:

NO OPERATIONAL CLAIM WITHOUT OPERATIONAL EVIDENCE

The current research framework therefore makes no claim of:

- flight certification;
- operational qualification;
- autonomous spacecraft authority;
- guaranteed safety;
- mission approval; or
- regulatory acceptance.

Any future claim must be supported by evidence appropriate to the claim.

---

10.29 Research Integrity Boundary

The operational boundary protects both the research programme and potential future users from misunderstanding.

The framework should consistently distinguish:

CONCEPT
   ≠
IMPLEMENTATION
   ≠
SIMULATION
   ≠
VALIDATION
   ≠
ASSURANCE
   ≠
OPERATIONAL QUALIFICATION

These stages should never be represented as equivalent.

---

10.30 Summary

The Operational Boundary and Assurance section establishes a clear separation between the Sextant Protocol™ research environment and real spacecraft operations.

The framework currently provides:

RESEARCH

→ SIMULATION

→ VALIDATION

→ DECISION-SUPPORT

→ AUDITABILITY

while preserving:

HUMAN / MISSION AUTHORITY

The progression toward any future operational application must remain evidence-based:

BUILD → TEST → CHALLENGE → VALIDATE → ASSURE → AUTHORIZE

The central principle remains:

SIMULATION BEFORE OPERATION

EVIDENCE BEFORE ASSURANCE

ASSURANCE BEFORE INTEGRATION

HUMAN AUTHORITY PRESERVED

---

SEXTANT PROTOCOL™

RESEARCH, NOT CERTIFICATION

DECISION-SUPPORT, NOT OPERATIONAL COMMAND

SUPERVISION, NOT UNCONTROLLED AUTONOMY

EVIDENCE BEFORE CLAIM

SIMULATION BEFORE OPERATION