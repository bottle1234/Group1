import { NavLink } from "react-router-dom";
import logo from "../assets/StayBnb.png"; // Adjust path to your logo
import "../navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/">
            <img src={logo} alt="Company Logo" className="banner-image" />
          </NavLink>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/paymentPage"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              paymentPage
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
