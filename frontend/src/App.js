import React, { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/images"); // update port if different
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      const res = await fetch("http://localhost:4000/api/images", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setCaption("");
      setFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Momentus</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Display Images */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((img) => (
          <div
            key={img._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={`http://localhost:4000${img.url}`}
              alt={img.caption}
              style={{ width: "100%", height: "auto" }}
            />
            <p>{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
