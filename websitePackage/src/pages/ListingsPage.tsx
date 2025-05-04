import { listings } from "./listingsData";
import React from "react";
import "../listings.css";
const ListingsPage = () => {
  return (
    <div className="listings-grid">
      {listings.map((listing) => (
        <div key={listing.id} className="listing-card">
          <img src={listing.image} alt={listing.title} />
          <div className="listing-details">
            <h3>{listing.title}</h3>
            <p>${listing.price} night</p>
            <div className="rating">
              <span>★ {listing.rating}</span>
              <span>({listing.reviews})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListingsPage;
