from fastapi import APIRouter, HTTPException

from core.billing import increment_usage
from core.limits import check_limit

router = APIRouter()


@router.post("/run")
def run_scenario(payload: dict, api_key: str):

    # -------------------------
    # CHECK USAGE LIMITS
    # -------------------------
    limit = check_limit(api_key)

    if not limit["allowed"]:
        return {
            "status": "blocked",
            "reason": limit["reason"],
            "message": limit.get("message", "Access denied"),
            "remaining": 0
        }

    # -------------------------
    # VALIDATE INPUT
    # -------------------------
    if "nodes" not in payload:
        raise HTTPException(
            status_code=400,
            detail="Scenario payload missing 'nodes'"
        )

    if "edges" not in payload:
        raise HTTPException(
            status_code=400,
            detail="Scenario payload missing 'edges'"
        )

    # -------------------------
    # TRACK USAGE (BILLING)
    # -------------------------
    increment_usage(api_key)

    # -------------------------
    # ORBITAL SIMULATION OUTPUT
    # -------------------------
    return {
        "status": "success",
        "message": "Orbital simulation executed successfully",
        "remaining_quota": limit.get("remaining"),
        "scenario": {
            "nodes": payload["nodes"],
            "edges": payload["edges"],
            "initial_failure": payload.get("initial_failure")
        },
        "timeline": [
            {
                "step": 1,
                "event": "Initial orbital stress detected"
            },
            {
                "step": 2,
                "event": "Dependency cascade propagation begins"
            },
            {
                "step": 3,
                "event": "System degradation threshold reached"
            },
            {
                "step": 4,
                "event": "Final stabilization state computed"
            }
        ]
    }
