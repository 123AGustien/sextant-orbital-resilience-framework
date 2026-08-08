/*
============================================================
🛰️ Sextant Orbital Resilience Cockpit Controller v2.5

Purpose:
Integrated deterministic cockpit controller.

Connections:

- OrbitalEngineV1
- ManoeuvreEngineV1
- FailsafeEngineV1
- ValidationCoreV1
- OperatorGuidanceEngineV1
- HumanDecisionAuthorityV1
- MemoryCoreV1
- AuditCoreV1
- GoldenRuleEngine

Flow:

Scenario Selection
        ↓
OrbitalEngineV1
        ↓
Trial Manoeuvre Engine
        ↓
Failsafe Transition Engine
        ↓
Validation Core
        ↓
Operator Guidance Engine
        ↓
Human Decision Authority
        ↓
Memory Core
        ↓
Audit Core
        ↓
Captain AI Lena Display

Golden Rule Pipeline:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
DECIDE
   ↓
FINAL HUMAN DECISION
   ↓
ACT
   ↓
UPDATE

IMPORTANT:

This controller is simulation-only.

Captain AI Lena provides deterministic
decision support and recommendations.

Final human authorization is required before
any simulated recovery action is considered
authorized.

NO RECOVERY ACTION IS EXECUTED AUTOMATICALLY.
============================================================
*/


// =================================
// SYSTEM INTEGRATION STATUS
// =================================

function updateIntegrationStatus(){

    const statusDisplay =
        document.getElementById("integration");

    if(!statusDisplay){
        return;
    }

    const status = {

        OrbitalEngineV1:
            typeof orbitalEngine !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        ManoeuvreEngineV1:
            typeof manoeuvreEngine !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        FailsafeEngineV1:
            typeof failsafeEngine !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        ValidationCoreV1:
            typeof validationCore !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        OperatorGuidanceEngineV1:
            window.OperatorGuidanceEngineV1
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        HumanDecisionAuthorityV1:
            window.HumanDecisionAuthorityV1
            ?
            "CONNECTED"
            :
            "INTERNAL_CONTROLLER",

        MemoryCoreV1:
            typeof memoryCore !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        AuditCoreV1:
            typeof auditCore !== "undefined"
            ?
            "CONNECTED"
            :
            "NOT_CONNECTED",

        GoldenRuleEngine:
            "ACTIVE"

    };

    statusDisplay.innerText =
        JSON.stringify(
            status,
            null,
            2
        );
}


// =================================
// HUMAN DECISION AUTHORITY
// =================================

/*
This module does not execute spacecraft commands.

It creates an explicit governance gate between:

Operator Guidance
        ↓
Human Authorization
        ↓
Simulated Action

The existing cockpit screen is preserved.
The decision object is stored internally and
included in the complete system output.
*/

function createHumanDecisionAuthority(
    result,
    failsafe,
    operatorGuidance,
    manoeuvre
){

    const recommendedAction =

        operatorGuidance
            ?.operatorGuidance
            ?.recommendedAction ||

        result
            ?.recovery
            ?.action ||

        "NO_ACTION_REQUIRED";


    const currentState =

        failsafe
            ?.currentState ||

        failsafe
            ?.state ||

        "UNKNOWN";


    const severity =

        result
            ?.assessment
            ?.severity ||

        "UNKNOWN";


    const humanDecision = {

        module:
            "HumanDecisionAuthorityV1",

        status:
            "AWAITING_AUTHORIZATION",

        authority:
            "MISSION_CONTROLLER",

        decisionSupport:
            "CAPTAIN_AI_LENA",

        scenario:
            result?.scenario ||
            "UNKNOWN",

        severity:

            severity,

        systemState:

            currentState,

        recommendedAction:

            recommendedAction,

        decisionOptions: [

            "AUTHORIZE_RECOVERY",

            "MAINTAIN_SAFE_STATE",

            "REQUEST_ADDITIONAL_DIAGNOSTICS",

            "ABORT_RECOVERY",

            "ESCALATE_TO_MISSION_AUTHORITY"

        ],

        verificationChecklist: [

            "SYSTEM_STATE_CONFIRMATION",

            "SENSOR_VALIDATION",

            "TELEMETRY_VERIFICATION",

            "RECOVERY_PATH_VERIFICATION",

            "STABILITY_CONFIRMATION",

            "CASCADE_STATUS_CONFIRMATION"

        ],

        trialManoeuvre: {

            engine:

                manoeuvre?.engine ||
                "ManoeuvreEngineV1",

            status:

                manoeuvre?.status ||
                "NOT_AVAILABLE",

            recoveryAssessment:

                manoeuvre?.recoveryAssessment ||
                "NOT_AVAILABLE",

            stabilityVerification:

                manoeuvre?.stabilityVerification ||
                "NOT_AVAILABLE"

        },

        humanDecision: {

            status:
                "PENDING",

            authorizedBy:
                null,

            decision:
                null,

            reason:
                null,

            timestamp:
                null

        },

        executionPolicy:

            "NO_RECOVERY_ACTION_EXECUTED_UNTIL_HUMAN_AUTHORIZATION",

        goldenRuleAuthority:

            "GOLDEN_RULE_ENGINE",

        pipeline: [

            "OBSERVE",

            "VERIFY",

            "ASSESS",

            "DECIDE",

            "FINAL_HUMAN_DECISION",

            "ACT",

            "UPDATE"

        ]

    };


    return humanDecision;

}


// =================================
// RUN ORBITAL SCENARIO
// =================================

function runScenario(type){

    updateIntegrationStatus();


    if(
        typeof orbitalEngine === "undefined"
    ){

        console.error(
            "OrbitalEngineV1 missing"
        );

        return;

    }


    const result =
        orbitalEngine.runScenario(type);


    // =================================
    // TRIAL MANOEUVRE ENGINE
    // =================================

    let manoeuvre = {

        status:
            "NOT_CONNECTED"

    };


    if(
        typeof manoeuvreEngine !== "undefined"
    ){

        manoeuvre =
            manoeuvreEngine.execute(
                result
            );

    }


    // =================================
    // FAILSAFE ENGINE
    // =================================

    let failsafe = {

        status:
            "NOT_CONNECTED"

    };


    if(
        typeof failsafeEngine !== "undefined"
    ){

        failsafe =
            failsafeEngine.evaluate(
                result
            );

    }


    // =================================
    // VALIDATION CORE
    // =================================

    let validation = {

        status:
            "NOT_CONNECTED"

    };


    if(
        typeof validationCore !== "undefined"
    ){

        validation =
            validationCore.validate(
                result,
                failsafe
            );

    }


    // =================================
    // OPERATOR GUIDANCE ENGINE
    // =================================

    let operatorGuidance = {

        status:
            "NOT_CONNECTED"

    };


    const guidanceEngine =

        window.OperatorGuidanceEngineV1 ||

        (
            typeof OperatorGuidanceEngineV1 !==
            "undefined"

            ?

            OperatorGuidanceEngineV1

            :

            null
        );


    if(

        guidanceEngine &&

        typeof guidanceEngine.generateGuidance ===
        "function"

    ){

        operatorGuidance =

            guidanceEngine.generateGuidance({

                scenario:

                    result.scenario ||
                    "UNKNOWN",

                severity:

                    result.assessment?.severity ||
                    "UNKNOWN",

                currentState:

                    failsafe.currentState ||
                    failsafe.state ||
                    "STABILIZED",

                recoveryAction:

                    result.recovery?.action ||
                    "NO_ACTION_REQUIRED",

                decision:

                    result.decision?.decision ||
                    "NO_DECISION_AVAILABLE"

            });

    }


    // =================================
    // HUMAN DECISION AUTHORITY
    // =================================

    const humanDecision =

        createHumanDecisionAuthority(

            result,

            failsafe,

            operatorGuidance,

            manoeuvre

        );


    // =================================
    // SAVE CURRENT STATE
    // =================================

    window.lastOrbitalResult =
        result;

    window.lastManoeuvreResult =
        manoeuvre;

    window.lastFailsafeResult =
        failsafe;

    window.lastValidationResult =
        validation;

    window.lastOperatorGuidance =
        operatorGuidance;

    window.lastHumanDecision =
        humanDecision;


    /*
    Part 2 continues from here.

    DO NOT paste this part into the cockpit yet.
    */
}
// =================================
// MEMORY CORE
// =================================

let memory = null;

if(
    typeof memoryCore !== "undefined"
){

    memory =
        memoryCore.update(
            result,
            failsafe
        );

}


// =================================
// HUMAN DECISION → MEMORY INTEGRATION
// =================================

/*
The Human Decision Authority is recorded
alongside the current simulation state.

No authorization is assumed.

Initial state:
PENDING
*/

if(memory){

    memory.humanDecision = {

        status:
            humanDecision
                .humanDecision
                ?.status ||
            "PENDING",

        authority:
            humanDecision.authority ||
            "MISSION_CONTROLLER",

        decision:
            humanDecision
                .humanDecision
                ?.decision ||
            null,

        recommendedAction:
            humanDecision
                .recommendedAction ||
            "NO_ACTION_REQUIRED",

        reason:
            humanDecision
                .humanDecision
                ?.reason ||
            null,

        timestamp:
            humanDecision
                .humanDecision
                ?.timestamp ||
            null

    };

}


// =================================
// AUDIT CORE
// =================================

let audit = null;

if(
    typeof auditCore !== "undefined"
){

    audit =
        auditCore.generate(
            result,
            validation,
            failsafe
        );

}


// =================================
// HUMAN DECISION → AUDIT INTEGRATION
// =================================

/*
Audit record explicitly records that
human authorization is required.

The simulation does not manufacture
a human authorization.
*/

if(audit){

    audit.humanDecision = {

        authority:

            humanDecision.authority ||
            "MISSION_CONTROLLER",

        status:

            humanDecision
                .humanDecision
                ?.status ||
            "PENDING",

        decision:

            humanDecision
                .humanDecision
                ?.decision ||
            null,

        recommendedAction:

            humanDecision
                .recommendedAction ||
            "NO_ACTION_REQUIRED",

        reason:

            humanDecision
                .humanDecision
                ?.reason ||
            null,

        timestamp:

            humanDecision
                .humanDecision
                ?.timestamp ||
            null,

        executionPolicy:

            humanDecision.executionPolicy,

        authorizationRequired:

            true

    };

}


// =================================
// COMPLETE SYSTEM OUTPUT
// =================================

const displayResult = {

    ...result,

    manoeuvre,

    failsafe,

    validation,

    operatorGuidance,

    humanDecision,

    memory,

    audit

};


// =================================
// OUTPUT DISPLAY
// =================================

const output =

    document.getElementById(
        "output"
    );


if(output){

    output.innerText =

        JSON.stringify(
            displayResult,
            null,
            2
        );

}


// =================================
// MANOEUVRE DISPLAY
// =================================

const manoeuvreDisplay =

    document.getElementById(
        "manoeuvre"
    );


if(manoeuvreDisplay){

    manoeuvreDisplay.innerText =

        JSON.stringify(
            manoeuvre,
            null,
            2
        );

}


// =================================
// FAILSAFE DISPLAY
// =================================

const failsafeDisplay =

    document.get
/* 
============================================================
👤 HUMAN DECISION AUTHORITY CONTROLLER
============================================================

Purpose:

Provide an explicit human authorization gate after:

OBSERVE
VERIFY
ASSESS
DECIDE

and before:

ACT
UPDATE

The controller NEVER assumes human authorization.

Initial state:
PENDING

Supported decisions:

- AUTHORIZE_RECOVERY
- MAINTAIN_SAFE_STATE
- REQUEST_ADDITIONAL_DIAGNOSTICS
- ABORT_RECOVERY
- ESCALATE_TO_MISSION_AUTHORITY

Simulation-only.
No real spacecraft command execution.
============================================================
*/


// =================================
// HUMAN DECISION STATE
// =================================

window.humanDecisionState = {

    status:
        "PENDING",

    authority:
        "MISSION_CONTROLLER",

    decision:
        null,

    reason:
        null,

    timestamp:
        null

};


// =================================
// GET CURRENT HUMAN DECISION
// =================================

function getHumanDecision(){

    if(
        !window.lastHumanDecision
    ){

        return {

            status:
                "NO_SCENARIO",

            authority:
                "MISSION_CONTROLLER",

            decision:
                null,

            reason:
                null,

            timestamp:
                null

        };

    }


    return {

        ...window.lastHumanDecision,

        humanDecision: {

            ...(
                window.lastHumanDecision
                    .humanDecision ||
                {}
            ),

            ...window.humanDecisionState

        }

    };

}


// =================================
// VALIDATE HUMAN DECISION
// =================================

function validateHumanDecision(
    decision
){

    const validDecisions = [

        "AUTHORIZE_RECOVERY",

        "MAINTAIN_SAFE_STATE",

        "REQUEST_ADDITIONAL_DIAGNOSTICS",

        "ABORT_RECOVERY",

        "ESCALATE_TO_MISSION_AUTHORITY"

    ];


    if(
        !validDecisions.includes(
            decision
        )
    ){

        return {

            valid:
                false,

            reason:
                "INVALID_HUMAN_DECISION"

        };

    }


    return {

        valid:
            true,

        reason:
            "HUMAN_DECISION_ACCEPTED"

    };

}


// =================================
// RECORD HUMAN DECISION
// =================================

function recordHumanDecision(
    decision,
    reason
){

    const validation =

        validateHumanDecision(
            decision
        );


    if(
        !validation.valid
    ){

        console.error(

            "👤 Human Decision Rejected:",

            validation.reason

        );

        return false;

    }


    const timestamp =

        new Date().toISOString();


    window.humanDecisionState = {

        status:
            "AUTHORIZED",

        authority:

