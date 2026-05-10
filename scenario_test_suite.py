name: Sextant Orbital Full Validation Suite

on:
  workflow_dispatch:
  push:
  pull_request:

jobs:
  validation:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.10"

      - name: Set PYTHONPATH
        run: echo "PYTHONPATH=$GITHUB_WORKSPACE" >> $GITHUB_ENV

      - name: Upgrade pip
        run: python -m pip install --upgrade pip

      # 🧪 1. Scenario regression tests
      - name: Run Scenario Test Suite
        run: python scenario_test_suite.py

      # 🧠 2. Predictive intelligence check
      - name: Run Predictive Risk Engine
        run: |
          python -c "
from mission_simulation_runtime import MissionSimulationRuntime
from predictive_intelligence_layer import PredictiveIntelligenceLayer

runtime = MissionSimulationRuntime()
runtime.build_sample_constellation()

predictor = PredictiveIntelligenceLayer(runtime.system, runtime.cascade)

print('\n🧠 TOP RISK NODES')
print(predictor.predict_next_failure_candidates())

print('\n📊 RISK REPORT')
print(predictor.generate_risk_report())
"
