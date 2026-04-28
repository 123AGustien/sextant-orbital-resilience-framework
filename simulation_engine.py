# Sextant Orbital Resilience Framework
# Entry Point

import sys
import os

# Add handover-logic folder to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "handover-logic"))

from trigger_layer import TriggerLayer


def run_simulation():
    """
    Main system entry point for running resilience simulations.
    """
    trigger = TriggerLayer()
    return trigger.run_default_scenarios()


if __name__ == "__main__":
    run_simulation()
