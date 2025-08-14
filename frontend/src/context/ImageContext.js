// src/context/ImageContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/images'); // Adjust backend URL if different
      setImages(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching images');
    } finally {
      setLoading(false);
    }
  };

  // Upload new image
  const uploadImage = async (file, caption) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);

      const res = await axios.post('http://localhost:4000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImages((prev) => [...prev, res.data.image]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading image');
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/images/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting image');
    }
  };

  // Update image caption
  const updateCaption = async (id, newCaption) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/images/${id}`, {
        caption: newCaption,
      });

      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, caption: res.data.image.caption } : img
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating caption');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ImageContext.Provider
      value={{
        images,
        loading,
        error,
        fetchImages,
        uploadImage,
        deleteImage,
        updateCaption,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
