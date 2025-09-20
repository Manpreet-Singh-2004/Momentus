import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Images.css"; // <-- import the CSS

function Images() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [modalImage, setModalImage] = useState(null);

  const navigate = useNavigate();
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const token = localStorage.getItem("token");

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setError("Please select an image");

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

  const startEdit = (id, currentCaption) => {
    setEditId(id);
    setEditCaption(currentCaption);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditCaption("");
  };

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
        images.map((img) =>
          img._id === id ? { ...img, caption: editCaption } : img
        )
      );
      cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="images-page">
      <div className="images-header">
        <h2>Welcome, {user?.name || "User"} 👋</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Upload form */}
      <form onSubmit={handleUpload} className="upload-form">
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

      {/* Images Grid */}
      <div className="images-grid">
        {images.map((img) => (
          <div className="image-card" key={img._id}>
            <img
              src={img.url}
              alt={img.originalName}
              onClick={() => setModalImage(img.url)}
            />

            {editId === img._id ? (
              <div>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />
                <div style={{ marginTop: "5px" }}>
                  <button className="save-btn" onClick={() => handleUpdate(img._id)}>Save</button>
                  <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p>{img.caption}</p>
                <button className="edit-btn" onClick={() => startEdit(img._id, img.caption)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(img._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Enlarged" />
        </div>
      )}
    </div>
  );
}

export default Images;
