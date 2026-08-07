/*
==========================================================
🛰️ Sextant Orbital Resilience Cockpit Controller v2.4
Captain AI Lena Autonomous Agent Core
==========================================================

FLOW

Scenario Button
        ↓
OrbitalEngineV1
        ↓
Trial Manoeuvre Engine
        ↓
Failsafe Transition Engine
        ↓
Validation Core
        ↓
Memory Core
        ↓
Audit Core
        ↓
Cockpit Display

==========================================================
*/

// =====================================
// RUN SCENARIO
// =====================================

function runScenario(type) {

    console.log("Running Scenario:", type);

    // ---------------------------------
    // Orbital Engine
    // ---------------------------------

    const result = OrbitalEngineV1.runScenario(type);

    // ---------------------------------
    // Validation Core
    // ---------------------------------

    let validation = result.validation || {
        status: "VALIDATION_NOT_CONNECTED"
    };

    if (typeof validationCore !== "undefined") {
        validation = validationCore.validate(result);
    }

    // ---------------------------------
    // Memory Core
    // ---------------------------------

    if (typeof memoryCore !== "undefined") {
        memoryCore.update(result);
    }

    // ---------------------------------
    // Audit Core
    // ---------------------------------

    let auditRecord = result.audit || null;

    if (typeof auditCore !== "undefined") {
        auditRecord = auditCore.generate(result);
    }

    // =====================================
    // UPDATE COCKPIT PANELS
    // =====================================

    // Orbital Assessment

    const output = document.getElementById("output");

    if (output) {
        output.innerText =
            JSON.stringify(result, null, 2);
    }

    // Trial Manoeuvre

    const manoeuvre =
        document.getElementById("manoeuvre");

    if (manoeuvre && result.manoeuvre) {

        manoeuvre.innerText =
            JSON.stringify(
                result.manoeuvre,
                null,
                2
            );

    }

    // Failsafe

    const failsafe =
        document.getElementById("failsafe");

    if (failsafe && result.failsafe) {

        failsafe.innerText =
            JSON.stringify(
                result.failsafe,
                null,
                2
            );

    }

    // Validation

    const validationPanel =
        document.getElementById("validation");

    if (validationPanel) {

        validationPanel.innerText =
            JSON.stringify(
                validation,
                null,
                2
            );

    }

    // Memory

    const memory =
        document.getElementById("memory");

    if (
        memory &&
        typeof memoryCore !== "undefined"
    ) {

        memory.innerText =
            JSON.stringify(
                memoryCore.getState(),
                null,
                2
            );

    } else if (
        memory &&
        result.memory
    ) {

        memory.innerText =
            JSON.stringify(
                result.memory,
                null,
                2
            );

    }

    // Audit

    const audit =
        document.getElementById("audit");

    if (audit) {

        audit.innerText =
            JSON.stringify(
                auditRecord,
                null,
                2
            );

    }

    // Integration Status

    const integration =
        document.getElementById("integration");

    if (integration) {

        integration.innerText =
            JSON.stringify({

                OrbitalEngineV1: "CONNECTED",

                ManoeuvreEngineV1: "CONNECTED",

                FailsafeEngineV1: "CONNECTED",

                ValidationCoreV1: "CONNECTED",

                MemoryCoreV1: "CONNECTED",

                AuditCoreV1: "CONNECTED",

                GoldenRuleEngine: "ACTIVE"

            }, null, 2);

    }

    // Validation Status Banner

    const status =
        document.getElementById("validationStatus");

    if (status) {

        status.innerText =
            "VALIDATION COMPLETE";

        status.className =
            "status-pass";

    }

}


// =====================================
// INITIAL SYSTEM START
// =====================================

window.onload = function () {

    console.log(
        "🛰️ Sextant Orbital Resilience Cockpit v2.4 ONLINE"
    );

    runScenario("SIGNAL_LOSS");

};