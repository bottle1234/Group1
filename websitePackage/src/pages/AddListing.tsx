import { useState } from "react";
import { addListing } from "../api";

export default function AddListing() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addListing({ id, title, description, price });
    alert("Listing added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} placeholder="ID" />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
      <button type="submit">Add Listing</button>
    </form>
  );
}