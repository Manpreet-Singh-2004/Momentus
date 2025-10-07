// frontend/src/pages/About.js
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">
      <div className="about-page">
        <h2>About Us</h2>
        <p>
          This project was built to deepen understanding of Multer and the MERN
          stack, featuring custom authentication and robust image handling
          functionality.
        </p>

        <div className="about-footer">
          <p>Made with ❤️ by Manpreet!</p>
          <p>
            <a
              href="https://www.linkedin.com/in/manpreetsingh18-ufv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/Manpreet-Singh-2004"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
          <Link to="/">
            <button className="back-btn">← Back to Home</button>
          </Link>
        </div>
      </div>

      <style>{`
        /* This container helps center the glass card vertically and 
          would hold the animated background for full consistency.
        */
        .about-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          
          /* For full consistency, apply the same animated background as Home.css here */
          background: linear-gradient(-45deg, #e0f7fa, #f5f5f5, #d4f8e8, #cde6ff);
          background-size: 400% 400%;
          animation: backgroundGradient 25s ease infinite;
        }

        @keyframes backgroundGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* The main card with a modern "glass" effect */
        .about-page {
          max-width: 700px;
          padding: 40px 50px;
          background: rgba(255, 255, 255, 0.4); /* Semi-transparent background */
          backdrop-filter: blur(15px); /* The blur effect */
          -webkit-backdrop-filter: blur(15px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 8px 32px 0 rgba(44, 62, 80, 0.2);
          text-align: center;
        }

        /* Animated gradient header, consistent with the Home page */
        .about-page h2 {
          font-size: 3rem;
          margin-bottom: 25px;
          background: linear-gradient(270deg, #4CAF50, #2196F3, #4CAF50);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .about-page p {
          font-size: 1.15rem;
          color: #333;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .about-footer {
          margin-top: 40px;
          font-size: 1rem;
          color: #555;
        }

        .about-footer a {
          color: #1976d2; /* Consistent blue from home page buttons */
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .about-footer a:hover {
          color: #4CAF50; /* Use the theme's green for hover */
          text-decoration: underline;
        }

        /* Button styled to match the Home page for perfect consistency */
        .back-btn {
          margin-top: 25px;
          padding: 12px 25px;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          background-color: #2196F3;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .back-btn:hover {
          background-color: #1976d2;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default About;