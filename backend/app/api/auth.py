from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix = "/auth", tags = ["auth"])

# In-memory "database" for users
users_db = {}

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(user: UserCreate):
    # Check if the username is already taken
    if user.username in users_db:
        raise HTTPException(status_code = 400, detail = "Username already taken")
    #Create new user entry
    users_db[user.username] = {"email": user.email, "password": user.password}
    # Return baisic info (excluding password)
    return {"username": user.username, "email": user.email}

@router.post("/login")
def login(credentials: UserLogin):
    #Verify user exists and password matches
    user = users_db.get(credentials.username)
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code = 401, detail = "Invalid username or password")
    return {"message": "Login successful", "username": credentials.username}