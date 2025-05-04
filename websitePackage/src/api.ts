export const API_URL = "http://localhost:8000";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function signup(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function getListings() {
  const res = await fetch(`${API_URL}/listings`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export async function addListing(data: { id: number; title: string; description: string; price: number; }) {
  const res = await fetch(`${API_URL}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add listing");
  return res.json();
}

export async function deleteListing(id: number) {
  const res = await fetch(`${API_URL}/listings/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete listing");
  return res.json();
}