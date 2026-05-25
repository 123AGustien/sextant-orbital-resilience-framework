"""
🛰️ Sextant Orbital Resilience Framework
Scenario Loader v1

Loads JSON scenarios from disk and validates structure.
"""

import json
from typing import Dict, Any


class ScenarioLoaderV1:
    def __init__(self, filepath: str):
        self.filepath = filepath

    def load(self) -> Dict[str, Any]:
        with open(self.filepath, "r") as f:
            data = json.load(f)

        return self._validate(data)

    def _validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        required = ["nodes", "expected_states"]

        for field in required:
            if field not in data:
                raise ValueError(f"Missing required field: {field}")

        return data
