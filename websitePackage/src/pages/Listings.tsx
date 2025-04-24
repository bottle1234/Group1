import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Listing {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export default function ListingsPage() {
  const listings: Listing[] = [
    {
      id: "1",
      title: "Cozy Cabin in the Woods",
      imageUrl: "/images/cabin.jpg",
      price: 120
    },
    {
      id: "2",
      title: "Modern Downtown Loft",
      imageUrl: "/images/loft.jpg",
      price: 200
    },
    {
      id: "3",
      title: "Beachside Bungalow",
      imageUrl: "/images/bungalow.jpg",
      price: 150
    }
  ];
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map(l => (
        <Link key={l.id} to={`/listings/${l.id}`} className="border p-2">
          <img src={l.imageUrl} alt={l.title} className="w-full h-32 object-cover" />
          <h3 className="mt-2 font-semibold">{l.title}</h3>
          <p>${l.price}</p>
        </Link>
      ))}
    </div>
  );
}


