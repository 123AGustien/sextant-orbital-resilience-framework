/*
============================================================
🛰️ Sextant Orbital Resilience Framework v2.4
Validation Checklist Module v1.0
File: js/validationChecklist.js

Purpose:
Structured validation evidence layer for the ValidationCoreV1
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
- Produces deterministic checklist evidence

It does NOT:
- execute spacecraft commands
- issue propulsion commands
- control navigation
- bypass human authority
- authorise recovery
============================================================
*/

(function () {

    "use strict";

    const MODULE_NAME = "ValidationChecklistV1";

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
                return !!(
                    ctx.orbital &&
                    ctx.orbital.assessment
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

                if (!m) return false;

                return (
                    m.status === "SIMULATION_COMPLETE" ||
                    m.simulationOnly === true ||
                    m.correctionPath === "SIMULATED"
                );
            }
        },

        {
            id: "VC-004",
            area: "FailsafeTransitionEngineV1",
            requirement:
                "Failsafe transition architecture is connected and state is defined.",
            test: function (ctx) {
                const f = ctx.failsafe;

                return !!(
                    f &&
                    f.engine === "FailsafeTransitionEngineV1" &&
                    f.currentState
                );
            }
        },

        {
            id: "VC-005",
            area: "Navigation Architecture",
            requirement:
                "Nine-layer operational abstraction remains logically defined.",
            test: function () {
                return [
                    "SENSOR",
                    "RELAY",
                    "DEPENDENCY",
                    "CASCADE",
                    "TRANSITION",
                    "ISOLATION",
                    "RECOVERY",
                    "GOVERNANCE",
                    "SUPERVISORY"
                ].length === 9;
            }
        },

        {
            id: "VC-006",
            area: "Cascade Containment",
            requirement:
                "Cascade propagation and containment states remain distinguishable.",
            test: function (ctx) {
                const f = ctx.failsafe;

                return !!(
                    f &&
                    f.cascadeControl &&
                    typeof f.cascadeControl.propagation !== "undefined" &&
                    typeof f.cascadeControl.containment !== "undefined"
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

                return !!(
                    g &&
                    g.operatorGuidance &&
                    Array.isArray(g.operatorGuidance.instructions)
                );
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
                    ctx.operatorGuidance?.pipeline;

                const required = [
                    "OBSERVE",
                    "VERIFY",
                    "ASSESS",
                    "DECIDE",
                    "ACT",
                    "UPDATE"
                ];

                return (
                    Array.isArray(pipeline) &&
                    required.every(step => pipeline.includes(step))
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

                return !!(
                    h &&
                    h.authority === "MISSION_CONTROLLER"
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

                return !!(
                    gate &&
                    gate.authorized === false
                );
            }
        },

        {
            id: "VC-011",
            area: "MemoryCoreV1",
            requirement:
                "Scenario, decision, failsafe state and execution status remain traceable.",
            test: function (ctx) {

                const m = ctx.memory;

                return !!(
                    m &&
                    m.lastScenario &&
                    m.lastDecision &&
                    m.lastFailsafeState &&
                    m.systemStatus
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

                return !!(
                    a &&
                    a.event &&
                    a.decision &&
                    a.validation &&
                    a.humanDecision
                );
            }
        },

        {
            id: "VC-013",
            area: "ValidationCoreV1",
            requirement:
                "ValidationCoreV1 reports operational validation and successful re-test.",
            test: function (ctx) {

                const v = ctx.validation;

                return !!(
                    v &&
                    v.self_test?.status === "PASS" &&
                    v.re_test_validation?.status === "PASS"
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

                return !!(
                    h?.simulationOnly === true ||
                    h?.executionPolicy ===
                        "NO_RECOVERY_ACTION_EXECUTED_UNTIL_HUMAN_AUTHORIZATION" ||
                    gate?.authorized === false
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

        return {

            orbital:
                window.lastOrbitalResult || null,

            manoeuvre:
                window.lastManoeuvreResult ||
                window.lastTrialManoeuvreResult ||
                null,

            failsafe:
                window.lastFailsafeResult || null,

            operatorGuidance:
                window.lastOperatorGuidance ||
                null,

            humanDecision:
                window.lastHumanDecision ||
                null,

            executionGate:
                window.lastExecutionGate ||
                null,

            memory:
                window.lastMemoryState ||
                window.memoryCore?.state ||
                null,

            audit:
                window.lastAuditRecord ||
                null,

            validation:
                window.lastValidationResult ||
                null,

            pipeline:
                window.lastValidationResult?.pipeline ||
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

        const ctx = context || collectContext();

        const evidence = CHECKLIST.map(check => {

            let passed = false;
            let error = null;

            try {
                passed = !!check.test(ctx);
            } catch (err) {
                passed = false;
                error = err.message;
            }

            return {

                id: check.id,

                area: check.area,

                requirement: check.requirement,

                status:
                    passed
                        ? "PASS"
                        : "PENDING",

                verified: passed,

                error: error

            };

        });

        const passed =
            evidence.filter(
                item => item.status === "PASS"
            ).length;

        const total = evidence.length;

        const failed =
            evidence.filter(
                item => item.status !== "PASS"
            ).length;

        return {

            module: MODULE_NAME,

            version: "v1.0",

            mode:
                "DETERMINISTIC_SIMULATION_VALIDATION",

            timestamp:
                new Date().toISOString(),

            totalChecks: total,

            passedChecks: passed,

            pendingChecks: failed,

            completion:
                total === 0
                    ? 0
                    : Math.round(
                        (passed / total) * 100
                    ),

            status:
                failed === 0
                    ? "VALIDATION_COMPLETE"
                    : "VALIDATION_PENDING",

            evidence: evidence,

            authority:
                "GOLDEN_RULE_ENGINE",

            humanAuthority:
                "MISSION_CONTROLLER",

            automaticExecution:
                false,

            simulationOnly:
                true,

            executionPolicy:
                "NO_RECOVERY_ACTION_EXECUTED_UNTIL_HUMAN_AUTHORIZATION"

        };
    }


    /*
    ============================================================
    HUMAN DECISION GATE VERIFICATION
    ============================================================
    */

    function verifyHumanDecisionGate(decision) {

        const validDecisions = [

            "AUTHORIZE_RECOVERY",

            "MAINTAIN_SAFE_STATE",

            "REQUEST_ADDITIONAL_DIAGNOSTICS",

            "ABORT_RECOVERY",

            "ESCALATE_TO_MISSION_AUTHORITY"

        ];

        const selected =
            decision || null;

        return {

            module:
                "HumanDecisionAuthorityV1",

            authority:
                "MISSION_CONTROLLER",

            decision:
                selected,

            validDecision:
                selected === null ||
                validDecisions.includes(selected),

            automaticExecution:
                false,

            authorizationRequired:
                true,

            executionGate:
                selected === "AUTHORIZE_RECOVERY",

            unauthorizedAction:
                selected === "AUTHORIZE_RECOVERY"
                    ? "SIMULATED_RECOVERY_MAY_PROCEED"
                    : "NO_RECOVERY_EXECUTED",

            simulationOnly:
                true

        };
    }


    /*
    ============================================================
    DISPLAY HELPER
    ============================================================
    */

    function renderValidationChecklist(
        targetId,
        result
    ) {

        const target =
            document.getElementById(targetId);

        if (!target) return;

        const rows =
            result.evidence.map(item => {

                const statusClass =
                    item.status === "PASS"
                        ? "pass"
                        : "pending";

                return `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.area}</td>
                        <td>${item.requirement}</td>
                        <td class="${statusClass}">
                            ${item.status}
                        </td>
                    </tr>
                `;

            }).join("");

        target.innerHTML = `

            <h3>ValidationChecklistV1</h3>

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

            <p class="${
                result.status === "VALIDATION_COMPLETE"
                    ? "pass"
                    : "pending"
            }">

                ${result.status}

            </p>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Area</th>
                        <th>Requirement</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

            <hr>

            <pre>
Authority:
${result.authority}

Human Authority:
${result.humanAuthority}

Automatic Execution:
${result.automaticExecution}

Simulation Only:
${result.simulationOnly}

Execution Policy:
${result.executionPolicy}
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
            "v1.0",

        checklist:
            CHECKLIST,

        collectContext:
            collectContext,

        run:
            runValidationChecklist,

        verifyHumanDecisionGate:
            verifyHumanDecisionGate,

        render:
            renderValidationChecklist

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

                /*
                 Optional display target.
                 The HTML checklist can contain:

                 <div id="validationChecklistEvidence"></div>
                */

                renderValidationChecklist(
                    "validationChecklistEvidence",
                    result
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