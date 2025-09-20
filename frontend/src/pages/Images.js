// frontend/src/pages/Images.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Images() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editCaption, setEditCaption] = useState("");

  const navigate = useNavigate();

  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const token = localStorage.getItem("token");

  // Fetch all images
  const fetchImages = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("/api/images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch images");
      setImages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", caption);

    try {
      const res = await fetch("/api/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setImages([data.image, ...images]);
      setCaption("");
      setSelectedFile(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Start editing caption
  const startEdit = (id, currentCaption) => {
    setEditId(id);
    setEditCaption(currentCaption);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditCaption("");
  };

  // Submit caption update
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caption: editCaption }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setImages(
        images.map((img) => (img._id === id ? { ...img, caption: editCaption } : img))
      );
      cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome, {user?.name || "User"} 👋</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        style={{ margin: "20px 0", display: "flex", gap: "10px", flexWrap: "wrap" }}
      >
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept="image/*"
          required
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Images grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {images.map((img) => (
          <div key={img._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={img.url} alt={img.originalName} style={{ width: "100%" }} />

            {editId === img._id ? (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />
                <div style={{ marginTop: "5px" }}>
                  <button onClick={() => handleUpdate(img._id)}>Save</button>
                  <button onClick={cancelEdit} style={{ marginLeft: "5px" }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <p>{img.caption}</p>
                <button onClick={() => startEdit(img._id, img.caption)}>Edit</button>
                <button
                  onClick={() => handleDelete(img._id)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
