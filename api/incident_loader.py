import json
from pathlib import Path


class IncidentLoader:
    """
    Loads deterministic incident simulation packages
    for execution inside the cascade engine.
    """

    BASE_PATH = Path("data/incidents")

    @staticmethod
    def load_incident(incident_id: str):
        incident_path = IncidentLoader.BASE_PATH / incident_id

        if not incident_path.exists():
            raise FileNotFoundError(f"Incident not found: {incident_id}")

        return {
            "exposure_model": IncidentLoader._load_json(incident_path / "exposure_model.json"),
            "timeline": IncidentLoader._load_json(incident_path / "incident_timeline.json"),
            "recovery": IncidentLoader._load_json(incident_path / "recovery_actions.json"),
            "report": IncidentLoader._load_md(incident_path / "incident_report.md"),
        }

    @staticmethod
    def _load_json(path: Path):
        if not path.exists():
            return None
        with open(path, "r") as f:
            return json.load(f)

    @staticmethod
    def _load_md(path: Path):
        if not path.exists():
            return None
        return path.read_text()
