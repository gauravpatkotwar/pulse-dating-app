import React from "react";

export default function Logo({ size = 32, showDot = true }: { size?: number; showDot?: boolean }) {
  // Height ratio calculation
  const height = size;
  const width = size * 3.6;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
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

        {/* Letter 's' - Oprath style: fluid futuristic curve */}
        <path
          d="M145 28 C145 20, 125 20, 125 32 C125 44, 145 40, 145 50 C145 60, 125 58, 125 50"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'e' - Oprath style: circular bowl & open arch */}
        <path
          d="M185 40 H160 C160 25, 185 22, 185 34 C185 46, 160 56, 185 52"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stealth White Dot */}
        {showDot && (
          <circle cx="205" cy="52" r="5" fill="#FFFFFF" />
        )}
      </svg>
    </div>
  );
}
