// frontend/src/pages/About.js
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <h2>About Us</h2>
      <p>This project was built to deepen understanding of Multer and the MERN stack, featuring custom authentication and robust image handling functionality</p>

      <div className="about-footer">
        <p>Made with ❤️ by Manpreet!</p>
        <p>
          <a href="https://www.linkedin.com/in/manpreetsingh18-ufv/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/Manpreet-Singh-2004" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <Link to="/">
          <button className="back-btn">← Back to Home</button>
        </Link>
      </div>

      <style>{`
        .about-page {
          padding: 40px;
          max-width: 800px;
          margin: 50px auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f5f5, #e0f7fa);
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          color: #1a237e;
          text-align: center;
        }

        .about-page h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #4d79ff;
        }

        .about-page p {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #333;
        }

        .about-footer {
          margin-top: 30px;
          font-size: 1rem;
          color: #555;
        }

        .about-footer a {
          color: #1a4dff;
          text-decoration: none;
          font-weight: bold;
          transition: 0.2s;
        }

        .about-footer a:hover {
          color: #4d79ff;
          text-decoration: underline;
        }
        .back-btn {
          margin-top: 20px;
          padding: 8px 16px;
          border: none;
          background-color: #4d79ff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
        }

        .back-btn:hover {
          background-color: #1a4dff;
        }

      `}</style>
    </div>
  );
}

export default About;
