"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AvatarFemale, AvatarMale, VerifiedBadgeIcon, VideoIcon } from "./Icons";

interface GlobeUser {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male";
  city: string;
  lat: number; // latitude in deg (-90 to 90)
  lon: number; // longitude in deg (-180 to 180)
  sparksRate: number;
  status: "Live Stream" | "Available for Call";
}

const globalUsers: GlobeUser[] = [
  { id: "g1", name: "Priya K.", age: 24, gender: "Female", city: "Mumbai, India", lat: 19.076, lon: 72.8777, sparksRate: 50, status: "Available for Call" },
  { id: "g2", name: "Alex M.", age: 27, gender: "Male", city: "New York, USA", lat: 40.7128, lon: -74.006, sparksRate: 100, status: "Live Stream" },
  { id: "g3", name: "Sophia R.", age: 23, gender: "Female", city: "London, UK", lat: 51.5074, lon: -0.1278, sparksRate: 80, status: "Available for Call" },
  { id: "g4", name: "Kenji T.", age: 26, gender: "Male", city: "Tokyo, Japan", lat: 35.6762, lon: 139.6503, sparksRate: 60, status: "Live Stream" },
  { id: "g5", name: "Elena V.", age: 25, gender: "Female", city: "Paris, France", lat: 48.8566, lon: 2.3522, sparksRate: 90, status: "Available for Call" },
  { id: "g6", name: "Aarav S.", age: 28, gender: "Male", city: "Delhi, India", lat: 28.6139, lon: 77.209, sparksRate: 40, status: "Available for Call" },
  { id: "g7", name: "Zara H.", age: 22, gender: "Female", city: "Dubai, UAE", lat: 25.2048, lon: 55.2708, sparksRate: 120, status: "Live Stream" }
];

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<GlobeUser | null>(null);

  // Rotation angles in radians
  const rotXRef = useRef(0.2);
  const rotYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotYRef.current += 0.005;
      }

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw Globe Outer Stealth Atmosphere Aura
      const auraGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2);
      auraGradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Draw Globe Sphere Base Circle
      ctx.fillStyle = "rgba(14, 14, 14, 0.95)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Helper to project lat/lon to 3D Sphere (x, y, z)
      const project = (latDeg: number, lonDeg: number) => {
        const latRad = (latDeg * Math.PI) / 180;
        const lonRad = (lonDeg * Math.PI) / 180 + rotYRef.current;

        // 3D coordinates on sphere
        const x3d = radius * Math.cos(latRad) * Math.sin(lonRad);
        const y3d = -radius * Math.sin(latRad);
        const z3d = radius * Math.cos(latRad) * Math.cos(lonRad);

        // Apply pitch (rotX)
        const rx = rotXRef.current;
        const yRot = y3d * Math.cos(rx) - z3d * Math.sin(rx);
        const zRot = y3d * Math.sin(rx) + z3d * Math.cos(rx);

        return {
          screenX: centerX + x3d,
          screenY: centerY + yRot,
          z: zRot,
          isVisible: zRot > 0 // Front-facing hemisphere
        };
      };

      // Draw Latitude & Longitude Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      // Parallels (Latitude lines)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 10) {
          const pt = project(lat, lon);
          if (pt.isVisible) {
            if (first) { ctx.moveTo(pt.screenX, pt.screenY); first = false; }
            else { ctx.lineTo(pt.screenX, pt.screenY); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Meridians (Longitude lines)
      for (let lon = -180; lon < 180; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 10) {
          const pt = project(lat, lon);
          if (pt.isVisible) {
            if (first) { ctx.moveTo(pt.screenX, pt.screenY); first = false; }
            else { ctx.lineTo(pt.screenX, pt.screenY); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Render User Pins on the 3D Globe
      globalUsers.forEach((u) => {
        const pt = project(u.lat, u.lon);
        if (pt.isVisible) {
          // Draw Glowing Target Pulse Pin
          const isSelected = selectedUser?.id === u.id;

          // Outer Pulse Ring
          ctx.strokeStyle = isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = isSelected ? 2 : 1;
          ctx.beginPath();
          ctx.arc(pt.screenX, pt.screenY, isSelected ? 12 : 8, 0, Math.PI * 2);
          ctx.stroke();

          // Center Solid Core
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(pt.screenX, pt.screenY, isSelected ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Label Flag
          ctx.fillStyle = "rgba(10, 10, 10, 0.9)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.lineWidth = 1;
          const text = `${u.name} (${u.city.split(',')[0]})`;
          ctx.font = "11px sans-serif";
          const textWidth = ctx.measureText(text).width;

          const rectX = pt.screenX + 10;
          const rectY = pt.screenY - 14;
          ctx.fillRect(rectX, rectY, textWidth + 12, 20);
          ctx.strokeRect(rectX, rectY, textWidth + 12, 20);

          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(text, rectX + 6, rectY + 14);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedUser]);

  // Dragging Controls
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    const deltaY = e.clientY - lastMouseYRef.current;

    rotYRef.current += deltaX * 0.008;
    rotXRef.current = Math.max(-1.2, Math.min(1.2, rotXRef.current + deltaY * 0.008));

    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Canvas Click Detection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * 0.38;
    const centerX = width / 2;
    const centerY = height / 2;

    let found: GlobeUser | null = null;

    globalUsers.forEach((u) => {
      const latRad = (u.lat * Math.PI) / 180;
      const lonRad = (u.lon * Math.PI) / 180 + rotYRef.current;

      const x3d = radius * Math.cos(latRad) * Math.sin(lonRad);
      const y3d = -radius * Math.sin(latRad);
      const z3d = radius * Math.cos(latRad) * Math.cos(lonRad);

      const rx = rotXRef.current;
      const yRot = y3d * Math.cos(rx) - z3d * Math.sin(rx);
      const zRot = y3d * Math.sin(rx) + z3d * Math.cos(rx);

      if (zRot > 0) {
        const screenX = centerX + x3d;
        const screenY = centerY + yRot;
        const dist = Math.hypot(clickX - screenX, clickY - screenY);

        if (dist < 24) {
          found = u;
        }
      }
    });

    if (found) {
      setSelectedUser(found);
    }
  };

  const handleStartCall = (user: GlobeUser) => {
    const roomId = `globe-${user.id}-${Math.random().toString(36).substring(2, 6)}`;
    router.push(`/call/${roomId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ fontSize: "11px", fontWeight: 800, color: "#888888", letterSpacing: "0.12em", marginBottom: "8px", textAlign: "center" }}>
        🌍 INTERACTIVE 3D GLOBAL DISCOVERY RADAR (DRAG TO ROTATE 360°)
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: "560px", height: "460px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <canvas
          ref={canvasRef}
          width={560}
          height={460}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
          style={{ cursor: "grab", touchAction: "none" }}
        />

        {/* Selected User Floating Card Overlay */}
        {selectedUser && (
          <div 
            className="glass-panel glass-panel-vip animate-fade-in"
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90%",
              maxWidth: "380px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.95)",
              zIndex: 20
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedUser.gender === "Female" ? <AvatarFemale size={24} /> : <AvatarMale size={24} />}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px" }}>
                  {selectedUser.name}, {selectedUser.age}
                  <VerifiedBadgeIcon size={14} />
                </div>
                <div style={{ fontSize: "12px", color: "#888888" }}>
                  📍 {selectedUser.city}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStartCall(selectedUser)}
              className="btn-primary"
              style={{ padding: "8px 16px", fontSize: "12px", whiteSpace: "nowrap" }}
            >
              <VideoIcon size={14} color="#000" /> Call Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
