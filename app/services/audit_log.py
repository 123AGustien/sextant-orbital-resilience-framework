import datetime


def log_event(event_type: str, user_id: str, metadata: dict = None):
    """
    Simple SaaS audit log (production-ready foundation)
    """

    entry = {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "event_type": event_type,
        "user_id": user_id,
        "metadata": metadata or {}
    }

    # For now we print (later: DB / Elastic / Loki)
    print("[AUDIT_LOG]", entry)

    return entry
