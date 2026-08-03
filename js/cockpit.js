/*
🛰️ Sextant Cockpit Controller v1
Orbital Resilience Simulator

Purpose:
Connect user interface controls
to Orbital Engine and Rule Profiles.

Flow:

User Scenario Selection
        ↓
Cockpit Controller
        ↓
OrbitalEngineV1
        ↓
Orbital Failure Profiles
        ↓
Golden Rule Pipeline
        ↓
Audit Trace
*/


// =================================
// RUN ORBITAL SCENARIO
// =================================

function runScenario(scenario) {


    const result =
        orbitalEngine.runScenario(
            scenario
        );



    displayAssessment(result);



    generateAuditTrace(result);


}



// =================================
// DISPLAY RESULT
// =================================

function displayAssessment(result) {


    const output =
        document.getElementById(
            "output"
        );



    if (result.error) {


        output.innerText =
            JSON.stringify(
                result,
                null,
                2
            );


        return;

    }



    output.innerText =
        JSON.stringify(
            result,
            null,
            2
        );


}



// =================================
// AUDIT TRACE
// =================================

function generateAuditTrace(result) {


    const audit =
        document.getElementById(
            "audit"
        );



    audit.innerText =

        "EVENT: "
        + result.scenario

        + "\n\nENGINE: "
        + result.engine

        + "\n\nSEVERITY: "
        + result.assessment.severity

        + "\n\nDECISION: "
        + result.decision.decision

        + "\n\nRECOVERY: "
        + result.recovery.action

        + "\n\nAUTHORITY: "
        + result.decision.authority

        + "\n\nTRACE: GENERATED";

}



// =================================
// INITIAL LOAD TEST
// =================================

window.addEventListener(
    "load",
    function() {


        console.log(
            "🛰️ Sextant Cockpit Controller Online"
        );


        console.log(
            "Orbital Rule Engine Connected"
        );


    }
);