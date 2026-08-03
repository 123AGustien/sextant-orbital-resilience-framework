/*
🛰️ Memory Core v1.1
Sextant Orbital Resilience Framework

Purpose:
Deterministic simulator memory layer.

Now stores:

- Scenario state
- Decision state
- Recovery state
- Failsafe transition state

Simulation-only memory module.
*/


// =================================
// MEMORY CORE
// =================================

class MemoryCoreV1 {


    constructor() {


        this.name =
            "MemoryCoreV1";



        this.state = {


            lastScenario:
                "NONE",


            lastDecision:
                "NONE",


            lastRecovery:
                "NONE",


            lastSeverity:
                "NONE",


            lastFailsafeState:
                "NONE",


            lastTransition:
                "NONE",


            systemStatus:
                "READY"


        };


    }



    // =============================
    // UPDATE MEMORY STATE
    // =============================

    update(
        result,
        failsafe
    ) {


        if (!result) {

            return this.state;

        }



        this.state = {



            lastScenario:

                result.scenario

                ||

                "UNKNOWN",




            lastDecision:

                result.decision

                ?

                (
                    result.decision.action
                    ||
                    result.decision.mode
                    ||
                    "NONE"
                )

                :

                "NONE",




            lastRecovery:

                result.recovery

                ?

                (
                    result.recovery.action
                    ||
                    result.recovery.recommended_action
                    ||
                    "NONE"
                )

                :

                "NONE",




            lastSeverity:

                result.assessment

                ?

                result.assessment.severity

                :

                "NONE",




            lastFailsafeState:

                failsafe

                ?

                failsafe.currentState

                :

                "NONE",




            lastTransition:

                failsafe

                ?

                failsafe.transition

                :

                "NONE",




            systemStatus:

                result.status

                ||

                "SIMULATION_COMPLETE"


        };



        return this.state;


    }





    // =============================
    // READ MEMORY
    // =============================

    getState() {


        return this.state;


    }


}



// =================================
// GLOBAL INSTANCE
// =================================

const memoryCore =
    new MemoryCoreV1();



window.memoryCore =
    memoryCore;