from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/bookings", tags=["bookings"])

# Output model
class Booking(BaseModel):
    id: int
    listing_id: int
    username: str

# Input model (without ID)
class BookingCreate(BaseModel):
    listing_id: int
    username: str

bookings_db: List[Booking] = []

@router.get("/", response_model=List[Booking])
def get_bookings():
    return bookings_db

@router.post("/", response_model=Booking)
def create_booking(booking: BookingCreate):
    new_id = max([b.id for b in bookings_db] or [0]) + 1
    new_booking = Booking(id=new_id, **booking.dict())
    bookings_db.append(new_booking)
    return new_booking

@router.delete("/{booking_id}")
def cancel_booking(booking_id: int):
    for booking in bookings_db:
        if booking.id == booking_id:
            bookings_db.remove(booking)
            return {"message": "Booking cancelled"}
    raise HTTPException(status_code=404, detail="Booking not found")
