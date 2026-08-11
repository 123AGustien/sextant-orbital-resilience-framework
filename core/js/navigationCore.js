/*
============================================================
🛰️ Sextant Orbital Resilience Cockpit Controller v2.4

Purpose:
Integrated deterministic cockpit controller.

Connections:

- OrbitalEngineV1
- ManoeuvreEngineV1
- FailsafeEngineV1
- ValidationCoreV1
- OperatorGuidanceEngineV1
- MemoryCoreV1
- AuditCoreV1

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
Memory Core
        ↓
Audit Core
        ↓
Captain AI Lena Display

Simulation-only controller.
============================================================
*/


// =================================
// SYSTEM INTEGRATION STATUS
// =================================

function updateIntegrationStatus() {

    const statusDisplay =
        document.getElementById("integration");

    if (!statusDisplay) {
        return;
    }

    const status = {

        OrbitalEngineV1:
            typeof orbitalEngine !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        ManoeuvreEngineV1:
            typeof manoeuvreEngine !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        FailsafeEngineV1:
            typeof failsafeEngine !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        ValidationCoreV1:
            typeof validationCore !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        OperatorGuidanceEngineV1:
            typeof OperatorGuidanceEngineV1 !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        MemoryCoreV1:
            typeof memoryCore !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

        AuditCoreV1:
            typeof auditCore !== "undefined"
                ? "CONNECTED"
                : "NOT_CONNECTED",

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
// RUN ORBITAL SCENARIO
// =================================

function runScenario(type) {

    updateIntegrationStatus();

    // =================================
    // ORBITAL ENGINE
    // =================================

    if (
        typeof orbitalEngine === "undefined"
    ) {

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
        status: "NOT_CONNECTED"
    };

    if (
        typeof manoeuvreEngine !== "undefined"
    ) {

        manoeuvre =
            manoeuvreEngine.execute(result);
    }


    // =================================
    // FAILSAFE ENGINE
    // =================================

    let failsafe = {
        status: "NOT_CONNECTED"
    };

    if (
        typeof failsafeEngine !== "undefined"
    ) {

        failsafe =
            failsafeEngine.evaluate(result);
    }


    // =================================
    // VALIDATION CORE
    // =================================

    let validation = {
        status: "NOT_CONNECTED"
    };

    if (
        typeof validationCore !== "undefined"
    ) {

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
        status: "NOT_CONNECTED"
    };

    if (
        typeof OperatorGuidanceEngineV1 !== "undefined"
    ) {

        operatorGuidance =
            OperatorGuidanceEngineV1.generateGuidance({

                scenario:
                    result.scenario,

                severity:
                    result.severity,

                currentState:
                    failsafe.state ||
                    "STABILIZED",

                recoveryAction:
                    result.recovery ||
                    "NO_ACTION_REQUIRED"
            });
    }


    // =================================
    // MEMORY CORE
    // =================================

    let memory = null;

    if (
        typeof memoryCore !== "undefined"
    ) {

        memory =
            memoryCore.update(
                result,
                failsafe
            );
    }


    // =================================
    // AUDIT CORE
    // =================================

    let audit = null;

    if (
        typeof auditCore !== "undefined"
    ) {

        audit =
            auditCore.generate(
                result,
                validation,
                failsafe
            );
    }


    // =================================
    // VALIDATION CHECKLIST EVIDENCE LINK
    // =================================

    window.lastOrbitalResult =
        result;

    window.lastFailsafeResult =
        failsafe;


    // =================================
    // COMPLETE DISPLAY RESULT
    // =================================

    const displayResult = {

        ...result,

        manoeuvre,

        failsafe,

        validation,

        operatorGuidance,

        memory,

        audit
    };


    // =================================
    // MANOEUVRE DISPLAY
    // =================================

    const manoeuvreDisplay =
        document.getElementById("manoeuvre");

    if (manoeuvreDisplay) {

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
        document.getElementById("failsafe");

    if (failsafeDisplay) {

        failsafeDisplay.innerText =
            JSON.stringify(
                failsafe,
                null,
                2
            );
    }


    // =================================
    // VALIDATION DISPLAY
    // =================================

    const validationDisplay =
        document.getElementById("validation");

    if (validationDisplay) {

        validationDisplay.innerText =
            JSON.stringify(
                validation,
                null,
                2
            );
    }


    // =================================
    // OPERATOR GUIDANCE DISPLAY
    // =================================

    if (operatorGuidance) {

        const eventDisplay =
            document.getElementById(
                "guidanceEvent"
            );

        const severityDisplay =
            document.getElementById(
                "guidanceSeverity"
            );

        const stateDisplay =
            document.getElementById(
                "guidanceState"
            );

        const recoveryDisplay =
            document.getElementById(
                "guidanceRecovery"
            );


        if (eventDisplay) {

            eventDisplay.innerText =
                operatorGuidance.scenario ||
                "-";
        }


        if (severityDisplay) {

            severityDisplay.innerText =
                operatorGuidance.severity ||
                "-";
        }


        if (stateDisplay) {

            stateDisplay.innerText =
                operatorGuidance.systemState ||
                "-";
        }


        if (recoveryDisplay) {

            recoveryDisplay.innerText =
                operatorGuidance.recoveryAction ||
                "-";
        }


        const actionList =
            document.getElementById(
                "guidanceActions"
            );

        if (actionList) {

            actionList.innerHTML = "";

            if (
                operatorGuidance.instructions
            ) {

                operatorGuidance.instructions.forEach(
                    (action) => {

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
        }
    }


    // =================================
    // MEMORY DISPLAY
    // =================================

    const memoryDisplay =
        document.getElementById("memory");

    if (memoryDisplay) {

        memoryDisplay.innerText =
            JSON.stringify(
                memory,
                null,
                2
            );
    }


    // =================================
    // AUDIT DISPLAY
    // =================================

    const auditDisplay =
        document.getElementById("audit");

    if (auditDisplay) {

        auditDisplay.innerText =
            JSON.stringify(
                audit,
                null,
                2
            );
    }


    // =================================
    // CONSOLE RESULT
    // =================================

    console.log(
        "🛰️ Orbital Scenario Completed",
        displayResult
    );
}


// =================================
// SYSTEM START
// =================================

window.addEventListener(
    "load",
    function () {

        console.log(
            "🛰️ Sextant Orbital Resilience Cockpit v2.4 ONLINE"
        );

        updateIntegrationStatus();

        runScenario(
            "SIGNAL_LOSS"
        );
    }
);