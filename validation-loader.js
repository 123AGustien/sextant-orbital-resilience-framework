/*
================================================
Sextant Orbital Validation Loader v1.1
================================================

Purpose:
Loads orbital-validation-checklist.json
and displays ValidationCore status.

Architecture:

ValidationCoreV1
        ↓
Checklist JSON
        ↓
Validation Loader
        ↓
Cockpit Validation Display
        ↓
AuditCoreV1 Preparation


Simulation Validation Only

================================================
*/


/*
================================================
LOAD VALIDATION CHECKLIST
================================================
*/


async function loadValidationChecklist(){


    try{


        const response =
        await fetch(
            "orbital-validation-checklist.json"
        );



        if(!response.ok){


            throw new Error(
                "Validation checklist unavailable"
            );


        }



        const validation =
        await response.json();



        console.log(
            "Validation Loaded:",
            validation
        );



        displayValidationStatus(
            validation
        );


        displayValidationSummary(
            validation
        );


    }


    catch(error){


        console.error(
            "Validation Load Error:",
            error
        );


        displayValidationError();

    }


}



/*
================================================
DISPLAY MAIN VALIDATION STATUS
================================================
*/


function displayValidationStatus(validation){


    const display =
    document.getElementById(
        "validationStatus"
    );



    if(!display){

        return;

    }



    if(
        validation.finalStatus ===
        "VALIDATION_COMPLETE"
    ){


        display.innerText =
        "🟢 VALIDATION COMPLETE";


    }

    else{


        display.innerText =
        "🔴 VALIDATION REQUIRED";


    }


}



/*
================================================
DISPLAY VALIDATION SUMMARY
================================================
*/


function displayValidationSummary(validation){


    const summary =
    document.getElementById(
        "validationSummary"
    );



    if(!summary){

        return;

    }



    let engine =
    validation.checks.engineValidation;



    let scenario =
    validation.checks.scenarioValidation;



    let pipeline =
    validation.checks.goldenRulePipeline;



    let failsafe =
    validation.checks.failsafeValidation;



    let boundary =
    validation.checks.operationalBoundary;



    summary.innerText =

    "ENGINE VALIDATION: "
    +
    countChecks(engine)
    +
    "\n\nSCENARIO VALIDATION: "
    +
    countChecks(scenario)
    +
    "\n\nGOLDEN RULE PIPELINE: "
    +
    countChecks(pipeline)
    +
    "\n\nFAILSAFE VALIDATION: "
    +
    countChecks(failsafe)
    +
    "\n\nOPERATIONAL BOUNDARY: "
    +
    countChecks(boundary);



}



/*
================================================
CHECK COUNTER
================================================
*/


function countChecks(section){


    let total = 0;

    let passed = 0;



    for(
        let item in section
    ){


        total++;


        if(
            section[item] === true ||
            section[item] === "PASS"
        ){


            passed++;


        }


    }



    return (
        passed
        +
        "/"
        +
        total
        +
        " PASS"
    );


}



/*
================================================
DISPLAY ERROR
================================================
*/


function displayValidationError(){


    const display =
    document.getElementById(
        "validationStatus"
    );



    if(display){


        display.innerText =
        "⚠️ VALIDATION FILE NOT FOUND";


    }


}



/*
================================================
SYSTEM BOOT
================================================
*/


window.addEventListener(
    "load",
    function(){

        loadValidationChecklist();

    }
);