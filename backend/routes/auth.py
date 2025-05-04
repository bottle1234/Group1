from fastapi import APIRouter, HTTPException
from backend.models import User
from backend.database import users_db

router = APIRouter()

@router.post("/signup")
def register_user(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    users_db[user.username] = user.password
    return {"message": "User registered"}

@router.post("/login")
def authenticate_user(user: User):
    if users_db.get(user.username) != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}