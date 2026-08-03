/*
🛰️ Memory Core v1.2
Sextant Orbital Resilience Framework

Purpose:
Deterministic simulator memory layer.

Stores:

- Scenario state
- Decision state
- Recovery state
- Severity state
- Failsafe transition state
- Cascade protection state
- Recovery pathway
- Operational history

Simulation-only memory module.
*/


// =================================
// MEMORY CORE
// =================================

class MemoryCoreV1 {


    constructor(){


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



            previousFailsafeState:
                "NONE",



            lastFailsafeState:
                "NONE",



            lastTransition:
                "NONE",



            cascadeStatus:
                "NONE",



            recoveryPathway:
                [],



            transitionCount:
                0,



            timestamp:
                null,



            systemStatus:
                "READY"


        };


    }





    // =================================
    // UPDATE MEMORY STATE
    // =================================

    update(
        result,
        failsafe
    ){


        if(!result){

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
                    result.decision.decision
                    ||
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





            previousFailsafeState:

                failsafe

                ?

                failsafe.previousState

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





            cascadeStatus:

                failsafe &&
                failsafe.cascadeControl

                ?

                failsafe.cascadeControl.propagation

                :

                "NONE",





            recoveryPathway:

                failsafe &&
                failsafe.recoveryPathway

                ?

                failsafe.recoveryPathway

                :

                [],





            transitionCount:

                failsafe &&
                failsafe.stateHistory

                ?

                failsafe.stateHistory.length

                :

                0,





            timestamp:

                new Date()
                .toISOString(),





            systemStatus:

                result.status
                ||
                "SIMULATION_COMPLETE"


        };



        return this.state;


    }





    // =================================
    // READ MEMORY
    // =================================

    getState(){


        return this.state;


    }





    // =================================
    // RESET MEMORY
    // =================================

    reset(){


        this.state = {


            lastScenario:
                "NONE",


            lastDecision:
                "NONE",


            lastRecovery:
                "NONE",


            lastSeverity:
                "NONE",


            previousFailsafeState:
                "NONE",


            lastFailsafeState:
                "NONE",


            lastTransition:
                "NONE",


            cascadeStatus:
                "NONE",


            recoveryPathway:
                [],


            transitionCount:
                0,


            timestamp:
                null,


            systemStatus:
                "READY"


        };


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