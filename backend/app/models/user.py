from typing_extensions import Annotated
from pydantic import BaseModel, EmailStr
from pydantic.types import StringConstraints

class UserCreate(BaseModel):
    email: EmailStr
    password: Annotated[
        str,
        StringConstraints(min_length=8)
    ]

class UserLogin(BaseModel):
    email: EmailStr
    password: str
