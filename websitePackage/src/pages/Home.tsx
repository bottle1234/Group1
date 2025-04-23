import React from "react";
//import "./Contact.css";
import "../Home.css";
import banner from "../assets/banner.jpg"; // Adjust path to your image

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="light hero">
        <img src={banner} alt="Company Logo" className="hero-image" />
        <div className="heroInner">
          <span>
            <h1>Come Explore</h1>
            <a href="#" className="btn btn-light">
              See Listings
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
