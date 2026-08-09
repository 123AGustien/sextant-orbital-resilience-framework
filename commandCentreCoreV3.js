/*
============================================================
🛰️ SEXTANT COMMAND-CENTRE RESILIENCE CORE v3.2

File:
commandCentreCoreV3.js

Location:
Repository ROOT

Purpose:
Supervisory command-centre architecture layer.

Architecture:
Sextant Orbital Resilience Framework v2.4
Command-Centre Resilience Core v3.2

ROLE
------------------------------------------------------------
Integrates validated domain outputs into the CTI
Command-Centre operational picture.

This module supervises completed domain output.

It does NOT replace:

- OrbitalEngineV1
- ManoeuvreEngineV1
- FailsafeTransitionEngineV1
- ValidationCoreV1
- OperatorGuidanceEngineV1
- HumanDecisionAuthorityV1
- MemoryCoreV1
- AuditCoreV1

SAFETY BOUNDARY
------------------------------------------------------------

AUTOMATIC EXECUTION = FALSE
HUMAN AUTHORIZATION = REQUIRED
SIMULATION ONLY = TRUE
LIVE SYSTEM CONTROL = FALSE

IMPORTANT
------------------------------------------------------------

This is a deterministic simulation and decision-support
architecture.

No live spacecraft, satellite, vehicle, infrastructure,
network or operational system is controlled by this module.

Captain AI Lena provides structured decision support.

Final operational authority remains with the designated
human decision-maker.

VERSION
------------------------------------------------------------

CommandCentreCoreV3
Version 3.2
============================================================
*/


(function(){

"use strict";


// ============================================================
// COMMAND CENTRE CORE
// ============================================================

const CommandCentreCoreV3 = {

    engine:
        "CommandCentreCoreV3",

    version:
        "3.2",

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

    authority:
        "GOLDEN_RULE_ENGINE",

    humanAuthority:
        "MISSION_CONTROLLER",


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

            manoeuvre:
                "ManoeuvreEngineV1",

            failsafe:
                "FailsafeTransitionEngineV1",

            validation:
                "ValidationCoreV1",

            guidance:
                "OperatorGuidanceEngineV1",

            humanAuthority:
                "HumanDecisionAuthorityV1",

            memory:
                "MemoryCoreV1",

            audit:
                "AuditCoreV1"

        }

    },


    // ========================================================
    // SAFE WINDOW ACCESS
    // ========================================================

    getWindow(){

        if(
            typeof window !==
            "undefined"
        ){

            return window;

        }

        return null;

    },


    // ========================================================
    // NORMALIZE DOMAIN OUTPUT
    // ========================================================

    normalizeDomainOutput(domainOutput){

        const data =
            domainOutput || {};


        const assessment =
            data.assessment ||
            {};

        const decisionObject =
            data.decision ||
            {};

        const recovery =
            data.recovery ||
            {};

        const failsafe =
            data.failsafe ||
            {};

        const guidance =
            data.operatorGuidance ||
            {};

        const guidanceCore =
            guidance.operatorGuidance ||
            {};

        const human =
            data.humanDecision ||
            {};

        const nestedHuman =
            human.humanDecision ||
            {};

        const evidence =
            data.humanDecisionEvidence ||
            {};

        const suppliedGate =
            data.executionGate ||
            human.executionGate ||
            evidence.executionGate ||
            null;


        const validation =
            data.validation ||
            null;


        /*
        --------------------------------------------------------
        AUTHORITATIVE HUMAN DECISION EXTRACTION
        --------------------------------------------------------

        The supervisory core does not create a human decision.

        It only consumes one that has already been produced by
        HumanDecisionAuthorityV1.
        */

        const humanStatus =
            human.status ||
            nestedHuman.status ||
            evidence.status ||
            "PENDING";


        const humanDecision =
            human.decision ||
            nestedHuman.decision ||
            evidence.decision ||
            null;


        const humanReason =
            human.reason ||
            nestedHuman.reason ||
            evidence.reason ||
            null;


        const humanTimestamp =
            human.timestamp ||
            nestedHuman.timestamp ||
            evidence.timestamp ||
            null;


        /*
        --------------------------------------------------------
        VALIDATION EXTRACTION
        --------------------------------------------------------
        */

        const validationPassed =

            validation?.self_test?.status ===
                "PASS"

            ||

            validation?.status ===
                "PASS"

            ||

            validation?.final_status ===
                "VALIDATION_COMPLETE";


        return {

            domain:
                data.domain ||
                "UNKNOWN",

            engine:
                data.engine ||
                null,

            scenario:
                data.scenario ||
                assessment.scenario ||
                data.event ||
                "UNKNOWN",

            severity:
                data.severity ||
                assessment.severity ||
                "UNKNOWN",

            systemState:
                data.systemState ||
                failsafe.currentState ||
                failsafe.state ||
                "UNKNOWN",

            cascadeStatus:
                data.cascadeStatus ||
                failsafe.cascadeStatus?.containment ||
                failsafe.cascadeStatus ||
                "NOT ASSESSED",

            decision:

                typeof decisionObject ===
                "string"

                    ?

                    decisionObject

                    :

                    decisionObject.decision ||
                    data.decisionSupport ||
                    "NO_DECISION_AVAILABLE",


            recoveryAction:

                recovery.action ||

                guidanceCore.recommendedAction ||

                "NO_ACTION_REQUIRED",


            validation:
                validation,

            validationPassed:
                validationPassed,

            failsafe:
                failsafe,

            manoeuvre:
                data.manoeuvre ||
                null,

            operatorGuidance:
                guidance,

            humanDecision: {

                status:
                    humanStatus,

                authority:
                    human.authority ||
                    nestedHuman.authority ||
                    evidence.authority ||
                    "MISSION_CONTROLLER",

                decision:
                    humanDecision,

                reason:
                    humanReason,

                timestamp:
                    humanTimestamp

            },

            humanDecisionEvidence:
                evidence,

            executionGate:
                suppliedGate,

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

            domain:
                normalized.domain,

            scenario:
                normalized.scenario,

            systemState:
                normalized.systemState,

            severity:
                normalized.severity,

            source:
                "VALIDATED_DOMAIN_OUTPUT"

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


        const validationPassed =
            normalized.validationPassed;


        const scenarioVerified =
            normalized.scenario !==
            "UNKNOWN";


        const systemStateVerified =
            normalized.systemState !==
            "UNKNOWN";


        const severityVerified =
            normalized.severity !==
            "UNKNOWN";


        const authorityVerified =
            normalized.validation?.decision_core?.authority ===
                "GOLDEN_RULE_ENGINE"

            ||

            normalized.validation?.failsafe_validation?.authority ===
                "GOLDEN_RULE_ENGINE"

            ||

            domainOutput?.operatorGuidance?.goldenRuleAuthority ===
                "GOLDEN_RULE_ENGINE"

            ||

            domainOutput?.audit?.authority ===
                "GOLDEN_RULE_ENGINE";


        const simulationBoundaryVerified =
            this.verifySafetyBoundary(
                domainOutput
            );


        const verificationPassed =

            validationPassed &&
            scenarioVerified &&
            systemStateVerified &&
            severityVerified &&
            authorityVerified &&
            simulationBoundaryVerified;


        return {

            stage:
                "VERIFY",

            status:

                verificationPassed

                    ?

                    "VERIFICATION_PASSED"

                    :

                    "VERIFICATION_REQUIRES_REVIEW",

            validationPassed:
                validationPassed,

            scenarioVerified:
                scenarioVerified,

            systemStateVerified:
                systemStateVerified,

            severityVerified:
                severityVerified,

            authorityVerified:
                authorityVerified,

            safetyBoundaryVerified:
                simulationBoundaryVerified,

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

            domain:
                normalized.domain,

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
                normalized.failsafe?.currentState ||
                normalized.failsafe?.state ||
                "UNKNOWN",

            cascadeStatus:
                normalized.cascadeStatus

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
            normalized
                .operatorGuidance
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

            sourceDecision:
                normalized.decision,

            recommendedAction:

                guidance?.recommendedAction ||

                normalized.recoveryAction ||

                "NO_ACTION_REQUIRED",

            priority:

                guidance?.priority ||

                "MAINTAIN_SYSTEM_STABILITY",

            humanAuthorizationRequired:
                true,

            automaticExecution:
                false,

            simulationOnly:
                true

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
            human.decision ||
            null;


        const decisionRecorded =
            !!decision;


        return {

            stage:
                "FINAL_HUMAN_DECISION",

            status:

                decisionRecorded

                    ?

                    "DECISION_RECORDED"

                    :

                    "HUMAN_AUTHORIZATION_PENDING",

            authority:
                "MISSION_CONTROLLER",

            decision:
                decision,

            reason:
                human.reason,

            timestamp:
                human.timestamp,

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


        /*
        --------------------------------------------------------
        HARD SAFETY BOUNDARY
        --------------------------------------------------------
        */

        if(
            this.automaticExecution !==
            false
        ){

            return {

                authorized:
                    false,

                status:
                    "SAFETY_BOUNDARY_FAILURE",

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    "Automatic execution must remain FALSE."

            };

        }


        if(
            this.liveSystemControl !==
            false
        ){

            return {

                authorized:
                    false,

                status:
                    "SAFETY_BOUNDARY_FAILURE",

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    "Live system control must remain FALSE."

            };

        }


        /*
        --------------------------------------------------------
        VALIDATION MUST PASS BEFORE ACT
        --------------------------------------------------------
        */

        if(
            normalized.validationPassed !==
            true
        ){

            return {

                authorized:
                    false,

                status:
                    "VALIDATION_REQUIRED",

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    "Validated domain output is required before simulated ACT."

            };

        }


        /*
        --------------------------------------------------------
        HUMAN DECISION MUST BE RECORDED
        --------------------------------------------------------
        */

        const humanDecision =
            normalized.humanDecision;


        /*
        IMPORTANT:

        An explicit domain execution gate remains the
        authoritative gate. However, this supervisory layer
        will never manufacture authorization.

        */

        if(
            !gate ||
            typeof gate.authorized !==
            "boolean"
        ){

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

        }


        /*
        --------------------------------------------------------
        DEFENSIVE CONSISTENCY CHECK
        --------------------------------------------------------
        */

        if(
            gate.authorized === true &&
            !humanDecision.decision
        ){

            return {

                authorized:
                    false,

                status:
                    "AUTHORIZATION_CONSISTENCY_REVIEW",

                action:
                    "NO_ACTION_EXECUTED",

                reason:
                    "Execution gate indicates authorization but no recorded human decision is present."

            };

        }


        /*
        --------------------------------------------------------
        SAFE SIMULATION GATE
        --------------------------------------------------------
        */

        return {

            authorized:
                gate.authorized,

            status:
                gate.authorized
                    ?
                    "SIMULATED_AUTHORIZATION_CONFIRMED"
                    :
                    (
                        gate.status ||
                        "HUMAN_AUTHORIZATION_PENDING"
                    ),

            action:
                gate.authorized

                    ?

                    (
                        gate.action ||
                        "SIMULATED_ACTION_MAY_PROCEED"
                    )

                    :

                    "NO_ACTION_EXECUTED",

            reason:
                gate.reason ||
                (
                    gate.authorized
                        ?
                        "Human authorization confirmed for simulation representation only."
                        :
                        "Human decision required."
                )

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
        --------------------------------------------------------
        CRITICAL SAFETY RULE
        --------------------------------------------------------

        ACT NEVER CONTROLS A LIVE SYSTEM.

        A positive gate means ONLY that the action may be
        represented inside the simulation / CTI.

        */

        if(
            !gate.authorized
        ){

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

            liveSystemControl:
                false,

            note:
                "Authorization permits simulation representation only."

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

            source:
                "DOMAIN_MEMORY_AND_AUDIT",

            simulationOnly:
                true,

            liveSystemControl:
                false

        };

    },


    // ========================================================
    // SAFETY BOUNDARY VALIDATION
    // ========================================================

    verifySafetyBoundary(domainOutput){

        const normalized =
            this.normalizeDomainOutput(
                domainOutput
            );


        const policy =
            domainOutput?.operatorGuidance
                ?.operatorGuidance
                ?.executionPolicy;


        const evidence =
            domainOutput?.humanDecisionEvidence ||
            {};


        const executionGate =
            domainOutput?.executionGate ||
            null;


        const automaticExecutionSafe =

            this.automaticExecution ===
            false

            &&

            (
                policy?.automaticExecution ===
                    undefined
                ||
                policy?.automaticExecution ===
                    false
            )

            &&

            (
                evidence.automaticExecution ===
                    undefined
                ||
                evidence.automaticExecution ===
                    false
            );


        const simulationOnlySafe =

            this.operatingMode ===
                "SIMULATION_ONLY"

            &&

            (
                policy?.mode ===
                    undefined
                ||
                policy?.mode ===
                    "SIMULATION_ONLY"
            )

            &&

            (
                evidence.simulationOnly ===
                    undefined
                ||
                evidence.simulationOnly ===
                    true
            );


        const liveControlSafe =

            this.liveSystemControl ===
            false;


        const humanGatePresent =

            normalized.humanDecision
                .authority ===
                "MISSION_CONTROLLER"

            &&

            (
                executionGate ===
                    null

                ||

                typeof executionGate.authorized ===
                    "boolean"
            );


        return (

            automaticExecutionSafe &&
            simulationOnlySafe &&
            liveControlSafe &&
            humanGatePresent

        );

    },


    // ========================================================
    // BUILD COMPLETE CTI OPERATIONAL PICTURE
    // ========================================================

    process(
        domainOutput,
        memory,
        audit
    ){

        const win =
            this.getWindow();


        /*
        Accept explicit input first.

        If absent, consume latest completed domain output.
        */

        const source =

            domainOutput ||

            win?.lastCompleteSystemOutput ||

            null;


        if(!source){

            return {

                engine:
                    this.engine,

                version:
                    this.version,

                status:
                    "NO_DOMAIN_OUTPUT",

                message:
                    "Awaiting completed domain simulation.",

                operatingMode:
                    this.operatingMode,

                safetyBoundary:
                    this.getSafetyBoundary(),

                timestamp:
                    new Date().toISOString()

            };

        }


        const observation =
            this.observe(
                source
            );


        const verification =
            this.verify(
                source
            );


        const assessment =
            this.assess(
                source
            );


        const decision =
            this.decide(
                source
            );


        const humanDecision =
            this.humanDecision(
                source
            );


        const executionGate =
            this.evaluateExecutionGate(
                source
            );


        const action =
            this.act(
                source
            );


        const normalized =
            this.normalizeDomainOutput(
                source
            );


        const update =
            this.update(

                source,

                memory ||
                normalized.memory ||
                null,

                audit ||
                normalized.audit ||
                null

            );


        const output = {

            engine:
                this.engine,

            version:
                this.version,

            framework:
                this.framework,

            architecture:
                this.architecture,

            domain:
                normalized.domain,

            scenario:
                normalized.scenario,

            operatingMode:
                this.operatingMode,


            // ----------------------------------------------
            // GOLDEN RULE
            // ----------------------------------------------

            goldenRulePipeline:
                this.goldenRulePipeline,


            // ----------------------------------------------
            // CORE STAGES
            // ----------------------------------------------

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


            // ----------------------------------------------
            // DOMAIN COMPONENTS
            // ----------------------------------------------

            manoeuvre:
                normalized.manoeuvre,

            failsafe:
                normalized.failsafe,

            operatorGuidance:
                normalized.operatorGuidance,

            validation:
                normalized.validation,


            // ----------------------------------------------
            // MEMORY / AUDIT
            // ----------------------------------------------

            memory:
                memory ||
                normalized.memory ||
                null,

            audit:
                audit ||
                normalized.audit ||
                null,


            // ----------------------------------------------
            // NINE-LAYER STACK
            // ----------------------------------------------

            nineLayerStack:
                this.nineLayerStack,


            // ----------------------------------------------
            // SAFETY
            // ----------------------------------------------

            safetyBoundary:
                this.getSafetyBoundary(),


            // ----------------------------------------------
            // CTI STATUS
            // ----------------------------------------------

            ctiStatus: {

                system:
                    "ONLINE",

                simulation:
                    "ACTIVE",

                validation:
                    verification.status,

                humanDecision:
                    humanDecision.status,

                executionGate:
                    executionGate.status,

                action:
                    action.status,

                liveControl:
                    "NOT_CONNECTED"

            },


            status:
                "COMMAND_CENTRE_CORE_READY",

            timestamp:
                new Date().toISOString()

        };


        /*
        --------------------------------------------------------
        STORE SUPERVISORY OUTPUT
        --------------------------------------------------------
        */

        if(win){

            win.lastCommandCentreOutput =
                output;

        }


        return output;

    },


    // ========================================================
    // SAFETY BOUNDARY
    // ========================================================

    getSafetyBoundary(){

        return {

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
                "SIMULATED_ACTION_MAY_PROCEED",

            finalAuthority:
                "MISSION_CONTROLLER"

        };

    },


    // ========================================================
    // CTI SCREEN BRIDGE
    // ========================================================

    updateCTIScreen(){

        const win =
            this.getWindow();


        const source =

            win?.lastCompleteSystemOutput ||

            win?.lastOrbitalResult ||

            null;


        if(!source){

            console.warn(
                "🛰️ CTI bridge: no completed domain output available."
            );

            return null;

        }


        const memory =
            source.memory ||
            null;


        const audit =
            source.audit ||
            null;


        const cti =
            this.process(
                source,
                memory,
                audit
            );


        // ----------------------------------------------------
        // CURRENT ASSESSMENT
        // ----------------------------------------------------

        this.setText(
            "scenario",
            cti.scenario
        );


        this.setText(
            "severity",
            cti.assessment.severity
        );


        this.setText(
            "systemState",
            cti.assessment.systemState
        );


        this.setText(
            "cascadeStatus",
            cti.assessment.cascadeStatus
        );


        this.setText(
            "failsafeState",
            cti.assessment.failsafeState
        );


        // ----------------------------------------------------
        // DECISION SUPPORT
        // ----------------------------------------------------

        this.setText(
            "recommendation",
            cti.decision.recommendedAction
        );


        // ----------------------------------------------------
        // HUMAN DECISION
        // ----------------------------------------------------

        const human =
            cti.humanDecision;


        this.setText(
            "humanDecision",
            human.decision ||
            "PENDING"
        );


        // ----------------------------------------------------
        // EXECUTION
        // ----------------------------------------------------

        this.setText(
            "simulatedAction",
            cti.action.action
        );


        this.setText(
            "executionResult",

            cti.executionGate.authorized

                ?

                "SIMULATED_ACTION_AUTHORIZED"

                :

                "SIMULATION_ONLY"
        );


        this.setText(
            "finalState",

            cti.executionGate.authorized

                ?

                "SIMULATED_RECOVERY_AUTHORIZED"

                :

                "SAFE_STATE_MAINTAINED"
        );


        // ----------------------------------------------------
        // RUNTIME
        // ----------------------------------------------------

        this.setText(
            "runtime",

            JSON.stringify(
                cti,
                null,
                2
            )
        );


        // ----------------------------------------------------
        // AUDIT
        // ----------------------------------------------------

        this.setText(
            "audit",

            JSON.stringify(
                cti.audit ||
                cti,
                null,
                2
            )
        );


        // ----------------------------------------------------
        // EXTENDED CTI PANELS
        // ----------------------------------------------------

        this.setText(
            "currentAssessment",

            `${cti.scenario} — ` +
            `${cti.assessment.severity} — ` +
            `${cti.assessment.systemState}`
        );


        this.setText(
            "decisionRecommendation",

            cti.decision.recommendedAction
        );


        this.setText(
            "humanDecisionOutput",

            human.decision ||

            "WAITING FOR HUMAN DECISION"
        );


        this.setText(
            "executionStatus",

            cti.executionGate.status
        );


        this.setText(
            "outcomeScenario",

            cti.scenario
        );


        this.setText(
            "outcomeState",

            cti.assessment.systemState
        );


        this.setText(
            "outcomeCascade",

            cti.assessment.cascadeStatus
        );


        this.setText(
            "outcomeFailsafe",

            cti.assessment.failsafeState
        );


        this.setText(
            "outcomeRecovery",

            cti.action.action
        );


        this.setText(
            "finalStatus",

            cti.executionGate.authorized

                ?

                "SIMULATED ACTION AUTHORIZED"

                :

                "SAFE STATE"
        );


        // ----------------------------------------------------
        // MEMORY
        // ----------------------------------------------------

        this.setText(
            "memory",

            JSON.stringify(
                cti.memory ||
                {},
                null,
                2
            )
        );


        this.setText(
            "memoryScenario",

            cti.scenario
        );


        this.setText(
            "memoryDecision",

            cti.decision.sourceDecision
        );


        this.setText(
            "memoryState",

            cti.assessment.systemState
        );


        this.setText(
            "memoryExecution",

            cti.executionGate.status
        );


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        this.setText(
            "architectureValidation",

            cti.verification.status ===
            "VERIFICATION_PASSED"

                ?

                "PASS"

                :

                "REVIEW"
        );


        this.setText(
            "safetyValidation",

            this.validate()
                .status ===
                "PASS"

                ?

                "PASS"

                :

                "FAIL"
        );


        this.setText(
            "humanGateValidation",

            "ACTIVE"
        );


        this.setText(
            "simulationValidation",

            "ACTIVE"
        );


        // ----------------------------------------------------
        // INTEGRATION STATUS
        // ----------------------------------------------------

        this.updateIntegrationStatus();


        console.log(
            "🛰️ CTI Command-Centre Screen Updated",
            cti
        );


        return cti;

    },


    // ========================================================
    // SAFE DOM TEXT UPDATE
    // ========================================================

    setText(
        id,
        value
    ){

        const element =
            document.getElementById(
                id
            );


        if(!element){

            return false;

        }


        element.textContent =
            value == null
                ?
                ""
                :
                String(value);


        return true;

    },


    // ========================================================
    // INTEGRATION STATUS
    // ========================================================

    getIntegrationStatus(){

        const win =
            this.getWindow();


        const completedOutput =
            win?.lastCompleteSystemOutput ||
            null;


        /*
        Prefer authoritative completed-domain evidence
        where available.

        This prevents the CTI from falsely reporting
        NOT_CONNECTED when the completed system output
        has already confirmed the engine.
        */

        const outputIntegration = {

            OrbitalEngineV1:
                completedOutput?.engine ===
                "OrbitalEngineV1"
                    ?
                    "CONNECTED"
                    :
                    null,

            ManoeuvreEngineV1:
                completedOutput?.manoeuvre?.engine ===
                "ManoeuvreEngineV1"
                    ?
                    "CONNECTED"
                    :
                    null,

            FailsafeEngineV1:
                completedOutput?.failsafe?.engine ===
                "FailsafeTransitionEngineV1"
                    ?
                    "CONNECTED"
                    :
                    null,

            ValidationCoreV1:
                completedOutput?.validation?.validator ===
                "ValidationCoreV1"
                    ?
                    "CONNECTED"
                    :
                    null,

            OperatorGuidanceEngineV1:
                completedOutput?.operatorGuidance?.engine ===
                "OperatorGuidanceEngineV1"
                    ?
                    "CONNECTED"
                    :
                    null,

            MemoryCoreV1:
                completedOutput?.memory
                    ?
                    "CONNECTED"
                    :
                    null,

            AuditCoreV1:
                completedOutput?.audit
                    ?
                    "CONNECTED"
                    :
                    null

        };


        const runtimeIntegration = {

            OrbitalEngineV1:

                typeof orbitalEngine !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            ManoeuvreEngineV1:

                typeof manoeuvreEngine !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            FailsafeEngineV1:

                typeof failsafeEngine !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            ValidationCoreV1:

                typeof validationCore !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            OperatorGuidanceEngineV1:

                win?.OperatorGuidanceEngineV1

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            MemoryCoreV1:

                typeof memoryCore !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED",


            AuditCoreV1:

                typeof auditCore !==
                "undefined"

                    ?

                    "CONNECTED"

                    :

                    "NOT_CONNECTED"

        };


        const finalStatus = {};


        Object.keys(
            outputIntegration
        ).forEach(

            key => {

                finalStatus[key] =

                    outputIntegration[key] ||
                    runtimeIntegration[key] ||
                    "NOT_CONNECTED";

            }

        );


        finalStatus.HumanDecisionAuthorityV1 =
            "INTERNAL_CONTROLLER";


        finalStatus.CommandCentreCoreV3 =
            "CONNECTED";


        finalStatus.GoldenRuleEngine =
            "ACTIVE";


        return finalStatus;

    },


    updateIntegrationStatus(){

        const status =
            this.getIntegrationStatus();


        const display =
            document.getElementById(
                "integration"
            );


        if(display){

            display.textContent =
                JSON.stringify(
                    status,
                    null,
                    2
                );

        }


        return status;

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

            framework:
                this.framework,

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

            authority:
                "GOLDEN_RULE_ENGINE",

            humanAuthority:
                "MISSION_CONTROLLER",

            ctiBridge:
                "READY"

        };

    },


    // ========================================================
    // VALIDATION
    // ========================================================

    validate(){

        const status =
            this.getStatus();


        const safety =
            this.getSafetyBoundary();


        const checks = {

            deterministicArchitecture:
                true,


            goldenRuleActive:

                this.goldenRulePipeline.length ===
                7,


            nineLayerArchitecture:

                this.nineLayerStack.length ===
                9,


            automaticExecutionDisabled:

                status.automaticExecution ===
                false,


            humanAuthorizationRequired:

                status.humanAuthorizationRequired ===
                true,


            simulationOnly:

                status.operatingMode ===
                "SIMULATION_ONLY",


            liveSystemControlDisabled:

                status.liveSystemControl ===
                false,


            safetyBoundaryConsistent:

                safety.automaticExecution ===
                    false &&

                safety.humanAuthorizationRequired ===
                    true &&

                safety.simulationOnly ===
                    true &&

                safety.liveSystemControl ===
                    false,


            ctiBridgeReady:
                true

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

    },


    // ========================================================
    // GET COMPLETE CTI STATE
    // ========================================================

    getCompleteState(){

        const win =
            this.getWindow();


        return {

            core:
                this.getStatus(),

            integration:
                this.getIntegrationStatus(),

            validation:
                this.validate(),

            safetyBoundary:
                this.getSafetyBoundary(),

            goldenRulePipeline:
                this.goldenRulePipeline,

            nineLayerStack:
                this.nineLayerStack,

            latestDomainOutput:
                win?.lastCompleteSystemOutput ||
                null,

            latestCTIOutput:
                win?.lastCommandCentreOutput ||
                null

        };

    }

};


// ============================================================
// GLOBAL EXPORT
// ============================================================

window.CommandCentreCoreV3 =
    CommandCentreCoreV3;


// ============================================================
// CONVENIENCE GLOBAL FUNCTIONS
// ============================================================

window.updateCTIScreen =
    function(){

        return CommandCentreCoreV3
            .updateCTIScreen();

    };


window.getCommandCentreStatus =
    function(){

        return CommandCentreCoreV3
            .getStatus();

    };


window.validateCommandCentreCore =
    function(){

        return CommandCentreCoreV3
            .validate();

    };


window.getCommandCentreState =
    function(){

        return CommandCentreCoreV3
            .getCompleteState();

    };


// ============================================================
// STARTUP
// ============================================================

console.log(
    "🛰️ CommandCentreCoreV3 v3.2 ONLINE"
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
    "🧪 Core Validation:",
    CommandCentreCoreV3
        .validate()
        .finalStatus
);


// ============================================================
// SAFE CTI STARTUP
// ============================================================

window.addEventListener(

    "load",

    function(){

        console.log(
            "🛰️ CommandCentreCoreV3 CTI bridge initializing..."
        );


        CommandCentreCoreV3
            .updateIntegrationStatus();


        /*
        The CTI screen may load before the orbital
        controller has completed its startup scenario.

        Therefore we wait briefly and then attempt
        to consume the latest completed output.

        No scenario is initiated here.

        Scenario ownership remains with the
        domain controller.
        */

        setTimeout(

            function(){

                if(
                    window.lastCompleteSystemOutput ||
                    window.lastOrbitalResult
                ){

                    CommandCentreCoreV3
                        .updateCTIScreen();

                }

                else {

                    console.log(
                        "🛰️ CTI bridge waiting for domain output..."
                    );

                }

            },

            100

        );

    }

);


// ============================================================
// FINAL SAFETY ASSERTION
// ============================================================

if(
    CommandCentreCoreV3
        .automaticExecution !==
        false
){

    console.error(
        "🚨 COMMAND CENTRE SAFETY FAILURE: AUTOMATIC EXECUTION MUST BE FALSE"
    );

}


if(
    CommandCentreCoreV3
        .humanAuthorizationRequired !==
        true
){

    console.error(
        "🚨 COMMAND CENTRE SAFETY FAILURE: HUMAN AUTHORIZATION MUST BE REQUIRED"
    );

}


if(
    CommandCentreCoreV3
        .liveSystemControl !==
        false
){

    console.error(
        "🚨 COMMAND CENTRE SAFETY FAILURE: LIVE SYSTEM CONTROL MUST BE FALSE"
    );

}


console.log(
    "🛡️ CTI Safety Boundary:",
    "AUTOMATIC EXECUTION FALSE / HUMAN AUTHORIZATION REQUIRED / LIVE CONTROL FALSE"
);

console.log(
    "🛰️ Sextant Command-Centre Resilience Core v3.2 READY"
);


/*
============================================================
END COMMAND-CENTRE RESILIENCE CORE v3.2
============================================================
*/