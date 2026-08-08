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

Simulation-only controller.

Captain AI Lena provides deterministic
decision support and recommendations.

Final human authorization is required before
a simulated recovery action is considered
authorized.

NO RECOVERY ACTION IS EXECUTED AUTOMATICALLY.
============================================================
*/


// ============================================================
// HUMAN DECISION STATE
// ============================================================

window.humanDecisionState = {

    status: "PENDING",

    authority: "MISSION_CONTROLLER",

    decision: null,

    reason: null,

    timestamp: null

};


window.lastExecutionGate = {

    authorized: false,

    status: "HUMAN_AUTHORIZATION_PENDING",

    action: "NO_ACTION_EXECUTED",

    reason:
        "Final human decision is required."

};


// ============================================================
// SYSTEM INTEGRATION STATUS
// ============================================================

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


// ============================================================
// RESET HUMAN DECISION STATE
// ============================================================

function resetHumanDecisionState(){

    window.humanDecisionState = {

        status: "PENDING",

        authority: "MISSION_CONTROLLER",

        decision: null,

        reason: null,

        timestamp: null

    };


    window.lastExecutionGate = {

        authorized: false,

        status:
            "HUMAN_AUTHORIZATION_PENDING",

        action:
            "NO_ACTION_EXECUTED",

        reason:
            "Final human decision is required."

    };

}


// ============================================================
// HUMAN DECISION AUTHORITY OBJECT
// ============================================================

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


    return {

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

}


// ============================================================
// VALIDATE HUMAN DECISION
// ============================================================

function validateHumanDecision(decision){

    const validDecisions = [

        "AUTHORIZE_RECOVERY",

        "MAINTAIN_SAFE_STATE",

        "REQUEST_ADDITIONAL_DIAGNOSTICS",

        "ABORT_RECOVERY",

        "ESCALATE_TO_MISSION_AUTHORITY"

    ];


    if(
        !validDecisions.includes(decision)
    ){

        return {

            valid: false,

            reason:
                "INVALID_HUMAN_DECISION"

        };

    }


    return {

        valid: true,

        reason:
            "HUMAN_DECISION_ACCEPTED"

    };

}


// ============================================================
// RECORD HUMAN DECISION
// ============================================================

function recordHumanDecision(

    decision,
    reason

){

    const validation =
        validateHumanDecision(
            decision
        );


    if(!validation.valid){

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
            "MISSION_CONTROLLER",

        decision:
            decision,

        reason:
            reason ||
            "Human decision recorded.",

        timestamp:
            timestamp

    };


    if(
        window.lastHumanDecision
    ){

        window.lastHumanDecision
            .humanDecision = {

                ...(
                    window.lastHumanDecision
                        .humanDecision ||
                    {}
                ),

                ...window.humanDecisionState

            };

    }


    updateHumanDecisionRecord();

    updateCompleteAuditTrace();

    refreshSystemOutputAfterHumanDecision();


    console.log(

        "👤 HUMAN DECISION RECORDED",

        window.humanDecisionState

    );


    return true;

}


// ============================================================
// EXECUTION GATE
// ============================================================

function evaluateExecutionGate(){

    const decision =
        window.humanDecisionState;


    if(
        !decision ||
        decision.status !==
        "AUTHORIZED"
    ){

        return {

            authorized:
                false,

            status:
                "HUMAN_AUTHORIZATION_PENDING",

            action:
                "NO_ACTION_EXECUTED",

            reason:
                "Final human decision has not been authorized."

        };

    }


    switch(
        decision.decision
    ){

        case "AUTHORIZE_RECOVERY":

            return {

                authorized:
                    true,

                status:
                    "RECOVERY_AUTHORIZED",

                action:
                    "SIMULATED_RECOVERY_MAY_PROCEED",

                reason:
                    decision.reason

            };


        case "MAINTAIN_SAFE_STATE":

            return {

                authorized:
                    false,

                status:
                    "SAFE_STATE_MAINTAINED",

                action:
                    "NO_RECOVERY_EXECUTED",

                reason:
                    decision.reason

            };


        case "REQUEST_ADDITIONAL_DIAGNOSTICS":

            return {

                authorized:
                    false,

                status:
                    "DIAGNOSTICS_REQUIRED",

                action:
                    "NO_RECOVERY_EXECUTED",

                reason:
                    decision.reason

            };


        case "ABORT_RECOVERY":

            return {

                authorized:
                    false,

                status:
                    "RECOVERY_ABORTED",

                action:
                    "NO_RECOVERY_EXECUTED",

                reason:
                    decision.reason

            };


        case "ESCALATE_TO_MISSION_AUTHORITY":

            return {

                authorized:
                    false,

                status:
                    "ESCALATION_REQUIRED",

                action:
                    "NO_RECOVERY_EXECUTED",

                reason:
                    decision.reason

            };


        default:

            return {

                authorized:
                    false,

                status:
                    "UNKNOWN_DECISION",

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    "Unknown human decision."

            };

    }

}


// ============================================================
// UPDATE HUMAN DECISION RECORD
// ============================================================

function updateHumanDecisionRecord(){

    const executionGate =
        evaluateExecutionGate();


    if(
        window.lastHumanDecision
    ){

        window.lastHumanDecision
            .executionGate =
            executionGate;


        window.lastHumanDecision
            .humanDecision = {

                ...(
                    window.lastHumanDecision
                        .humanDecision ||
                    {}
                ),

                ...window.humanDecisionState

            };

    }


    window.lastExecutionGate =
        executionGate;


    return executionGate;

}


// ============================================================
// GET HUMAN DECISION
// ============================================================

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
                null,

            executionGate:
                window.lastExecutionGate

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

        },

        executionGate:
            window.lastExecutionGate

    };

}


// ============================================================
// HUMAN DECISION STATUS
// ============================================================

function getHumanDecisionStatus(){

    return {

        authority:
            "MISSION_CONTROLLER",

        status:
            window.humanDecisionState
                ?.status ||
            "PENDING",

        decision:
            window.humanDecisionState
                ?.decision ||
            null,

        reason:
            window.humanDecisionState
                ?.reason ||
            null,

        timestamp:
            window.humanDecisionState
                ?.timestamp ||
            null,

        recoveryAuthorized:

            window.humanDecisionState
                ?.decision ===
            "AUTHORIZE_RECOVERY",

        executionGate:
            window.lastExecutionGate ||
            null

    };

}


// ============================================================
// RUN ORBITAL SCENARIO
// ============================================================

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


    // New scenario = new human decision cycle.

    resetHumanDecisionState();


    // ========================================================
    // OBSERVE
    // ========================================================

    const result =
        orbitalEngine.runScenario(
            type
        );


    // ========================================================
    // TRIAL MANOEUVRE
    // ========================================================

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


    // ========================================================
    // FAILSAFE
    // ========================================================

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


    // ========================================================
    // VALIDATION
    // ========================================================

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


    // ========================================================
    // OPERATOR GUIDANCE
    // ========================================================

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


    // ========================================================
    // FINAL HUMAN DECISION GATE
    // ========================================================

    const humanDecision =

        createHumanDecisionAuthority(

            result,

            failsafe,

            operatorGuidance,

            manoeuvre

        );


    /*
    The recommendation is deliberately NOT
    converted into authorization.

    Human state remains:

    PENDING

    until the Mission Controller explicitly
    records a decision.
    */


    // ========================================================
    // SAVE CURRENT STATE
    // ========================================================

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


    updateHumanDecisionRecord();


    // ========================================================
    // MEMORY CORE
    // ========================================================

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


    if(memory){

        memory.humanDecision = {

            status:
                "PENDING",

            authority:
                "MISSION_CONTROLLER",

            decision:
                null,

            recommendedAction:
                humanDecision
                    .recommendedAction ||
                "NO_ACTION_REQUIRED",

            reason:
                null,

            timestamp:
                null,

            executionGate:
                window.lastExecutionGate

        };

    }


    // ========================================================
    // AUDIT CORE
    // ========================================================

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


    if(audit){

        audit.humanDecision = {

            authority:
                "MISSION_CONTROLLER",

            status:
                "PENDING",

            decision:
                null,

            recommendedAction:
                humanDecision
                    .recommendedAction ||
                "NO_ACTION_REQUIRED",

            reason:
                null,

            timestamp:
                null,

            executionPolicy:
                humanDecision.executionPolicy,

            authorizationRequired:
                true,

            automaticExecution:
                false

        };

    }


    // ========================================================
    // HUMAN DECISION EVIDENCE
    // ========================================================

    const humanDecisionEvidence =
        getHumanDecisionEvidence();


    // ========================================================
    // COMPLETE SYSTEM OUTPUT
    // ========================================================

    const displayResult = {

        ...result,

        manoeuvre,

        failsafe,

        validation,

        operatorGuidance,

        humanDecision,

        humanDecisionEvidence,

        executionGate:
            window.lastExecutionGate,

        memory,

        audit

    };


    window.lastCompleteSystemOutput =
        displayResult;


    // ========================================================
    // OUTPUT DISPLAY
    // ========================================================

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


    // ========================================================
    // MANOEUVRE DISPLAY
    // ========================================================

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


    // ========================================================
    // FAILSAFE DISPLAY
    // ========================================================

    const failsafeDisplay =
        document.getElementById(
            "failsafe"
        );


    if(failsafeDisplay){

        failsafeDisplay.innerText =
            JSON.stringify(
                failsafe,
                null,
                2
            );

    }


    // ========================================================
    // VALIDATION DISPLAY
    // ========================================================

    const validationDisplay =
        document.getElementById(
            "validation"
        );


    if(validationDisplay){

        validationDisplay.innerText =
            JSON.stringify(
                validation,
                null,
                2
            );

    }


    // ========================================================
    // OPERATOR GUIDANCE DISPLAY
    // ========================================================

    if(operatorGuidance){

        const guidanceEvent =
            document.getElementById(
                "guidanceEvent"
            );


        const guidanceSeverity =
            document.getElementById(
                "guidanceSeverity"
            );


        const guidanceState =
            document.getElementById(
                "guidanceState"
            );


        const guidanceRecovery =
            document.getElementById(
                "guidanceRecovery"
            );


        if(guidanceEvent){

            guidanceEvent.innerText =
                operatorGuidance.scenario ||
                "-";

        }


        if(guidanceSeverity){

            guidanceSeverity.innerText =
                operatorGuidance.severity ||
                "-";

        }


        if(guidanceState){

            guidanceState.innerText =
                operatorGuidance.systemState ||
                "-";

        }


        if(guidanceRecovery){

            guidanceRecovery.innerText =

                operatorGuidance
                    .operatorGuidance
                    ?.recommendedAction ||

                "-";

        }


        const actionList =
            document.getElementById(
                "guidanceActions"
            );


        if(actionList){

            actionList.innerHTML = "";


            const instructions =

                operatorGuidance
                    .operatorGuidance
                    ?.instructions ||

                [];


            instructions.forEach(
                (action)=>{

                    const item =
                        document.createElement(
                            "li"
                        );

                    item.innerText =
                        action;

                    actionList.appendChild(
                        item
                    );

                }
            );

        }


        const verificationList =
            document.getElementById(
                "guidanceVerification"
            );


        if(verificationList){

            verificationList.innerHTML = "";


            const verification =

                operatorGuidance
                    .operatorGuidance
                    ?.verificationRequired ||

                [];


            verification.forEach(
                (item)=>{

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.innerText =
                        item;

                    verificationList.appendChild(
                        li
                    );

                }
            );

        }

    }


    // ========================================================
    // MEMORY DISPLAY
    // ========================================================

    const memoryDisplay =
        document.getElementById(
            "memory"
        );


    if(memoryDisplay){

        memoryDisplay.innerText =
            JSON.stringify(
                memory,
                null,
                2
            );

    }


    // ========================================================
    // AUDIT DISPLAY
    // ========================================================

    const auditDisplay =
        document.getElementById(
            "audit"
        );


    if(auditDisplay){

        auditDisplay.innerText =
            JSON.stringify(
                audit,
                null,
                2
            );

    }


    // ========================================================
    // VALIDATION STATUS
    // ========================================================

    const validationStatus =
        document.getElementById(
            "validationStatus"
        );


    if(validationStatus){

        const validationPassed =

            validation?.self_test?.status ===
                "PASS"

            ||

            validation?.status ===
                "PASS"

            ||

            validation?.final_status ===
                "VALIDATION_COMPLETE";


        validationStatus.innerText =

            validationPassed
            ?
            "VALIDATION COMPLETE"
            :
            "VALIDATION LOADING...";


        validationStatus.className =

            validationPassed
            ?
            "status-pass"
            :
            "status-warning";

    }


    console.log(
        "🛰️ Orbital Scenario Completed",
        displayResult
    );


    console.log(
        "👤 Final Human Decision:",
        getHumanDecisionStatus()
    );


    return displayResult;

}


// ============================================================
// HUMAN DECISION ACTIONS
// ============================================================

function authorizeRecovery(reason){

    return recordHumanDecision(

        "AUTHORIZE_RECOVERY",

        reason ||
        "Mission Controller authorized simulated recovery after verification."

    );

}


function maintainSafeState(reason){

    return recordHumanDecision(

        "MAINTAIN_SAFE_STATE",

        reason ||
        "Mission Controller elected to maintain the current safe state."

    );

}


function requestAdditionalDiagnostics(reason){

    return recordHumanDecision(

        "REQUEST_ADDITIONAL_DIAGNOSTICS",

        reason ||
        "Mission Controller requested additional diagnostics before recovery."

    );

}


function abortRecovery(reason){

    return recordHumanDecision(

        "ABORT_RECOVERY",

        reason ||
        "Mission Controller aborted the proposed recovery sequence."

    );

}


function escalateToMissionAuthority(reason){

    return recordHumanDecision(

        "ESCALATE_TO_MISSION_AUTHORITY",

        reason ||
        "Mission Controller escalated the decision to Mission Authority."

    );

}


// ============================================================
// CONFIRMED HUMAN DECISION ACTIONS
// ============================================================

function confirmRecoveryAuthorization(reason){

    return authorizeRecovery(reason);

}


function confirmMaintainSafeState(reason){

    return maintainSafeState(reason);

}


function confirmAdditionalDiagnostics(reason){

    return requestAdditionalDiagnostics(reason);

}


function confirmRecoveryAbort(reason){

    return abortRecovery(reason);

}


function confirmMissionEscalation(reason){

    return escalateToMissionAuthority(reason);

}


// ============================================================
// HUMAN DECISION AUDIT
// ============================================================

function updateHumanDecisionAudit(){

    const decision =
        window.humanDecisionState;


    const executionGate =
        evaluateExecutionGate();


    window.lastHumanDecisionAudit = {

        event:
            "HUMAN_DECISION_GATE",

        authority:
            "MISSION_CONTROLLER",

        status:
            decision?.status ||
            "PENDING",

        decision:
            decision?.decision ||
            null,

        reason:
            decision?.reason ||
            null,

        timestamp:
            decision?.timestamp ||
            null,

        executionGate:
            executionGate,

        authorizationRequired:
            true,

        automaticExecution:
            false,

        simulationOnly:
            true,

        trace:
            "GENERATED"

    };


    return window.lastHumanDecisionAudit;

}


// ============================================================
// COMPLETE AUDIT TRACE
// ============================================================

function updateCompleteAuditTrace(){

    const decisionAudit =
        updateHumanDecisionAudit();


    if(
        window.lastHumanDecision
    ){

        window.lastHumanDecision.audit =
            decisionAudit;

    }


    if(
        window.lastOrbitalResult
    ){

        window.lastOrbitalResult
            .humanDecisionAudit =
            decisionAudit;

    }


    return decisionAudit;

}


// ============================================================
// HUMAN DECISION EVIDENCE
// ============================================================

function getHumanDecisionEvidence(){

    const decision =
        window.humanDecisionState;


    const gate =
        evaluateExecutionGate();


    return {

        validator:
            "HumanDecisionAuthorityV1",

        authority:
            "MISSION_CONTROLLER",

        status:
            decision?.status ||
            "PENDING",

        decision:
            decision?.decision ||
            null,

        reason:
            decision?.reason ||
            null,

        timestamp:
            decision?.timestamp ||
            null,

        recoveryAuthorized:
            gate.authorized,

        executionStatus:
            gate.status,

        executionAction:
            gate.action,

        authorizationRequired:
            true,

        automaticExecution:
            false,

        simulationOnly:
            true

    };

}


// ============================================================
// REFRESH COMPLETE OUTPUT
// ============================================================

function refreshSystemOutputAfterHumanDecision(){

    updateHumanDecisionRecord();


    updateCompleteAuditTrace();


    const evidence =
        getHumanDecisionEvidence();


    if(
        window.lastCompleteSystemOutput
    ){

        window.lastCompleteSystemOutput
            .humanDecision =
            getHumanDecision();


        window.lastCompleteSystemOutput
            .humanDecisionEvidence =
            evidence;


        window.lastCompleteSystemOutput
            .executionGate =
            window.lastExecutionGate;


        window.lastCompleteSystemOutput
            .humanDecisionAudit =
            window.lastHumanDecisionAudit;

    }


    const output =
        document.getElementById(
            "output"
        );


    if(
        output &&
        window.lastCompleteSystemOutput
    ){

        output.innerText =
            JSON.stringify(
                window.lastCompleteSystemOutput,
                null,
                2
            );

    }


    const memoryDisplay =
        document.getElementById(
            "memory"
        );


    if(
        memoryDisplay &&
        window.lastCompleteSystemOutput?.memory
    ){

        window.lastCompleteSystemOutput
            .memory
            .humanDecision =
            getHumanDecisionEvidence();


        memoryDisplay.innerText =
            JSON.stringify(
                window.lastCompleteSystemOutput.memory,
                null,
                2
            );

    }


    const auditDisplay =
        document.getElementById(
            "audit"
        );


    if(auditDisplay){

        const auditRecord = {

            ...(
                window.lastCompleteSystemOutput
                    ?.audit ||
                {}
            ),

            humanDecision:
                getHumanDecision(),

            humanDecisionEvidence:
                evidence,

            executionGate:
                window.lastExecutionGate,

            humanDecisionAudit:
                window.lastHumanDecisionAudit

        };


        auditDisplay.innerText =
            JSON.stringify(
                auditRecord,
                null,
                2
            );

    }


    console.log(
        "👤 Human Decision Updated",
        getHumanDecisionStatus()
    );

}


// ============================================================
// RECOVERY AUTHORIZATION STATUS
// ============================================================

function isRecoveryAuthorized(){

    return (

        window.humanDecisionState
            ?.status ===
        "AUTHORIZED"

        &&

        window.humanDecisionState
            ?.decision ===
        "AUTHORIZE_RECOVERY"

    );

}


// ============================================================
// GOLDEN RULE PIPELINE
// ============================================================

function getGoldenRulePipelineStatus(){

    return [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "FINAL_HUMAN_DECISION",

        "ACT",

        "UPDATE"

    ];

}


// ============================================================
// VALIDATION CHECKLIST ACCESS
// ============================================================

function openValidationChecklist(){

    window.location.href =
        "validation-checklist.html";

}


// ============================================================
// GLOBAL EXPORTS
// ============================================================

window.runScenario =
    runScenario;

window.updateIntegrationStatus =
    updateIntegrationStatus;

window.createHumanDecisionAuthority =
    createHumanDecisionAuthority;

window.validateHumanDecision =
    validateHumanDecision;

window.recordHumanDecision =
    recordHumanDecision;

window.getHumanDecision =
    getHumanDecision;

window.getHumanDecisionStatus =
    getHumanDecisionStatus;

window.getHumanDecisionEvidence =
    getHumanDecisionEvidence;

window.isRecoveryAuthorized =
    isRecoveryAuthorized;

window.evaluateExecutionGate =
    evaluateExecutionGate;

window.updateHumanDecisionRecord =
    updateHumanDecisionRecord;

window.updateHumanDecisionAudit =
    updateHumanDecisionAudit;

window.updateCompleteAuditTrace =
    updateCompleteAuditTrace;

window.refreshSystemOutputAfterHumanDecision =
    refreshSystemOutputAfterHumanDecision;

window.authorizeRecovery =
    authorizeRecovery;

window.maintainSafeState =
    maintainSafeState;

window.requestAdditionalDiagnostics =
    requestAdditionalDiagnostics;

window.abortRecovery =
    abortRecovery;

window.escalateToMissionAuthority =
    escalateToMissionAuthority;

window.confirmRecoveryAuthorization =
    confirmRecoveryAuthorization;

window.confirmMaintainSafeState =
    confirmMaintainSafeState;

window.confirmAdditionalDiagnostics =
    confirmAdditionalDiagnostics;

window.confirmRecoveryAbort =
    confirmRecoveryAbort;

window.confirmMissionEscalation =
    confirmMissionEscalation;

window.getGoldenRulePipelineStatus =
    getGoldenRulePipelineStatus;

window.openValidationChecklist =
    openValidationChecklist;


// ============================================================
// SYSTEM STARTUP
// ============================================================

window.addEventListener(

    "load",

    function(){

        console.log(
            "🛰️ Sextant Orbital Resilience Cockpit v2.5 ONLINE"
        );


        console.log(
            "👤 Human Decision Authority: READY"
        );


        console.log(
            "🛡️ Automatic Recovery Execution: DISABLED"
        );


        console.log(
            "📋 Final Human Decision: REQUIRED"
        );


        resetHumanDecisionState();


        updateIntegrationStatus();


        /*
        Existing startup behaviour preserved.

        The SIGNAL_LOSS scenario is still used
        for initial validation.

        Human authorization remains PENDING.
        */

        runScenario(
            "SIGNAL_LOSS"
        );

    }

);


// ============================================================
// FINAL STATUS
// ============================================================

console.log(
    "🛰️ Sextant Orbital Resilience Cockpit Controller v2.5 READY"
);


console.log(
    "Golden Rule Pipeline:",
    getGoldenRulePipelineStatus()
);


console.log(
    "👤 Human Decision Gate:",
    "FINAL HUMAN DECISION REQUIRED"
);


console.log(
    "🛡️ Automatic Recovery:",
    "DISABLED"
);


/*
============================================================
END COCKPIT CONTROLLER v2.5
============================================================
*/