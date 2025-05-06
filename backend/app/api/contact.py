from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def contact_info():
    return {
        "email": "support@staybnb.com",
        "phone": "123-456-7890",
        "address": "123 Main St"
    }
