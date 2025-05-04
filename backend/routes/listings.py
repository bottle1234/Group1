from fastapi import APIRouter, HTTPException
from backend.models import Listing
from backend.database import listings_db

router = APIRouter()

@router.get("/")
def read_listings():
    return listings_db

@router.post("/")
def add_listing(listing: Listing):
    listings_db.append(listing)
    return {"message": "Listing added"}

@router.delete("/{listing_id}")
def remove_listing(listing_id: int):
    for i, listing in enumerate(listings_db):
        if listing.id == listing_id:
            listings_db.pop(i)
            return {"message": "Listing deleted"}
    raise HTTPException(status_code=404, detail="Listing not found")