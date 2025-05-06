from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/listings", tags=["listings"])

# Output model
class Listing(BaseModel):
    id: int
    title: str
    description: str
    price: float
    image: str
    rating: float = 0.0
    reviews: int = 0
    type: str | None = None
    beds: int | None = None
    baths: int | None = None

# Input model (without ID)
class ListingCreate(BaseModel):
    title: str
    description: str
    price: float
    image: str
    rating: float = 0.0
    reviews: int = 0
    type: str | None = None
    beds: int | None = None
    baths: int | None = None

listings_db: List[Listing] = []

@router.get("/", response_model=List[Listing])
def get_listings():
    return listings_db

@router.get("/{listing_id}", response_model=Listing)
def get_listing(listing_id: int):
    for listing in listings_db:
        if listing.id == listing_id:
            return listing
    raise HTTPException(status_code=404, detail="Listing not found")

@router.post("/", response_model=Listing)
def create_listing(listing: ListingCreate):
    new_id = max([item.id for item in listings_db] or [0]) + 1
    new_listing = Listing(id=new_id, **listing.dict())
    listings_db.append(new_listing)
    return new_listing
