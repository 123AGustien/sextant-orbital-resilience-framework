8. Validation and Experimental Methodology

8.1 Purpose

The Sextant Protocol™ Orbital Resilience Framework is intended to support structured technical investigation rather than premature claims of operational capability.

Validation and experimental methodology are therefore central to the research programme.

The purpose of this section is to establish a repeatable approach through which the architecture, simulation behaviour, resilience assessments, state transitions, recovery pathways and decision-support outputs can be tested, challenged, measured and independently reviewed.

The principal methodological question is:

Can the proposed resilience architecture produce repeatable, traceable and measurable behaviour under controlled simulated abnormal conditions?

This question must be answered through evidence rather than assumption.

---

8.2 Validation Philosophy

The framework adopts the following research principle:

SIMULATION SUCCESS ≠ OPERATIONAL VALIDATION

A successful simulation demonstrates only that the implemented model behaved according to the tested scenario and configuration.

It does not establish that the architecture is safe, reliable or suitable for deployment on a real spacecraft.

Operational significance would require substantially higher levels of engineering assurance, including independent verification and validation, high-fidelity modelling, specialist review, hardware-in-the-loop testing and mission-specific assessment.

The research methodology therefore distinguishes between:

- software correctness;
- simulation validity;
- model validity;
- system-level resilience;
- human decision-support effectiveness; and
- operational safety assurance.

These are separate questions.

---

8.3 Validation Hierarchy

A proposed research validation hierarchy is:

ARCHITECTURE DEFINITION
        ↓
REQUIREMENT DEFINITION
        ↓
UNIT TESTING
        ↓
INTEGRATION TESTING
        ↓
SCENARIO VALIDATION
        ↓
FAULT INJECTION
        ↓
CASCADE TESTING
        ↓
BASELINE COMPARISON
        ↓
REPEATABILITY ASSESSMENT
        ↓
HUMAN-IN-THE-LOOP TESTING
        ↓
HIGH-FIDELITY SIMULATION
        ↓
HARDWARE-IN-THE-LOOP
        ↓
INDEPENDENT VERIFICATION & VALIDATION
        ↓
SPECIALIST AEROSPACE REVIEW
        ↓
MISSION-SPECIFIC / REGULATORY ASSESSMENT

The existence of a lower-level successful test does not imply that higher-level validation has been achieved.

---

8.4 Research Requirements

Each experimental capability should have clearly defined research requirements.

Requirements may describe:

- expected inputs;
- expected outputs;
- state-transition conditions;
- validation conditions;
- failure conditions;
- authority boundaries;
- audit requirements;
- timing expectations;
- repeatability requirements; and
- known limitations.

Requirements should be sufficiently precise that another researcher can understand what behaviour is being tested and why.

Where a requirement cannot be objectively tested, it should be identified as a research assumption rather than presented as a validated capability.

---

8.5 Unit Testing

Individual software components should be tested independently wherever practical.

Examples include:

- OrbitalEngineV1;
- ManoeuvreEngineV1;
- FailsafeTransitionEngineV1;
- ValidationCoreV1;
- MemoryCoreV1;
- AuditCoreV1;
- resilience calculations;
- scenario validators;
- state-transition logic;
- cascade models; and
- decision-support components.

Unit testing should examine:

- normal inputs;
- boundary inputs;
- invalid inputs;
- missing inputs;
- conflicting inputs;
- unexpected states; and
- failure conditions.

The objective is to determine whether individual components behave consistently with their defined research requirements.

---

8.6 Integration Testing

Integration testing should examine interactions between modules.

A representative integration pathway is:

SCENARIO INPUT
        ↓
ORBITAL ASSESSMENT
        ↓
MANOEUVRE SIMULATION
        ↓
FAILSAFE TRANSITION
        ↓
VALIDATION
        ↓
MEMORY UPDATE
        ↓
AUDIT RECORD
        ↓
DECISION-SUPPORT OUTPUT

Testing should determine whether:

- information is transferred correctly;
- state information remains consistent;
- validation results are preserved;
- audit records remain traceable;
- failed modules are detected;
- unexpected outputs are contained; and
- authority boundaries remain intact.

An integration test should not be considered successful merely because all modules execute without a software exception.

The resulting system behaviour must also be examined.

---

8.7 Scenario-Based Validation

The framework should maintain a defined library of repeatable research scenarios.

Current scenario classes include:

- "SIGNAL_LOSS";
- "ORBITAL_DRIFT";
- "TELEMETRY_CORRUPTION";
- "POWER_FAILURE"; and
- "INERTIAL_DESYNCHRONIZATION".

Each scenario should define, where applicable:

- initial conditions;
- system state;
- scenario parameters;
- expected assessment pathway;
- validation requirements;
- possible recovery pathways;
- authority state;
- audit requirements; and
- expected termination conditions.

Scenario definitions should remain version-controlled.

Changes to a scenario should be recorded so that historical results remain interpretable.

---

8.8 Controlled Experiments

Experiments should be conducted using controlled initial conditions.

A representative experimental structure is:

DEFINE INITIAL CONDITIONS
        ↓
SELECT SCENARIO
        ↓
EXECUTE BASELINE RUN
        ↓
RECORD OUTPUT
        ↓
INTRODUCE CONTROLLED CHANGE
        ↓
REPEAT SIMULATION
        ↓
COMPARE RESULTS
        ↓
DOCUMENT DIFFERENCE

Only variables deliberately introduced into the experiment should change unless explicitly documented.

This approach helps distinguish architectural effects from uncontrolled variation.

---

8.9 Fault Injection

Fault injection is an important component of resilience validation.

Potential injected conditions include:

- missing telemetry;
- delayed telemetry;
- corrupted telemetry;
- incorrect sensor values;
- conflicting assessment results;
- invalid scenario parameters;
- module failure;
- validation failure;
- memory interruption;
- audit-record interruption;
- communication degradation; and
- simultaneous component failures.

Each injected fault should have:

- a unique identifier;
- defined initial conditions;
- documented injection point;
- expected containment or response;
- observed result;
- validation result; and
- audit record.

The purpose is not to demonstrate that the system never fails.

The purpose is to determine whether failures occur in a detectable, traceable and understandable manner.

---

8.10 Boundary Testing

Boundary testing should investigate system behaviour near defined thresholds.

Examples include:

- transition between resilience classifications;
- minimum and maximum scenario values;
- state-transition thresholds;
- validation confidence boundaries;
- recovery-readiness boundaries; and
- escalation thresholds.

Thresholds used by the research framework must not be interpreted as universal spacecraft safety limits.

They are experimental parameters unless independently validated for a specific application.

---

8.11 Negative Testing

The framework should deliberately test conditions expected to produce invalid or rejected results.

Examples include:

- incomplete scenario data;
- contradictory inputs;
- unavailable module outputs;
- invalid state transitions;
- corrupted memory records;
- invalid validation results;
- duplicate events;
- inconsistent timestamps; and
- malformed simulation parameters.

The desired outcome is not necessarily successful execution.

A correct rejection may constitute the expected result.

---

8.12 Repeatability

Repeatability is a fundamental requirement of the research programme.

Equivalent inputs under equivalent configuration should produce equivalent or explainably comparable outputs.

Where variation occurs, the cause should be documented.

Possible causes include:

- configuration differences;
- timing;
- state history;
- injected faults;
- software version;
- scenario parameters;
- explicitly modelled stochastic behaviour; or
- environmental simulation variables.

Unexplained variation should be treated as a validation issue requiring investigation.

---

8.13 Reproducibility

Reproducibility extends beyond repeatability.

A repeatability test asks whether the same environment produces comparable results repeatedly.

A reproducibility test asks whether an independent researcher can reproduce the result using the documented methodology and artefacts.

Where practical, research artefacts should therefore include:

- scenario definitions;
- software version;
- configuration;
- input parameters;
- test procedure;
- expected outputs;
- observed outputs;
- validation results;
- audit records; and
- relevant execution metadata.

The objective is to make the research independently examinable.

---

8.14 Baseline Comparison

The proposed architecture should not be evaluated in isolation.

Where feasible, experiments should compare Sextant Protocol™ behaviour against defined baseline approaches.

Possible baselines include:

- single-layer assessment;
- conventional threshold assessment;
- assessment without deterministic arbitration;
- assessment without memory continuity;
- assessment without audit tracing; and
- assessment without structured human decision-support.

Baseline comparison is necessary to determine whether observed improvements are attributable to architectural characteristics rather than simply increased processing or additional information.

---

8.15 Experimental Metrics

Potential experimental measurements include:

- detection latency;
- verification latency;
- escalation time;
- false-positive rate;
- false-negative rate;
- classification accuracy;
- state-transition consistency;
- recovery-pathway consistency;
- validation failure detection;
- cascade depth;
- cascade duration;
- audit completeness;
- repeatability;
- reproducibility;
- operator response time;
- operator workload; and
- final simulated system state.

Metrics should be defined before experiments wherever practical.

Post-hoc selection of favourable measurements should be avoided.

---

8.16 Test Oracles and Expected Behaviour

Where possible, each experiment should define an expected result or test oracle before execution.

A test oracle may be based upon:

- a formal requirement;
- a defined state-transition rule;
- a mathematical model;
- a validated reference implementation;
- an independently reviewed scenario definition; or
- an explicitly documented research expectation.

Where no authoritative expected result exists, the outcome should be classified as exploratory rather than validated.

This distinction prevents exploratory observations from being presented as established system behaviour.

---

8.17 Validation of Resilience Scoring

Where the framework produces a resilience score or risk classification, the scoring methodology should itself be subject to validation.

Researchers should investigate:

- sensitivity to input changes;
- threshold behaviour;
- weighting effects;
- classification stability;
- response to extreme conditions;
- response to missing data;
- response to conflicting data; and
- correlation with defined baseline indicators.

A numerical resilience score should not automatically be interpreted as a physical probability of spacecraft survival or mission success.

It is a research metric unless independently validated for a specific application.

---

8.18 Validation of State Transitions

State-transition logic should be tested independently and in integrated scenarios.

Representative states may include:

NORMAL
   ↓
DEGRADED
   ↓
STRESSED
   ↓
STABILIZATION REQUIRED
   ↓
RECOVERY READY

Testing should examine:

- valid transitions;
- invalid transitions;
- repeated transitions;
- conflicting transition requests;
- recovery from degraded conditions;
- transition persistence; and
- unexpected state changes.

The research objective is to determine whether state management remains deterministic and traceable under changing conditions.

---

8.19 Human-in-the-Loop Validation

Human decision authority is a central architectural boundary.

Future human-in-the-loop experiments should examine whether qualified users can:

- understand system status;
- interpret warnings;
- understand uncertainty;
- distinguish assessment from command;
- evaluate recovery pathways;
- identify conflicting information;
- make appropriate decisions; and
- maintain situational awareness.

Potential human-factors measurements include:

- decision time;
- workload;
- error rate;
- confidence;
- information comprehension;
- escalation behaviour; and
- recovery decision consistency.

The framework should not assume that technically correct information automatically produces good human decisions.

---

8.20 Audit Validation

The audit layer should itself be tested.

An experimental audit record should allow a reviewer to reconstruct, where technically possible:

SCENARIO
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

Audit validation should examine:

- completeness;
- sequence integrity;
- timestamp consistency;
- event identification;
- authority attribution;
- missing records;
- duplicate records; and
- recovery after audit interruption.

An audit system that cannot reliably reconstruct the relevant sequence should be identified as a research limitation.

---

8.21 Validation Independence

Validation should be sufficiently independent from the component being evaluated to reduce confirmation bias.

Where practical:

- assessment should be separable from verification;
- test generation should be separable from result evaluation;
- audit records should not depend solely upon the component being audited; and
- independent reviewers should have access to sufficient research artefacts.

The architecture therefore supports the principle:

ASSESS → VERIFY → ACCEPT / REJECT / ESCALATE

No single component should be treated as inherently correct merely because it produced an output.

---

8.22 Statistical and Experimental Analysis

Where sufficient experimental data are available, quantitative analysis should be used to determine whether observed differences are meaningful.

Depending upon the experiment, analysis may include:

- descriptive statistics;
- confidence intervals;
- distribution analysis;
- error rates;
- sensitivity analysis;
- parameter variation;
- comparative testing; and
- effect-size analysis.

The appropriate statistical method should depend upon the research question and experimental design.

No statistical result should be interpreted beyond the conditions under which the experiment was performed.

---

8.23 Model and Simulation Fidelity

A simulation result is dependent upon the fidelity of the model used to generate it.

Researchers should therefore document:

- physical assumptions;
- operational assumptions;
- simplified relationships;
- unavailable real-world data;
- model boundaries;
- parameter sources;
- abstraction levels; and
- known omissions.

Higher simulation complexity does not automatically mean higher validity.

A simpler model with clearly defined assumptions may be more scientifically useful than a complex model whose behaviour cannot be independently understood.

---

8.24 Software Assurance

Future research should progressively address software-assurance considerations.

Areas may include:

- version control;
- dependency management;
- configuration control;
- code review;
- static analysis;
- automated testing;
- regression testing;
- vulnerability assessment;
- build reproducibility;
- release traceability; and
- change management.

Research prototypes should not be represented as safety-critical software merely because they contain safety-oriented concepts.

---

8.25 Cybersecurity Validation

Cybersecurity must be evaluated independently from functional resilience.

Future experiments may investigate:

- malicious or corrupted inputs;
- authentication failure;
- authorisation failure;
- compromised telemetry;
- audit tampering;
- dependency compromise;
- communication interruption;
- state manipulation; and
- recovery following compromised information.

The fundamental research distinction is:

DETERMINISTIC ≠ SECURE

A deterministic system may still contain vulnerabilities.

---

8.26 Regression Testing

Every significant architectural change should trigger appropriate regression testing.

Regression testing should determine whether changes to one component unintentionally alter previously validated behaviour elsewhere.

Particular attention should be given to:

- scenario results;
- state transitions;
- validation outputs;
- memory continuity;
- audit records;
- recovery pathways; and
- human-authority gates.

Previously observed behaviour should not automatically be assumed to remain valid following architectural changes.

---

8.27 Experimental Documentation

Each significant experiment should produce a documented research record containing, where practical:

- experiment identifier;
- date and execution environment;
- software version;
- scenario identifier;
- initial conditions;
- configuration;
- injected faults;
- expected behaviour;
- observed behaviour;
- validation result;
- deviations;
- audit record;
- human decision;
- conclusion; and
- limitations.

This provides a foundation for later independent review.

---

8.28 Failure Classification

Observed failures should be classified rather than simply recorded as pass or fail.

Potential categories include:

- input failure;
- software failure;
- integration failure;
- validation failure;
- state-transition failure;
- modelling limitation;
- human-factor failure;
- audit failure;
- cybersecurity failure;
- repeatability failure; and
- unexplained behaviour.

Classification helps identify whether the underlying issue belongs to implementation, architecture, experiment design or model assumptions.

---

8.29 Independent Review

Independent technical review should be considered a required future stage before any claim of higher assurance.

Reviewers should be invited to challenge:

- requirements;
- architecture;
- models;
- algorithms;
- scenario assumptions;
- experimental design;
- resilience metrics;
- validation independence;
- software implementation;
- human factors;
- cybersecurity; and
- interpretation of results.

The research objective is not to obtain agreement.

It is to expose weaknesses that can be corrected or documented.

---

8.30 Evidence Classification

Research results should be classified according to the strength of available evidence.

A conceptual classification may include:

CONCEPTUAL
   ↓
IMPLEMENTED
   ↓
UNIT TESTED
   ↓
INTEGRATION TESTED
   ↓
SCENARIO VALIDATED
   ↓
REPEATABLE
   ↓
INDEPENDENTLY REPRODUCED
   ↓
INDEPENDENTLY VERIFIED
   ↓
MISSION-SPECIFICALLY ASSESSED

The framework should not imply that an earlier stage represents evidence equivalent to a later stage.

---

8.31 Proposed Validation Campaign

A representative future validation campaign could follow:

DEFINE REQUIREMENTS
        ↓
DEFINE TEST ORACLES
        ↓
ESTABLISH BASELINE
        ↓
RUN UNIT TESTS
        ↓
RUN INTEGRATION TESTS
        ↓
RUN SCENARIO TESTS
        ↓
INTRODUCE CONTROLLED FAULTS
        ↓
RUN CASCADE EXPERIMENTS
        ↓
MEASURE PERFORMANCE
        ↓
RUN HUMAN-IN-THE-LOOP TESTS
        ↓
REPEAT EXPERIMENTS
        ↓
INDEPENDENT REPRODUCTION
        ↓
ANALYSE RESULTS
        ↓
DOCUMENT LIMITATIONS
        ↓
INDEPENDENT REVIEW

The campaign should be expanded progressively as evidence and resources permit.

---

8.32 Research Limitations

The present framework has important limitations.

These may include:

- simplified orbital models;
- simulated rather than operational data;
- limited physical-system fidelity;
- absence of real spacecraft interfaces;
- absence of certified flight hardware;
- absence of operational mission authority;
- limited human-factors testing;
- prototype software characteristics;
- limited statistical sample sizes; and
- incomplete cybersecurity assurance.

These limitations do not invalidate the research.

They define the boundaries within which results should be interpreted.

---

8.33 No Operational Certification Claim

Nothing within this research methodology constitutes:

- spacecraft certification;
- flight qualification;
- safety certification;
- navigation certification;
- guidance certification;
- collision-avoidance certification;
- autonomous-control approval; or
- mission operational approval.

The framework remains a research and simulation environment.

Any future operational consideration would require an independent engineering and assurance programme appropriate to the intended mission.

---

8.34 Research Integrity Statement

The validation methodology follows the principle:

NO CLAIM WITHOUT EVIDENCE

The project therefore commits to:

- repeatable testing;
- transparent assumptions;
- documented limitations;
- independent challenge;
- negative-result reporting;
- traceable experiments;
- version-controlled research artefacts;
- separation of simulation from operational authority; and
- progressive verification and validation.

The objective is not to prove the architecture correct in advance.

The objective is to determine where it works, where it fails, why it behaves as observed, and whether the evidence supports the research proposition.

---

8.35 Summary

The Validation and Experimental Methodology establishes a structured pathway for evaluating the Sextant Protocol™ Orbital Resilience Framework.

The methodology combines:

REQUIREMENTS

→ UNIT TESTING

→ INTEGRATION TESTING

→ SCENARIO VALIDATION

→ FAULT INJECTION

→ CASCADE TESTING

→ BASELINE COMPARISON

→ REPEATABILITY

→ REPRODUCIBILITY

→ HUMAN-IN-THE-LOOP TESTING

→ INDEPENDENT REVIEW

The central research principle remains:

BUILD → TEST → CHALLENGE → MEASURE → REPEAT → INDEPENDENTLY REVIEW

The resulting evidence—not the architecture's intention—must determine the validity of the research proposition.

---

SEXTANT PROTOCOL™

VALIDATION BEFORE ASSUMPTION

EVIDENCE BEFORE CLAIM

SIMULATION BEFORE OPERATION

HUMAN AUTHORITY PRESERVED