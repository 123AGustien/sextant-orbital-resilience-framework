9. Independent Review and Research Governance

9.1 Purpose

Independent review and research governance are fundamental components of the Sextant Protocol™ Orbital Resilience Framework.

The framework is deliberately designed so that its research claims can be challenged, examined, reproduced and, where necessary, rejected.

The purpose of this section is to establish principles for:

- independent technical review;
- research governance;
- evidence integrity;
- configuration control;
- change management;
- reviewer access;
- research transparency;
- limitation reporting;
- publication integrity; and
- responsible progression toward higher-assurance research.

The governing principle is:

INDEPENDENT CHALLENGE BEFORE HIGHER-ASSURANCE CLAIMS

---

9.2 Independence Principle

The research team responsible for developing the framework should not be the sole authority responsible for determining whether its results are valid.

Where practical, validation and review should involve individuals or organisations independent from the implementation team.

Independent reviewers should be able to examine:

- architecture;
- requirements;
- assumptions;
- source implementation;
- test methodology;
- scenario definitions;
- experimental results;
- validation records;
- audit records;
- limitations; and
- conclusions.

The purpose of independence is not to create opposition.

It is to reduce confirmation bias and increase confidence that weaknesses can be identified.

---

9.3 Research Governance

Research governance should establish clear responsibility for:

- architecture decisions;
- research requirements;
- software changes;
- scenario changes;
- validation activities;
- experimental records;
- publication;
- evidence classification;
- security;
- reviewer access; and
- release decisions.

Responsibilities should be documented rather than assumed.

No individual component should be permitted to define its own validation authority without independent review.

---

9.4 Evidence Before Claims

The framework adopts the following principle:

NO CLAIM WITHOUT EVIDENCE

Research statements should therefore be classified according to the strength of available evidence.

A distinction should be maintained between:

- conceptual proposition;
- implemented capability;
- demonstrated simulation behaviour;
- tested behaviour;
- independently reproduced behaviour;
- independently verified behaviour; and
- mission-specific evidence.

A successful demonstration should not automatically be described as a validated capability.

---

9.5 Independent Technical Review

Independent technical reviewers should be encouraged to challenge the architecture in good faith.

Potential review areas include:

- orbital-system modelling;
- resilience architecture;
- deterministic logic;
- state-transition design;
- validation architecture;
- manoeuvre simulation;
- cascade modelling;
- memory continuity;
- auditability;
- human authority;
- human factors;
- cybersecurity;
- software assurance;
- simulation fidelity;
- experimental methodology; and
- interpretation of results.

Review findings should be documented.

Where a finding cannot immediately be resolved, it should remain visible as an open research issue.

---

9.6 Reviewer Questions

Reviewers should be encouraged to ask questions such as:

1. Are the requirements sufficiently precise?
2. Are the research assumptions clearly identified?
3. Are the models appropriate for the research question?
4. Are the scenario definitions reproducible?
5. Are the validation layers sufficiently independent?
6. Can erroneous outputs be detected?
7. Can state transitions be independently reconstructed?
8. Are recovery recommendations deterministic under equivalent conditions?
9. Can experiments be reproduced by another researcher?
10. Are negative results reported?
11. Are human-authority boundaries technically enforced?
12. Are audit records complete?
13. Are cybersecurity assumptions explicitly documented?
14. Are conclusions supported by the available evidence?
15. Are limitations clearly stated?

The objective is to expose weaknesses rather than simply confirm the developer's expectations.

---

9.7 Research Artefact Availability

Where legally, technically and securely possible, research artefacts should be made available for independent examination.

Potential artefacts include:

- source code;
- scenario definitions;
- configuration files;
- test procedures;
- test results;
- validation records;
- audit records;
- architecture documentation;
- experiment logs;
- version information;
- dependency information; and
- research conclusions.

Sensitive or security-relevant material may require controlled access.

The principle remains:

REVIEWABLE EVIDENCE IS STRONGER THAN UNVERIFIABLE ASSERTION

---

9.8 Configuration Control

Research results are meaningful only when the configuration under which they were produced can be identified.

The project should therefore maintain configuration control over, where practical:

- source-code versions;
- scenario versions;
- configuration parameters;
- dependencies;
- test environments;
- validation rules;
- resilience calculations;
- state-transition definitions;
- audit formats; and
- research documentation.

A result should be traceable to the configuration that generated it.

---

9.9 Version Control

Significant research artefacts should be version-controlled.

Version history should make it possible to determine:

- what changed;
- when it changed;
- why it changed;
- who authorised the change;
- which tests were repeated; and
- whether previously observed behaviour was affected.

A version identifier should be associated with significant experimental results wherever practical.

---

9.10 Change Management

Architectural changes should be evaluated before being treated as part of the validated research baseline.

A representative change-management sequence is:

PROPOSE CHANGE
      ↓
DOCUMENT CHANGE
      ↓
ASSESS IMPACT
      ↓
IMPLEMENT
      ↓
RUN REGRESSION TESTS
      ↓
REPEAT AFFECTED EXPERIMENTS
      ↓
REVIEW RESULTS
      ↓
UPDATE DOCUMENTATION
      ↓
ACCEPT / REJECT / DEFER

The purpose is to prevent an apparently minor software change from silently invalidating previous research results.

---

9.11 Research Baseline

The project should maintain a clearly identified research baseline.

The baseline should specify, where practical:

- software version;
- architecture version;
- scenario library version;
- configuration;
- validation status;
- known limitations;
- open issues; and
- applicable experimental results.

New development should be distinguishable from the established research baseline.

This allows historical results to remain interpretable.

---

9.12 Issue and Finding Management

Technical findings should be recorded systematically.

Potential finding categories include:

- architecture issue;
- software defect;
- validation deficiency;
- modelling limitation;
- experimental-design issue;
- documentation deficiency;
- human-factors issue;
- cybersecurity concern;
- reproducibility issue;
- audit deficiency; and
- unresolved research question.

Each significant finding should, where practical, include:

- description;
- severity or significance;
- affected component;
- evidence;
- proposed action;
- status; and
- resolution or rationale.

Unresolved findings should not be removed merely because they complicate publication.

---

9.13 Negative Result Governance

Negative results are legitimate research outcomes.

The project should preserve evidence of:

- failed experiments;
- failed validation;
- unexpected state transitions;
- incorrect classifications;
- inconsistent recovery pathways;
- excessive escalation;
- false positives;
- false negatives;
- repeatability failures;
- reproducibility failures; and
- unexpected cascade behaviour.

Results should not be selectively reported only when they support the research proposition.

This principle is essential to research integrity.

---

9.14 Independent Reproduction

Where practical, an independent researcher should be able to reproduce significant published results.

A reproduction package may contain:

- software version;
- scenario definition;
- configuration;
- input data;
- test instructions;
- expected output;
- observed output;
- execution record; and
- interpretation notes.

Differences between the original and reproduced results should be documented and investigated.

A failure to reproduce a result should itself become a research finding.

---

9.15 Review Classification

Review findings may be classified according to status.

A representative classification is:

OPEN
  ↓
UNDER REVIEW
  ↓
ACTION REQUIRED
  ↓
CORRECTED
  ↓
RE-TESTED
  ↓
CLOSED

Alternatively, a finding may remain:

ACCEPTED RESEARCH LIMITATION

where the issue is understood but cannot reasonably be eliminated within the current research scope.

---

9.16 Authority Separation

The architecture should maintain separation between:

- assessment;
- validation;
- recommendation;
- human decision; and
- simulated action.

The governing principle remains:

ASSESSMENT ≠ OPERATIONAL COMMAND

A research component should not acquire operational authority merely because it generates a high-confidence result.

The current framework therefore preserves human or mission authority as the final decision boundary.

---

9.17 Human Authority Governance

Human authority should be explicitly represented in research records where applicable.

An experimental decision record may include:

- authority role;
- recommendation received;
- validation status;
- decision;
- decision status;
- reason;
- timestamp; and
- resulting simulated state.

For example:

SYSTEM ASSESSMENT
      ↓
VALIDATION
      ↓
RECOVERY RECOMMENDATION
      ↓
MISSION / HUMAN AUTHORITY
      ↓
AUTHORIZE / MAINTAIN SAFE STATE / REQUEST DIAGNOSTICS /
ABORT / ESCALATE
      ↓
SIMULATED OUTCOME

The system should not interpret an assessment as authorization.

---

9.18 Audit Governance

Audit records should be treated as research evidence.

The audit architecture should preserve sufficient information to reconstruct significant experimental events.

Where practical, audit records should identify:

- event;
- sequence;
- module;
- state;
- decision;
- validation result;
- authority;
- timestamp; and
- outcome.

Audit integrity should itself be subject to validation.

---

9.19 Publication Integrity

Research publications should accurately distinguish:

- implemented capability;
- simulated demonstration;
- tested behaviour;
- validated result;
- research hypothesis; and
- future research proposal.

Publication language should avoid converting research concepts into operational claims.

Terms such as:

certified

flight-qualified

mission-ready

autonomous spacecraft control

or

guaranteed safe

should not be used unless supported by the appropriate evidence and authority.

---

9.20 Intellectual Property and Research Transparency

Sextant Protocol™ may contain intellectual property, proprietary concepts or implementation details.

Protection of intellectual property should not prevent accurate disclosure of the limitations of the research.

Where full technical disclosure is not possible, publications should clearly identify:

- what has been disclosed;
- what has been withheld;
- why it has been withheld; and
- how that limitation affects independent evaluation.

Intellectual-property protection and research integrity should be treated as separate considerations.

---

9.21 Security and Controlled Disclosure

Certain research artefacts may contain information that should not be publicly disclosed.

Examples may include:

- security-sensitive implementation details;
- credentials or secrets;
- infrastructure information;
- vulnerability details;
- controlled interfaces; or
- material that could facilitate misuse.

Such information should be handled through appropriate security procedures.

Security restrictions should not be used as a general justification for withholding ordinary research evidence.

---

9.22 Responsible Research Progression

Progression toward higher-assurance research should be evidence-based.

A conceptual progression is:

RESEARCH PROTOTYPE
      ↓
REPEATABLE SIMULATION
      ↓
INDEPENDENT REPRODUCTION
      ↓
FAULT-INJECTION VALIDATION
      ↓
HIGHER-FIDELITY MODELLING
      ↓
HUMAN-IN-THE-LOOP STUDIES
      ↓
HARDWARE-IN-THE-LOOP
      ↓
INDEPENDENT V&V
      ↓
SPECIALIST REVIEW
      ↓
MISSION-SPECIFIC ASSURANCE

Progression from one stage to another should require evidence appropriate to the next stage.

No stage should be skipped merely because the previous simulation appears successful.

---

9.23 Governance of Future Autonomy Research

Any future research involving increased autonomy should be governed separately from the current decision-support architecture.

Before autonomous execution could be considered, research would need to address:

- system requirements;
- authority boundaries;
- hazard analysis;
- failure-mode analysis;
- formal or rigorous verification where appropriate;
- software assurance;
- cybersecurity;
- human factors;
- fail-safe behaviour;
- independent verification and validation;
- mission-specific testing; and
- applicable regulatory requirements.

The current framework therefore maintains:

SUPERVISORY DECISION-SUPPORT FIRST

before any consideration of:

AUTONOMOUS EXECUTION

---

9.24 Research Ethics

Research should be conducted in a manner that avoids misleading users, reviewers or stakeholders regarding the maturity of the technology.

The project should:

- disclose limitations;
- distinguish simulation from reality;
- avoid unsupported safety claims;
- report negative findings;
- preserve experimental records;
- identify uncertainty;
- avoid fabricated evidence; and
- correct material errors when identified.

The credibility of the research depends upon accurate representation of both strengths and weaknesses.

---

9.25 Correction and Retraction

If a material error is discovered in a published research result, the project should provide an appropriate correction.

Where necessary, this may include:

- correction of documentation;
- reclassification of a result;
- withdrawal of an unsupported claim;
- replacement of an incorrect dataset;
- revision of experimental conclusions; or
- retraction of a materially invalid result.

Correcting the research record should be treated as a strength rather than a failure.

---

9.26 Research Review Board Concept

For future expansion, the project may establish a multidisciplinary research review group.

Potential expertise may include:

- orbital systems engineering;
- spacecraft operations;
- software engineering;
- software assurance;
- systems safety;
- cybersecurity;
- human factors;
- artificial intelligence;
- orbital mechanics;
- communications;
- navigation;
- control systems;
- research methodology; and
- regulatory or mission assurance.

The review group would provide challenge and technical assessment rather than operational command authority.

---

9.27 Independent Challenge Programme

A structured challenge programme may include:

ARCHITECTURE REVIEW
      ↓
REQUIREMENT CHALLENGE
      ↓
MODEL CHALLENGE
      ↓
CODE REVIEW
      ↓
FAULT INJECTION
      ↓
SCENARIO CHALLENGE
      ↓
BASELINE COMPARISON
      ↓
REPRODUCTION
      ↓
HUMAN-FACTORS REVIEW
      ↓
CYBERSECURITY REVIEW
      ↓
INDEPENDENT TECHNICAL ASSESSMENT

The purpose is to identify weaknesses before the framework is considered for any higher-assurance research activity.

---

9.28 Research Evidence Register

A future evidence register should record significant research claims and the evidence supporting them.

A representative structure is:

Research Claim| Evidence Type| Evidence Status| Independent Review| Limitations
Deterministic state transition| Software test| Implemented / Tested| Required| Simulation only
Recovery pathway generation| Scenario testing| Demonstrated| Required| No operational command
Audit traceability| Audit testing| Tested| Required| Prototype implementation
Cascade assessment| Simulation| Experimental| Required| Model-dependent
Human decision gate| Integration test| Implemented| Required| Limited human testing
Resilience scoring| Numerical analysis| Experimental| Required| Not a physical safety probability

This register should evolve as the research matures.

---

9.29 Governance Metrics

Research governance itself may be measured.

Potential governance metrics include:

- percentage of experiments with complete records;
- percentage of significant changes regression-tested;
- number of unresolved findings;
- time to finding resolution;
- percentage of published claims with supporting evidence;
- reproduction success rate;
- audit completeness;
- reviewer findings;
- repeatability rate; and
- percentage of limitations explicitly documented.

Governance should therefore be treated as an observable research process rather than merely an administrative activity.

---

9.30 Independent Review Outcome

An independent review should produce a documented outcome.

Possible outcomes include:

ACCEPTED FOR CONTINUED RESEARCH

ACCEPTED WITH LIMITATIONS

ACTION REQUIRED

RE-TEST REQUIRED

INSUFFICIENT EVIDENCE

RESEARCH PROPOSITION NOT SUPPORTED

A negative outcome should not be interpreted as failure of the research programme.

It may provide valuable evidence about where the architecture requires modification.

---

9.31 Governance Boundary

Research governance does not confer operational authority.

Neither the development team, reviewer group nor research framework may independently authorise spacecraft operations.

The operational boundary remains:

RESEARCH → ASSESSMENT → VALIDATION → HUMAN / MISSION AUTHORITY

The current system therefore remains a decision-support and simulation framework.

---

9.32 Summary

Independent review and research governance provide the mechanisms through which the Sextant Protocol™ Orbital Resilience Framework can remain technically challengeable and scientifically responsible.

The governance model emphasizes:

TRANSPARENCY

→ TRACEABILITY

→ INDEPENDENCE

→ REPEATABILITY

→ REPRODUCIBILITY

→ NEGATIVE-RESULT REPORTING

→ VERSION CONTROL

→ EVIDENCE CLASSIFICATION

→ INDEPENDENT REVIEW

The central governance principle is:

BUILD → TEST → CHALLENGE → MEASURE → DOCUMENT → REPEAT → INDEPENDENTLY REVIEW

The objective is not to protect the architecture from criticism.

The objective is to make criticism technically useful.

---

SEXTANT PROTOCOL™

INDEPENDENT REVIEW BEFORE HIGHER ASSURANCE

EVIDENCE BEFORE CLAIM

TRANSPARENCY BEFORE ACCEPTANCE

RESEARCH BEFORE OPERATION

HUMAN AUTHORITY PRESERVED