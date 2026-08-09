/*
============================================================
🛰️ SEXTANT COMMAND-CENTRE RESILIENCE CORE v3.1

File:
commandCentreCoreV3.js

Purpose:
Supervisory command-centre architecture layer.

CTI INTEGRATION:
Sextant CTI Command-Centre V3

Architecture:
Sextant Orbital Resilience Framework v2.4
Command-Centre Resilience Core v3.1

Role:
Integrates validated domain outputs into a structured
Command-Centre / CTI operational picture.

This module does NOT replace domain engines.

It provides the supervisory architecture connecting:

DOMAIN DATA
      ↓
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
EXECUTION GATE
      ↓
SIMULATED ACTION / SAFE STATE
      ↓
UPDATE
      ↓
MEMORY + AUDIT
      ↓
CTI COMMAND-CENTRE DISPLAY

CORE PRINCIPLES:

- Deterministic simulation
- Decision support
- Human authority
- No autonomous execution
- Traceability
- Validation
- Memory continuity
- Audit continuity
- CTI screen integration

OPERATIONAL BOUNDARY:

AUTOMATIC EXECUTION = FALSE
HUMAN AUTHORIZATION = REQUIRED
SIMULATION ONLY = TRUE
LIVE SYSTEM CONTROL = FALSE

============================================================
*/


(function(){

"use strict";


// ============================================================
// COMMAND-CENTRE CORE V3.1
// ============================================================

const CommandCentreCoreV3 = {

    engine:
        "CommandCentreCoreV3",

    version:
        "3.1",

    framework:
        "Sextant Orbital Resilience Framework v2.4",

    architecture:
        "COMMAND_CENTRE_RESILIENCE_CORE_V3",

    operatingMode:
        "SIMULATION_ONLY",

    automaticExecution:
        false,

    humanAuthorizationRequired:
        true,

    liveSystemControl:
        false,

    simulationOnly:
        true,

    authority:
        "GOLDEN_RULE_ENGINE",

    humanAuthority:
        "MISSION_CONTROLLER",


    // ========================================================
    // CTI SCREEN
    // ========================================================

    ctiScreen: {

        name:
            "SEXTANT CTI COMMAND-CENTRE V3",

        status:
            "READY",

        connected:
            false,

        mode:
            "SIMULATION_ONLY",

        controller:
            "commandCentreCoreV3.js"

    },


    // ========================================================
    // GOLDEN RULE PIPELINE
    // ========================================================

    goldenRulePipeline: [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "FINAL_HUMAN_DECISION",

        "ACT",

        "UPDATE"

    ],


    // ========================================================
    // NINE-LAYER ARCHITECTURE
    // ========================================================

    nineLayerStack: [

        "SENSOR",

        "RELAY",

        "DEPENDENCY",

        "CASCADE",

        "TRANSITION",

        "ISOLATION",

        "RECOVERY",

        "GOVERNANCE",

        "SUPERVISORY"

    ],


    // ========================================================
    // EXECUTION POLICY
    // ========================================================

    executionPolicy: {

        automaticExecution:
            false,

        humanAuthorizationRequired:
            true,

        simulationOnly:
            true,

        liveSystemControl:
            false,

        unauthorizedAction:
            "NO_ACTION_EXECUTED",

        authorizedAction:
            "SIMULATED_ACTION_MAY_PROCEED"

    },


    // ========================================================
    // DOMAIN REGISTRY
    // ========================================================

    domains: {

        ORBITAL: {

            status:
                "ACTIVE",

            engine:
                "OrbitalEngineV1",

            guidance:
                "OperatorGuidanceEngineV1"

        }

    },


    // ========================================================
    // NORMALIZE DOMAIN OUTPUT
    // ========================================================

    normalizeDomainOutput(domainOutput){

        const data =
            domainOutput || {};


        return {

            scenario:
                data.scenario ||
                "UNKNOWN",

            severity:
                data.severity ||
                data.assessment?.severity ||
                "UNKNOWN",

            systemState:
                data.systemState ||
                data.failsafe?.currentState ||
                data.failsafe?.state ||
                "UNKNOWN",

            decision:
                data.decision ||
                data.decisionSupport ||
                "NO_DECISION_AVAILABLE",

            recoveryAction:
                data.recovery?.action ||
                data.operatorGuidance
                    ?.operatorGuidance
                    ?.recommendedAction ||
                "NO_ACTION_REQUIRED",

            validation:
                data.validation ||
                null,

            failsafe:
                data.failsafe ||
                null,

            manoeuvre:
                data.manoeuvre ||
                null,

            operatorGuidance:
                data.operatorGuidance ||
                null,

            humanDecision:
                data.humanDecision ||
                null,

            humanDecisionEvidence:
                data.humanDecisionEvidence ||
                null,

            humanDecisionAudit:
                data.humanDecisionAudit ||
                null,

            executionGate:
                data.executionGate ||
                null,

            memory:
                data.memory ||
                null,

            audit:
                data.audit ||
                null

        };

    },


    // ========================================================
    // OBSERVE
    // ========================================================

    observe(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        return {

            stage:
                "OBSERVE",

            status:
                "OBSERVATION_COMPLETE",

            scenario:
                normalized.scenario,

            systemState:
                normalized.systemState,

            severity:
                normalized.severity,

            source:
                "DOMAIN_OUTPUT"

        };

    },


    // ========================================================
    // VERIFY
    // ========================================================

    verify(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        const validation =
            normalized.validation;


        const validationPassed =

            validation?.self_test?.status ===
                "PASS"

            ||

            validation?.status ===
                "PASS"

            ||

            validation?.final_status ===
                "VALIDATION_COMPLETE"

            ||

            validation?.finalStatus ===
                "VALIDATION_COMPLETE";


        return {

            stage:
                "VERIFY",

            status:
                validationPassed
                ?
                "VERIFICATION_PASSED"
                :
                "VERIFICATION_REQUIRES_REVIEW",

            validationPassed:
                validationPassed,

            systemStateVerified:
                normalized.systemState !==
                "UNKNOWN",

            scenarioVerified:
                normalized.scenario !==
                "UNKNOWN",

            recoveryPathPresent:
                normalized.recoveryAction !==
                "NO_ACTION_REQUIRED"

        };

    },


    // ========================================================
    // ASSESS
    // ========================================================

    assess(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        return {

            stage:
                "ASSESS",

            status:
                "ASSESSMENT_COMPLETE",

            scenario:
                normalized.scenario,

            severity:
                normalized.severity,

            systemState:
                normalized.systemState,

            decisionSupport:
                normalized.decision,

            recoveryAction:
                normalized.recoveryAction,

            failsafeState:
                normalized.failsafe
                    ?.currentState ||

                normalized.failsafe
                    ?.state ||

                "UNKNOWN",

            cascadeStatus:
                normalized.failsafe
                    ?.cascadeStatus ||

                "NOT_AVAILABLE"

        };

    },


    // ========================================================
    // DECIDE
    // ========================================================

    decide(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        const guidance =
            normalized.operatorGuidance
                ?.operatorGuidance;


        return {

            stage:
                "DECIDE",

            status:
                "DECISION_SUPPORT_READY",

            authority:
                "GOLDEN_RULE_ENGINE",

            decisionSupport:
                "CAPTAIN_AI_LENA",

            recommendedAction:

                guidance
                    ?.recommendedAction ||

                normalized.recoveryAction ||

                "NO_ACTION_REQUIRED",

            priority:

                guidance
                    ?.priority ||

                "MAINTAIN_SYSTEM_STABILITY",

            humanAuthorizationRequired:
                true,

            automaticExecution:
                false

        };

    },


    // ========================================================
    // FINAL HUMAN DECISION
    // ========================================================

    humanDecision(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        const human =
            normalized.humanDecision;


        const decision =
            human?.decision ||
            null;


        return {

            stage:
                "FINAL_HUMAN_DECISION",

            status:
                decision
                ?
                "DECISION_RECORDED"
                :
                "HUMAN_AUTHORIZATION_PENDING",

            authority:
                "MISSION_CONTROLLER",

            decision:
                decision,

            reason:
                human?.reason ||
                null,

            timestamp:
                human?.timestamp ||
                null,

            authorizationRequired:
                true,

            automaticExecution:
                false,

            simulationOnly:
                true

        };

    },


    // ========================================================
    // EXECUTION GATE
    // ========================================================

    evaluateExecutionGate(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        const gate =
            normalized.executionGate;


        if(
            gate &&
            typeof gate.authorized ===
            "boolean"
        ){

            return {

                authorized:
                    gate.authorized,

                status:
                    gate.status ||
                    "HUMAN_AUTHORIZATION_PENDING",

                action:
                    gate.action ||
                    "NO_ACTION_EXECUTED",

                reason:
                    gate.reason ||
                    "Human decision required."

            };

        }


        return {

            authorized:
                false,

            status:
                "HUMAN_AUTHORIZATION_PENDING",

            action:
                "NO_ACTION_EXECUTED",

            reason:
                "No validated human authorization present."

        };

    },


    // ========================================================
    // ACT
    // ========================================================

    act(domainOutput){

        const gate =
            this.evaluateExecutionGate(
                domainOutput
            );


        /*
        HARD SAFETY BOUNDARY

        Even an authorized recovery decision is only
        permitted to produce a SIMULATED action.

        No live execution path exists here.
        */

        if(!gate.authorized){

            return {

                stage:
                    "ACT",

                status:
                    "ACTION_BLOCKED",

                authorized:
                    false,

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    gate.reason,

                executionMode:
                    "SIMULATION_ONLY",

                simulationOnly:
                    true,

                liveSystemControl:
                    false

            };

        }


        return {

            stage:
                "ACT",

            status:
                "SIMULATED_ACTION_AUTHORIZED",

            authorized:
                true,

            action:
                gate.action,

            executionMode:
                "SIMULATION_ONLY",

            simulationOnly:
                true,

            liveSystemControl:
                false,

            note:
                "No live recovery action is executed."

        };

    },


    // ========================================================
    // UPDATE
    // ========================================================

    update(
        domainOutput,
        memory,
        audit
    ){

        return {

            stage:
                "UPDATE",

            status:
                "SYSTEM_STATE_UPDATED",

            memoryUpdated:
                !!memory,

            auditUpdated:
                !!audit,

            simulationOnly:
                true,

            liveSystemControl:
                false

        };

    },


    // ========================================================
    // BUILD COMPLETE OPERATIONAL PICTURE
    // ========================================================

    process(
        domainOutput,
        memory,
        audit
    ){

        const observation =
            this.observe(
                domainOutput
            );


        const verification =
            this.verify(
                domainOutput
            );


        const assessment =
            this.assess(
                domainOutput
            );


        const decision =
            this.decide(
                domainOutput
            );


        const humanDecision =
            this.humanDecision(
                domainOutput
            );


        const executionGate =
            this.evaluateExecutionGate(
                domainOutput
            );


        const action =
            this.act(
                domainOutput
            );


        const update =
            this.update(
                domainOutput,
                memory,
                audit
            );


        const output = {

            engine:
                this.engine,

            version:
                this.version,

            architecture:
                this.architecture,

            operatingMode:
                this.operatingMode,

            observation:
                observation,

            verification:
                verification,

            assessment:
                assessment,

            decision:
                decision,

            humanDecision:
                humanDecision,

            executionGate:
                executionGate,

            action:
                action,

            update:
                update,

            memory:
                memory ||
                null,

            audit:
                audit ||
                null,

            goldenRulePipeline:
                this.goldenRulePipeline,

            nineLayerStack:
                this.nineLayerStack,

            safetyBoundary: {

                automaticExecution:
                    false,

                humanAuthorizationRequired:
                    true,

                simulationOnly:
                    true,

                liveSystemControl:
                    false

            },

            status:
                "COMMAND_CENTRE_CORE_READY",

            timestamp:
                new Date().toISOString()

        };


        return output;

    },


    // ========================================================
    // CTI REGISTER
    // ========================================================

    registerCTIScreen(){

        this.ctiScreen.connected =
            true;

        this.ctiScreen.status =
            "CONNECTED";

        return {

            screen:
                this.ctiScreen.name,

            controller:
                this.ctiScreen.controller,

            status:
                this.ctiScreen.status,

            connected:
                this.ctiScreen.connected,

            mode:
                this.ctiScreen.mode

        };

    },


    // ========================================================
    // CTI STATUS
    // ========================================================

    getCTIStatus(){

        return {

            screen:
                this.ctiScreen.name,

            status:
                this.ctiScreen.status,

            connected:
                this.ctiScreen.connected,

            controller:
                this.ctiScreen.controller,

            operatingMode:
                "SIMULATION_ONLY",

            automaticExecution:
                false,

            humanAuthorizationRequired:
                true,

            liveSystemControl:
                false,

            simulationOnly:
                true

        };

    },


    // ========================================================
    // CTI PROCESS
    // ========================================================

    processCTI(
        domainOutput,
        memory,
        audit
    ){

        const result =
            this.process(
                domainOutput,
                memory,
                audit
            );


        this.ctiScreen.connected =
            true;

        this.ctiScreen.status =
            "CONNECTED";


        /*
        Preserve the complete output globally
        so the CTI display can consume it.
        */

        window.ctiOperationalPicture =
            result;


        /*
        Update CTI display where corresponding
        elements exist.
        */

        this.updateCTIDisplay(
            result
        );


        return result;

    },


    // ========================================================
    // CTI DISPLAY UPDATE
    // ========================================================

    updateCTIDisplay(result){

        if(!result){

            return false;

        }


        const setText =
            function(id, value){

                const element =
                    document.getElementById(id);

                if(element){

                    element.innerText =
                        value === undefined ||
                        value === null
                        ?
                        "-"
                        :
                        value;

                }

            };


        const assessment =
            result.assessment ||
            {};

        const decision =
            result.decision ||
            {};

        const human =
            result.humanDecision ||
            {};

        const gate =
            result.executionGate ||
            {};

        const action =
            result.action ||
            {};

        const observation =
            result.observation ||
            {};

        const update =
            result.update ||
            {};


        // ----------------------------------------------------
        // CTI DECISION SUPPORT
        // ----------------------------------------------------

        setText(
            "decisionSupportStatus",
            "READY"
        );


        setText(
            "currentAssessment",
            (
                assessment.scenario ||
                observation.scenario ||
                "UNKNOWN"
            )
            +
            " | Severity: " +
            (
                assessment.severity ||
                "UNKNOWN"
            )
            +
            " | State: " +
            (
                assessment.systemState ||
                "UNKNOWN"
            )
        );


        setText(
            "decisionRecommendation",
            decision.recommendedAction ||
            "NO_RECOMMENDATION"
        );


        // ----------------------------------------------------
        // HUMAN DECISION
        // ----------------------------------------------------

        setText(
            "humanDecisionOutput",
            human.decision ||
            "WAITING FOR HUMAN DECISION"
        );


        // ----------------------------------------------------
        // EXECUTION GATE
        // ----------------------------------------------------

        setText(
            "automaticExecution",
            "FALSE"
        );


        setText(
            "humanAuthorization",
            "REQUIRED"
        );


        setText(
            "liveSystemControl",
            "FALSE"
        );


        setText(
            "simulationOnly",
            "TRUE"
        );


        setText(
            "executionStatus",
            gate.status ||
            action.status ||
            "NO ACTION AUTHORIZED"
        );


        // ----------------------------------------------------
        // SIMULATED OUTCOME
        // ----------------------------------------------------

        setText(
            "outcomeScenario",
            assessment.scenario ||
            observation.scenario ||
            "NONE"
        );


        setText(
            "outcomeState",
            assessment.systemState ||
            "STANDBY"
        );


        setText(
            "outcomeCascade",
            assessment.cascadeStatus ||
            "NOT ASSESSED"
        );


        setText(
            "outcomeFailsafe",
            assessment.failsafeState ||
            "STABILIZED"
        );


        setText(
            "outcomeRecovery",
            action.action ||
            "NOT EXECUTED"
        );


        setText(
            "finalStatus",
            gate.authorized
            ?
            "SIMULATED ACTION AUTHORIZED"
            :
            "SAFE STATE / NO LIVE ACTION"
        );


        // ----------------------------------------------------
        // MEMORY
        // ----------------------------------------------------

        setText(
            "memoryStatus",
            result.memory
            ?
            "UPDATED"
            :
            "READY"
        );


        setText(
            "memoryScenario",
            assessment.scenario ||
            "NONE"
        );


        setText(
            "memoryDecision",
            human.decision ||
            "NONE"
        );


        setText(
            "memoryState",
            assessment.systemState ||
            "NONE"
        );


        setText(
            "memoryExecution",
            gate.status ||
            "NONE"
        );


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        const validationPassed =
            result.verification
                ?.validationPassed === true;


        setText(
            "architectureValidation",
            "READY"
        );


        setText(
            "safetyValidation",
            this.safetyBoundaryValid()
            ?
            "PASS"
            :
            "FAIL"
        );


        setText(
            "humanGateValidation",
            this.humanAuthorizationRequired
            ?
            "ACTIVE"
            :
            "FAIL"
        );


        setText(
            "simulationValidation",
            this.simulationOnly &&
            !this.liveSystemControl
            ?
            "ACTIVE"
            :
            "FAIL"
        );


        // ----------------------------------------------------
        // VALIDATION STATUS
        // ----------------------------------------------------

        setText(
            "validationStatus",
            validationPassed
            ?
            "VALIDATION COMPLETE"
            :
            "VALIDATION LOADING..."
        );


        // ----------------------------------------------------
        // AUDIT
        // ----------------------------------------------------

        const auditElement =
            document.getElementById(
                "auditRecord"
            );


        if(auditElement){

            auditElement.innerText =
                JSON.stringify(
                    {
                        event:
                            "CTI_OPERATIONAL_PICTURE",

                        scenario:
                            assessment.scenario,

                        assessment:
                            assessment,

                        decision:
                            decision,

                        humanDecision:
                            human,

                        executionGate:
                            gate,

                        action:
                            action,

                        update:
                            update,

                        safetyBoundary:
                            result.safetyBoundary,

                        timestamp:
                            result.timestamp

                    },
                    null,
                    2
                );

        }


        /*
        Also support the original cockpit audit ID.
        */

        const audit =
            document.getElementById(
                "audit"
            );


        if(
            audit &&
            audit !== auditElement
        ){

            audit.innerText =
                JSON.stringify(
                    result.audit ||
                    {
                        event:
                            "CTI_OPERATIONAL_PICTURE",

                        humanDecision:
                            human,

                        executionGate:
                            gate,

                        action:
                            action,

                        finalStatus:
                            gate.authorized
                            ?
                            "SIMULATED_ACTION_AUTHORIZED"
                            :
                            "SAFE_STATE_MAINTAINED"

                    },
                    null,
                    2
                );

        }


        return true;

    },


    // ========================================================
    // SAFETY BOUNDARY VALIDATION
    // ========================================================

    safetyBoundaryValid(){

        return (

            this.automaticExecution ===
            false

            &&

            this.humanAuthorizationRequired ===
            true

            &&

            this.simulationOnly ===
            true

            &&

            this.liveSystemControl ===
            false

        );

    },


    // ========================================================
    // CTI SCENARIO BRIDGE
    // ========================================================

    runCTIScenario(type){

        if(
            typeof window.runScenario !==
            "function"
        ){

            return {

                status:
                    "CTI_CONTROLLER_NOT_CONNECTED",

                scenario:
                    type,

                reason:
                    "CTI controller runScenario() is not available."

            };

        }


        const result =
            window.runScenario(
                type
            );


        /*
        The orbital controller normally populates
        lastCompleteSystemOutput.

        Process it through the supervisory core.
        */

        const sourceOutput =
            window.lastCompleteSystemOutput ||
            result;


        if(sourceOutput){

            const ctiResult =
                this.processCTI(
                    sourceOutput,
                    sourceOutput.memory ||
                    null,
                    sourceOutput.audit ||
                    null
                );


            return ctiResult;

        }


        return result;

    },


    // ========================================================
    // CTI HUMAN DECISION BRIDGE
    // ========================================================

    processCTIHumanDecision(
        decision,
        reason
    ){

        if(
            typeof window.recordHumanDecision !==
            "function"
        ){

            return {

                status:
                    "HUMAN_DECISION_CONTROLLER_NOT_CONNECTED",

                decision:
                    decision

            };

        }


        const recorded =
            window.recordHumanDecision(
                decision,
                reason
            );


        if(!recorded){

            return {

                status:
                    "HUMAN_DECISION_REJECTED",

                decision:
                    decision

            };

        }


        const sourceOutput =
            window.lastCompleteSystemOutput ||
            null;


        if(sourceOutput){

            const ctiResult =
                this.processCTI(
                    sourceOutput,
                    sourceOutput.memory ||
                    null,
                    sourceOutput.audit ||
                    null
                );


            return ctiResult;

        }


        return {

            status:
                "HUMAN_DECISION_RECORDED",

            decision:
                decision,

            executionGate:
                typeof window.evaluateExecutionGate ===
                "function"
                ?
                window.evaluateExecutionGate()
                :
                null

        };

    },


    // ========================================================
    // STATUS
    // ========================================================

    getStatus(){

        return {

            engine:
                this.engine,

            version:
                this.version,

            architecture:
                this.architecture,

            status:
                "READY",

            operatingMode:
                "SIMULATION_ONLY",

            automaticExecution:
                false,

            humanAuthorizationRequired:
                true,

            liveSystemControl:
                false,

            simulationOnly:
                true,

            authority:
                "GOLDEN_RULE_ENGINE",

            humanAuthority:
                "MISSION_CONTROLLER",

            ctiScreen:
                this.getCTIStatus()

        };

    },


    // ========================================================
    // VALIDATION
    // ========================================================

    validate(){

        const status =
            this.getStatus();


        const checks = {

            deterministicArchitecture:
                true,

            goldenRuleActive:
                this.goldenRulePipeline.length === 7,

            nineLayerArchitecture:
                this.nineLayerStack.length === 9,

            automaticExecutionDisabled:
                status.automaticExecution === false,

            humanAuthorizationRequired:
                status.humanAuthorizationRequired === true,

            simulationOnly:
                status.operatingMode ===
                "SIMULATION_ONLY",

            simulationFlagActive:
                status.simulationOnly ===
                true,

            liveSystemControlDisabled:
                status.liveSystemControl === false,

            executionPolicySafe:
                this.executionPolicy
                    .automaticExecution ===
                false,

            ctiControllerDefined:
                this.ctiScreen.controller ===
                "commandCentreCoreV3.js",

            ctiSimulationOnly:
                this.ctiScreen.mode ===
                "SIMULATION_ONLY"

        };


        const passed =
            Object.values(
                checks
            ).every(
                value =>
                    value === true
            );


        return {

            engine:
                this.engine,

            version:
                this.version,

            status:
                passed
                ?
                "PASS"
                :
                "FAIL",

            checks:
                checks,

            finalStatus:
                passed
                ?
                "VALIDATION_COMPLETE"
                :
                "VALIDATION_FAILED",

            timestamp:
                new Date().toISOString()

        };

    }

};


// ============================================================
// GLOBAL EXPORT
// ============================================================

window.CommandCentreCoreV3 =
    CommandCentreCoreV3;


// ============================================================
// COMPATIBILITY ALIAS
// ============================================================

window.commandCentreCoreV3 =
    CommandCentreCoreV3;


// ============================================================
// STARTUP
// ============================================================

console.log(
    "🛰️ CommandCentreCoreV3 v3.1 ONLINE"
);

console.log(
    "🧠 Supervisory Architecture:",
    "READY"
);

console.log(
    "🧭 Nine-Layer Stack:",
    "ACTIVE"
);

console.log(
    "📋 Golden Rule:",
    CommandCentreCoreV3
        .goldenRulePipeline
);

console.log(
    "👤 Human Authority:",
    "MISSION_CONTROLLER"
);

console.log(
    "🛡️ Automatic Execution:",
    "DISABLED"
);

console.log(
    "⚙️ Operating Mode:",
    "SIMULATION_ONLY"
);

console.log(
    "🔌 Live System Control:",
    "NOT CONNECTED"
);

console.log(
    "🛰️ CTI Screen:",
    "READY"
);

console.log(
    "🧪 Core Validation:",
    CommandCentreCoreV3
        .validate()
        .finalStatus
);


// ============================================================
// CTI AUTO-REGISTRATION
// ============================================================

window.addEventListener(
    "load",
    function(){

        CommandCentreCoreV3
            .registerCTIScreen();


        console.log(
            "🛰️ CTI Command-Centre V3:",
            "CONNECTED"
        );


        console.log(
            "🛡️ CTI Safety Boundary:",
            CommandCentreCoreV3
                .safetyBoundaryValid()
                ?
                "PASS"
                :
                "FAIL"
        );

    }
);


// ============================================================
// END COMMAND-CENTRE CORE v3.1
// ============================================================

})();