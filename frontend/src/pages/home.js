import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Momentus 📸</h1>
      <p style={styles.subtitle}>
        Capture, upload, and cherish your memories.
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#555",
  },
};
