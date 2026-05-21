import React, { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); // null = loading

  useEffect(() => {
    axios
      .get("https://trade-vision-a71w.onrender.com/auth/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      })
      .catch(() => setIsVerified(false));
  }, []);

  // loading state
  if (isVerified === null) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "16px"
      }}>
        <div style={{
          width: "40px", height: "40px",
          border: "4px solid #f0f0f0",
          borderTop: "4px solid #1a73e8",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ color: "#888", fontSize: "14px" }}>Verifying session...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // not authenticated
  if (!isVerified) {
    return (
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", height: "100vh",
        flexDirection: "column", gap: "16px",
        fontFamily: "sans-serif"
      }}>
        <div style={{ fontSize: "48px" }}>🔒</div>
        <h2 style={{ margin: 0, color: "#333" }}>Access Denied</h2>
        <p style={{ color: "#888", margin: 0 }}>
          You need to login to access the dashboard
        </p>
        <button
          onClick={() => window.location.href = "https://trade-vision-frontend-pied.vercel.app/login"}
          style={{
            marginTop: "8px",
            padding: "10px 28px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // authenticated — render the page
  return children;
};

export default ProtectedRoute;