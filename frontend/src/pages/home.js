// client/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Momentus</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Capture your best moments. Sign up to get started!
      </p>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/signup">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              background: "#4CAF50",
              color: "white",
            }}
          >
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              background: "#2196F3",
              color: "white",
            }}
          >
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
