from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, listings, bookings, contact

app = FastAPI()

# Enable CORS for all origins (so frontend can call the APIs)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials = True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Allows all headers
)

# Include API routers
app.include_router(auth.router)
app.include_router(listings.router)
app.include_router(bookings.router)
app.include_router(contact.router)

@app.get("/")
def read_root():
    return {"message": "StayBnb backend is up and running"}

# Run the application (if invoked directly)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host = "0.0.0.0", port = 5000)