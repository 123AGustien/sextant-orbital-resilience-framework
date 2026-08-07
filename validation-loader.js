/*
============================================================
🛰️ Sextant Orbital Resilience Framework
Validation Loader v1.1

Purpose:
Connect ValidationCoreV1 output
to Validation Checklist Display

Flow:

Orbital Scenario
        ↓
OrbitalEngineV1
        ↓
FailsafeTransitionEngineV1
        ↓
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



        // ----------------------------
        // WAIT FOR REAL SIMULATION DATA
        // ----------------------------


        if(

            window.lastOrbitalResult &&

            window.lastFailsafeResult

        ){


            validationResult =

            validationCore.validate(

                window.lastOrbitalResult,

                window.lastFailsafeResult

            );


        }
        else{


            validationResult = {


                validator:
                "ValidationCoreV1",


                self_test:{

                    status:
                    "READY"

                },


                fault_identification:{

                    status:
                    "WAITING",

                    detected:
                    false

                },


                failsafe_validation:{

                    status:
                    "WAITING"

                },


                decision_core:{

                    status:
                    "WAITING"

                },


                corrective_action:{

                    status:
                    "WAITING"

                },


                re_test_validation:{

                    status:
                    "WAITING"

                },


                final_status:

                "WAITING_FOR_SCENARIO"



            };


        }



    }


    else{


        validationResult = {


            validator:

            "ValidationCoreV1",


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

            validationResult
            .re_test_validation

            &&

            validationResult
            .re_test_validation
            .status === "PASS"

        ){



            status.innerHTML =

            "🟢 VALIDATION COMPLETE";



            status.className =

            "status-pass";



        }


        else if(

            validationResult
            .final_status ===
            "WAITING_FOR_SCENARIO"

        ){



            status.innerHTML =

            "🟠 WAITING FOR SIMULATION";



            status.className =

            "status-warning";



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

        ${
        validationResult
        .self_test?.status

        }

        </p>



        <p>

        Fault Identification:

        ${
        validationResult
        .fault_identification?.status

        }

        </p>




        <p>

        Failsafe Validation:

        ${
        validationResult
        .failsafe_validation?.status

        }

        </p>




        <p>

        Decision Core:

        ${
        validationResult
        .decision_core?.status

        }

        </p>




        <p>

        Corrective Action:

        ${
        validationResult
        .corrective_action?.status

        }

        </p>




        <p>

        Re-Test:

        ${
        validationResult
        .re_test_validation?.status

        }

        </p>




        <br>



        <strong>

        ${
        validationResult.final_status

        }

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


}

);
