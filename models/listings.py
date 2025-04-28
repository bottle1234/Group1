from flask import Blueprint, request, jsonify
from models.listings import Listing
from app import db

listings_bp = Blueprint("listings", __name__, url_prefix="/listings")

@listings_bp.route("/", methods=["GET"])
def show_listings():
    listings = Listing.query.all()
    return jsonify([l.serialize() for l in listings])

@listings_bp.route("/", methods=["POST"])
def add_listing():
    data = request.get_json()
    listing = Listing(
        title=data.get("title"),
        description=data.get("description"),
        price=data.get("price"),
        location=data.get("location")
    )
    db.session.add(listing)
    db.session.commit()
    return jsonify({"message": "Listing added", "id": listing.id}), 201

@listings_bp.route("/<int:listing_id>", methods=["PUT"])
def update_listing(listing_id):
    data = request.get_json()
    listing = Listing.query.get_or_404(listing_id)
    listing.title = data.get("title", listing.title)
    listing.description = data.get("description", listing.description)
    listing.price = data.get("price", listing.price)
    listing.location = data.get("location", listing.location)
    db.session.commit()
    return jsonify({"message": "Listing updated"})

@listings_bp.route("/<int:listing_id>", methods=["DELETE"])
def delete_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    db.session.delete(listing)
    db.session.commit()
    return jsonify({"message": "Listing deleted"})
