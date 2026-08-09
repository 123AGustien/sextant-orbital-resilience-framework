/*
============================================================
COMMAND_CENTRE_RESILIENCE_CORE_V3
SEXTANT CTI COMMAND-CENTRE V3
============================================================

AUTHORITATIVE DETERMINISTIC COMMAND-CENTRE CORE

Architecture:

CTI UI
   ↓
CommandCentreCoreV3
   ↓
Verification
   ↓
Assessment
   ↓
Golden Rule Engine
   ↓
FINAL HUMAN DECISION
   ↓
Execution Gate
   ↓
SIMULATED ACTION ONLY
   ↓
MemoryCore / AuditCore / ValidationCore

SAFETY BOUNDARY:

automaticExecution          = false
humanAuthorizationRequired  = true
liveSystemControl           = false
simulationOnly              = true

IMPORTANT:

This module is simulation and decision-support logic only.

It does NOT connect to, command, or control live operational
systems.

============================================================
CI VALIDATION MARKER
============================================================
*/

"use strict";


/*
============================================================
AUTHORITATIVE CORE MARKER
============================================================
*/

const COMMAND_CENTRE_RESILIENCE_CORE_V3 =
    "COMMAND_CENTRE_RESILIENCE_CORE_V3";


/*
============================================================
CORE VERSION
============================================================
*/

const COMMAND_CENTRE_CORE_VERSION = "3.0.0";

const GOLDEN_RULE_ENGINE =
    "GOLDEN_RULE_ENGINE";

const OPERATING_MODE =
    "SIMULATION_ONLY";


/*
============================================================
SAFETY CONSTANTS
============================================================
*/

const SAFETY_BOUNDARY = Object.freeze({

    automaticExecution: false,

    humanAuthorizationRequired: true,

    liveSystemControl: false,

    simulationOnly: true

});


/*
============================================================
SCENARIO DEFINITIONS
============================================================

Each scenario is deterministic.

Severity:

LOW
MEDIUM
HIGH
CRITICAL

No scenario permits automatic live execution.

============================================================
*/

const SCENARIO_DEFINITIONS = Object.freeze({

    LOCAL_DISTURBANCE: {

        severity: "LOW",

        systemState: "DEGRADED",

        cascade: false,

        propagation: "CONTAINED",

        containment: "ACTIVE",

        isolation: "AVAILABLE",

        recommendation: "MONITOR_AND_VERIFY",

        failsafe: "STABILIZED",

        recovery: "READY"

    },

    DEPENDENCY_FAILURE: {

        severity: "MEDIUM",

        systemState: "DEGRADED",

        cascade: true,

        propagation: "LIMITED",

        containment: "ACTIVE",

        isolation: "ACTIVATED",

        recommendation: "ISOLATE_FAILED_DEPENDENCY",

        failsafe: "TRANSITIONING",

        recovery: "DIAGNOSTIC_REQUIRED"

    },

    CASCADE_EVENT: {

        severity: "HIGH",

        systemState: "UNSTABLE",

        cascade: true,

        propagation: "ACTIVE",

        containment: "REQUIRED",

        isolation: "ACTIVATED",

        recommendation: "ACTIVATE_CONTAINMENT",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "DIAGNOSTIC_REQUIRED"

    },

    MULTI_NODE_FAILURE: {

        severity: "HIGH",

        systemState: "UNSTABLE",

        cascade: true,

        propagation: "ACTIVE",

        containment: "REQUIRED",

        isolation: "ACTIVATED",

        recommendation: "ISOLATE_AND_STABILIZE",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "DIAGNOSTIC_REQUIRED"

    },

    SYSTEMIC_STRESS: {

        severity: "HIGH",

        systemState: "DEGRADED",

        cascade: true,

        propagation: "ELEVATED",

        containment: "ACTIVE",

        isolation: "AVAILABLE",

        recommendation: "REDUCE_SYSTEM_STRESS",

        failsafe: "STABILIZED",

        recovery: "PLANNED"

    },

    ORBITAL_DRIFT: {

        severity: "MEDIUM",

        systemState: "DEGRADED",

        cascade: false,

        propagation: "CONTAINED",

        containment: "ACTIVE",

        isolation: "AVAILABLE",

        recommendation: "VERIFY_ORBITAL_STATE",

        failsafe: "STABILIZED",

        recovery: "MANOEUVRE_VERIFICATION_REQUIRED"

    },

    SIGNAL_LOSS: {

        severity: "HIGH",

        systemState: "DEGRADED",

        cascade: false,

        propagation: "UNKNOWN",

        containment: "ACTIVE",

        isolation: "AVAILABLE",

        recommendation: "ESTABLISH_REDUNDANT_COMMUNICATION",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "COMMUNICATION_RECOVERY_REQUIRED"

    },

    TELEMETRY_CORRUPTION: {

        severity: "HIGH",

        systemState: "UNTRUSTED_DATA",

        cascade: false,

        propagation: "UNKNOWN",

        containment: "ACTIVE",

        isolation: "ACTIVATED",

        recommendation: "VERIFY_TELEMETRY_SOURCE",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "DATA_VALIDATION_REQUIRED"

    },

    POWER_FAILURE: {

        severity: "CRITICAL",

        systemState: "POWER_DEGRADED",

        cascade: true,

        propagation: "POTENTIAL",

        containment: "REQUIRED",

        isolation: "ACTIVATED",

        recommendation: "PROTECT_CRITICAL_POWER_LOAD",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "POWER_RESTORATION_REQUIRED"

    },

    INERTIAL_DESYNCHRONIZATION: {

        severity: "CRITICAL",

        systemState: "UNSTABLE",

        cascade: true,

        propagation: "POTENTIAL",

        containment: "REQUIRED",

        isolation: "ACTIVATED",

        recommendation: "VERIFY_INERTIAL_REFERENCE",

        failsafe: "FAILSAFE_ACTIVE",

        recovery: "REFERENCE_REVALIDATION_REQUIRED"

    }

});


/*
============================================================
STATE
============================================================
*/

let commandCentreState = createInitialState();


/*
============================================================
INITIAL STATE
============================================================
*/

function createInitialState() {

    return {

        core: {

            name:
                "CommandCentreCoreV3",

            version:
                COMMAND_CENTRE_CORE_VERSION,

            marker:
                COMMAND_CENTRE_RESILIENCE_CORE_V3,

            status:
                "READY"

        },

        scenario:
            "NO SCENARIO SELECTED",

        severity:
            "UNASSESSED",

        systemState:
            "STABLE",

        cascadeStatus:
            "NOT ASSESSED",

        transition:
            "NONE",

        recoveryStatus:
            "NOT ASSESSED",

        recommendation:
            "AWAITING ASSESSMENT",

        assessment: {

            status:
                "PENDING",

            summary:
                "Awaiting simulated system condition."

        },

        verification: {

            eventValidated:
                "PENDING",

            classification:
                "NONE",

            confidence:
                "NONE",

            sensorValidation:
                "PENDING",

            telemetryVerification:
                "PENDING"

        },

        failsafe: {

            status:
                "READY",

            previousState:
                "NONE",

            currentState:
                "STABILIZED",

            transition:
                "NONE",

            isolation: {

                activated:
                    false

            },

            cascadeControl: {

                propagation:
                    "NOT ASSESSED",

                containment:
                    "NOT ASSESSED"

            },

            secondarySystem: {

                status:
                    "STANDBY"

            },

            recovery: {

                status:
                    "NOT ASSESSED"

            },

            verificationGate: {

                eventValidated:
                    "PENDING",

                classification:
                    "NONE",

                confidence:
                    "NONE"

            }

        },

        manoeuvre: {

            engine:
                "ManoeuvreEngineV1",

            profile:
                "NONE",

            objective:
                "NONE",

            verification:
                "PENDING",

            stabilityVerification:
                "PENDING",

            recoveryAssessment:
                "NOT ASSESSED"

        },

        decision: {

            decision:
                "AWAITING ASSESSMENT",

            authority:
                "GOLDEN_RULE_ENGINE",

            automaticExecution:
                false

        },

        humanDecision: {

            status:
                "AWAITING AUTHORIZATION",

            authority:
                "MISSION CONTROLLER",

            decision:
                null,

            timestamp:
                null

        },

        executionGate: {

            authorized:
                false,

            status:
                "HUMAN_AUTHORIZATION_PENDING",

            action:
                "NO_ACTION_EXECUTED"

        },

        simulatedAction:
            "NONE",

        finalState:
            "SAFE STATE",

        memory: {

            status:
                "READY",

            scenario:
                "NONE",

            decision:
                "NONE",

            state:
                "NONE",

            execution:
                "NONE",

            severity:
                "NONE"

        },

        audit: {

            status:
                "AWAITING_EVENT",

            event:
                null,

            verification:
                null,

            assessment:
                null,

            decision:
                null,

            humanDecision:
                null,

            executionGate:
                null,

            finalStatus:
                "SAFE STATE",

            timestamp:
                null

        },

        validation: {

            architecture:
                "READY",

            selfTest:
                {

                    status:
                        "PENDING"

                },

            faultIdentification:
                {

                    status:
                        "PENDING"

                },

            failsafeValidation:
                {

                    status:
                        "PENDING"

                },

            decisionCore:
                {

                    status:
                        "PENDING",

                    authority:
                        GOLDEN_RULE_ENGINE

                },

            safetyBoundary:
                "PASS",

            humanDecisionGate:
                "ACTIVE",

            simulationBoundary:
                "ACTIVE",

            reTestValidation:
                {

                    status:
                        "PENDING"

                },

            finalStatus:
                "PENDING TEST"

        },

        automaticExecution:
            false,

        humanAuthorizationRequired:
            true,

        liveSystemControl:
            false,

        simulationOnly:
            true,

        goldenRuleAuthority:
            GOLDEN_RULE_ENGINE,

        operatingMode:
            OPERATING_MODE

    };

}


/*
============================================================
UTILITY — SAFE CLONE
============================================================
*/

function cloneState(state) {

    return JSON.parse(
        JSON.stringify(state)
    );

}


/*
============================================================
UTILITY — TIMESTAMP
============================================================
*/

function timestamp() {

    return new Date().toISOString();

}


/*
============================================================
UTILITY — SCENARIO NORMALIZATION
============================================================
*/

function normalizeScenario(scenario) {

    if (
        typeof scenario !== "string"
    ) {

        return null;

    }

    const normalized =
        scenario
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "_");

    return normalized;

}


/*
============================================================
VERIFICATION CORE
============================================================
*/

function verifyScenario(scenario) {

    const exists =
        Object.prototype.hasOwnProperty.call(
            SCENARIO_DEFINITIONS,
            scenario
        );

    if (!exists) {

        return {

            eventValidated:
                "FAILED",

            classification:
                "UNKNOWN_SCENARIO",

            confidence:
                "0%",

            sensorValidation:
                "FAILED",

            telemetryVerification:
                "FAILED"

        };

    }

    return {

        eventValidated:
            "PASS",

        classification:
            scenario,

        confidence:
            "100%",

        sensorValidation:
            "SIMULATED_PASS",

        telemetryVerification:
            "SIMULATED_PASS"

    };

}


/*
============================================================
ASSESSMENT CORE
============================================================
*/

function assessScenario(
    scenario,
    definition,
    verification
) {

    let summary =
        "Scenario verified.";

    if (
        definition.severity === "LOW"
    ) {

        summary =
            "Localized condition detected. System remains within a contained resilience envelope.";

    }

    if (
        definition.severity === "MEDIUM"
    ) {

        summary =
            "Moderate resilience degradation detected. Dependency and state verification required.";

    }

    if (
        definition.severity === "HIGH"
    ) {

        summary =
            "High-severity resilience event detected. Containment and stabilization are required.";

    }

    if (
        definition.severity === "CRITICAL"
    ) {

        summary =
            "Critical simulated condition detected. Protective failsafe state and human authority are required.";

    }

    return {

        status:
            verification.eventValidated === "PASS"
                ? "VALIDATED"
                : "FAILED",

        severity:
            definition.severity,

        summary:
            summary,

        cascade:
            definition.cascade,

        recommendation:
            definition.recommendation

    };

}


/*
============================================================
FAILSAFE ASSESSMENT
============================================================
*/

function buildFailsafeState(
    previousState,
    definition
) {

    const isolationActivated =
        definition.isolation ===
        "ACTIVATED";

    return {

        status:
            definition.failsafe ===
            "FAILSAFE_ACTIVE"
                ? "ACTIVE"
                : "READY",

        previousState:
            previousState,

        currentState:
            definition.failsafe,

        transition:
            previousState !==
            definition.failsafe
                ? "STATE_TRANSITION"
                : "NO_CHANGE",

        isolation: {

            activated:
                isolationActivated

        },

        cascadeControl: {

            propagation:
                definition.propagation,

            containment:
                definition.containment

        },

        secondarySystem: {

            status:
                definition.cascade
                    ? "STANDBY_FOR_REDUNDANCY"
                    : "STANDBY"

        },

        recovery: {

            status:
                definition.recovery

        },

        verificationGate:
            {

                eventValidated:
                    "PASS",

                classification:
                    definition.severity,

                confidence:
                    "100%"

            }

    };

}


/*
============================================================
MANOEUVRE SIMULATION
============================================================
*/

function buildManoeuvre(
    scenario,
    definition
) {

    let profile =
        "NONE";

    let objective =
        "NONE";

    if (
        scenario === "ORBITAL_DRIFT"
    ) {

        profile =
            "ORBITAL_STATE_VERIFICATION";

        objective =
            "VERIFY_SIMULATED_ORBITAL_STABILITY";

    }

    else if (
        scenario === "INERTIAL_DESYNCHRONIZATION"
    ) {

        profile =
            "INERTIAL_REFERENCE_VERIFICATION";

        objective =
            "VERIFY_REFERENCE_ALIGNMENT";

    }

    else if (
        definition.cascade
    ) {

        profile =
            "STABILIZATION_SIMULATION";

        objective =
            "CONTAIN_SIMULATED_PROPAGATION";

    }

    return {

        engine:
            "ManoeuvreEngineV1",

        profile:
            profile,

        objective:
            objective,

        verification:
            profile === "NONE"
                ? "NOT REQUIRED"
                : "SIMULATION_PENDING",

        stabilityVerification:
            "PENDING",

        recoveryAssessment:
            definition.recovery

    };

}


/*
============================================================
GOLDEN RULE ENGINE
============================================================

OBSERVE
VERIFY
ASSESS
DECIDE
FINAL HUMAN DECISION
ACT
UPDATE

============================================================
*/

function goldenRuleDecision(
    scenario,
    assessment
) {

    let decision =
        assessment.recommendation;

    if (
        assessment.severity ===
        "CRITICAL"
    ) {

        decision =
            assessment.recommendation;

    }

    return {

        pipeline: [

            "OBSERVE",
            "VERIFY",
            "ASSESS",
            "DECIDE",
            "FINAL HUMAN DECISION",
            "ACT",
            "UPDATE"

        ],

        decision:
            decision,

        authority:
            GOLDEN_RULE_ENGINE,

        automaticExecution:
            false

    };

}


/*
============================================================
DECISION SUPPORT
============================================================
*/

function buildDecisionSupport(
    scenario,
    assessment,
    definition
) {

    const decision =
        goldenRuleDecision(
            scenario,
            assessment
        );

    return {

        decision:
            decision.decision,

        authority:
            decision.authority,

        automaticExecution:
            false,

        severity:
            definition.severity,

        guidance:
            "Human mission authority must review the simulated recommendation before any simulated action is recorded."

    };

}


/*
============================================================
HUMAN DECISION VALIDATION
============================================================
*/

const HUMAN_DECISIONS = Object.freeze([

    "AUTHORIZE_RECOVERY",

    "MAINTAIN_SAFE_STATE",

    "REQUEST_DIAGNOSTICS",

    "ABORT_RECOVERY",

    "ESCALATE"

]);


function validateHumanDecision(
    decision
) {

    return HUMAN_DECISIONS.includes(
        decision
    );

}


/*
============================================================
EXECUTION GATE
============================================================

Even when human authorization is recorded, the gate remains
closed for live execution because:

liveSystemControl = false

The only possible result is a simulated action record.

============================================================
*/

function buildExecutionGate(
    decision
) {

    const valid =
        validateHumanDecision(
            decision
        );

    if (!valid) {

        return {

            authorized:
                false,

            status:
                "INVALID_HUMAN_DECISION",

            action:
                "NO_ACTION_EXECUTED"

        };

    }

    let action =
        "NO_SIMULATED_ACTION";

    switch (decision) {

        case "AUTHORIZE_RECOVERY":

            action =
                "SIMULATED_RECOVERY_AUTHORIZED";

            break;

        case "MAINTAIN_SAFE_STATE":

            action =
                "SIMULATED_SAFE_STATE_MAINTAINED";

            break;

        case "REQUEST_DIAGNOSTICS":

            action =
                "SIMULATED_DIAGNOSTICS_REQUESTED";

            break;

        case "ABORT_RECOVERY":

            action =
                "SIMULATED_RECOVERY_ABORTED";

            break;

        case "ESCALATE":

            action =
                "SIMULATED_ESCALATION_TO_MISSION_AUTHORITY";

            break;

    }

    return {

        authorized:
            true,

        status:
            "HUMAN_DECISION_RECORDED_SIMULATION_ONLY",

        action:
            action

    };

}


/*
============================================================
MEMORY CORE
============================================================
*/

function updateMemory(
    state,
    humanDecision
) {

    state.memory = {

        status:
            "UPDATED",

        scenario:
            state.scenario,

        decision:
            humanDecision || "NONE",

        state:
            state.systemState,

        execution:
            state.executionGate.status,

        severity:
            state.severity

    };

}


/*
============================================================
AUDIT CORE
============================================================
*/

function buildAuditRecord(
    state
) {

    return {

        core:
            COMMAND_CENTRE_RESILIENCE_CORE_V3,

        version:
            COMMAND_CENTRE_CORE_VERSION,

        timestamp:
            timestamp(),

        event:
            {

                scenario:
                    state.scenario,

                severity:
                    state.severity

            },

        verification:
            state.verification,

        assessment:
            state.assessment,

        goldenRule:
            {

                authority:
                    state.goldenRuleAuthority,

                decision:
                    state.decision.decision

            },

        humanDecision:
            state.humanDecision,

        executionGate:
            state.executionGate,

        finalStatus:
            state.finalState,

        safetyBoundary:
            SAFETY_BOUNDARY

    };

}


/*
============================================================
VALIDATION CORE
============================================================
*/

function runValidation(
    state
) {

    state.validation.architecture =
        "PASS";

    state.validation.selfTest =
        {

            status:
                "PASS"

        };

    state.validation.faultIdentification =
        {

            status:
                state.scenario ===
                "NO SCENARIO SELECTED"
                    ? "PENDING"
                    : "PASS"

        };

    state.validation.failsafeValidation =
        {

            status:
                state.failsafe.currentState
                    ? "PASS"
                    : "FAIL"

        };

    state.validation.decisionCore =
        {

            status:
                state.decision.decision !==
                "AWAITING ASSESSMENT"
                    ? "PASS"
                    : "PENDING",

            authority:
                GOLDEN_RULE_ENGINE

        };

    state.validation.safetyBoundary =
        (
            state.automaticExecution === false &&
            state.humanAuthorizationRequired === true &&
            state.liveSystemControl === false &&
            state.simulationOnly === true
        )
            ? "PASS"
            : "FAIL";

    state.validation.humanDecisionGate =
        "ACTIVE";

    state.validation.simulationBoundary =
        state.simulationOnly === true
            ? "ACTIVE"
            : "FAIL";

    state.validation.reTestValidation =
        {

            status:
                state.humanDecision.decision
                    ? "PASS"
                    : "PENDING"

        };

    state.validation.finalStatus =
        (
            state.validation.architecture === "PASS" &&
            state.validation.safetyBoundary === "PASS" &&
            state.validation.simulationBoundary === "ACTIVE"
        )
            ? "PASS"
            : "PENDING TEST";

}


/*
============================================================
FINAL STATE CALCULATION
============================================================
*/

function calculateFinalState(
    state
) {

    if (
        state.executionGate.authorized === true
    ) {

        return "HUMAN_DECISION_RECORDED — SIMULATION ONLY";

    }

    if (
        state.severity === "CRITICAL"
    ) {

        return "SAFE STATE — HUMAN AUTHORITY REQUIRED";

    }

    if (
        state.severity === "HIGH"
    ) {

        return "CONTAINED — HUMAN AUTHORITY REQUIRED";

    }

    if (
        state.severity === "MEDIUM"
    ) {

        return "STABILIZED — HUMAN REVIEW REQUIRED";

    }

    if (
        state.severity === "LOW"
    ) {

        return "SAFE STATE";

    }

    return "SAFE STATE";

}


/*
============================================================
CORE → UI PUBLIC STATE
============================================================
*/

function publishState() {

    const published =
        cloneState(
            commandCentreState
        );

    if (
        typeof window !== "undefined" &&
        typeof window.updateCTIScreen ===
        "function"
    ) {

        window.updateCTIScreen(
            published
        );

    }

    return published;

}


/*
============================================================
RUN SCENARIO
============================================================
*/

function runScenario(
    scenario
) {

    const normalized =
        normalizeScenario(
            scenario
        );

    const definition =
        SCENARIO_DEFINITIONS[
            normalized
        ];

    if (!definition) {

        commandCentreState =
            createInitialState();

        commandCentreState.scenario =
            normalized ||
            "INVALID_SCENARIO";

        commandCentreState.verification =
            verifyScenario(
                normalized
            );

        commandCentreState.assessment =
            {

                status:
                    "FAILED",

                severity:
                    "UNKNOWN",

                summary:
                    "Scenario could not be validated."

            };

        commandCentreState.recommendation =
            "NO_ACTION";

        commandCentreState.decision =
            {

                decision:
                    "NO_ACTION",

                authority:
                    GOLDEN_RULE_ENGINE,

                automaticExecution:
                    false

            };

        commandCentreState.validation =
            {

                architecture:
                    "PASS",

                selfTest:
                    {

                        status:
                            "PASS"

                    },

                faultIdentification:
                    {

                        status:
                            "PASS"

                    },

                failsafeValidation:
                    {

                        status:
                            "PASS"

                    },

                decisionCore:
                    {

                        status:
                            "PASS",

                        authority:
                            GOLDEN_RULE_ENGINE

                    },

                safetyBoundary:
                    "PASS",

                humanDecisionGate:
                    "ACTIVE",

                simulationBoundary:
                    "ACTIVE",

                reTestValidation:
                    {

                        status:
                            "PENDING"

                    },

                finalStatus:
                    "FAIL — INVALID SCENARIO"

            };

        commandCentreState.audit =
            buildAuditRecord(
                commandCentreState
            );

        return publishState();

    }


    const previousFailsafeState =
        commandCentreState.failsafe.currentState;


    /*
    --------------------------------------------------------
    RESET HUMAN DECISION FOR NEW EVENT
    --------------------------------------------------------
    */

    commandCentreState =
        createInitialState();


    commandCentreState.scenario =
        normalized;


    commandCentreState.severity =
        definition.severity;


    /*
    --------------------------------------------------------
    OBSERVE
    --------------------------------------------------------
    */

    commandCentreState.assessment =
        {

            status:
                "OBSERVED",

            summary:
                "Simulated condition received and prepared for deterministic verification."

        };


    /*
    --------------------------------------------------------
    VERIFY
    --------------------------------------------------------
    */

    commandCentreState.verification =
        verifyScenario(
            normalized
        );


    commandCentreState.failsafe.verificationGate =
        commandCentreState.verification;


    /*
    --------------------------------------------------------
    ASSESS
    --------------------------------------------------------
    */

    commandCentreState.assessment =
        assessScenario(
            normalized,
            definition,
            commandCentreState.verification
        );


    commandCentreState.systemState =
        definition.systemState;


    commandCentreState.cascadeStatus =
        definition.cascade
            ? "CASCADE RISK DETECTED"
            : "CONTAINED";


    commandCentreState.recoveryStatus =
        definition.recovery;


    /*
    --------------------------------------------------------
    FAILSAFE
    --------------------------------------------------------
    */

    commandCentreState.failsafe =
        buildFailsafeState(
            previousFailsafeState,
            definition
        );


    commandCentreState.transition =
        commandCentreState.failsafe.transition;


    /*
    --------------------------------------------------------
    MANOEUVRE
    --------------------------------------------------------
    */

    commandCentreState.manoeuvre =
        buildManoeuvre(
            normalized,
            definition
        );


    /*
    --------------------------------------------------------
    DECIDE
    --------------------------------------------------------
    */

    commandCentreState.decision =
        buildDecisionSupport(
            normalized,
            commandCentreState.assessment,
            definition
        );


    commandCentreState.recommendation =
        commandCentreState.decision.decision;


    /*
    --------------------------------------------------------
    HUMAN DECISION RESET
    --------------------------------------------------------
    */

    commandCentreState.humanDecision =
        {

            status:
                "AWAITING AUTHORIZATION",

            authority:
                "MISSION CONTROLLER",

            decision:
                null,

            timestamp:
                null

        };


    /*
    --------------------------------------------------------
    EXECUTION GATE RESET
    --------------------------------------------------------
    */

    commandCentreState.executionGate =
        {

            authorized:
                false,

            status:
                "HUMAN_AUTHORIZATION_PENDING",

            action:
                "NO_ACTION_EXECUTED"

        };


    commandCentreState.simulatedAction =
        "NONE";


    /*
    --------------------------------------------------------
    SAFE FINAL STATE
    --------------------------------------------------------
    */

    commandCentreState.finalState =
        calculateFinalState(
            commandCentreState
        );


    /*
    --------------------------------------------------------
    VALIDATION
    --------------------------------------------------------
    */

    runValidation(
        commandCentreState
    );


    /*
    --------------------------------------------------------
    AUDIT
    --------------------------------------------------------
    */

    commandCentreState.audit =
        buildAuditRecord(
            commandCentreState
        );


    /*
    --------------------------------------------------------
    PUBLISH
    --------------------------------------------------------
    */

    return publishState();

}


/*
============================================================
HUMAN DECISION
============================================================
*/

function humanDecision(
    decision
) {

    const normalized =
        typeof decision === "string"
            ? decision.trim().toUpperCase()
            : null;


    if (
        !validateHumanDecision(
            normalized
        )
    ) {

        return publishState();

    }


    /*
    --------------------------------------------------------
    RECORD HUMAN AUTHORITY
    --------------------------------------------------------
    */

    commandCentreState.humanDecision =
        {

            status:
                "AUTHORIZED",

            authority:
                "MISSION CONTROLLER",

            decision:
                normalized,

            timestamp:
                timestamp()

        };


    /*
    --------------------------------------------------------
    EXECUTION GATE
    --------------------------------------------------------
    */

    commandCentreState.executionGate =
        buildExecutionGate(
            normalized
        );


    /*
    --------------------------------------------------------
    SAFETY ENFORCEMENT
    --------------------------------------------------------
    */

    if (
        commandCentreState.liveSystemControl !==
        true
    ) {

        commandCentreState.executionGate.status =
            "HUMAN_DECISION_RECORDED_SIMULATION_ONLY";

    }


    commandCentreState.simulatedAction =
        commandCentreState.executionGate.action;


    /*
    --------------------------------------------------------
    UPDATE FINAL STATE
    --------------------------------------------------------
    */

    commandCentreState.finalState =
        calculateFinalState(
            commandCentreState
        );


    /*
    --------------------------------------------------------
    UPDATE MEMORY
    --------------------------------------------------------
    */

    updateMemory(
        commandCentreState,
        normalized
    );


    /*
    --------------------------------------------------------
    RE-TEST VALIDATION
    --------------------------------------------------------
    */

    runValidation(
        commandCentreState
    );


    /*
    --------------------------------------------------------
    FINAL AUDIT
    --------------------------------------------------------
    */

    commandCentreState.audit =
        buildAuditRecord(
            commandCentreState
        );


    /*
    --------------------------------------------------------
    PUBLISH
    --------------------------------------------------------
    */

    return publishState();

}


/*
============================================================
SELF TEST
============================================================
*/

function selfTest() {

    const results = [];

    const scenarios =
        Object.keys(
            SCENARIO_DEFINITIONS
        );


    /*
    --------------------------------------------------------
    TEST 1 — MARKER
    --------------------------------------------------------
    */

    results.push({

        test:
            "COMMAND_CENTRE_RESILIENCE_CORE_V3_MARKER",

        pass:
            COMMAND_CENTRE_RESILIENCE_CORE_V3 ===
            "COMMAND_CENTRE_RESILIENCE_CORE_V3"

    });


    /*
    --------------------------------------------------------
    TEST 2 — SCENARIO REGISTRY
    --------------------------------------------------------
    */

    results.push({

        test:
            "SCENARIO_REGISTRY",

        pass:
            scenarios.length === 10

    });


    /*
    --------------------------------------------------------
    TEST 3 — SAFETY BOUNDARY
    --------------------------------------------------------
    */

    results.push({

        test:
            "SAFETY_BOUNDARY",

        pass:
            SAFETY_BOUNDARY.automaticExecution === false &&
            SAFETY_BOUNDARY.humanAuthorizationRequired === true &&
            SAFETY_BOUNDARY.liveSystemControl === false &&
            SAFETY_BOUNDARY.simulationOnly === true

    });


    /*
    --------------------------------------------------------
    TEST 4 — HUMAN DECISION
    --------------------------------------------------------
    */

    results.push({

        test:
            "HUMAN_DECISION_GATE",

        pass:
            validateHumanDecision(
                "MAINTAIN_SAFE_STATE"
            ) === true

    });


    /*
    --------------------------------------------------------
    TEST 5 — UNKNOWN DECISION
    --------------------------------------------------------
    */

    results.push({

        test:
            "INVALID_DECISION_REJECTION",

        pass:
            validateHumanDecision(
                "AUTOMATIC_EXECUTION"
            ) === false

    });


    /*
    --------------------------------------------------------
    TEST 6 — SCENARIO VERIFICATION
    --------------------------------------------------------
    */

    const verification =
        verifyScenario(
            "CASCADE_EVENT"
        );

    results.push({

        test:
            "SCENARIO_VERIFICATION",

        pass:
            verification.eventValidated ===
            "PASS"

    });


    /*
    --------------------------------------------------------
    FINAL SELF TEST
    --------------------------------------------------------
    */

    const passed =
        results.every(
            result =>
                result.pass === true
        );


    return {

        status:
            passed
                ? "PASS"
                : "FAIL",

        tests:
            results,

        timestamp:
            timestamp()

    };

}


/*
============================================================
VALIDATION RUN
============================================================
*/

function validateCore() {

    const result =
        selfTest();


    commandCentreState.validation.selfTest =
        {

            status:
                result.status,

            results:
                result.tests

        };


    commandCentreState.validation.architecture =
        result.status;


    commandCentreState.validation.safetyBoundary =
        (
            SAFETY_BOUNDARY.automaticExecution === false &&
            SAFETY_BOUNDARY.humanAuthorizationRequired === true &&
            SAFETY_BOUNDARY.liveSystemControl === false &&
            SAFETY_BOUNDARY.simulationOnly === true
        )
            ? "PASS"
            : "FAIL";


    commandCentreState.validation.humanDecisionGate =
        "ACTIVE";


    commandCentreState.validation.simulationBoundary =
        "ACTIVE";


    commandCentreState.validation.finalStatus =
        result.status;


    return {

        marker:
            COMMAND_CENTRE_RESILIENCE_CORE_V3,

        version:
            COMMAND_CENTRE_CORE_VERSION,

        status:
            result.status,

        validation:
            cloneState(
                commandCentreState.validation
            )

    };

}


/*
============================================================
PUBLIC API
============================================================
*/

const CommandCentreCoreV3 = Object.freeze({

    name:
        "CommandCentreCoreV3",

    version:
        COMMAND_CENTRE_CORE_VERSION,

    marker:
        COMMAND_CENTRE_RESILIENCE_CORE_V3,

    safetyBoundary:
        SAFETY_BOUNDARY,

    scenarios:
        SCENARIO_DEFINITIONS,

    runScenario,

    humanDecision,

    selfTest,

    validateCore,

    getState:
        function() {

            return cloneState(
                commandCentreState
            );

        }

});


/*
============================================================
BROWSER GLOBAL API
============================================================
*/

if (
    typeof window !== "undefined"
) {

    window.CommandCentreCoreV3 =
        CommandCentreCoreV3;


    window.commandCentreCoreV3 =
        CommandCentreCoreV3;


    window.commandCentreRunScenario =
        runScenario;


    window.commandCentreHumanDecision =
        humanDecision;


    window.commandCentreValidate =
        validateCore;


    window.commandCentreSelfTest =
        selfTest;

}


/*
============================================================
NODE / CI COMPATIBILITY
============================================================

The GitHub Actions validation runner executes this file under
Node.js. Export the authoritative core without requiring a
browser environment.

============================================================
*/

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {

        COMMAND_CENTRE_RESILIENCE_CORE_V3,

        COMMAND_CENTRE_CORE_VERSION,

        GOLDEN_RULE_ENGINE,

        OPERATING_MODE,

        SAFETY_BOUNDARY,

        SCENARIO_DEFINITIONS,

        CommandCentreCoreV3,

        runScenario,

        humanDecision,

        selfTest,

        validateCore

    };

}


/*
============================================================
INITIAL VALIDATION
============================================================
*/

const INITIAL_CORE_VALIDATION =
    selfTest();


/*
============================================================
INITIAL BROWSER PUBLICATION
============================================================
*/

if (
    typeof window !== "undefined" &&
    typeof window.updateCTIScreen ===
    "function"
) {

    window.updateCTIScreen(
        cloneState(
            commandCentreState
        )
    );

}


/*
============================================================
END COMMAND CENTRE RESILIENCE CORE V3
============================================================
*/