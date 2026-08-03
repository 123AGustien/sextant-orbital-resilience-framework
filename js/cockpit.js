/*
🛰️ Sextant Orbital Resilience Cockpit Controller v2

Purpose:
Connect cockpit interface with:

- OrbitalEngineV1
- ValidationCoreV1
- MemoryCoreV1
- AuditCoreV1

Flow:

Scenario Selection
        ↓
OrbitalEngineV1
        ↓
Validation Core
        ↓
Memory Core
        ↓
Audit Core
        ↓
Cockpit Display

Simulation-only controller.
*/


// =================================
// RUN ORBITAL SCENARIO
// =================================

function runScenario(type) {


    // -----------------------------
    // Execute Orbital Engine
    // -----------------------------

    const result =
        orbitalEngine.runScenario(
            type
        );



    // -----------------------------
    // Validation Core
    // -----------------------------

    let validation = {

        status:
            "NOT_CONNECTED"

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
    // Memory Core Update
    // -----------------------------

    let memory = null;


    if (
        typeof memoryCore !== "undefined"
    ) {

        memory =
            memoryCore.update(
                result
            );

    }



    // -----------------------------
    // Audit Core
    // -----------------------------

    let audit = null;


    if (
        typeof auditCore !== "undefined"
    ) {

        audit =
            auditCore.generate(
                result,
                validation
            );

    }



    // -----------------------------
    // Assessment Display
    // -----------------------------

    const displayResult = {


        ...result,


        validation:


            validation,


        memory:


            memory

    };



    document.getElementById(
        "output"
    ).innerText =

    JSON.stringify(
        displayResult,
        null,
        2
    );



    // -----------------------------
    // Memory Display
    // -----------------------------

    const memoryDisplay =
        document.getElementById(
            "memory"
        );


    if (
        memoryDisplay &&
        memory
    ) {

        memoryDisplay.innerText =

        JSON.stringify(
            memory,
            null,
            2
        );

    }



    // -----------------------------
    // Audit Display
    // -----------------------------

    const auditDisplay =
        document.getElementById(
            "audit"
        );


    if (
        auditDisplay
    ) {

        auditDisplay.innerText =

        JSON.stringify(
            audit,
            null,
            2
        );

    }


}



// =================================
// SYSTEM START
// =================================

window.addEventListener(
    "load",
    function(){

        console.log(
            "🛰️ Sextant Orbital Cockpit v2 ONLINE"
        );


        runScenario(
            "SIGNAL_LOSS"
        );


    }
);