# Sextant Orbital Resilience Framework
# Entry Point: Simulation Engine

from trigger_layer import TriggerLayer


def run_simulation():
    """
    Main system entry point for running resilience simulations.
    Initializes trigger layer and executes default scenarios.
    """
    trigger = TriggerLayer()
    return trigger.run_default_scenarios()


if __name__ == "__main__":
    run_simulation()
