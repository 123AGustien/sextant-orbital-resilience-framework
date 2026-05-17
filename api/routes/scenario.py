from fastapi import APIRouter, HTTPException
from core.billing import increment_usage

router = APIRouter()


@router.post("/run")
def run_scenario(payload: dict, api_key: str):

    # Track API usage
    increment_usage(api_key)

    # Validate payload
    if "nodes" not in payload:
        raise HTTPException(
            status_code=400,
            detail="Scenario payload missing nodes"
        )

    if "edges" not in payload:
        raise HTTPException(
            status_code=400,
            detail="Scenario payload missing edges"
        )

    # Placeholder simulation response
    return {
        "status": "success",
        "message": "Orbital simulation executed",
        "scenario": payload,
        "timeline": [
            {
                "step": 1,
                "event": "Initial orbital degradation detected"
            },
            {
                "step": 2,
                "event": "Cascade propagation across dependent nodes"
            },
            {
                "step": 3,
                "event": "System instability threshold reached"
            }
        ]
    }
