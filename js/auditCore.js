/*
🛰️ Audit Core v1.1
Sextant Orbital Resilience Framework

Purpose:
Deterministic audit record generator.

Now records:

- Orbital event
- Decision
- Recovery
- Failsafe transition
- Validation authority

Simulation-only audit module.
*/


// =================================
// AUDIT CORE
// =================================

class AuditCoreV1 {


    constructor() {

        this.name =
            "AuditCoreV1";


        this.records = [];

    }



    // =============================
    // GENERATE AUDIT RECORD
    // =============================

    generate(
        result,
        validation,
        failsafe
    ) {


        if (!result) {


            return {

                error:
                "NO_RESULT_AVAILABLE"

            };

        }



        const record = {



            timestamp:

                new Date()
                .toISOString(),




            domain:

                result.domain
                ||
                "ORBITAL",




            event:

                result.scenario
                ||
                "UNKNOWN",




            engine:

                result.engine
                ||
                "UNKNOWN",




            severity:

                result.assessment

                ?

                result.assessment.severity

                :

                "UNKNOWN",




            decision:

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




            recovery:

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




            failsafe:


                {


                    state:

                    failsafe

                    ?

                    failsafe.currentState

                    :

                    "NONE",




                    transition:

                    failsafe

                    ?

                    failsafe.transition

                    :

                    "NONE"


                },




            validation:


                validation

                ?

                validation.re_test_validation.status

                :

                "NOT_AVAILABLE",




            authority:

                failsafe

                ?

                failsafe.goldenRuleAuthority

                :

                "GOLDEN_RULE_ENGINE",




            trace:

                "GENERATED"


        };



        this.records.push(
            record
        );



        return record;

    }





    // =============================
    // GET LAST RECORD
    // =============================

    getLatest() {


        if (
            this.records.length === 0
        ) {


            return {

                status:
                "NO_AUDIT_RECORD"

            };


        }



        return this.records[
            this.records.length - 1
        ];

    }





    // =============================
    // GET ALL RECORDS
    // =============================

    getHistory() {


        return this.records;


    }


}



// =================================
// GLOBAL INSTANCE
// =================================

const auditCore =
    new AuditCoreV1();



window.auditCore =
    auditCore;