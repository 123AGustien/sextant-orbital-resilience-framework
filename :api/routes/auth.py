from fastapi import APIRouter
from pydantic import BaseModel
import uuid

router = APIRouter()

API_KEYS = {}

class SignupRequest(BaseModel):
    email: str


def generate_key():
    return str(uuid.uuid4())


@router.post("/create-key")
def create_api_key(req: SignupRequest):

    api_key = generate_key()

    API_KEYS[api_key] = {
        "email": req.email,
        "usage": 0
    }

    return {
        "api_key": api_key,
        "email": req.email
    }
