from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    email: str = Field(..., min_length=3)
    name: str = Field(..., min_length=1, max_length=100)


class UserResponse(BaseModel):
    id: int
    email: str
    name: str