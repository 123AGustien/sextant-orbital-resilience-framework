import json
from pathlib import Path


class IncidentLoader:
    """
    Loads single-file deterministic incident simulations
    for cascade engine execution.
    """

    BASE_PATH = Path("data/incidents")

    @staticmethod
    def load_incident(incident_id: str):

        file_path = IncidentLoader.BASE_PATH / f"{incident_id.lower()}.json"

        if not file_path.exists():
            raise FileNotFoundError(f"Incident not found: {file_path}")

        with open(file_path, "r") as f:
            return json.load(f)
