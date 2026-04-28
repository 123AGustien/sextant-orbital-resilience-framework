# Sextant Orbital Resilience Framework
# Entry Point

import sys
import os

BASE_DIR = os.path.dirname(__file__)

# Core module paths
MODULE_PATHS = [
    "handover-logic",
    "handover-logic/simulation-core",
    "handover-logic/governance",
    "handover-logic/orchestrator",
]

for path in MODULE_PATHS:
    sys.path.append(os.path.join(BASE_DIR, path))

from trigger_layer import TriggerLayer


def run_simulation():
    """
    Main system entry point for running resilience simulations.

    NOTE:
    - This execution is intended for GitHub Actions / local testing
    - No email, external notification, or manual reporting is required
    - All outputs are displayed in GitHub Actions logs only
    """
    trigger = TriggerLayer()
    return trigger.run_default_scenarios()


if __name__ == "__main__":
    run_simulation()
