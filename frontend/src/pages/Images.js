// frontend/src/pages/Images.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Images() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must login first");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("/api/images", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch images");

        setImages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchImages();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome, {user?.name || "User"} 👋</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {images.map((img) => (
          <div
            key={img._id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img
              src={img.url}
              alt={img.originalName}
              style={{ width: "100%", height: "auto" }}
            />
            <p>{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
