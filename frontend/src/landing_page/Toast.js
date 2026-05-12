import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#4caf50" : "#f44336";

  return (
    <div style={{
      position: "fixed",
      top: "80px",
      right: "20px",
      backgroundColor: bgColor,
      color: "white",
      padding: "14px 24px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 9999,
      fontSize: "14px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      minWidth: "250px",
      animation: "slideIn 0.3s ease"
    }}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >✕</button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;