from pydantic import BaseModel, Field
from typing import Optional, Dict, Any


class ScenarioRequest(BaseModel):
    scenario_id: Optional[str] = Field(default=None, max_length=128)
    incident_id: Optional[str] = Field(default=None, max_length=128)
    payload: Dict[str, Any] = Field(default_factory=dict)
    auth_token: str = Field(..., max_length=512)
