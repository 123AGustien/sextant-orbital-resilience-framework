import json
from datetime import datetime

class ReportGenerator:
    """
    Converts simulation output into structured research-grade reports.
    Produces JSON + PDF-ready structure.
    """

    def generate(self, event_log, metrics=None, interpretation=None):
        timestamp = datetime.utcnow().isoformat()

        report = {
            "report_metadata": {
                "generated_at": timestamp,
                "framework": "Sextant Orbital Resilience Framework",
                "version": "1.1"
            },
            "event_summary": {
                "total_events": len(event_log),
                "event_log": event_log
            },
            "resilience_metrics": metrics or {},
            "ai_interpretation": interpretation or {}
        }

        return report

    def save_json(self, report, filepath="resilience_report.json"):
        with open(filepath, "w") as f:
            json.dump(report, f, indent=2)

        return filepath
