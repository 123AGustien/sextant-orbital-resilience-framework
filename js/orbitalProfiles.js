/*
🛰️ Orbital Failure Profiles v1
Sextant Orbital Resilience Framework

Purpose:
Deterministic orbital scenario rule definitions.

Architecture:

Scenario Input
        ↓
Failure Profile Evaluation
        ↓
Severity Assessment
        ↓
System Effects
        ↓
Recovery Recommendation
        ↓
Golden Rule Engine Interface

Simulation-only rule authority.
*/


const ORBITAL_FAILURE_PROFILES = {


    // =================================
    // SIGNAL LOSS
    // =================================

    SIGNAL_LOSS: {

        id: "ORBITAL_SIGNAL_LOSS",

        severity: "HIGH",

        category: "COMMUNICATION_FAILURE",

        effects: [

            "telemetry_disruption",

            "navigation_instability",

            "relay_communication_loss"

        ],

        risk_factors: [

            "loss_of_ground_contact",

            "delayed_command_execution",

            "reduced_operational_visibility"

        ],

        recommended_action:
            "SWITCH_TO_BACKUP_SATELLITE",

        recovery_mode:
            "COMMUNICATION_RESTORATION",

        requires_recovery: true

    },


    // =================================
    // ORBITAL DRIFT
    // =================================

    ORBITAL_DRIFT: {

        id: "ORBITAL_DRIFT_EVENT",

        severity: "MEDIUM",

        category: "TRAJECTORY_DEVIATION",

        effects: [

            "trajectory_deviation",

            "orbital_position_variance",

            "navigation_alignment_error"

        ],

        risk_factors: [

            "fuel_consumption_increase",

            "mission_window_shift",

            "position_accuracy_reduction"

        ],

        recommended_action:
            "INITIATE_TRAJECTORY_CORRECTION",

        recovery_mode:
            "ORBITAL_STABILIZATION",

        requires_recovery: true

    },


    // =================================
    // TELEMETRY CORRUPTION
    // =================================

    TELEMETRY_CORRUPTION: {

        id: "ORBITAL_TELEMETRY_CORRUPTION",

        severity: "MEDIUM",

        category: "DATA_INTEGRITY_FAILURE",

        effects: [

            "sensor_data_corruption",

            "signal_noise_increase",

            "reduced_system_visibility"

        ],

        risk_factors: [

            "incorrect_state_assessment",

            "delayed_decision_quality",

            "data_validation_failure"

        ],

        recommended_action:
            "ENABLE_LOW_BAND_TELEMETRY",

        recovery_mode:
            "DATA_RECOVERY_PROTOCOL",

        requires_recovery: true

    },


    // =================================
    // POWER FAILURE
    // =================================

    POWER_FAILURE: {

        id: "ORBITAL_POWER_FAILURE",

        severity: "CRITICAL",

        category: "ENERGY_SYSTEM_FAILURE",

        effects: [

            "spacecraft_power_loss",

            "communication_shutdown",

            "navigation_system_failure"

        ],

        risk_factors: [

            "mission_interruption",

            "thermal_control_failure",

            "critical_system_loss"

        ],

        recommended_action:
            "ACTIVATE_POWER_RECOVERY_MODE",

        recovery_mode:
            "EMERGENCY_POWER_RESTORATION",

        requires_recovery: true

    },


    // =================================
    // INERTIAL DESYNCHRONIZATION
    // =================================

    INERTIAL_DESYNCHRONIZATION: {

        id: "ORBITAL_INERTIAL_FAILURE",

        severity: "HIGH",

        category: "GUIDANCE_FAILURE",

        effects: [

            "guidance_instability",

            "orientation_uncertainty",

            "attitude_control_degradation"

        ],

        risk_factors: [

            "incorrect_vehicle_orientation",

            "navigation_error_growth",

            "control_system_stress"

        ],

        recommended_action:
            "RECALIBRATE_INERTIAL_GUIDANCE",

        recovery_mode:
            "GUIDANCE_REINITIALIZATION",

        requires_recovery: true

    }


};


// =================================
// VALIDATION
// =================================

function validateOrbitalScenario(scenario) {

    return Object.prototype.hasOwnProperty.call(
        ORBITAL_FAILURE_PROFILES,
        scenario
    );

}


// =================================
// EXPORT FOR SIMULATOR
// =================================

window.ORBITAL_FAILURE_PROFILES =
    ORBITAL_FAILURE_PROFILES;

window.validateOrbitalScenario =
    validateOrbitalScenario;