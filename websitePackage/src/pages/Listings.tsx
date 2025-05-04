import { useEffect, useState } from "react";
import { getListings, deleteListing } from "../api";

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getListings().then(setListings).catch(() => setError("Failed to load listings"));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteListing(id);
    setListings(listings.filter(l => l.id !== id));
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {listings.map(l => (
        <div key={l.id}>
          <h3>{l.title}</h3>
          <p>{l.description}</p>
          <p>${l.price}</p>
          <button onClick={() => handleDelete(l.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}