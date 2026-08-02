"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AvatarFemale, AvatarMale, VerifiedBadgeIcon, VideoIcon } from "./Icons";

interface DeckCard {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male";
  verified: boolean;
  bio: string;
  sparksRate: number;
  interests: string[];
}

const mockDeck: DeckCard[] = [
  {
    id: "d1",
    name: "Elena V.",
    age: 23,
    gender: "Female",
    verified: true,
    bio: "Fitness coach & tech lover. Looking for deep conversations & live workout sessions.",
    sparksRate: 50,
    interests: ["Fitness", "Techno", "Espresso"]
  },
  {
    id: "d2",
    name: "Sophia R.",
    age: 25,
    gender: "Female",
    verified: true,
    bio: "Music producer & late-night DJ streamer. Let's talk vinyl & web3.",
    sparksRate: 100,
    interests: ["DJ Live", "Art", "3 AM Talks"]
  },
  {
    id: "d3",
    name: "Alex M.",
    age: 27,
    gender: "Male",
    verified: true,
    bio: "Startup founder building AI tools. Always up for an impromptu video call.",
    sparksRate: 30,
    interests: ["AI", "Startups", "Sci-Fi"]
  }
];

export default function DiscoverDeck() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockDeck.length);
  };

  const handleStartCall = (card: DeckCard) => {
    const roomId = `call-${card.id}-${Math.random().toString(36).substring(2, 6)}`;
    router.push(`/call/${roomId}`);
  };

  const card = mockDeck[currentIndex];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "440px", margin: "0 auto" }}>
      {/* 3D Perspective Stacking Background Shadow Card */}
      <div 
        className="glass-panel"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "-16px",
          height: "100%",
          opacity: 0.4,
          transform: "scale(0.94) rotate(4deg)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* Main Front 3D Card */}
      <div 
        className="glass-panel glass-panel-vip animate-fade-in"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "0 30px 70px rgba(0,0,0,0.95)"
        }}
      >
        {/* Card Header & Vector Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {card.gender === "Female" ? <AvatarFemale size={36} /> : <AvatarMale size={36} />}
          </div>

          <div>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", display: "flex", alignItems: "center", gap: "8px" }}>
              {card.name}, {card.age}
              {card.verified && <VerifiedBadgeIcon size={16} />}
            </h3>
            <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 700 }}>
              ✨ {card.sparksRate} Sparks / min Call
            </span>
          </div>
        </div>

        {/* Bio */}
        <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {card.bio}
        </p>

        {/* Interest Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {card.interests.map((interest) => (
            <span
              key={interest}
              style={{
                fontSize: "12px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--card-border)",
                color: "#E0E0E0"
              }}
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button 
            onClick={handleNext}
            className="btn-outline"
            style={{ flex: 1, padding: "12px 0", textAlign: "center" }}
          >
            Pass
          </button>

          <button 
            onClick={() => handleStartCall(card)}
            className="btn-primary"
            style={{ flex: 1, padding: "12px 0", textAlign: "center" }}
          >
            <VideoIcon size={16} color="#000" /> Call Now
          </button>
        </div>
      </div>
    </div>
  );
}
