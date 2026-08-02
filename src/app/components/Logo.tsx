import React from "react";

export default function Logo({ size = 24, showDot = true }: { size?: number; showDot?: boolean }) {
  // Height ratio calculation
  const height = size;
  const width = size * 3.6;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", opacity: 0.85 }}>
      {/* Oprath-Style Deconstructed Futuristic Wordmark SVG for "pulse" */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 280 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* Letter 'p' - Oprath style: smooth rounded bowl & sweeping tail */}
        <path
          d="M20 25 C20 15, 35 15, 45 25 C55 35, 45 55, 32 55 C20 55, 20 40, 20 25 Z M20 25 V70 C20 78, 12 80, 5 76"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'u' - Oprath style: smooth U-arch */}
        <path
          d="M65 25 V42 C65 54, 85 54, 85 42 V25"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'l' - Oprath style: sleek vertical stem */}
        <path
          d="M105 10 V55"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Letter 's' - Oprath style: S-curve */}
        <path
          d="M150 25 C135 25, 135 40, 150 40 C165 40, 165 55, 145 55"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'e' - Oprath style: deconstructed loop */}
        <path
          d="M180 40 H205 C205 25, 180 20, 180 38 C180 55, 205 55, 205 48"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Subtle Low-Key Live Pulse Dot */}
      {showDot && (
        <span
          className="live-dot"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#FFFFFF",
            opacity: 0.6,
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)",
            display: "inline-block"
          }}
        />
      )}
    </div>
  );
}
