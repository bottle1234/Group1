import { useState } from "react";
import { signup } from "../api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(username, password);
      alert("Signup successful");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
}
