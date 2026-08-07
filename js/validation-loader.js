/*
============================================================
🛰️ Sextant Orbital Resilience Framework
Validation Loader v1.1

Purpose:
Connect ValidationCoreV1 output
to Validation Checklist Display

Flow:

ValidationCoreV1
        ↓
Validation Loader
        ↓
Checklist Evidence Display

Simulation Only
============================================================
*/


// =================================
// VALIDATION CHECKLIST LOADER
// =================================


function loadValidationChecklist(){


    let validationResult = null;



    // --------------------------------
    // CHECK VALIDATION CORE CONNECTION
    // --------------------------------

    if(
        typeof validationCore !== "undefined"
    ){

        validationResult =
            validationCore.validate(
                window.lastOrbitalResult || {},
                window.lastFailsafeResult || {}
            );


    }
    else{


        validationResult = {

            final_status:
            "VALIDATION_CORE_NOT_CONNECTED"

        };


    }



    // --------------------------------
    // UPDATE STATUS DISPLAY
    // --------------------------------


    const status =
        document.getElementById(
            "validationStatus"
        );


    if(status){


        if(
            validationResult.re_test_validation &&
            validationResult.re_test_validation.status === "PASS"
        ){

            status.innerHTML =
            "🟢 VALIDATION COMPLETE";


            status.className =
            "status-pass";


        }
        else{


            status.innerHTML =
            "🟠 VALIDATION WARNING";


            status.className =
            "status-warning";


        }


    }




    // --------------------------------
    // UPDATE SUMMARY DISPLAY
    // --------------------------------


    const summary =
        document.getElementById(
            "validationSummary"
        );


    if(summary){


        summary.innerHTML = `

        <h3>
        ValidationCoreV1 Report
        </h3>

        <p>
        Self Test:
        ${validationResult.self_test?.status}
        </p>


        <p>
        Fault Identification:
        ${validationResult.fault_identification?.status}
        </p>


        <p>
        Failsafe Validation:
        ${validationResult.failsafe_validation?.status}
        </p>


        <p>
        Decision Core:
        ${validationResult.decision_core?.status}
        </p>


        <p>
        Re-Test:
        ${validationResult.re_test_validation?.status}
        </p>


        <strong>
        ${validationResult.final_status}
        </strong>

        `;


    }



    return validationResult;


}





// =================================
// GLOBAL ACCESS
// =================================


window.loadValidationChecklist =
loadValidationChecklist;





// =================================
// AUTO START
// =================================


window.addEventListener(
"load",
function(){

    loadValidationChecklist();

});
