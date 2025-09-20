// frontend/src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go Back Home</button>

      <style>{`
        .notfound-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f5f5, #e0f7fa);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
          padding: 20px;
        }

        .notfound-page h1 {
          font-size: 8rem;
          margin: 0;
          color: #4d79ff;
        }

        .notfound-page h2 {
          font-size: 2rem;
          margin: 10px 0;
          color: #2196F3;
        }

        .notfound-page p {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 20px;
        }

        .notfound-page button {
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          background-color: #4d79ff;
          color: white;
          cursor: pointer;
          transition: 0.2s;
        }

        .notfound-page button:hover {
          background-color: #1a4dff;
        }
      `}</style>
    </div>
  );
}

export default NotFound;
