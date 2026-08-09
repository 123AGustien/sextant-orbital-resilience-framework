<!DOCTYPE html><html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sextant CTI Command-Centre V3</title><style>
:root {
    --bg: #071018;
    --panel: #0d1a24;
    --panel2: #102432;
    --line: #244354;
    --text: #e8f1f5;
    --muted: #91a9b5;
    --green: #36d399;
    --yellow: #f5c451;
    --red: #ef6b73;
    --blue: #58a6ff;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Arial, Helvetica, sans-serif;
}

header {
    padding: 20px;
    border-bottom: 1px solid var(--line);
    background: #09151e;
}

h1 {
    margin: 0;
    font-size: 25px;
}

h2 {
    margin-top: 0;
    font-size: 18px;
}

h3 {
    font-size: 15px;
}

.subtitle {
    margin-top: 6px;
    color: var(--muted);
    font-size: 14px;
}

.status-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
}

.status {
    padding: 8px 12px;
    border: 1px solid var(--line);
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
}

.online {
    color: var(--green);
}

.warning {
    color: var(--yellow);
}

.locked {
    color: var(--red);
}

main {
    padding: 18px;
    max-width: 1400px;
    margin: auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
}

.panel {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px;
}

.full {
    grid-column: 1 / -1;
}

.metric {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 9px 0;
    border-bottom: 1px solid #19313f;
}

.metric:last-child {
    border-bottom: none;
}

.label {
    color: var(--muted);
}

.value {
    font-weight: bold;
    text-align: right;
}

.pipeline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 7px;
}

.stage {
    padding: 9px 11px;
    border: 1px solid var(--line);
    border-radius: 5px;
    background: var(--panel2);
    font-size: 12px;
    font-weight: bold;
}

.stage.authority {
    border-color: var(--yellow);
}

.arrow {
    color: var(--blue);
}

.decision-box {
    border: 2px solid var(--yellow);
    padding: 18px;
    border-radius: 8px;
    background: #17170f;
}

.safety-box {
    border: 2px solid var(--green);
    padding: 15px;
    border-radius: 8px;
    background: #0b1714;
}

.warning-box {
    border: 2px solid var(--red);
    padding: 15px;
    border-radius: 8px;
    background: #170d10;
}

button {
    border: 1px solid var(--line);
    background: var(--panel2);
    color: var(--text);
    padding: 11px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin: 4px;
}

button:hover {
    border-color: var(--blue);
}

button.primary {
    border-color: var(--green);
}

button.danger {
    border-color: var(--red);
}

pre {
    white-space: pre-wrap;
    word-break: break-word;
    background: #050b10;
    padding: 13px;
    border-radius: 6px;
    border: 1px solid var(--line);
    overflow-x: auto;
    font-size: 12px;
}

.notice {
    color: var(--muted);
    line-height: 1.55;
}

.safety-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 10px;
}

.safety-item {
    background: var(--panel2);
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 12px;
}

.safety-item strong {
    display: block;
    font-size: 12px;
    margin-bottom: 6px;
}

.safety-item span {
    color: var(--green);
    font-weight: bold;
}

.audit-chain {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    color: var(--muted);
    font-size: 12px;
    font-weight: bold;
}

.audit-chain span {
    padding: 7px 9px;
    background: var(--panel2);
    border: 1px solid var(--line);
    border-radius: 5px;
}

.decision-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

footer {
    padding: 20px;
    margin-top: 20px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    text-align: center;
    font-size: 12px;
}
</style></head><body><header><h1>🛰️ SEXTANT CTI COMMAND-CENTRE V3</h1><div class="subtitle">
Command-Centre Resilience Core — Deterministic Simulation & Decision Support
</div><div class="status-bar"><div class="status online">
SYSTEM: ONLINE
</div><div class="status online">
SIMULATION: ACTIVE
</div><div class="status warning">
HUMAN DECISION: REQUIRED
</div><div class="status locked">
AUTOMATIC EXECUTION: FALSE
</div><div class="status locked">
LIVE SYSTEM CONTROL: NOT CONNECTED
</div></div></header><main><div class="grid"><!-- SYSTEM STATUS --><section class="panel"><h2>🧭 System Status</h2><div class="metric">
<span class="label">Framework</span>
<span class="value">Sextant Orbital Resilience v2.4</span>
</div><div class="metric">
<span class="label">Architecture</span>
<span class="value">Command-Centre Core v3</span>
</div><div class="metric">
<span class="label">Operating Mode</span>
<span class="value">SIMULATION_ONLY</span>
</div><div class="metric">
<span class="label">Live Control</span>
<span class="value">FALSE</span>
</div><div class="metric">
<span class="label">Human Authorization</span>
<span class="value">REQUIRED</span>
</div><div class="metric">
<span class="label">Golden Rule Authority</span>
<span id="goldenRuleStatus" class="value">ACTIVE</span>
</div></section><!-- CORE COMPONENTS --><section class="panel"><h2>⚙️ Core Components</h2><div class="metric">
<span class="label">CommandCentreCoreV3</span>
<span id="coreStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">Decision Support Engine</span>
<span id="decisionSupportStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">Cascade Resilience Index</span>
<span id="cascadeCoreStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">ValidationCoreV1</span>
<span id="validationCoreStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">MemoryCoreV1</span>
<span id="memoryCoreStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">AuditCoreV1</span>
<span id="auditCoreStatus" class="value">READY</span>
</div><div class="metric">
<span class="label">Failsafe Transition Engine</span>
<span id="failsafeCoreStatus" class="value">READY</span>
</div></section><!-- GOLDEN RULE ENGINE --><section class="panel full"><h2>⚖️ Golden Rule Decision Pipeline</h2><div class="pipeline"><span class="stage">OBSERVE</span>
<span class="arrow">→</span>

<span class="stage">VERIFY</span>
<span class="arrow">→</span>

<span class="stage">ASSESS</span>
<span class="arrow">→</span>

<span class="stage">DECIDE</span>
<span class="arrow">→</span>

<span class="stage authority">FINAL HUMAN DECISION</span>
<span class="arrow">→</span>

<span class="stage">ACT</span>
<span class="arrow">→</span>

<span class="stage">UPDATE</span>

</div><p class="notice">
The deterministic core may generate assessment and decision support.
The execution gate remains closed until the required human authority
decision is recorded. Simulation actions never constitute live control.
</p></section><!-- CURRENT ASSESSMENT --><section class="panel"><h2>🔎 Current Assessment</h2><div class="metric">
<span class="label">Scenario</span>
<span id="scenario" class="value">NO SCENARIO SELECTED</span>
</div><div class="metric">
<span class="label">Severity</span>
<span id="severity" class="value">UNASSESSED</span>
</div><div class="metric">
<span class="label">System State</span>
<span id="systemState" class="value">STABLE</span>
</div><div class="metric">
<span class="label">Cascade Status</span>
<span id="cascadeStatus" class="value">NOT ASSESSED</span>
</div><div class="metric">
<span class="label">Failsafe State</span>
<span id="failsafeState" class="value">STABILIZED</span>
</div><div class="metric">
<span class="label">Transition</span>
<span id="transitionState" class="value">NONE</span>
</div><div class="metric">
<span class="label">Recovery Readiness</span>
<span id="recoveryReadiness" class="value">NOT ASSESSED</span>
</div></section><!-- CAPTAIN AI LENA --><section class="panel"><h2>🧠 Captain AI Lena — Decision Support</h2><div class="decision-box"><div class="metric">
<span class="label">Recommendation</span>
<span id="recommendation" class="value">
AWAITING ASSESSMENT
</span>
</div><div class="metric">
<span class="label">Decision Authority</span>
<span class="value">
HUMAN DECISION AUTHORITY
</span>
</div><div class="metric">
<span class="label">Automatic Execution</span>
<span class="value">
FALSE
</span>
</div></div><p id="currentAssessment" class="notice">
Awaiting simulated system condition.
</p><p id="decisionRecommendation" class="notice">
No recommendation generated.
</p></section><!-- SCENARIO CONTROLS --><section class="panel full"><h2>🧪 CTI Simulation Scenario Controls</h2><p class="notice">
These controls submit deterministic simulated conditions to
CommandCentreCoreV3. They do not connect to or command live
operational systems.
</p><button onclick="runScenario('LOCAL_DISTURBANCE')">
LOCAL DISTURBANCE
</button><button onclick="runScenario('DEPENDENCY_FAILURE')">
DEPENDENCY FAILURE
</button><button onclick="runScenario('CASCADE_EVENT')">
CASCADE EVENT
</button><button onclick="runScenario('MULTI_NODE_FAILURE')">
MULTI-NODE FAILURE
</button><button onclick="runScenario('SYSTEMIC_STRESS')">
SYSTEMIC STRESS
</button><button onclick="runScenario('ORBITAL_DRIFT')">
ORBITAL DRIFT
</button><button onclick="runScenario('SIGNAL_LOSS')">
SIGNAL LOSS
</button><button onclick="runScenario('TELEMETRY_CORRUPTION')">
TELEMETRY CORRUPTION
</button><button onclick="runScenario('POWER_FAILURE')">
POWER FAILURE
</button><button onclick="runScenario('INERTIAL_DESYNCHRONIZATION')">
INERTIAL DESYNCHRONIZATION
</button></section><!-- VERIFICATION GATE --><section class="panel"><h2>🔐 Verification Gate</h2><div class="metric">
<span class="label">Event Validated</span>
<span id="eventValidated">PENDING</span>
</div><div class="metric">
<span class="label">Classification</span>
<span id="eventClassification">NONE</span>
</div><div class="metric">
<span class="label">Confidence</span>
<span id="eventConfidence">NONE</span>
</div><div class="metric">
<span class="label">Sensor Validation</span>
<span id="sensorValidation">PENDING</span>
</div><div class="metric">
<span class="label">Telemetry Verification</span>
<span id="telemetryVerification">PENDING</span>
</div></section><!-- CASCADE / FAILSAFE --><section class="panel"><h2>🛡️ Failsafe & Cascade Control</h2><div class="metric">
<span class="label">Previous State</span>
<span id="previousFailsafeState">NONE</span>
</div><div class="metric">
<span class="label">Current State</span>
<span id="currentFailsafeState">STABILIZED</span>
</div><div class="metric">
<span class="label">Isolation</span>
<span id="isolationStatus">NOT ACTIVATED</span>
</div><div class="metric">
<span class="label">Propagation</span>
<span id="propagationStatus">NOT ASSESSED</span>
</div><div class="metric">
<span class="label">Containment</span>
<span id="containmentStatus">NOT ASSESSED</span>
</div><div class="metric">
<span class="label">Secondary System</span>
<span id="secondarySystemStatus">STANDBY</span>
</div></section><!-- TRIAL MANOEUVRE --><section class="panel"><h2>🛰️ Trial Manoeuvre Simulation</h2><div class="metric">
<span class="label">Engine</span>
<span id="manoeuvreEngine">ManoeuvreEngineV1</span>
</div><div class="metric">
<span class="label">Profile</span>
<span id="manoeuvreProfile">NONE</span>
</div><div class="metric">
<span class="label">Objective</span>
<span id="manoeuvreObjective">NONE</span>
</div><div class="metric">
<span class="label">Verification</span>
<span id="manoeuvreVerification">PENDING</span>
</div><div class="metric">
<span class="label">Stability Verification</span>
<span id="manoeuvreStability">PENDING</span>
</div><div class="metric">
<span class="label">Recovery Assessment</span>
<span id="manoeuvreRecovery">NOT ASSESSED</span>
</div></section><!-- RECOVERY PATH --><section class="panel full"><h2>🔄 Recovery Pathway</h2><div class="pipeline"><span class="stage">DIAGNOSTIC ASSESSMENT</span>
<span class="arrow">→</span>

<span class="stage">CORRECTIVE PLANNING</span>
<span class="arrow">→</span>

<span class="stage">STATE VERIFICATION</span>
<span class="arrow">→</span>

<span class="stage">PRIMARY RESTORATION</span>
<span class="arrow">→</span>

<span class="stage">CERTIFIED STABLE</span>

</div><p class="notice">
Recovery pathway is displayed as a simulation pathway only.
No recovery action is executed automatically.
</p></section><!-- FINAL HUMAN DECISION --><section class="panel full"><h2>👤 Final Human Decision Authority</h2><p class="notice">
Captain AI Lena provides decision support only.
Final authority remains with the designated human operator
or mission authority.
</p><div class="decision-buttons"><button
class="primary"
onclick="humanDecision('AUTHORIZE_RECOVERY')">
AUTHORIZE RECOVERY
</button>

<button
onclick="humanDecision('MAINTAIN_SAFE_STATE')">
MAINTAIN SAFE STATE
</button>

<button
onclick="humanDecision('REQUEST_DIAGNOSTICS')">
REQUEST DIAGNOSTICS
</button>

<button
class="danger"
onclick="humanDecision('ABORT_RECOVERY')">
ABORT RECOVERY
</button>

<button
onclick="humanDecision('ESCALATE')">
ESCALATE TO MISSION AUTHORITY
</button>

</div><div class="decision-box"><h3>Human Decision</h3><p id="humanDecisionOutput">
WAITING FOR HUMAN DECISION
</p><div class="metric">
<span class="label">Authority</span>
<span id="decisionAuthority">MISSION CONTROLLER</span>
</div><div class="metric">
<span class="label">Decision Status</span>
<span id="decisionStatus">AWAITING AUTHORIZATION</span>
</div><div class="metric">
<span class="label">Decision Timestamp</span>
<span id="decisionTimestamp">NONE</span>
</div></div></section><!-- EXECUTION GATE --><section class="panel"><h2>🛡️ Execution Gate</h2><div class="metric">
<span class="label">Automatic Execution</span>
<span id="automaticExecution">FALSE</span>
</div><div class="metric">
<span class="label">Human Authorization Required</span>
<span id="humanAuthorization">REQUIRED</span>
</div><div class="metric">
<span class="label">Live System Control</span>
<span id="liveSystemControl">FALSE</span>
</div><div class="metric">
<span class="label">Simulation Only</span>
<span id="simulationOnly">TRUE</span>
</div><div class="metric">
<span class="label">Gate Authorized</span>
<span id="gateAuthorized">FALSE</span>
</div><div class="metric">
<span class="label">Gate Status</span>
<span id="gateStatus">HUMAN_AUTHORIZATION_PENDING</span>
</div><div class="metric">
<span class="label">Simulated Action</span>
<span id="simulatedAction">NONE</span>
</div></section><!-- SIMULATION OUTCOME --><section class="panel"><h2>🛰️ Simulated Outcome</h2><div class="metric">
<span class="label">Scenario</span>
<span id="outcomeScenario">NONE</span>
</div><div class="metric">
<span class="label">System State</span>
<span id="outcomeState">STANDBY</span>
</div><div class="metric">
<span class="label">Cascade Status</span>
<span id="outcomeCascade">NOT ASSESSED</span>
</div><div class="metric">
<span class="label">Failsafe State</span>
<span id="outcomeFailsafe">STABILIZED</span>
</div><div class="metric">
<span class="label">Recovery Status</span>
<span id="outcomeRecovery">NOT EXECUTED</span>
</div><div class="metric">
<span class="label">Final Status</span>
<span id="finalStatus">SAFE STATE</span>
</div></section><!-- MEMORY CORE --><section class="panel"><h2>🧠 MemoryCoreV1</h2><div class="metric">
<span class="label">Memory Status</span>
<span id="memoryStatus">READY</span>
</div><div class="metric">
<span class="label">Previous Scenario</span>
<span id="memoryScenario">NONE</span>
</div><div class="metric">
<span class="label">Previous Decision</span>
<span id="memoryDecision">NONE</span>
</div><div class="metric">
<span class="label">Previous State</span>
<span id="memoryState">NONE</span>
</div><div class="metric">
<span class="label">Execution Status</span>
<span id="memoryExecution">NONE</span>
</div><div class="metric">
<span class="label">Last Severity</span>
<span id="memorySeverity">NONE</span>
</div></section><!-- AUDIT CORE --><section class="panel full"><h2>🧾 AuditCoreV1</h2><div class="audit-chain"><span>EVENT</span>
→
<span>VERIFICATION</span>
→
<span>ASSESSMENT</span>
→
<span>DECISION</span>
→
<span>HUMAN DECISION</span>
→
<span>EXECUTION GATE</span>
→
<span>FINAL STATUS</span>

</div><pre id="auditRecord">Awaiting simulation event...</pre></section><!-- VALIDATION CORE --><section class="panel"><h2>🧪 ValidationCoreV1</h2><div class="metric">
<span class="label">Architecture Validation</span>
<span id="architectureValidation">READY</span>
</div><div class="metric">
<span class="label">Self Test</span>
<span id="selfTestValidation">PENDING</span>
</div><div class="metric">
<span class="label">Fault Identification</span>
<span id="faultValidation">PENDING</span>
</div><div class="metric">
<span class="label">Failsafe Validation</span>
<span id="failsafeValidation">PENDING</span>
</div><div class="metric">
<span class="label">Decision Core</span>
<span id="decisionValidation">PENDING</span>
</div><div class="metric">
<span class="label">Safety Boundary</span>
<span id="safetyValidation">PASS</span>
</div><div class="metric">
<span class="label">Human Decision Gate</span>
<span id="humanGateValidation">ACTIVE</span>
</div><div class="metric">
<span class="label">Simulation Boundary</span>
<span id="simulationValidation">ACTIVE</span>
</div><div class="metric">
<span class="label">Re-Test Validation</span>
<span id="retestValidation">PENDING</span>
</div><div class="metric">
<span class="label">Final Validation</span>
<span id="finalValidation">PENDING TEST</span>
</div></section><!-- RUNTIME STATE --><section class="panel"><h2>📡 Runtime State</h2><pre id="runtime">{
  "status": "READY",
  "mode": "SIMULATION_ONLY",
  "automaticExecution": false,
  "humanAuthorizationRequired": true,
  "liveSystemControl": false,
  "simulationOnly": true,
  "goldenRuleAuthority": "GOLDEN_RULE_ENGINE"
}</pre></section><!-- SAFETY BOUNDARY --><section class="panel full"><h2>🔒 Safety & Human Authority Boundary</h2><div class="safety-grid"><div class="safety-item">
<strong>AUTOMATIC EXECUTION</strong>
<span>FALSE</span>
</div><div class="safety-item">
<strong>HUMAN AUTHORIZATION</strong>
<span>REQUIRED</span>
</div><div class="safety-item">
<strong>SIMULATION ONLY</strong>
<span>TRUE</span>
</div><div class="safety-item">
<strong>LIVE SYSTEM CONTROL</strong>
<span>NOT CONNECTED</span>
</div><div class="safety-item">
<strong>EXECUTION GATE</strong>
<span>HUMAN CONTROLLED</span>
</div><div class="safety-item">
<strong>DECISION SUPPORT</strong>
<span>CAPTAIN AI LENA</span>
</div></div><p class="notice">
DATA ↓ OBSERVE ↓ VERIFY ↓ ASSESS ↓ DECIDE
↓ FINAL HUMAN DECISION ↓ EXECUTION GATE
↓ SIMULATED ACTION / SAFE STATE ↓ UPDATE
</p><p class="notice">
This Command-Centre supports human understanding, deterministic
simulation, verification, resilience assessment and accountability.
It does not remove human responsibility and does not directly
command or control live operational systems.
</p></section></div></main><footer>Sextant Orbital Resilience Framework v2.4<br>
Command-Centre Resilience Core v3<br>
Deterministic Simulation & Decision Support<br>
Golden Rule Engine — Human Decision Authority Required

</footer><!-- =========================================================
     CTI COMMAND-CENTRE CORE V3
     =========================================================

     PRESENTATION LAYER

     This HTML is intentionally separate from the main
     Sextant Orbital Resilience Cockpit index.html.

     Authoritative deterministic logic belongs in:

         commandCentreCoreV3.js

     Architecture:

     CTI UI
        ↓
     CommandCentreCoreV3
        ↓
     Deterministic Rule / Assessment Layer
        ↓
     Golden Rule Engine
        ↓
     FINAL HUMAN DECISION
        ↓
     Execution Gate
        ↓
     SIMULATED ACTION ONLY
        ↓
     MemoryCore / AuditCore / ValidationCore

     Safety boundary:

       automaticExecution = false
       humanAuthorizationRequired = true
       liveSystemControl = false
       simulationOnly = true

     IMPORTANT:

     A human decision may be recorded as AUTHORIZED while the
     execution gate remains FALSE when the selected decision
     is MAINTAIN_SAFE_STATE, REQUEST_DIAGNOSTICS, ABORT_RECOVERY
     or ESCALATE.

========================================================= --><script src="./commandCentreCoreV3.js"></script><script>

/*
============================================================
CTI COMMAND-CENTRE V3
UI BRIDGE
============================================================

This bridge contains presentation and state-adaptation logic only.

The deterministic core remains authoritative.

============================================================
*/


function runScenario(scenario) {

    if (
        typeof window.commandCentreRunScenario ===
        "function"
    ) {

        window.commandCentreRunScenario(scenario);

        return;
    }

    updateIntegrationStatus(
        "CORE NOT CONNECTED — SCENARIO NOT EXECUTED"
    );
}


function humanDecision(decision) {

    if (
        typeof window.commandCentreHumanDecision ===
        "function"
    ) {

        window.commandCentreHumanDecision(decision);

        return;
    }

    updateIntegrationStatus(
        "CORE NOT CONNECTED — HUMAN DECISION NOT EXECUTED"
    );
}


function updateIntegrationStatus(message) {

    const assessment =
        document.getElementById("currentAssessment");

    if (assessment) {

        assessment.textContent =
            message;
    }
}


/*
============================================================
SAFE VALUE RESOLVER
============================================================
*/

function firstDefined() {

    for (let i = 0; i < arguments.length; i++) {

        if (
            arguments[i] !== undefined &&
            arguments[i] !== null &&
            arguments[i] !== ""
        ) {

            return arguments[i];
        }
    }

    return "N/A";
}


/*
============================================================
CORE → UI ADAPTER
============================================================

The adapter accepts both simple CommandCentreCoreV3 state
objects and the richer nested evidence structure used by
the Orbital Resilience validation architecture.

============================================================
*/

window.updateCTIScreen = function(state) {

    if (!state) {
        return;
    }


    const setText =
        function(id, value) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    firstDefined(value, "N/A");
            }
        };


    const failsafe =
        state.failsafe ||
        state.failsafeTransition ||
        {};

    const verification =
        failsafe.verificationGate ||
        state.verificationGate ||
        {};

    const cascade =
        state.cascade ||
        failsafe.cascadeControl ||
        {};

    const manoeuvre =
        state.manoeuvre ||
        state.trialManoeuvre ||
        {};

    const validation =
        state.validation ||
        {};

    const selfTest =
        validation.self_test ||
        validation.selfTest ||
        {};

    const fault =
        validation.fault_identification ||
        validation.faultIdentification ||
        {};

    const human =
        state.humanDecision ||
        state.humanDecisionEvidence ||
        {};

    const humanRecord =
        human.humanDecision ||
        {};

    const executionGate =
        state.executionGate ||
        human.executionGate ||
        {};

    const memory =
        state.memory ||
        {};


    /*
    --------------------------------------------------------
    PRIMARY ASSESSMENT
    --------------------------------------------------------
    */

    setText(
        "scenario",
        state.scenario
    );

    setText(
        "severity",
        state.severity ||
        state.assessment?.severity
    );

    setText(
        "systemState",
        state.systemState ||
        failsafe.currentState
    );

    setText(
        "cascadeStatus",
        state.cascadeStatus ||
        cascade.propagation ||
        "NOT ASSESSED"
    );

    setText(
        "failsafeState",
        state.failsafeState ||
        failsafe.currentState
    );

    setText(
        "transitionState",
        state.transition ||
        failsafe.transition
    );

    setText(
        "recoveryReadiness",
        state.recoveryStatus ||
        manoeuvre.recoveryAssessment ||
        failsafe.recovery?.status
    );


    /*
    --------------------------------------------------------
    CAPTAIN AI LENA DECISION SUPPORT
    --------------------------------------------------------
    */

    setText(
        "recommendation",
        state.recommendation ||
        state.decision?.decision ||
        state.operatorGuidance?.decision
    );

    setText(
        "decisionRecommendation",
        state.recommendation ||
        state.decision?.decision ||
        state.operatorGuidance?.recommendedAction ||
        "No recommendation generated."
    );

    setText(
        "currentAssessment",
        state.assessment?.summary ||
        state.assessment ||
        state.operatorGuidance?.operatorGuidance?.priority ||
        "Assessment available from CTI core."
    );


    /*
    --------------------------------------------------------
    VERIFICATION GATE
    --------------------------------------------------------
    */

    setText(
        "eventValidated",
        verification.eventValidated
    );

    setText(
        "eventClassification",
        verification.classification ||
        state.scenario
    );

    setText(
        "eventConfidence",
        verification.confidence
    );

    setText(
        "sensorValidation",
        state.sensorValidation ||
        state.verification?.sensorValidation
    );

    setText(
        "telemetryVerification",
        state.telemetryVerification ||
        state.verification?.telemetryVerification
    );


    /*
    --------------------------------------------------------
    FAILSAFE / CASCADE
    --------------------------------------------------------
    */

    setText(
        "previousFailsafeState",
        failsafe.previousState
    );

    setText(
        "currentFailsafeState",
        failsafe.currentState
    );

    setText(
        "isolationStatus",
        failsafe.isolation?.activated
            ? "ACTIVATED"
            : "NOT ACTIVATED"
    );

    setText(
        "propagationStatus",
        cascade.propagation
    );

    setText(
        "containmentStatus",
        cascade.containment
    );

    setText(
        "secondarySystemStatus",
        failsafe.secondarySystem?.status
    );


    /*
    --------------------------------------------------------
    TRIAL MANOEUVRE
    --------------------------------------------------------
    */

    setText(
        "manoeuvreEngine",
        manoeuvre.engine
    );

    setText(
        "manoeuvreProfile",
        manoeuvre.profile
    );

    setText(
        "manoeuvreObjective",
        manoeuvre.objective
    );

    setText(
        "manoeuvreVerification",
        manoeuvre.verification
    );

    setText(
        "manoeuvreStability",
        manoeuvre.stabilityVerification
    );

    setText(
        "manoeuvreRecovery",
        manoeuvre.recoveryAssessment
    );


    /*
    --------------------------------------------------------
    HUMAN DECISION
    --------------------------------------------------------
    */

    setText(
        "humanDecisionOutput",
        humanRecord.decision ||
        human.decision ||
        state.humanDecision ||
        "WAITING FOR HUMAN DECISION"
    );

    setText(
        "decisionAuthority",
        humanRecord.authority ||
        human.authority ||
        "MISSION CONTROLLER"
    );

    setText(
        "decisionStatus",
        humanRecord.status ||
        human.status ||
        "AWAITING AUTHORIZATION"
    );

    setText(
        "decisionTimestamp",
        humanRecord.timestamp ||
        human.timestamp ||
        "NONE"
    );


    /*
    --------------------------------------------------------
    EXECUTION GATE
    --------------------------------------------------------
    */

    setText(
        "automaticExecution",
        state.automaticExecution === false
            ? "FALSE"
            : state.automaticExecution
    );

    setText(
        "humanAuthorization",
        state.humanAuthorizationRequired === true
            ? "REQUIRED"
            : state.humanAuthorizationRequired
    );

    setText(
        "liveSystemControl",
        state.liveSystemControl === false
            ? "FALSE"
            : state.liveSystemControl
    );

    setText(
        "simulationOnly",
        state.simulationOnly === true
            ? "TRUE"
            : state.simulationOnly
    );

    setText(
        "gateAuthorized",
        executionGate.authorized === true
            ? "TRUE"
            : "FALSE"
    );

    setText(
        "gateStatus",
        executionGate.status ||
        "HUMAN_AUTHORIZATION_PENDING"
    );

    setText(
        "simulatedAction",
        executionGate.action ||
        state.simulatedAction ||
        "NONE"
    );


    /*
    --------------------------------------------------------
    SIMULATED OUTCOME
    --------------------------------------------------------
    */

    setText(
        "outcomeScenario",
        state.scenario
    );

    setText(
        "outcomeState",
        state.systemState ||
        failsafe.currentState
    );

    setText(
        "outcomeCascade",
        state.cascadeStatus ||
        cascade.propagation
    );

    setText(
        "outcomeFailsafe",
        state.failsafeState ||
        failsafe.currentState
    );

    setText(
        "outcomeRecovery",
        state.recoveryStatus ||
        executionGate.action ||
        "NOT EXECUTED"
    );

    setText(
        "finalStatus",
        state.finalState ||
        executionGate.status ||
        "SAFE STATE"
    );


    /*
    --------------------------------------------------------
    MEMORY CORE
    --------------------------------------------------------
    */

    setText(
        "memoryStatus",
        state.memoryStatus ||
        "READY"
    );

    setText(
        "memoryScenario",
        memory.scenario ||
        memory.lastScenario ||
        state.scenario
    );

    setText(
        "memoryDecision",
        memory.decision ||
        memory.lastDecision ||
        humanRecord.decision
    );

    setText(
        "memoryState",
        memory.state ||
        memory.lastFailsafeState ||
        state.systemState
    );

    setText(
        "memoryExecution",
        memory.execution ||
        memory.executionStatus ||
        executionGate.status
    );

    setText(
        "memorySeverity",
        memory.severity ||
        memory.lastSeverity ||
        state.severity
    );


    /*
    --------------------------------------------------------
    VALIDATION CORE
    --------------------------------------------------------
    */

    setText(
        "architectureValidation",
        validation.architecture ||
        "READY"
    );

    setText(
        "selfTestValidation",
        selfTest.status ||
        "PENDING"
    );

    setText(
        "faultValidation",
        fault.status ||
        "PENDING"
    );

    setText(
        "failsafeValidation",
        validation.failsafe_validation?.status ||
        validation.failsafeValidation?.status ||
        "PENDING"
    );

    setText(
        "decisionValidation",
        validation.decision_core?.status ||
        validation.decisionCore?.status ||
        "PENDING"
    );

    setText(
        "safetyValidation",
        validation.safetyBoundary ||
        "PASS"
    );

    setText(
        "humanGateValidation",
        validation.humanDecisionGate ||
        "ACTIVE"
    );

    setText(
        "simulationValidation",
        validation.simulationBoundary ||
        "ACTIVE"
    );

    setText(
        "retestValidation",
        validation.re_test_validation?.status ||
        validation.reTestValidation?.status ||
        "PENDING"
    );

    setText(
        "finalValidation",
        validation.final_status ||
        validation.finalStatus ||
        "PENDING TEST"
    );


    /*
    --------------------------------------------------------
    CORE STATUS INDICATORS
    --------------------------------------------------------
    */

    setText(
        "goldenRuleStatus",
        state.goldenRuleAuthority ||
        validation.decision_core?.authority ||
        "ACTIVE"
    );

    setText(
        "failsafeCoreStatus",
        failsafe.status ||
        "READY"
    );


    /*
    --------------------------------------------------------
    AUDIT RECORD
    --------------------------------------------------------
    */

    if (state.audit) {

        const audit =
            document.getElementById("auditRecord");

        if (audit) {

            audit.textContent =
                JSON.stringify(
                    state.audit,
                    null,
                    2
                );
        }
    }


    /*
    --------------------------------------------------------
    RUNTIME STATE
    --------------------------------------------------------
    */

    const runtime =
        document.getElementById("runtime");

    if (runtime) {

        runtime.textContent =
            JSON.stringify(
                state,
                null,
                2
            );
    }
};


/*
============================================================
INITIAL UI STATE
============================================================
*/

window.updateCTIScreen({

    scenario: "NO SCENARIO SELECTED",

    severity: "UNASSESSED",

    systemState: "STABLE",

    cascadeStatus: "NOT ASSESSED",

    failsafeState: "STABILIZED",

    transition: "NONE",

    recoveryStatus: "NOT ASSESSED",

    recommendation: "AWAITING ASSESSMENT",

    assessment:
        "Awaiting simulated system condition.",

    automaticExecution: false,

    humanAuthorizationRequired: true,

    liveSystemControl: false,

    simulationOnly: true,

    goldenRuleAuthority:
        "GOLDEN_RULE_ENGINE",

    humanDecision: {

        status: "AWAITING AUTHORIZATION",

        authority: "MISSION CONTROLLER",

        decision: null

    },

    executionGate: {

        authorized: false,

        status:
            "HUMAN_AUTHORIZATION_PENDING",

        action:
            "NO_ACTION_EXECUTED"

    },

    memory: {

        scenario: "NONE",

        decision: "NONE",

        state: "NONE",

        execution: "NONE",

        severity: "NONE"

    },

    validation: {

        architecture: "READY",

        safetyBoundary: "PASS",

        humanDecisionGate: "ACTIVE",

        simulationBoundary: "ACTIVE",

        finalStatus: "PENDING TEST"

    }

});

</script></body>
</html>