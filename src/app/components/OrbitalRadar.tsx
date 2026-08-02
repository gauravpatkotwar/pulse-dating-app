"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface RadarNode {
  id: string;
  name: string;
  type: "stream" | "club" | "match";
  icon: string;
  badge: string;
  href: string;
  angle: number; // Position on orbit in degrees
}

const radarNodes: RadarNode[] = [
  { id: "r1", name: "Sophia's Live DJ Stream", type: "stream", icon: "🎸", badge: "🔴 1.4k Live", href: "/live/stream-1", angle: 0 },
  { id: "r2", name: "Delhi Tech VIP Club", type: "club", icon: "⚡", badge: "👑 500 Sparks", href: "/clubs", angle: 90 },
  { id: "r3", name: "Alex (Crypto AMA)", type: "stream", icon: "💻", badge: "🔴 890 Live", href: "/live/stream-2", angle: 180 },
  { id: "r4", name: "Mumbai Music Lounges", type: "club", icon: "🎧", badge: "👥 890 Members", href: "/clubs", angle: 270 }
];

export default function OrbitalRadar() {
  const router = useRouter();

  const handleStartCall = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    router.push(`/call/${newRoomId}`);
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "420px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "20px 0 40px 0"
    }}>
      {/* Outer Pulse Rings */}
      <div style={{
        position: "absolute",
        width: "380px",
        height: "380px",
        borderRadius: "50%",
        border: "1px dashed rgba(255, 255, 255, 0.15)",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.9)"
      }} />

      <div style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }} />

      {/* Orbiting Rotating Container */}
      <div style={{
        position: "absolute",
        width: "340px",
        height: "340px",
        borderRadius: "50%",
        animation: "orbitRotate 25s linear infinite"
      }}>
        {radarNodes.map((node) => {
          const radius = 170; // Radius of orbit
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={node.id}
              onClick={() => router.push(node.href)}
              style={{
                position: "absolute",
                top: `calc(50% + ${y}px - 26px)`,
                left: `calc(50% + ${x}px - 26px)`,
                animation: "counterRotate 25s linear infinite",
                cursor: "pointer"
              }}
            >
              <div 
                className="glass-panel"
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                  background: "rgba(16, 16, 16, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.9)",
                  transition: "transform 0.2s"
                }}
              >
                <span style={{ fontSize: "18px" }}>{node.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>{node.name}</div>
                  <div style={{ fontSize: "10px", color: "#888888" }}>{node.badge}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Core (Instant Video Call Launcher) */}
      <div
        onClick={handleStartCall}
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: "#FFFFFF",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 50px rgba(255, 255, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.9)",
          zIndex: 10,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          textAlign: "center",
          padding: "16px"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <span style={{ fontSize: "32px", marginBottom: "2px" }}>📸</span>
        <span style={{ fontSize: "11px", fontWeight: 900, color: "#000000", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Launch Call
        </span>
        <span style={{ fontSize: "9px", color: "#555555" }}>Click to Radar Match</span>
      </div>
    </div>
  );
}
