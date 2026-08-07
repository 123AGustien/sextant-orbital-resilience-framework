/*
============================================================
🛰️ Sextant Orbital Resilience Cockpit Controller v2.4

Purpose:
Integrated deterministic cockpit controller.

Connections:

- OrbitalEngineV1
- ManoeuvreEngineV1
- FailsafeEngineV1
- ValidationCoreV1
- OperatorGuidanceEngineV1
- MemoryCoreV1
- AuditCoreV1


Flow:

Scenario Selection
        ↓
OrbitalEngineV1
        ↓
Trial Manoeuvre Engine
        ↓
Failsafe Transition Engine
        ↓
Validation Core
        ↓
Operator Guidance Engine
        ↓
Memory Core
        ↓
Audit Core
        ↓
Captain AI Lena Display


Simulation-only controller.
============================================================
*/


// =================================
// SYSTEM INTEGRATION STATUS
// =================================

function updateIntegrationStatus(){


const statusDisplay =
document.getElementById("integration");


if(!statusDisplay){

return;

}


const status = {


OrbitalEngineV1:

typeof orbitalEngine !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



ManoeuvreEngineV1:

typeof manoeuvreEngine !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



FailsafeEngineV1:

typeof failsafeEngine !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



ValidationCoreV1:

typeof validationCore !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



OperatorGuidanceEngineV1:

window.OperatorGuidanceEngineV1
?
"CONNECTED"
:
"NOT_CONNECTED",



MemoryCoreV1:

typeof memoryCore !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



AuditCoreV1:

typeof auditCore !== "undefined"
?
"CONNECTED"
:
"NOT_CONNECTED",



GoldenRuleEngine:

"ACTIVE"


};



statusDisplay.innerText =

JSON.stringify(
status,
null,
2
);


}





// =================================
// RUN ORBITAL SCENARIO
// =================================

function runScenario(type){


updateIntegrationStatus();



if(
typeof orbitalEngine === "undefined"
){

console.error(
"OrbitalEngineV1 missing"
);

return;

}



const result =

orbitalEngine.runScenario(type);





// =================================
// TRIAL MANOEUVRE ENGINE
// =================================

let manoeuvre = {

status:
"NOT_CONNECTED"

};



if(
typeof manoeuvreEngine !== "undefined"
){

manoeuvre =

manoeuvreEngine.execute(
result
);

}





// =================================
// FAILSAFE ENGINE
// =================================

let failsafe = {

status:
"NOT_CONNECTED"

};



if(
typeof failsafeEngine !== "undefined"
){

failsafe =

failsafeEngine.evaluate(
result
);

}





// =================================
// VALIDATION CORE
// =================================

let validation = {

status:
"NOT_CONNECTED"

};



if(
typeof validationCore !== "undefined"
){

validation =

validationCore.validate(
result,
failsafe
);

}





// =================================
// MEMORY CORE
// =================================

let memory = null;


if(
typeof memoryCore !== "undefined"
){

memory =

memoryCore.update(
result,
failsafe
);

}





// =================================
// OPERATOR GUIDANCE ENGINE
// =================================

let operatorGuidance = {

status:
"NOT_CONNECTED"

};



const guidanceEngine =

window.OperatorGuidanceEngineV1 ||

(typeof OperatorGuidanceEngineV1 !== "undefined"
?
OperatorGuidanceEngineV1
:
null);




if(

guidanceEngine &&

typeof guidanceEngine.generateGuidance === "function"

){


operatorGuidance =

guidanceEngine.generateGuidance({



scenario:

result.scenario ||

"UNKNOWN",




severity:

result.assessment?.severity ||

"UNKNOWN",




currentState:

failsafe.currentState ||

failsafe.state ||

"STABILIZED",




recoveryAction:

result.recovery?.action ||

"NO_ACTION_REQUIRED",




decision:

result.decision?.decision ||

"NO_DECISION_AVAILABLE"



});


}





// =================================
// AUDIT CORE
// =================================

let audit = null;


if(
typeof auditCore !== "undefined"
){

audit =

auditCore.generate(
result,
validation,
failsafe
);

}





// =================================
// SAVE VALIDATION EVIDENCE
// =================================

window.lastOrbitalResult = result;

window.lastFailsafeResult = failsafe;

window.lastValidationResult = validation;

window.lastOperatorGuidance = operatorGuidance;
