/*
🛰️ Manoeuvre Parameters Layer v1.0

Sextant Orbital Resilience Framework

Purpose:

Extended simulation parameter model
for Trial Manoeuvre Engine.

Simulation-only module.

This module does NOT provide:
- autonomous spacecraft control
- collision avoidance commands
- CPA avoidance recommendations
- real trajectory execution

Future enhancement layer for:
- course/heading change simulation
- correction magnitude modelling
- trajectory planning profiles
- energy/fuel impact estimation
- recovery option comparison

*/


// =================================
// MANOEUVRE PARAMETER PROFILES
// =================================


const MANOEUVRE_PARAMETERS = {


COMMUNICATION_RECOVERY_MANOEUVRE: {


courseChange: {


enabled: true,

type:
"SIMULATED_HEADING_ADJUSTMENT",

value:
0,

unit:
"degrees"

},


correctionMagnitude: {


level:
"LOW",

value:
10,

unit:
"simulation_scale"

},


trajectoryPlanning: {


profile:
"RECOVERY_PATH_OPTIMISATION",

planningMode:
"SIMULATION_ONLY",

status:
"READY"

},


energyImpact: {


fuelImpact:
"ESTIMATED",

consumption:
"LOW",

status:
"SIMULATION_MODEL"

},


recoveryOptions: [


"BACKUP_COMMUNICATION_PATH",


"ORBITAL_STABILITY_HOLD",


"GROUND_CONTACT_RESTORATION"


]


},





ORBITAL_STABILITY_MANOEUVRE: {


courseChange: {


enabled: true,

type:
"SIMULATED_ORIENTATION_ADJUSTMENT",

value:
0,

unit:
"degrees"

},


correctionMagnitude: {


level:
"MEDIUM",

value:
25,

unit:
"simulation_scale"

},


trajectoryPlanning: {


profile:
"STABILITY_REBALANCING",

planningMode:
"SIMULATION_ONLY",

status:
"READY"

},


energyImpact: {


fuelImpact:
"ESTIMATED",

consumption:
"MEDIUM",

status:
"SIMULATION_MODEL"

},


recoveryOptions: [


"STABILITY_MAINTENANCE",


"SECONDARY_SYSTEM_SUPPORT",


"CONTROLLED_RECOVERY"


]


}



};




// =================================
// PARAMETER ACCESS FUNCTION
// =================================


function getManoeuvreParameters(profile){


return (

MANOEUVRE_PARAMETERS[profile]

||

{

status:
"DEFAULT_PARAMETERS",

courseChange:
"NOT_DEFINED",

correctionMagnitude:
"NOT_DEFINED",

trajectoryPlanning:
"NOT_DEFINED",

energyImpact:
"NOT_DEFINED",

recoveryOptions:
[]

}

);


}





// =================================
// GLOBAL EXPORT
// =================================


window.MANOEUVRE_PARAMETERS =
MANOEUVRE_PARAMETERS;


window.getManoeuvreParameters =
getManoeuvreParameters;