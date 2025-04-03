import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="navigation-bar">
        <ul>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
