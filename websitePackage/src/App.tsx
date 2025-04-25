import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import "./App.css";
import Navbar from "./pages/Navbar.js";
import ListingsPage from "./pages/Listings";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/listings" element={<ListingsPage />}></Route> 
      </Routes>
    </div>
  );
}

export default App;
