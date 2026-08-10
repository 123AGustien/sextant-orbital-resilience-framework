11. Cybersecurity and System Governance

11.1 Purpose

Cybersecurity and system governance are fundamental research considerations within the Sextant Protocol™ Orbital Resilience Framework.

An orbital resilience architecture cannot be evaluated solely according to its ability to detect simulated anomalies or generate recovery recommendations.

The research must also examine whether information, software components, state transitions, audit records and decision-support pathways can remain trustworthy when inputs are corrupted, unavailable, manipulated or compromised.

The principal research question is:

Can a deterministic orbital resilience architecture maintain traceability, integrity and controlled decision-support when exposed to simulated cybersecurity and information-integrity disturbances?

This remains an experimental research question.

The framework does not assume that determinism automatically provides cybersecurity.

The fundamental distinction is:

DETERMINISTIC ≠ SECURE

---

11.2 Cybersecurity Research Boundary

The current Sextant Protocol™ Orbital Resilience Framework is a research and simulation environment.

Cybersecurity experiments within the framework are intended to investigate simulated system behaviour.

They do not constitute:

- operational spacecraft cybersecurity;
- penetration testing of a live spacecraft;
- testing against an operational satellite network;
- authorised access to spacecraft systems;
- operational command-path testing;
- or certification of aerospace cybersecurity controls.

All cybersecurity conditions should therefore be introduced within controlled and authorised research environments.

The objective is to understand resilience behaviour rather than to demonstrate access to real systems.

---

11.3 Cybersecurity Threat Model

Future research should establish a defined threat model describing the classes of conditions that the simulation is intended to examine.

Potential research categories include:

- corrupted telemetry;
- manipulated sensor information;
- unavailable communications;
- delayed information;
- conflicting data sources;
- compromised software components;
- dependency failure;
- unauthorised state-transition requests;
- audit-record manipulation;
- authentication failure;
- authorisation failure;
- integrity-monitoring failure; and
- simultaneous information and system disturbances.

The threat model should identify:

SOURCE → CONDITION → AFFECTED COMPONENT → DETECTION → VERIFICATION → CONTAINMENT → RECOVERY ASSESSMENT → HUMAN AUTHORITY

The purpose is to provide a structured basis for experimentation.

---

11.4 Information Integrity

Information integrity is critical to any resilience assessment.

A resilience engine can only produce meaningful research results when the information supplied to it is sufficiently trustworthy for the intended experiment.

The framework may therefore investigate:

- input validation;
- data consistency;
- timestamp consistency;
- source identification;
- conflicting telemetry;
- missing information;
- abnormal information patterns;
- integrity indicators; and
- verification requirements.

A representative research pathway is:

INPUT
  ↓
SOURCE IDENTIFICATION
  ↓
INTEGRITY CHECK
  ↓
CONSISTENCY ASSESSMENT
  ↓
VALIDATION
  ↓
ACCEPT / REJECT / ESCALATE

The framework must not automatically treat an available input as a trustworthy input.

---

11.5 Telemetry Integrity Research

Telemetry represents a particularly important research area because decision-support may depend upon information received from distributed system components.

Future experiments may introduce:

- missing telemetry;
- delayed telemetry;
- duplicated telemetry;
- inconsistent telemetry;
- corrupted telemetry;
- implausible values;
- conflicting telemetry sources; and
- sudden changes outside defined simulation expectations.

The objective is to determine whether the architecture can distinguish between:

NO INFORMATION

LOW-CONFIDENCE INFORMATION

CONFLICTING INFORMATION

and

VERIFIED INFORMATION

The research should measure how these conditions affect assessment, verification and decision-support.

---

11.6 Communication Resilience

Communication degradation may affect both spacecraft and ground-side research processes.

The simulation may therefore investigate conditions such as:

COMMUNICATION DEGRADATION
        ↓
INFORMATION REDUCTION
        ↓
INCREASED UNCERTAINTY
        ↓
VERIFICATION DEMAND
        ↓
SAFE-STATE ASSESSMENT
        ↓
RECOVERY ASSESSMENT
        ↓
HUMAN / MISSION AUTHORITY

The purpose is to examine whether the architecture maintains a controlled decision pathway when information availability decreases.

The framework does not claim to provide operational communications protection.

---

11.7 Authentication and Authorisation

Future research should distinguish clearly between authentication and authorisation.

Authentication concerns whether an identity can be established within the simulated environment.

Authorisation concerns whether that identity has permission to perform a particular action.

The research architecture should therefore examine conditions such as:

- unknown identity;
- invalid identity;
- expired authority;
- insufficient authority;
- conflicting authority;
- unauthorised state-transition request;
- and attempted execution without required human approval.

The governing research principle remains:

IDENTITY ≠ AUTHORITY

and:

RECOMMENDATION ≠ AUTHORISATION

---

11.8 Command-Path Isolation

The current orbital research framework does not issue live spacecraft commands.

Nevertheless, command-path isolation should be investigated as a future assurance principle.

A conceptual research architecture is:

SIMULATION ASSESSMENT
        ↓
VERIFICATION
        ↓
RECOVERY RECOMMENDATION
        ↓
HUMAN / MISSION AUTHORITY
        ↓
SIMULATED AUTHORISATION
        ↓
SIMULATED ACTION

No simulated recommendation should automatically become an operational command.

The separation between assessment and execution is therefore an architectural control as well as a research principle.

---

11.9 State Integrity

State information is central to the FailsafeTransitionEngineV1 and related research components.

Future cybersecurity experiments should investigate whether abnormal or manipulated information could cause:

- incorrect state classification;
- invalid state transitions;
- repeated transitions;
- contradictory transitions;
- inappropriate recovery readiness;
- or loss of state continuity.

A representative integrity sequence is:

CURRENT STATE
     ↓
NEW EVENT
     ↓
STATE VALIDATION
     ↓
TRANSITION AUTHORIZATION
     ↓
NEW STATE
     ↓
AUDIT RECORD

The research objective is to determine whether state transitions remain deterministic, explainable and traceable under adverse simulated conditions.

---

11.10 Validation Independence

Cybersecurity resilience should not depend solely upon the component being evaluated.

The ValidationCoreV1 therefore provides a research opportunity to investigate independent checking of:

- input integrity;
- assessment results;
- state transitions;
- recovery pathways;
- authority status;
- and audit information.

The principle remains:

ASSESS → VERIFY → ACCEPT / REJECT / ESCALATE

A cybersecurity-related assessment should not automatically be accepted merely because an upstream component generated it.

---

11.11 Memory Integrity

MemoryCoreV1 provides continuity across simulation events.

That continuity creates an additional research consideration: historical information must itself remain trustworthy.

Future experiments may examine:

- corrupted history;
- missing historical events;
- duplicated records;
- inconsistent timestamps;
- incorrect previous states;
- invalid decision history;
- and interrupted memory updates.

The research question is:

Can the system identify when historical state information should no longer be trusted?

Memory should remain an auditable research component and should never become an uncontrolled source of authority.

---

11.12 Audit Integrity

AuditCoreV1 provides traceability of the research process.

Cybersecurity research should therefore examine whether audit information remains:

- complete;
- sequential;
- attributable;
- timestamped;
- internally consistent;
- resistant to accidental alteration;
- and recoverable following simulated interruption.

A representative audit chain is:

EVENT
 ↓
INPUT
 ↓
ASSESSMENT
 ↓
VERIFICATION
 ↓
STATE TRANSITION
 ↓
RECOVERY ASSESSMENT
 ↓
AUTHORITY DECISION
 ↓
SIMULATED OUTCOME

If the audit chain cannot be reconstructed, that limitation should itself become a recorded research result.

---

11.13 Software Supply-Chain Research

Future assurance work should examine the software dependencies upon which the research framework relies.

Areas of investigation may include:

- dependency inventory;
- version control;
- dependency provenance;
- package integrity;
- vulnerability monitoring;
- build reproducibility;
- release traceability;
- configuration management;
- and removal or replacement of unsupported dependencies.

A research prototype should maintain sufficient documentation to allow reviewers to understand which software components contribute to experimental results.

---

11.14 Configuration Control

Experimental cybersecurity results are meaningful only when the configuration used to obtain them is known.

Each significant experiment should therefore record, where practical:

- software version;
- configuration version;
- scenario version;
- dependency versions;
- test parameters;
- fault-injection configuration;
- execution environment;
- and relevant changes since previous experiments.

Configuration changes should trigger appropriate regression testing.

---

11.15 Fault Containment Research

Cybersecurity-related abnormalities should be examined together with the broader cascade-resilience research programme.

A conceptual pathway is:

COMPROMISED OR UNTRUSTED INPUT
        ↓
DETECTION
        ↓
VERIFICATION
        ↓
ISOLATION / CONTROLLED STATE
        ↓
SAFE-STATE ASSESSMENT
        ↓
RECOVERY ASSESSMENT
        ↓
HUMAN / MISSION AUTHORITY

The purpose is to investigate whether suspicious information can be prevented from unnecessarily propagating through dependent simulated assessment layers.

This does not constitute a claim of physical spacecraft cybersecurity containment.

---

11.16 Cybersecurity Fault Injection

Controlled cybersecurity fault injection should form part of future experimental campaigns.

Potential scenarios include:

- corrupted telemetry;
- altered scenario parameters;
- invalid authentication state;
- unauthorised simulated request;
- compromised dependency;
- audit-record alteration;
- conflicting data source;
- state inconsistency;
- memory corruption;
- communication interruption; and
- simultaneous information-integrity failures.

Each experiment should document:

- fault identifier;
- injection point;
- initial conditions;
- expected response;
- observed response;
- validation result;
- containment behaviour;
- authority state; and
- audit outcome.

The objective is to determine whether the framework fails visibly and traceably rather than silently.

---

11.17 Adversarial Research

Future research may include controlled adversarial experiments designed to determine whether assumptions within the resilience architecture remain valid under deliberately hostile simulated conditions.

Such research should remain restricted to authorised environments.

Potential objectives include investigating whether the system can recognise:

- contradictory information;
- manipulated inputs;
- abnormal state requests;
- unexpected dependency behaviour;
- false recovery indicators;
- or attempts to bypass defined authority boundaries.

The objective is defensive resilience research.

The project does not require interaction with real spacecraft, operational satellite systems or unauthorised infrastructure.

---

11.18 Human Authority as a Security Boundary

Human authority is not merely an operational principle.

It can also function as a governance boundary within the research architecture.

The framework may provide:

- anomaly assessment;
- confidence information;
- verification results;
- recovery recommendations;
- warnings;
- and audit information.

The final authority remains outside the autonomous assessment pathway.

The governing distinction is:

AI / SOFTWARE ASSESSMENT ≠ HUMAN / MISSION AUTHORISATION

The current research implementation therefore preserves the principle:

NO RECOVERY ACTION EXECUTED UNTIL HUMAN AUTHORIZATION

where such simulated authorisation is part of the experiment.

---

11.19 Governance of Research Changes

Architectural changes should be governed through documented change control.

Changes may include:

- engine modifications;
- new scenarios;
- altered thresholds;
- new dependencies;
- changes to validation logic;
- changes to state-transition logic;
- changes to memory behaviour;
- changes to audit architecture;
- or changes to authority handling.

Each significant change should be accompanied by:

CHANGE → REVIEW → TEST → REGRESSION → DOCUMENTATION → VERSION CONTROL

Previous experimental results should not automatically be considered applicable to a materially changed architecture.

---

11.20 Research Access and Separation

Future collaborative research should consider separation between:

- development environments;
- experimental environments;
- validation environments;
- demonstration environments; and
- any future operationally relevant environment.

The present framework remains entirely within the research and simulation boundary.

Any future connection to operational infrastructure would require a separate architecture, security assessment, authority framework and assurance programme.

---

11.21 Incident and Anomaly Reporting

Unexpected cybersecurity-related behaviour should be recorded as a research incident.

A research incident record may include:

- incident identifier;
- scenario;
- software version;
- affected component;
- observed condition;
- expected condition;
- severity;
- containment status;
- audit status;
- investigation;
- corrective action;
- and verification of the correction.

The purpose is to prevent unexpected behaviour from being silently discarded.

---

11.22 Cybersecurity Metrics

Future research may measure:

- anomaly detection latency;
- integrity-check latency;
- unauthorised-request detection rate;
- false-positive rate;
- false-negative rate;
- state-integrity preservation;
- audit integrity;
- containment effectiveness;
- recovery consistency;
- authority-boundary preservation;
- repeatability;
- and reproducibility.

Metrics should be defined before experiments wherever practical.

A cybersecurity metric generated by the research framework should not automatically be interpreted as a real-world security assurance level.

---

11.23 Security and Resilience Relationship

Cybersecurity and resilience are related but distinct research dimensions.

A system may remain functionally resilient while suffering a security compromise.

Conversely, a secure information pathway does not guarantee resilience against physical or operational disturbances.

The research therefore treats them separately:

FUNCTIONAL RESILIENCE ≠ CYBERSECURITY

and:

CYBERSECURITY ≠ MISSION SAFETY

The objective is to investigate how the two dimensions may interact without incorrectly treating either as proof of the other.

---

11.24 Governance Principles

The Sextant Protocol™ Orbital Resilience Framework adopts the following research governance principles:

NO UNAUTHORISED OPERATIONAL ACCESS

NO LIVE SPACECRAFT COMMANDING

NO ASSUMPTION OF TRUST

NO UNVERIFIED AUTHORITY

NO SILENT FAILURE

NO UNDOCUMENTED MAJOR CHANGE

NO CERTIFICATION CLAIM WITHOUT APPROPRIATE EVIDENCE

INDEPENDENT REVIEW WELCOMED

AUDITABILITY PRESERVED

HUMAN AUTHORITY PRESERVED

These principles define the governance boundary of the research programme.

---

11.25 Future Cybersecurity Assurance

If future research progresses toward higher-assurance environments, additional activities may include:

- formal threat modelling;
- security architecture review;
- secure software development;
- vulnerability assessment;
- penetration testing within authorised environments;
- dependency analysis;
- supply-chain assessment;
- cryptographic architecture review;
- access-control assessment;
- incident-response exercises;
- recovery testing;
- independent security review; and
- mission-specific cybersecurity assurance.

These activities would represent a separate assurance programme and should not be implied by the current prototype.

---

11.26 Research Limitations

The current framework has significant cybersecurity limitations.

These may include:

- simulated rather than operational data;
- limited threat-model coverage;
- absence of spacecraft flight hardware;
- absence of operational spacecraft interfaces;
- absence of operational command networks;
- prototype software characteristics;
- incomplete dependency assurance;
- limited adversarial testing;
- limited independent cybersecurity review;
- and limited real-world environmental fidelity.

These limitations must remain visible when interpreting research results.

---

11.27 No Cybersecurity Certification Claim

Nothing within this section constitutes:

- spacecraft cybersecurity certification;
- flight-system security certification;
- mission-network security approval;
- operational command-system accreditation;
- autonomous-control approval;
- or regulatory cybersecurity approval.

The framework remains a research and simulation environment.

Any future operational application would require a dedicated cybersecurity and assurance programme appropriate to the intended system and mission.

---

11.28 Research Integrity Statement

The cybersecurity research programme follows the principle:

TRUST MUST BE DEMONSTRATED, NOT ASSUMED.

The project therefore commits to:

- controlled experimentation;
- authorised testing;
- transparent assumptions;
- documented limitations;
- independent challenge;
- fault injection;
- auditability;
- configuration control;
- repeatable testing;
- and separation between research simulation and operational systems.

The purpose is not to claim that the architecture is secure.

The purpose is to establish a framework through which cybersecurity assumptions can be tested, challenged and measured.

---

11.29 Summary

Cybersecurity and system governance form an essential part of the Sextant Protocol™ Orbital Resilience Research Framework.

The research investigates whether a deterministic architecture can maintain:

INFORMATION INTEGRITY

→ VERIFICATION

→ STATE INTEGRITY

→ CONTROLLED TRANSITION

→ AUDITABILITY

→ HUMAN AUTHORITY

during simulated cybersecurity and information-degradation conditions.

The central research principle remains:

DETERMINISTIC ≠ SECURE

and:

SIMULATED CYBERSECURITY RESILIENCE ≠ OPERATIONAL CYBERSECURITY ASSURANCE

The appropriate research sequence is:

MODEL → INJECT → DETECT → VERIFY → CONTAIN → MEASURE → AUDIT → REPEAT → INDEPENDENTLY REVIEW

The ultimate objective is evidence-based understanding of how cybersecurity conditions may interact with orbital resilience and decision-support.

SEXTANT PROTOCOL™

SECURITY BEFORE ASSUMPTION

INTEGRITY BEFORE DECISION

EVIDENCE BEFORE CLAIM

HUMAN AUTHORITY PRESERVED

RESEARCH — NOT OPERATIONAL SPACECRAFT CONTROL