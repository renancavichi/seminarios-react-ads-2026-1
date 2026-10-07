import React from "react";

export function Player({ x, y, size }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor: "#2563eb",
        borderRadius: 10,
        border: "3px solid #1e3a8a",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    />
  );
}

export function Coin({ x, y, size }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor: "#facc15",
        borderRadius: "50%",
        border: "3px solid #ca8a04",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    />
  );
}

export function OrangeCircle({ x, y, size }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor: "#d0aa12",
        borderRadius: "50%",
        border: "3px solid #c2410c",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    />
  );
}

export function Score({ value }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        padding: "8px 12px",
        backgroundColor: "#ffffff",
        border: "2px solid #111827",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      Pontos: {value}
    </div>
  );
}

export function StatusMessage({ visible, message }) {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: "24px 32px",
        backgroundColor: "#ffffff",
        border: "4px solid #991b1b",
        borderRadius: 12,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <h2
        style={{
          margin: "0 0 8px",
          color: "#991b1b",
          fontSize: 32,
        }}
      >
        Você perdeu!
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: 16,
          color: "#111827",
        }}
      >
        {message}
      </p>
    </div>
  );
}