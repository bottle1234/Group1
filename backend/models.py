from pydantic import BaseModel

class Listing(BaseModel):
    id: int
    title: str
    description: str
    price: float

class User(BaseModel):
    username: str
    password: str
