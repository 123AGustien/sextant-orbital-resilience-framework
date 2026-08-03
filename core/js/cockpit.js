/*
🛰️ Sextant Orbital Resilience Cockpit Controller v2

Purpose:
Connect cockpit interface with:

OrbitalEngineV1
ValidationCore
MemoryCore
AuditCore

Flow:

Scenario Selection
        ↓
OrbitalEngineV1
        ↓
Validation Core
        ↓
Captain AI Lena Decision Pipeline
        ↓
Memory Core Update
        ↓
Audit Record Generation
        ↓
Cockpit Display
*/



// =================================
// RUN ORBITAL SCENARIO
// =================================

function runScenario(type) {


    const result =
        orbitalEngine.runScenario(
            type
        );



    // -----------------------------
    // Validation Core
    // -----------------------------

    let validation = {

        status:
        "VALIDATION_NOT_CONNECTED"

    };


    if (
        typeof validationCore !== "undefined"
    ) {

        validation =
            validationCore.validate(
                result
            );

    }



    // -----------------------------
    // Memory Core
    // -----------------------------

    if (
        typeof memoryCore !== "undefined"
    ) {

        memoryCore.update(
            result
        );

    }



    // -----------------------------
    // Audit Core
    // -----------------------------

    let auditRecord = null;


    if (
        typeof auditCore !== "undefined"
    ) {

        auditRecord =
            auditCore.generate(
                result
            );

    }



    // -----------------------------
    // Assessment Display
    // -----------------------------

    document.getElementById(
        "output"
    ).innerText =

    JSON.stringify(
        {
            ...result,

            validation:
                validation

        },

        null,
        2
    );



    // -----------------------------
    // Memory Display
    // -----------------------------

    const memory =
        document.getElementById(
            "memory"
        );


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

    }



    // -----------------------------
    // Audit Display
    // -----------------------------

    document.getElementById(
        "audit"
    ).innerText =


    JSON.stringify(

        auditRecord,

        null,

        2

    );


}



// =================================
// INITIAL SYSTEM START
// =================================

window.onload = function(){


    console.log(
        "🛰️ Sextant Cockpit v2 ONLINE"
    );


    runScenario(
        "SIGNAL_LOSS"
    );


};