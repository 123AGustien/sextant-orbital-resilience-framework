# Sextant Orbital Resilience Framework
# Entry Point

from handover_logic.trigger_layer import TriggerLayer


def run_simulation():
    """
    Main system entry point
    """
    trigger = TriggerLayer()
    return trigger.run_default_scenarios()


if __name__ == "__main__":
    run_simulation()
