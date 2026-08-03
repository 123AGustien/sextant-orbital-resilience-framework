/*
🛰️ Memory Core v1
Sextant Orbital Resilience Framework

Purpose:
Deterministic simulator memory layer.

Architecture:

Scenario Result
        ↓
Memory Core
        ↓
Store Operational State
        ↓
Display Last Event
        ↓
Cockpit Update

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

            systemStatus:
                "READY"

        };

    }



    // =============================
    // UPDATE MEMORY STATE
    // =============================

    update(result) {


        if (!result) {

            return this.state;

        }



        this.state = {


            lastScenario:
                result.scenario
                || "UNKNOWN",



            lastDecision:
                result.decision
                ?
                result.decision.decision
                :
                "NONE",



            lastRecovery:
                result.recovery
                ?
                result.recovery.action
                :
                "NONE",



            lastSeverity:
                result.assessment
                ?
                result.assessment.severity
                :
                "NONE",



            systemStatus:
                result.status
                || "UNKNOWN"

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