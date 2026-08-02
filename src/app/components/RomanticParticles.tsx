"use client";

import React from "react";

export default function RomanticParticles() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
      opacity: 0.35
    }}>
      {/* Subtle Floating Moonlight Hearts & Light Dust */}
      {Array.from({ length: 8 }).map((_, i) => {
        const left = (i * 13 + 7) % 100;
        const duration = 15 + (i % 5) * 4;
        const delay = (i * 2) % 10;
        const size = 12 + (i % 3) * 6;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              animation: `floatUp ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              opacity: 0.4
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                fill="rgba(255, 255, 255, 0.4)"
              />
            </svg>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-105vh) scale(1.2) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
