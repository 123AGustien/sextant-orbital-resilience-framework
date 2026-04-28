# Sextant Orbital Resilience Framework
# Entry Point

import sys
import os

BASE_DIR = os.path.dirname(__file__)

# Core module paths
sys.path.append(os.path.join(BASE_DIR, "handover-logic"))
sys.path.append(os.path.join(BASE_DIR, "handover-logic", "simulation-core"))
sys.path.append(os.path.join(BASE_DIR, "handover-logic", "governance"))
sys.path.append(os.path.join(BASE_DIR, "handover-logic", "orchestrator"))

from trigger_layer import TriggerLayer


def run_simulation():
    """
    Main system entry point for running resilience simulations.
    """
    trigger = TriggerLayer()
    return trigger.run_default_scenarios()


if __name__ == "__main__":
    run_simulation()
