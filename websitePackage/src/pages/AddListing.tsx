import React from "react";
import { Link } from "react-router-dom";

interface Listing {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
}

export default function ListingsPage() {
  const listings: Listing[] = [
    {
      id: "1",
      title: "Cozy Cabin in the Woods",
      imageUrl: "/images/cabin-woods.jpg",
      price: 120,
      description: "A quiet retreat with a wood-burning fireplace."
    },
    {
      id: "2",
      title: "Modern Downtown Loft",
      imageUrl: "/images/downtown-loft.jpg",
      price: 200,
      description: "1-bedroom loft in the heart of the city."
    },
    {
      id: "3",
      title: "Desert Retreat",
      imageUrl: "/images/desert-retreat.jpg",
      price: 150,
      description: "Open-air living under the wide desert sky."
    },
    {
      id: "4",
      title: "Tropical Villa",
      imageUrl: "/images/tropical-villa.jpg",
      price: 250,
      description: "Surrounded by palms and ocean breeze."
    },
    {
      id: "5",
      title: "Coastal Bungalow",
      imageUrl: "/images/coastal-bungalow.jpg",
      price: 180,
      description: "Steps from the beach with charming views."
    },
    {
      id: "6",
      title: "Treehouse Getaway",
      imageUrl: "/images/treehouse.jpg",
      price: 220,
      description: "Live among the treetops in this elevated cabin."
    },
    {
      id: "7",
      title: "Snowy Mountain Cottage",
      imageUrl: "/images/snowy-cottage.jpg",
      price: 160,
      description: "Charming retreat with winter wonderland vistas."
    },
    {
      id: "8",
      title: "Suburban Haven",
      imageUrl: "/images/suburban-haven.jpg",
      price: 140,
      description: "Bright, cozy home in a family-friendly neighborhood."
    },
    {
      id: "9",
      title: "Modern Ranch House",
      imageUrl: "/images/modern-ranch.jpg",
      price: 210,
      description: "Sleek single-story living with open floor plan."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200"
    >
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">
          {listing.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {listing.description?.slice(0, 80) || ""}
          {listing.description && listing.description.length > 80 ? "…" : ""}
        </p>
        <div className="text-lg font-bold">${listing.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
