import React from "react";
//import "./Contact.css";
import Logo from "../assets/StayBnb.png";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <img src={Logo} alt="Logo" />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
