// frontend/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        // Save JWT token separately
        localStorage.setItem("token", data.token);

        // Save user info
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );

        console.log("JWT Token Saved to local storage");
        navigate("/images");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
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

        <button type="submit" style={{ padding: "10px" }}>
          Log In
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
