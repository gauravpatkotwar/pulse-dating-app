"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { AvatarFemale, AvatarMale, VerifiedBadgeIcon, VideoIcon, GiftCrownIcon, LockIcon } from "../components/Icons";

interface AdultRoom {
  id: string;
  title: string;
  host: string;
  age: number;
  gender: "Female" | "Male";
  viewers: number;
  sparksRequired: number;
  tags: string[];
}

const adultRooms: AdultRoom[] = [
  { id: "a1", title: "Midnight Whispers & Wine 🍷", host: "Elena V.", age: 25, gender: "Female", viewers: 184, sparksRequired: 50, tags: ["18+ Chill", "Late Night", "VIP"] },
  { id: "a2", title: "Private 1-on-1 Speed Dating 🔒", host: "Sophia R.", age: 24, gender: "Female", viewers: 92, sparksRequired: 100, tags: ["Speed Date", "Private"] },
  { id: "a3", title: "Deep Conversations & Cocktails 🍸", host: "Alex M.", age: 28, gender: "Male", viewers: 140, sparksRequired: 40, tags: ["Romance", "18+ Only"] },
  { id: "a4", title: "Exclusive After-Hours Club 🎉", host: "Priya K.", age: 24, gender: "Female", viewers: 310, sparksRequired: 150, tags: ["Party", "18+ VIP"] },
];

export default function AdultLoungePage() {
  const { profile } = useAppContext();
  const router = useRouter();
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);

  const handleEnterRoom = (room: AdultRoom) => {
    const roomId = `lounge-${room.id}`;
    router.push(`/call/${roomId}`);
  };

  return (
    <div style={{ minHeight: "80vh", padding: "12px 0" }}>
      {/* Age Verification Gate Modal */}
      {!isAgeVerified ? (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(5, 5, 5, 0.95)",
          backdropFilter: "blur(20px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px"
        }}>
          <div className="glass-panel glass-panel-vip animate-fade-in" style={{ maxWidth: "480px", textAlign: "center", padding: "36px 32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <LockIcon size={32} />
            </div>

            <div style={{ fontSize: "11px", fontWeight: 800, color: "#888888", letterSpacing: "0.14em", marginBottom: "8px" }}>
              RESTRICTED ACCESS
            </div>
            <h2 style={{ fontSize: "28px", margin: "0 0 12px 0" }}>18+ VIP After-Hours Lounge</h2>
            <p style={{ fontSize: "14px", color: "#AAAAAA", lineHeight: "1.6", marginBottom: "28px" }}>
              This section contains late-night speed dating, private streams, and discreet adult conversations. You must be at least 18 years old to enter.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => setIsAgeVerified(true)}
                className="btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: "15px" }}
              >
                🔞 I am 18+ Years Old (Enter Lounge)
              </button>
              
              <Link href="/" className="btn-outline" style={{ textAlign: "center", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
                Return to Main Radar
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Verified 18+ VIP Lounge Dashboard */
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* Header Banner */}
          <div className="glass-panel glass-panel-vip animate-fade-in" style={{ padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ background: "rgba(255, 255, 255, 0.15)", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, border: "1px solid rgba(255, 255, 255, 0.25)" }}>
                  🔞 18+ AGE VERIFIED
                </span>
                <span style={{ color: "#888888", fontSize: "12px" }}>Discreet & Encrypted</span>
              </div>
              <h1 style={{ fontSize: "32px", margin: "0 0 6px 0" }}>VIP After-Hours Lounge</h1>
              <p style={{ fontSize: "14px", color: "#888888", margin: 0 }}>
                Exclusive late-night adult speed dating, private video calls, and incognito matchmaking.
              </p>
            </div>

            {/* Incognito & Privacy Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>Incognito Mode</div>
                <div style={{ fontSize: "11px", color: "#888888" }}>{incognitoMode ? "Profile Hidden from Public" : "Profile Visible"}</div>
              </div>
              
              <button
                onClick={() => setIncognitoMode(!incognitoMode)}
                className="btn-outline"
                style={{
                  borderRadius: "100px",
                  padding: "8px 18px",
                  fontSize: "12px",
                  background: incognitoMode ? "#FFFFFF" : "rgba(255,255,255,0.05)",
                  color: incognitoMode ? "#000000" : "#FFFFFF",
                  borderColor: incognitoMode ? "#FFFFFF" : "var(--card-border)",
                  fontWeight: incognitoMode ? 800 : 600
                }}
              >
                {incognitoMode ? "🔒 Incognito Active" : "👁️ Go Incognito"}
              </button>
            </div>
          </div>

          {/* Active 18+ Private Rooms Grid */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "20px", margin: 0 }}>🔥 Live 18+ After-Hours Rooms</h2>
              <div style={{ fontSize: "12px", color: "#888888" }}>{adultRooms.length} Active Private Streams</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {adultRooms.map((room) => (
                <div key={room.id} className="glass-panel glass-panel-vip animate-fade-in" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "220px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {room.gender === "Female" ? <AvatarFemale size={20} /> : <AvatarMale size={20} />}
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "4px" }}>
                            {room.host}, {room.age}
                            <VerifiedBadgeIcon size={12} />
                          </div>
                          <div style={{ fontSize: "11px", color: "#888888" }}>🔴 {room.viewers} watching</div>
                        </div>
                      </div>

                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#FFFFFF", background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {room.sparksRequired} Sparks
                      </span>
                    </div>

                    <h3 style={{ fontSize: "16px", margin: "0 0 10px 0", color: "#FFFFFF" }}>{room.title}</h3>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {room.tags.map((t, idx) => (
                        <span key={idx} style={{ fontSize: "10px", color: "#888888", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnterRoom(room)}
                    className="btn-primary"
                    style={{ width: "100%", padding: "10px", fontSize: "13px" }}
                  >
                    <VideoIcon size={14} color="#000" /> Join Private Room
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
