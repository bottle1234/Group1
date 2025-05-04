from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import listings, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(listings.router, prefix="/listings")
app.include_router(auth.router, prefix="/auth")