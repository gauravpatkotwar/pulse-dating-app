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
      {/* Floating Moonlight Hearts & Stealth Dollar ($) Dust */}
      {Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 9 + 4) % 100;
        const duration = 14 + (i % 6) * 4;
        const delay = (i * 1.8) % 12;
        const size = 14 + (i % 4) * 5;
        const isHeart = i % 2 === 0;

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
            {isHeart ? (
              // Heart SVG
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  fill="rgba(255, 255, 255, 0.4)"
                />
              </svg>
            ) : (
              // Dollar Sign ($) SVG
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path
                  d="M12 2V22M17 5H9.5C8.5 5 7.5 5.89 7.5 7C7.5 8.11 8.5 9 9.5 9H14.5C15.5 9 16.5 9.89 16.5 11C16.5 12.11 15.5 13 14.5 13H7M17 13H9.5C8.5 13 7.5 13.89 7.5 15C7.5 16.11 8.5 17 9.5 17H16.5C17.5 17 18.5 17.89 18.5 19C18.5 20.11 17.5 21 16.5 21H7"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.7) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-105vh) scale(1.2) rotate(25deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
