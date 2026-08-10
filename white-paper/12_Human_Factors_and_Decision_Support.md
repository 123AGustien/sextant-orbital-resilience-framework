12. Human Factors and Decision Support

12.1 Purpose

Human factors and decision support are fundamental components of the Sextant Protocol™ Orbital Resilience Framework.

The framework is designed to assist human operators and mission authorities in understanding simulated abnormal conditions, evaluating system assessments, reviewing recovery pathways and making informed decisions.

The architecture does not assume that technically correct information automatically produces correct human decisions.

The principal research question is:

Can structured AI-assisted decision support improve the traceability, comprehension and consistency of human decision-making during complex simulated orbital anomalies without transferring final authority from the human operator?

This remains an experimental research question.

The governing principle is:

AI / SOFTWARE ASSESSMENT ≠ HUMAN / MISSION AUTHORISATION

---

12.2 Human Authority Boundary

Human decision authority is a fundamental architectural boundary.

The framework may generate:

- anomaly assessments;
- verification results;
- resilience classifications;
- confidence information;
- recovery recommendations;
- warnings;
- escalation recommendations;
- alternative recovery pathways; and
- audit information.

These outputs remain decision-support information.

The framework does not grant the autonomous system authority to execute real spacecraft commands.

The governing sequence is:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
DECISION SUPPORT
   ↓
HUMAN REVIEW
   ↓
HUMAN / MISSION AUTHORITY
   ↓
SIMULATED AUTHORISATION
   ↓
SIMULATED ACTION

Where human authorisation is required, no recovery action should be treated as authorised until that decision has been explicitly recorded.

---

12.3 Human-in-the-Loop Architecture

The Human Decision Authority component provides a structured boundary between automated assessment and human decision-making.

A representative architecture is:

ANOMALY
   ↓
ASSESSMENT ENGINE
   ↓
VALIDATION CORE
   ↓
OPERATOR GUIDANCE
   ↓
HUMAN DECISION AUTHORITY
   ↓
AUTHORIZE / MAINTAIN SAFE STATE /
REQUEST DIAGNOSTICS / ABORT / ESCALATE

The purpose is not to replace the operator.

The purpose is to provide the operator with structured information that can be independently considered.

---

12.4 Decision-Support Principles

Decision-support outputs should be:

- understandable;
- traceable;
- proportionate to the available evidence;
- explicit about uncertainty;
- distinguishable from commands;
- reviewable;
- auditable; and
- reversible where appropriate within the simulation.

The system should avoid presenting uncertain assessments as established facts.

Where multiple interpretations remain possible, the uncertainty should be visible to the operator.

A useful principle is:

INFORMATION → CONTEXT → UNCERTAINTY → OPTIONS → HUMAN DECISION

rather than:

AI OUTPUT → AUTOMATIC ACTION

---

12.5 Operator Guidance

OperatorGuidanceEngineV1 provides a research mechanism for translating validated system assessments into human-readable guidance.

A representative pathway is:

SYSTEM EVENT
   ↓
SEVERITY
   ↓
CURRENT SYSTEM STATE
   ↓
VALIDATION RESULT
   ↓
RECOMMENDED RECOVERY PATH
   ↓
OPERATOR GUIDANCE

The guidance should communicate what the system has assessed without implying that the recommendation is automatically correct.

For example:

EVENT:
SIGNAL_LOSS

SEVERITY:
HIGH

SYSTEM STATE:
STABILIZED

RECOMMENDED RECOVERY PATH:
SWITCH_TO_BACKUP_SATELLITE

AUTHORITY:
MISSION CONTROLLER

The operator remains responsible for determining whether the recommendation should be accepted, rejected, deferred or escalated.

---

12.6 Decision Options

The Human Decision Authority research model may provide structured decision options such as:

- AUTHORIZE_RECOVERY;
- MAINTAIN_SAFE_STATE;
- REQUEST_ADDITIONAL_DIAGNOSTICS;
- ABORT_RECOVERY; and
- ESCALATE_TO_MISSION_AUTHORITY.

These options are intended to make the decision boundary explicit.

The architecture should not constrain the operator to accepting the AI recommendation.

A human operator may reasonably select:

MAINTAIN_SAFE_STATE

even where the system recommends a recovery pathway.

Likewise, the operator may request additional diagnostics before authorising any simulated recovery.

---

12.7 Human Understanding of Uncertainty

A central human-factors research objective is determining whether operators correctly understand uncertainty.

The system may communicate:

- confidence level;
- incomplete information;
- conflicting observations;
- validation status;
- unavailable data;
- competing recovery pathways; and
- unresolved anomalies.

Operators should not be encouraged to interpret a confidence score as certainty.

For example:

HIGH CONFIDENCE ≠ GUARANTEED CORRECT

Confidence is an assessment characteristic, not a guarantee of physical truth.

---

12.8 Cognitive Workload

Complex abnormal conditions can increase operator workload.

Human-in-the-loop experiments should therefore examine whether decision-support reduces or unintentionally increases cognitive burden.

Potential measurements include:

- decision time;
- number of information elements reviewed;
- number of operator actions;
- error rate;
- decision reversals;
- information-search time;
- perceived workload;
- confidence;
- and situational-awareness measures.

The objective is not simply to minimise decision time.

A faster decision is not necessarily a better decision.

The research should consider the balance between:

SPEED

and:

UNDERSTANDING

and:

DECISION QUALITY

---

12.9 Situational Awareness

Decision-support should assist operators in maintaining an accurate understanding of the simulated system state.

The operator should be able to determine, where applicable:

- what happened;
- what is currently known;
- what remains uncertain;
- what has been verified;
- what the system recommends;
- what alternatives exist;
- what risks remain;
- and what authority is required.

A representative information structure is:

WHAT HAPPENED?
      ↓
WHAT DO WE KNOW?
      ↓
WHAT HAS BEEN VERIFIED?
      ↓
WHAT REMAINS UNCERTAIN?
      ↓
WHAT DOES THE SYSTEM RECOMMEND?
      ↓
WHAT ARE THE ALTERNATIVES?
      ↓
WHO HAS AUTHORITY?

This structure is intended to support informed human judgement.

---

12.10 Automation Bias

Automation bias is an important research consideration.

Operators may place excessive trust in an automated recommendation, particularly during stressful or information-limited scenarios.

Future experiments should therefore investigate whether operators:

- automatically accept recommendations;
- fail to challenge incorrect assessments;
- overlook contradictory information;
- misunderstand confidence indicators;
- or defer unnecessarily to the system.

The framework should explicitly encourage appropriate human challenge.

The governing principle is:

AI ADVICE MUST REMAIN CHALLENGEABLE.

---

12.11 Complacency and Over-Reliance

Repeatedly successful system recommendations may produce excessive operator confidence.

This creates a potential human-factors risk.

Research should therefore investigate whether prolonged exposure to apparently reliable decision-support changes operator behaviour.

Experiments may include:

- correct recommendations;
- incorrect recommendations;
- incomplete recommendations;
- ambiguous scenarios;
- conflicting information; and
- deliberate system uncertainty.

The objective is to determine whether operators continue to independently evaluate system outputs.

---

12.12 False Alarms and Alarm Fatigue

Repeated warnings can reduce operator responsiveness.

Future research should investigate:

- warning frequency;
- warning prioritisation;
- severity classification;
- repeated alerts;
- conflicting alerts;
- alert escalation;
- and alarm acknowledgement behaviour.

A useful research distinction is:

WARNING ≠ EMERGENCY

and:

ALERT ≠ COMMAND

The system should communicate severity without creating unnecessary alarm.

---

12.13 Information Prioritisation

During complex scenarios, the operator may receive more information than can be processed simultaneously.

Decision-support should therefore investigate structured prioritisation.

Potential priority categories include:

1. immediate safety-relevant condition;
2. system-state change;
3. validation status;
4. critical uncertainty;
5. recommended action;
6. alternative actions;
7. supporting information; and
8. historical information.

The exact priority model should remain subject to experimental validation.

Information should not be prioritised solely because it is technically available.

---

12.14 Human Challenge Function

A resilient decision-support architecture should allow the operator to challenge the system.

Possible challenge functions include:

- reject recommendation;
- request additional diagnostics;
- request supporting evidence;
- request alternative recovery pathway;
- maintain current safe state;
- escalate;
- or suspend simulated recovery.

The purpose is to prevent the decision-support layer from becoming an implicit command authority.

The desired relationship is:

SYSTEM RECOMMENDS

HUMAN QUESTIONS

SYSTEM EXPLAINS

HUMAN DECIDES

---

12.15 Explainability

Decision-support should provide sufficient explanation for the operator to understand the basis of an assessment.

Where technically possible, the system should identify:

- triggering condition;
- affected assessment domain;
- relevant state;
- validation status;
- severity;
- confidence;
- recovery pathway;
- and unresolved uncertainty.

The objective is not necessarily to expose every internal computational detail.

The objective is to provide enough evidence for meaningful human review.

---

12.16 Traceable Decision Records

Every significant human decision within the simulation should, where technically possible, be recorded.

A representative record is:

EVENT
 ↓
SYSTEM ASSESSMENT
 ↓
VALIDATION
 ↓
OPERATOR GUIDANCE
 ↓
RECOMMENDATION
 ↓
HUMAN DECISION
 ↓
REASON
 ↓
TIMESTAMP
 ↓
SIMULATED OUTCOME

A decision record may include:

- scenario identifier;
- event identifier;
- system state;
- recommendation;
- available alternatives;
- human decision;
- decision reason;
- authority level;
- timestamp;
- validation state; and
- final simulated outcome.

This supports later research into decision quality and system behaviour.

---

12.17 Human Decision Consistency

Future experiments may investigate whether equivalent scenarios produce reasonably consistent human decisions when operators receive equivalent information.

Variations should be examined rather than automatically treated as errors.

Differences may result from:

- operator experience;
- workload;
- information interpretation;
- uncertainty;
- scenario complexity;
- timing;
- or differences in decision strategy.

The research should distinguish between:

INCONSISTENCY CAUSED BY SYSTEM INFORMATION

and:

LEGITIMATE HUMAN JUDGEMENT UNDER UNCERTAINTY

---

12.18 Training and Familiarisation

Human-in-the-loop research should account for operator familiarity with the system.

Participants may require training in:

- system terminology;
- resilience classifications;
- confidence indicators;
- validation states;
- recovery pathways;
- authority boundaries;
- and audit functions.

Training should be documented because operator familiarity can influence experimental outcomes.

A participant who does not understand the interface cannot provide a reliable assessment of the interface.

---

12.19 Interface Research

Future research may examine whether the user interface communicates system state effectively.

Potential interface elements include:

- domain status;
- system state;
- severity;
- confidence;
- validation result;
- recovery recommendation;
- authority status;
- audit state;
- and unresolved conditions.

The interface should clearly distinguish:

OBSERVATION

ASSESSMENT

VERIFICATION

RECOMMENDATION

DECISION

SIMULATED ACTION

These categories should not be visually or conceptually conflated.

---

12.20 Human Factors During Cascade Events

Cascade scenarios provide an important opportunity to study human decision-making under increasing complexity.

As multiple abnormalities develop, experiments may investigate whether operators can maintain awareness of:

- primary anomaly;
- secondary effects;
- system state;
- competing recovery pathways;
- uncertainty;
- validation conflicts;
- and authority requirements.

A representative sequence is:

MULTIPLE ANOMALIES
      ↓
INFORMATION COMPLEXITY
      ↓
OPERATOR WORKLOAD
      ↓
DECISION-SUPPORT
      ↓
HUMAN ASSESSMENT
      ↓
AUTHORITY DECISION

The purpose is to determine whether decision-support remains useful as scenario complexity increases.

---

12.21 Human Factors During Communication Loss

Communication-loss scenarios may create particularly important human-factors conditions.

The operator may receive incomplete or delayed information.

The research should therefore investigate whether the operator can distinguish between:

- absence of evidence;
- evidence of absence;
- stale information;
- low-confidence information;
- and verified information.

The framework should avoid allowing missing information to appear equivalent to confirmed safe conditions.

---

12.22 Decision Latency

Decision latency may be measured from the time a validated event is presented to the time the human decision is recorded.

Possible measurements include:

- detection-to-review time;
- review-to-decision time;
- decision-to-simulated-authorisation time;
- and total decision-support cycle time.

Latency should not be interpreted independently from decision quality.

The research question is:

Can the system support timely decisions without encouraging premature decisions?

---

12.23 Decision Quality

Decision quality should be assessed according to predefined experimental criteria.

Potential indicators include:

- consistency with scenario requirements;
- recognition of uncertainty;
- appropriate escalation;
- avoidance of unjustified recovery;
- appropriate use of safe-state options;
- recognition of conflicting information;
- and preservation of authority boundaries.

A decision should not be classified as poor merely because it differs from an AI recommendation.

The human decision must be assessed against the experimental scenario and available evidence.

---

12.24 Human Override

Human override is a deliberate architectural capability.

The operator should be able to reject an automated recommendation where the research scenario permits.

Examples include:

AI RECOMMENDATION:
SWITCH_TO_BACKUP_SATELLITE

HUMAN DECISION:
MAINTAIN_SAFE_STATE

or:

AI RECOMMENDATION:
INITIATE_RECOVERY_SEQUENCE

HUMAN DECISION:
REQUEST_ADDITIONAL_DIAGNOSTICS

These are legitimate research outcomes.

A human decision differing from the automated recommendation should not automatically be treated as system failure.

---

12.25 Escalation

The framework should support escalation where the operator determines that the available information or authority is insufficient.

Possible escalation pathways include:

OPERATOR
   ↓
MISSION CONTROLLER
   ↓
MISSION AUTHORITY
   ↓
SPECIALIST REVIEW

The exact hierarchy is mission-dependent and should remain configurable.

The framework should not invent operational authority structures that have not been defined by the relevant mission organisation.

---

12.26 Human-System Trust

Trust should be treated as an empirical research variable rather than a design assumption.

Future experiments may investigate whether operators:

- trust correct recommendations;
- appropriately distrust incorrect recommendations;
- recognise uncertainty;
- challenge ambiguous results;
- and maintain independent judgement.

The objective is not maximum trust.

The objective is:

CALIBRATED TRUST

where operator confidence corresponds reasonably to system reliability and uncertainty.

---

12.27 Human Factors and Safety

Human-factors performance must not be interpreted as proof of spacecraft safety.

A successful human-in-the-loop experiment demonstrates only that participants behaved in a particular manner under the tested conditions.

Operational safety would require substantially broader engineering and human-factors assurance.

Therefore:

HUMAN-IN-THE-LOOP SUCCESS ≠ OPERATIONAL SAFETY VALIDATION

---

12.28 Experimental Design

Human-factors experiments should be designed to minimise bias.

Where practical, experiments should define in advance:

- participant characteristics;
- training requirements;
- scenario conditions;
- system configuration;
- expected information;
- measured variables;
- success criteria;
- failure criteria;
- and analysis methodology.

Researchers should avoid changing evaluation criteria after observing results unless the change is explicitly documented.

---

12.29 Comparative Human-Factors Testing

Where practical, human decision-support should be compared against alternative information architectures.

Possible comparisons include:

- no decision-support;
- basic alerting;
- conventional dashboard;
- structured decision-support;
- structured decision-support with uncertainty indicators;
- and structured decision-support with explicit human-authority gates.

The objective is to determine whether the proposed architecture provides measurable benefit.

---

12.30 Human Factors Metrics

Potential research measurements include:

- decision latency;
- decision accuracy;
- decision consistency;
- workload;
- confidence;
- error rate;
- escalation rate;
- override rate;
- recommendation acceptance rate;
- recognition of uncertainty;
- situational awareness;
- information comprehension;
- recovery decision consistency;
- and operator satisfaction.

Metrics should be defined before experiments wherever practical.

---

12.31 Negative Human-Factors Results

Negative results should be treated as legitimate research findings.

Examples include:

- excessive workload;
- poor comprehension;
- automation bias;
- inappropriate trust;
- delayed decisions;
- incorrect decisions;
- excessive overrides;
- insufficient overrides;
- warning fatigue;
- confusion between recommendation and command;
- or failure to recognise uncertainty.

Such results should not be hidden because they conflict with the intended architecture.

---

12.32 Research Ethics

Human-in-the-loop research should be conducted according to appropriate research and ethical requirements.

Where human participants are involved, future studies should consider:

- informed participation;
- participant safety;
- appropriate confidentiality;
- data protection;
- workload limits;
- experiment termination criteria;
- and independent review where required.

No participant should be exposed to real spacecraft operational risk as part of this research programme.

The current framework remains a simulation environment.

---

12.33 Human Factors and Cybersecurity

Human behaviour may interact with cybersecurity resilience.

Future experiments may investigate whether operators can recognise:

- suspicious information;
- conflicting telemetry;
- invalid authority;
- compromised data;
- abnormal state requests;
- or audit inconsistencies.

The objective is to understand the combined relationship between:

CYBERSECURITY

INFORMATION INTEGRITY

HUMAN JUDGEMENT

and:

MISSION AUTHORITY

The research should not assume that technical security controls eliminate human-factor risk.

---

12.34 Human Factors and Cascade Resilience

Human decision-making should form part of cascade-resilience experiments.

As system complexity increases, the operator may need to:

- prioritise anomalies;
- distinguish primary from secondary effects;
- assess uncertainty;
- select a safe state;
- request diagnostics;
- reject inappropriate recommendations;
- or escalate.

This provides an opportunity to investigate whether structured decision-support remains effective as simulated cascade depth increases.

---

12.35 Human Authority and Autonomous Systems

The Sextant Protocol™ research architecture deliberately distinguishes autonomous assessment from autonomous authority.

The system may autonomously:

- observe;
- calculate;
- classify;
- verify;
- simulate;
- compare;
- recommend;
- and record.

The system does not thereby acquire independent operational authority.

The governing principle is:

AUTONOMOUS ASSESSMENT ≠ AUTONOMOUS AUTHORITY

and:

AUTONOMOUS SIMULATION ≠ AUTONOMOUS SPACECRAFT CONTROL

---

12.36 Future Research

Future human-factors research may investigate:

- multi-operator coordination;
- mission-controller interaction;
- distributed decision-making;
- long-duration monitoring;
- fatigue effects;
- high-workload scenarios;
- degraded communication;
- conflicting recommendations;
- adaptive interfaces;
- explainable decision-support;
- operator training;
- mixed human-AI teams;
- and hardware-in-the-loop human interaction.

Each research area requires an appropriate experimental design and independent evaluation.

---

12.37 Research Limitations

The current framework has important human-factors limitations.

These may include:

- limited participant testing;
- prototype interface characteristics;
- limited operational realism;
- absence of real mission-control environments;
- absence of certified flight interfaces;
- limited workload studies;
- limited statistical sample sizes;
- limited long-duration testing;
- and absence of operational mission authority.

These limitations define the boundaries within which current results should be interpreted.

---

12.38 No Operational Human-Factors Certification Claim

Nothing within this section constitutes:

- spacecraft human-factors certification;
- mission-control certification;
- crew certification;
- operational decision-support approval;
- autonomous-control approval;
- flight qualification;
- or mission operational approval.

Any future operational application would require mission-specific human-factors engineering, validation and assurance.

---

12.39 Research Integrity Statement

The human-factors research programme follows the principle:

THE HUMAN MUST REMAIN INFORMED, EMPOWERED AND ACCOUNTABLE.

The project therefore commits to:

- transparent decision-support;
- explicit uncertainty;
- human challenge;
- preserved authority boundaries;
- traceable decisions;
- measurable workload;
- documented limitations;
- negative-result reporting;
- independent review; and
- separation between simulation and operational authority.

The objective is not to prove that AI makes better decisions than humans.

The objective is to determine whether structured AI-assisted decision-support can provide measurable value while preserving meaningful human authority.

---

12.40 Summary

Human factors and decision support complete the human-authority layer of the Sextant Protocol™ Orbital Resilience Framework.

The research pathway is:

OBSERVE

→ VERIFY

→ ASSESS

→ EXPLAIN

→ PRESENT OPTIONS

→ HUMAN REVIEW

→ HUMAN DECISION

→ SIMULATED AUTHORISATION

→ AUDIT

The central principle remains:

AI ADVICE ≠ HUMAN AUTHORITY

and:

SIMULATED DECISION ≠ OPERATIONAL COMMAND

The research objective is to determine whether structured decision-support can improve:

UNDERSTANDING

→ TRACEABILITY

→ CALIBRATED TRUST

→ DECISION QUALITY

while preserving:

HUMAN AUTHORITY

HUMAN ACCOUNTABILITY

and:

OPERATIONAL BOUNDARIES

The required research sequence remains:

BUILD → TEST → CHALLENGE → MEASURE → REPEAT → INDEPENDENTLY REVIEW

The final principle of the Human Factors and Decision Support layer is:

INFORM THE HUMAN.

DO NOT REPLACE THE HUMAN.

PRESERVE HUMAN AUTHORITY.

EVIDENCE BEFORE CLAIM.

SIMULATION BEFORE OPERATION.

SEXTANT PROTOCOL™

HUMAN AUTHORITY PRESERVED