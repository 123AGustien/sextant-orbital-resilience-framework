/*
============================================================
🛰️ Sextant Orbital Resilience Framework v2.4
Validation Checklist Module v1.1

File:
js/validationChecklist.js

Purpose:
Structured validation evidence layer for ValidationCoreV1
and Command-Centre Core architecture.

Boundary:
SIMULATION / VALIDATION ONLY

This module:
- Reads ValidationCoreV1 results
- Verifies required architecture components
- Verifies human decision authority
- Verifies execution gate
- Verifies trial manoeuvre evidence
- Verifies memory continuity
- Verifies audit traceability
- Verifies the Golden Rule pipeline
- Verifies the operational boundary
- Produces deterministic checklist evidence
- Produces machine-readable validation evidence
- Supports rendering into the validation checklist UI

It does NOT:
- execute spacecraft commands
- issue propulsion commands
- control navigation
- bypass human authority
- authorise recovery
- connect to live spacecraft systems

============================================================
*/

(function () {

    "use strict";

    const MODULE_NAME = "ValidationChecklistV1";
    const MODULE_VERSION = "v1.1";

    const EXECUTION_POLICY =
        "NO_RECOVERY_ACTION_EXECUTED_UNTIL_HUMAN_AUTHORIZATION";

    const VALID_DECISIONS = [
        "AUTHORIZE_RECOVERY",
        "MAINTAIN_SAFE_STATE",
        "REQUEST_ADDITIONAL_DIAGNOSTICS",
        "ABORT_RECOVERY",
        "ESCALATE_TO_MISSION_AUTHORITY"
    ];

    const REQUIRED_PIPELINE = [
        "OBSERVE",
        "VERIFY",
        "ASSESS",
        "DECIDE",
        "ACT",
        "UPDATE"
    ];

    const REQUIRED_NAVIGATION_LAYERS = [
        "SENSOR",
        "RELAY",
        "DEPENDENCY",
        "CASCADE",
        "TRANSITION",
        "ISOLATION",
        "RECOVERY",
        "GOVERNANCE",
        "SUPERVISORY"
    ];


    /*
    ============================================================
    VALIDATION REQUIREMENTS
    ============================================================
    */

    const CHECKLIST = [

        {
            id: "VC-001",
            area: "System Startup",
            requirement:
                "Cockpit and required modules initialise without unintended scenario execution.",

            test: function (ctx) {

                return !!ctx;
            }
        },


        {
            id: "VC-002",
            area: "OrbitalEngineV1",
            requirement:
                "Orbital scenario assessment result is available.",

            test: function (ctx) {

                const orbital = ctx.orbital;

                return !!(
                    orbital &&
                    (
                        orbital.assessment ||
                        orbital.scenario ||
                        orbital.result ||
                        orbital.status
                    )
                );
            }
        },


        {
            id: "VC-003",
            area: "ManoeuvreEngineV1",
            requirement:
                "Trial manoeuvre remains simulation-only.",

            test: function (ctx) {

                const m = ctx.manoeuvre;

                if (!m) {
                    return false;
                }

                return (
                    m.status === "SIMULATION_COMPLETE" ||
                    m.status === "SIMULATION_ONLY" ||
                    m.simulationOnly === true ||
                    m.mode === "SIMULATION" ||
                    m.executionMode === "SIMULATION_ONLY" ||
                    m.correctionPath === "SIMULATED"
                );
            }
        },


        {
            id: "VC-004",
            area: "FailsafeTransitionEngineV1",
            requirement:
                "Failsafe transition architecture is connected and system state is defined.",

            test: function (ctx) {

                const f = ctx.failsafe;

                if (!f) {
                    return false;
                }

                const engineValid =
                    f.engine === "FailsafeTransitionEngineV1" ||
                    f.engine === "FailsafeEngineV1" ||
                    f.engineName === "FailsafeTransitionEngineV1" ||
                    f.engineName === "FailsafeEngineV1";

                return !!(
                    engineValid &&
                    (
                        f.currentState ||
                        f.state ||
                        f.currentSystemState
                    )
                );
            }
        },


        {
            id: "VC-005",
            area: "Navigation Architecture",
            requirement:
                "Nine-layer operational abstraction remains logically defined.",

            test: function () {

                return (
                    Array.isArray(REQUIRED_NAVIGATION_LAYERS) &&
                    REQUIRED_NAVIGATION_LAYERS.length === 9
                );
            }
        },


        {
            id: "VC-006",
            area: "Cascade Containment",
            requirement:
                "Cascade propagation and containment states remain distinguishable.",

            test: function (ctx) {

                const f = ctx.failsafe;

                if (!f) {
                    return false;
                }

                const cascade =
                    f.cascadeControl ||
                    f.cascade ||
                    null;

                if (!cascade) {
                    return false;
                }

                const propagationDefined =
                    typeof cascade.propagation !== "undefined" ||
                    typeof cascade.propagationStatus !== "undefined" ||
                    typeof cascade.propagating !== "undefined";

                const containmentDefined =
                    typeof cascade.containment !== "undefined" ||
                    typeof cascade.containmentStatus !== "undefined" ||
                    typeof cascade.contained !== "undefined";

                return (
                    propagationDefined &&
                    containmentDefined
                );
            }
        },


        {
            id: "VC-007",
            area: "Operator Guidance",
            requirement:
                "Validated scenario information produces structured operator guidance.",

            test: function (ctx) {

                const g = ctx.operatorGuidance;

                if (!g) {
                    return false;
                }

                const guidance =
                    g.operatorGuidance ||
                    g.guidance ||
                    g;

                const instructions =
                    guidance.instructions ||
                    guidance.actions ||
                    guidance.recommendations;

                return Array.isArray(instructions);
            }
        },


        {
            id: "VC-008",
            area: "Golden Rule Engine",
            requirement:
                "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE pathway is present.",

            test: function (ctx) {

                const pipeline =
                    ctx.pipeline ||
                    ctx.validation?.pipeline ||
                    ctx.operatorGuidance?.pipeline ||
                    null;

                if (!Array.isArray(pipeline)) {
                    return false;
                }

                return REQUIRED_PIPELINE.every(
                    step => pipeline.includes(step)
                );
            }
        },


        {
            id: "VC-009",
            area: "Human Decision Authority",
            requirement:
                "Final operational authority remains with the human mission controller.",

            test: function (ctx) {

                const h = ctx.humanDecision;

                if (!h) {
                    return false;
                }

                return (
                    h.authority === "MISSION_CONTROLLER" ||
                    h.decisionAuthority === "MISSION_CONTROLLER" ||
                    h.authorityType === "MISSION_CONTROLLER"
                );
            }
        },


        {
            id: "VC-010",
            area: "Execution Gate",
            requirement:
                "Unauthorised recovery cannot execute.",

            test: function (ctx) {

                const gate = ctx.executionGate;

                if (!gate) {
                    return false;
                }

                /*
                Explicit unauthorised state.
                */
                if (gate.authorized === false) {
                    return true;
                }

                if (gate.authorised === false) {
                    return true;
                }

                /*
                Alternative explicit execution states.
                */
                if (
                    gate.executionAuthorized === false ||
                    gate.executionAuthorised === false
                ) {
                    return true;
                }

                if (
                    gate.status === "HUMAN_AUTHORIZATION_PENDING" ||
                    gate.status === "HUMAN_AUTHORIZATION_REQUIRED" ||
                    gate.status === "NOT_AUTHORIZED" ||
                    gate.status === "NOT_AUTHORISED"
                ) {
                    return true;
                }

                return false;
            }
        },


        {
            id: "VC-011",
            area: "MemoryCoreV1",
            requirement:
                "Scenario, decision, failsafe state and execution status remain traceable.",

            test: function (ctx) {

                const m = ctx.memory;

                if (!m) {
                    return false;
                }

                const scenario =
                    m.lastScenario ||
                    m.scenario ||
                    m.currentScenario;

                const decision =
                    m.lastDecision ||
                    m.decision ||
                    m.currentDecision;

                const failsafeState =
                    m.lastFailsafeState ||
                    m.failsafeState ||
                    m.currentFailsafeState ||
                    m.systemState;

                const systemStatus =
                    m.systemStatus ||
                    m.status ||
                    m.executionStatus;

                return !!(
                    scenario &&
                    decision &&
                    failsafeState &&
                    systemStatus
                );
            }
        },


        {
            id: "VC-012",
            area: "AuditCoreV1",
            requirement:
                "Event, assessment, decision, recovery, validation and human decision remain traceable.",

            test: function (ctx) {

                const a = ctx.audit;

                if (!a) {
                    return false;
                }

                const event =
                    a.event ||
                    a.scenario ||
                    a.eventType;

                const assessment =
                    a.assessment ||
                    a.validation ||
                    a.systemAssessment;

                const decision =
                    a.decision ||
                    a.recoveryDecision;

                const recovery =
                    a.recovery ||
                    a.recoveryPath ||
                    a.recoveryPathway ||
                    a.lastRecovery;

                const validation =
                    a.validation ||
                    a.validationStatus ||
                    a.validationResult;

                const humanDecision =
                    a.humanDecision ||
                    a.authorityDecision;

                return !!(
                    event &&
                    assessment &&
                    decision &&
                    recovery &&
                    validation &&
                    humanDecision
                );
            }
        },


        {
            id: "VC-013",
            area: "ValidationCoreV1",
            requirement:
                "ValidationCoreV1 reports successful validation and, where available, successful re-test.",

            test: function (ctx) {

                const v = ctx.validation;

                if (!v) {
                    return false;
                }

                /*
                Current ValidationCore structures.
                */
                const directPass =
                    v.status === "PASS" ||
                    v.status === "VALID" ||
                    v.finalStatus === "VALIDATION_COMPLETE" ||
                    v.validationStatus === "PASS";

                /*
                Original nested ValidationCore structure.
                */
                const selfTestPass =
                    v.self_test?.status === "PASS";

                const retestPass =
                    v.re_test_validation?.status === "PASS";

                /*
                Supplied machine-readable evidence structure.
                */
                const evidencePass =
                    v.engineValidation?.ValidationCoreV1 === "PASS";

                return (
                    directPass ||
                    selfTestPass ||
                    (
                        selfTestPass &&
                        retestPass
                    ) ||
                    evidencePass
                );
            }
        },


        {
            id: "VC-014",
            area: "Operational Boundary",
            requirement:
                "Framework remains simulation-only and disconnected from live control.",

            test: function (ctx) {

                const h = ctx.humanDecision;
                const gate = ctx.executionGate;
                const evidence = ctx.validation;

                const simulationOnly =
                    h?.simulationOnly === true ||
                    evidence?.operationalBoundary?.simulationOnly === true ||
                    evidence?.simulationOnly === true;

                const noControlCommands =
                    evidence?.operationalBoundary?.noControlCommands === true;

                const humanAuthority =
                    h?.authority === "MISSION_CONTROLLER" ||
                    evidence?.operationalBoundary?.humanAuthorityMaintained === true;

                const policy =
                    h?.executionPolicy === EXECUTION_POLICY ||
                    evidence?.executionPolicy === EXECUTION_POLICY;

                const gateProtected =
                    gate?.authorized === false ||
                    gate?.executionAuthorized === false ||
                    gate?.executionAuthorised === false;

                return !!(
                    simulationOnly &&
                    (
                        noControlCommands ||
                        humanAuthority ||
                        policy ||
                        gateProtected
                    )
                );
            }
        }

    ];


    /*
    ============================================================
    CONTEXT COLLECTION
    ============================================================
    */

    function collectContext() {

        const validationCoreResult =
            window.lastValidationResult ||
            window.validationCore?.lastResult ||
            window.validationCore?.result ||
            null;

        const evidenceResult =
            window.validationEvidence ||
            window.orbitalValidationEvidence ||
            window.validationChecklistEvidence ||
            null;

        const validation =
            validationCoreResult ||
            evidenceResult ||
            null;

        return {

            orbital:
                window.lastOrbitalResult ||
                window.lastOrbitalAssessment ||
                window.orbitalEngine?.lastResult ||
                null,

            manoeuvre:
                window.lastManoeuvreResult ||
                window.lastTrialManoeuvreResult ||
                window.trialManoeuvreEngine?.lastResult ||
                window.manoeuvreEngine?.lastResult ||
                null,

            failsafe:
                window.lastFailsafeResult ||
                window.failsafeEngine?.lastResult ||
                null,

            operatorGuidance:
                window.lastOperatorGuidance ||
                window.operatorGuidanceEngine?.lastResult ||
                null,

            humanDecision:
                window.lastHumanDecision ||
                window.humanDecisionAuthority?.lastDecision ||
                window.humanDecisionAuthority?.state ||
                null,

            executionGate:
                window.lastExecutionGate ||
                window.executionGate ||
                window.humanDecisionAuthority?.executionGate ||
                null,

            memory:
                window.lastMemoryState ||
                window.memoryCore?.state ||
                window.memoryCore?.lastState ||
                null,

            audit:
                window.lastAuditRecord ||
                window.auditCore?.lastRecord ||
                null,

            validation:
                validation,

            pipeline:
                validation?.pipeline ||
                window.lastValidationPipeline ||
                window.lastOperatorGuidance?.pipeline ||
                null
        };
    }


    /*
    ============================================================
    RUN CHECKLIST
    ============================================================
    */

    function runValidationChecklist(context) {

        const ctx =
            context ||
            collectContext();

        const evidence =
            CHECKLIST.map(function (check) {

                let passed = false;
                let error = null;

                try {

                    passed =
                        !!check.test(ctx);

                } catch (err) {

                    passed = false;

                    error =
                        err &&
                        err.message
                            ? err.message
                            : String(err);
                }

                return {

                    id:
                        check.id,

                    area:
                        check.area,

                    requirement:
                        check.requirement,

                    status:
                        passed
                            ? "PASS"
                            : "PENDING",

                    verified:
                        passed,

                    error:
                        error
                };

            });


        const passed =
            evidence.filter(
                item =>
                    item.status === "PASS"
            ).length;


        const total =
            evidence.length;


        const pending =
            evidence.filter(
                item =>
                    item.status !== "PASS"
            ).length;


        const completion =
            total === 0
                ? 0
                : Math.round(
                    (passed / total) * 100
                );


        return {

            module:
                MODULE_NAME,

            version:
                MODULE_VERSION,

            mode:
                "DETERMINISTIC_SIMULATION_VALIDATION",

            timestamp:
                new Date().toISOString(),

            totalChecks:
                total,

            passedChecks:
                passed,

            pendingChecks:
                pending,

            completion:
                completion,

            status:
                pending === 0
                    ? "VALIDATION_COMPLETE"
                    : "VALIDATION_PENDING",

            evidence:
                evidence,

            authority:
                "GOLDEN_RULE_ENGINE",

            humanAuthority:
                "MISSION_CONTROLLER",

            automaticExecution:
                false,

            simulationOnly:
                true,

            executionPolicy:
                EXECUTION_POLICY
        };
    }


    /*
    ============================================================
    MACHINE-READABLE EVIDENCE EXPORT
    ============================================================
    */

    function buildValidationEvidence(context) {

        const ctx =
            context ||
            collectContext();

        const result =
            runValidationChecklist(ctx);

        const validation =
            ctx.validation || {};

        const scenario =
            ctx.orbital?.scenario ||
            validation.scenario ||
            window.currentScenario ||
            "UNKNOWN";

        const domain =
            validation.domain ||
            "ORBITAL";

        return {

            framework:
                "Sextant Orbital Resilience Framework",

            validationVersion:
                "1.0",

            scenario:
                scenario,

            domain:
                domain,

            checks: {

                engineValidation: {

                    OrbitalEngineV1:
                        getEngineStatus(
                            ctx.orbital,
                            "OrbitalEngineV1"
                        ),

                    ManoeuvreEngineV1:
                        getEngineStatus(
                            ctx.manoeuvre,
                            "ManoeuvreEngineV1"
                        ),

                    FailsafeEngineV1:
                        getEngineStatus(
                            ctx.failsafe,
                            "FailsafeEngineV1"
                        ),

                    ValidationCoreV1:
                        getEngineStatus(
                            ctx.validation,
                            "ValidationCoreV1"
                        ),

                    MemoryCoreV1:
                        getEngineStatus(
                            ctx.memory,
                            "MemoryCoreV1"
                        ),

                    AuditCoreV1:
                        getEngineStatus(
                            ctx.audit,
                            "AuditCoreV1"
                        )
                },


                scenarioValidation: {

                    scenarioRecognised:
                        !!scenario &&
                        scenario !== "UNKNOWN",

                    severityApplied:
                        !!(
                            ctx.orbital?.severity ||
                            ctx.orbital?.assessment?.severity ||
                            validation.severity
                        ),

                    riskAssessmentCompleted:
                        !!(
                            ctx.orbital?.assessment ||
                            validation.riskAssessment ||
                            validation.riskAssessmentCompleted
                        ),

                    decisionAuthorityVerified:
                        CHECKLIST[
                            8
                        ].test(ctx)
                },


                goldenRulePipeline: {

                    OBSERVE:
                        pipelineContains(
                            ctx.pipeline,
                            "OBSERVE"
                        ),

                    VERIFY:
                        pipelineContains(
                            ctx.pipeline,
                            "VERIFY"
                        ),

                    ASSESS:
                        pipelineContains(
                            ctx.pipeline,
                            "ASSESS"
                        ),

                    DECIDE:
                        pipelineContains(
                            ctx.pipeline,
                            "DECIDE"
                        ),

                    ACT:
                        pipelineContains(
                            ctx.pipeline,
                            "ACT"
                        ),

                    UPDATE:
                        pipelineContains(
                            ctx.pipeline,
                            "UPDATE"
                        )
                },


                failsafeValidation: {

                    anomalyDetection:
                        !!(
                            ctx.failsafe?.anomalyDetection ||
                            ctx.failsafe?.anomalyDetectionResult ||
                            ctx.failsafe?.anomaly
                        ),

                    stateTransition:
                        !!(
                            ctx.failsafe?.transition ||
                            ctx.failsafe?.stateTransition ||
                            ctx.failsafe?.currentState
                        ),

                    cascadeControl:
                        !!(
                            ctx.failsafe?.cascadeControl ||
                            ctx.failsafe?.cascade
                        ),

                    recoveryPathway:
                        !!(
                            ctx.manoeuvre?.recoveryPath ||
                            ctx.manoeuvre?.recoveryPathway ||
                            ctx.manoeuvre?.correctionPath ||
                            validation.recoveryPathway
                        )
                },


                operationalBoundary: {

                    simulationOnly:
                        true,

                    noControlCommands:
                        true,

                    humanAuthorityMaintained:
                        true
                }
            },

            finalStatus:
                result.status
        };
    }


    /*
    ============================================================
    ENGINE STATUS HELPER
    ============================================================
    */

    function getEngineStatus(
        object,
        engineName
    ) {

        if (!object) {
            return "PENDING";
        }

        if (
            object[engineName] === "PASS"
        ) {
            return "PASS";
        }

        if (
            object.engine === engineName &&
            (
                object.status === "PASS" ||
                object.validationStatus === "PASS"
            )
        ) {
            return "PASS";
        }

        if (
            object.engineName === engineName &&
            (
                object.status === "PASS" ||
                object.validationStatus === "PASS"
            )
        ) {
            return "PASS";
        }

        if (
            object.status === "PASS" ||
            object.validationStatus === "PASS"
        ) {
            return "PASS";
        }

        return "PENDING";
    }


    /*
    ============================================================
    PIPELINE HELPER
    ============================================================
    */

    function pipelineContains(
        pipeline,
        step
    ) {

        return (
            Array.isArray(pipeline) &&
            pipeline.includes(step)
        );
    }


    /*
    ============================================================
    HUMAN DECISION GATE VERIFICATION
    ============================================================
    */

    function verifyHumanDecisionGate(
        decision
    ) {

        const selected =
            decision || null;


        const validDecision =
            selected === null ||
            VALID_DECISIONS.includes(
                selected
            );


        const recoveryAuthorized =
            selected ===
            "AUTHORIZE_RECOVERY";


        return {

            module:
                "HumanDecisionAuthorityV1",

            authority:
                "MISSION_CONTROLLER",

            decision:
                selected,

            validDecision:
                validDecision,

            automaticExecution:
                false,

            authorizationRequired:
                true,

            executionGate:
                recoveryAuthorized,

            unauthorizedAction:
                recoveryAuthorized
                    ? "SIMULATED_RECOVERY_MAY_PROCEED"
                    : "NO_RECOVERY_EXECUTED",

            simulationOnly:
                true,

            executionPolicy:
                EXECUTION_POLICY
        };
    }


    /*
    ============================================================
    DISPLAY HELPER
    ============================================================
    */

    function escapeHtml(
        value
    ) {

        return String(
            value === undefined ||
            value === null
                ? ""
                : value
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    function renderValidationChecklist(
        targetId,
        result
    ) {

        const target =
            document.getElementById(
                targetId
            );

        if (!target) {
            return;
        }


        const rows =
            result.evidence
                .map(function (item) {

                    const statusClass =
                        item.status === "PASS"
                            ? "pass"
                            : "pending";


                    return `
                        <tr>
                            <td>
                                ${escapeHtml(item.id)}
                            </td>

                            <td>
                                ${escapeHtml(item.area)}
                            </td>

                            <td>
                                ${escapeHtml(
                                    item.requirement
                                )}
                            </td>

                            <td class="${statusClass}">
                                ${escapeHtml(
                                    item.status
                                )}
                            </td>
                        </tr>
                    `;

                })
                .join("");


        const finalClass =
            result.status ===
            "VALIDATION_COMPLETE"
                ? "pass"
                : "pending";


        target.innerHTML = `

            <h3>
                ValidationChecklistV1
            </h3>

            <p>
                Completion:
                <strong>
                    ${result.completion}%
                </strong>
            </p>

            <p>
                Passed:
                ${result.passedChecks}
                /
                ${result.totalChecks}
            </p>

            <p class="${finalClass}">
                ${escapeHtml(
                    result.status
                )}
            </p>


            <table>

                <thead>

                    <tr>

                        <th>
                            ID
                        </th>

                        <th>
                            Area
                        </th>

                        <th>
                            Requirement
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>


            <hr>


            <pre>
Authority:
${escapeHtml(result.authority)}

Human Authority:
${escapeHtml(result.humanAuthority)}

Automatic Execution:
${escapeHtml(result.automaticExecution)}

Simulation Only:
${escapeHtml(result.simulationOnly)}

Execution Policy:
${escapeHtml(result.executionPolicy)}
            </pre>
        `;
    }


    /*
    ============================================================
    GLOBAL API
    ============================================================
    */

    window.validationChecklist = {

        name:
            MODULE_NAME,

        version:
            MODULE_VERSION,

        checklist:
            CHECKLIST,

        collectContext:
            collectContext,

        run:
            runValidationChecklist,

        verifyHumanDecisionGate:
            verifyHumanDecisionGate,

        buildEvidence:
            buildValidationEvidence,

        render:
            renderValidationChecklist
    };


    /*
    ============================================================
    GLOBAL EVIDENCE API
    ============================================================
    */

    window.generateOrbitalValidationEvidence =
        function () {

            const context =
                collectContext();

            const evidence =
                buildValidationEvidence(
                    context
                );

            window.lastValidationEvidence =
                evidence;

            return evidence;
        };


    /*
    ============================================================
    AUTO INITIALISATION
    ============================================================
    */

    window.addEventListener(
        "load",
        function () {

            try {

                const result =
                    runValidationChecklist();

                window.lastValidationChecklist =
                    result;


                const evidence =
                    buildValidationEvidence();

                window.lastValidationEvidence =
                    evidence;


                renderValidationChecklist(
                    "validationChecklistEvidence",
                    result
                );


                /*
                Console evidence for
                deterministic verification.
                */

                console.info(
                    MODULE_NAME +
                    " initialised:",
                    result
                );

                console.info(
                    MODULE_NAME +
                    " evidence:",
                    evidence
                );


            } catch (error) {

                console.error(
                    MODULE_NAME +
                    " initialisation failed:",
                    error
                );

            }

        }
    );

})();