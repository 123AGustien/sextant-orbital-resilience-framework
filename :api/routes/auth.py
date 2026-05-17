from fastapi import APIRouter
from pydantic import BaseModel
from core.auth import create_api_key

router = APIRouter()


class UserRequest(BaseModel):
    user_id: str


@router.post("/create-key")
def create_key(req: UserRequest):
    api_key = create_api_key(req.user_id)

    return {
        "user_id": req.user_id,
        "api_key": api_key
    }
