/**
 * ============================================================
 * Sextant Orbital Resilience Framework
 *
 * Failsafe Transition Profiles v1.0
 *
 * Purpose:
 * Defines deterministic system transition states
 * for resilience stabilization modelling.
 *
 * Classification:
 * Simulation / Architecture Support Layer
 * Non-operational
 * ============================================================
 */


const FailsafeProfiles = {


    module:
    "FailsafeTransitionArchitecture",


    version:
    "v1.0",


    states: {


        NORMAL: {

            level: 0,

            description:
            "System operating within certified parameters",

            nextStates: [
                "DEGRADED"
            ]

        },


        DEGRADED: {

            level: 1,

            description:
            "System performance reduced; anomaly detected",

            nextStates: [
                "ISOLATED",
                "STABILIZED"
            ]

        },


        ISOLATED: {

            level: 2,

            description:
            "Affected subsystem separated to prevent cascade propagation",

            nextStates: [
                "STABILIZED",
                "RECOVERING"
            ]

        },


        STABILIZED: {

            level: 3,

            description:
            "System baseline restored after containment action",

            nextStates: [
                "RECOVERING",
                "CERTIFIED_STABLE"
            ]

        },


        RECOVERING: {

            level: 4,

            description:
            "Recovery sequence in progress",

            nextStates: [
                "CERTIFIED_STABLE"
            ]

        },


        CERTIFIED_STABLE: {

            level: 5,

            description:
            "System validated and returned to stable state",

            nextStates: [
                "NORMAL"
            ]

        }


    },


    getState(state){

        return this.states[state] || null;

    },


    getAllStates(){

        return this.states;

    }


};


// Global exposure

window.FailsafeProfiles = FailsafeProfiles;