/*
🛰️ Sextant Orbital Resilience Cockpit Controller v1

Purpose:
Connects cockpit buttons to the
Orbital Rule Engine.

Flow:

User Scenario Selection
        ↓
Cockpit Controller
        ↓
OrbitalEngineV1
        ↓
Scenario Rules
        ↓
Display Assessment
        ↓
Audit Trace
*/



// ---------------------------------
// RUN ORBITAL SCENARIO
// ---------------------------------

function runScenario(type) {


    const result =
        orbitalEngine.evaluate(type);



    // -----------------------------
    // Assessment Output
    // -----------------------------

    document.getElementById(
        "output"
    ).innerText =

        JSON.stringify(
            result,
            null,
            2
        );



    // -----------------------------
    // Audit Trace
    // -----------------------------

    document.getElementById(
        "audit"
    ).innerText =


        "EVENT: "
        + type

        + "\n"

        + "SCENARIO ID: "
        + result.scenario_id

        + "\n"

        + "SEVERITY: "
        + result.assessment.severity

        + "\n"

        + "DECISION: "
        + result.decision.mode

        + "\n"

        + "ACTION: "
        + result.recovery.action

        + "\n"

        + "TRACE: GENERATED";


}




// ---------------------------------
// INITIAL LOAD TEST
// ---------------------------------

window.onload = function(){


    runScenario(
        "SIGNAL_LOSS"
    );


};