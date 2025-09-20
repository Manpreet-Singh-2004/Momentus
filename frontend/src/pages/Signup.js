// frontend/src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        // Signup success → redirect to login
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ padding: "10px" }}>Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
