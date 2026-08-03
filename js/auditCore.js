/*
🛰️ Audit Core v1
Sextant Orbital Resilience Framework

Purpose:
Deterministic audit record generator.

Architecture:

Scenario Result
        ↓
Audit Core
        ↓
Event Record
        ↓
Decision Trace
        ↓
Recovery Trace
        ↓
Cockpit Audit Display

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

    generate(result) {


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
                || "ORBITAL",



            event:
                result.scenario
                || "UNKNOWN",



            engine:
                result.engine
                || "UNKNOWN",



            severity:
                result.assessment
                ?
                result.assessment.severity
                :
                "UNKNOWN",



            decision:
                result.decision
                ?
                result.decision.decision
                :
                "NONE",



            recovery:
                result.recovery
                ?
                result.recovery.action
                :
                "NONE",



            authority:
                result.decision
                ?
                result.decision.authority
                :
                "NONE",



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