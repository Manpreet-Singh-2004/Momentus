import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // <-- import the CSS

function Home() {
  return (
    <div className="home-page">
      <h1>Momentus</h1>
      <p>Capture your best moments. Sign up to get started!</p>

      <div className="button-group">
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="login-btn">Log In</button>
        </Link>
        <Link to="/aboutus">
          <button className="about-btn">About Us</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
