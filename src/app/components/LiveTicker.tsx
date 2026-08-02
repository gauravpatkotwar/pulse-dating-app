"use client";

import React, { useState, useEffect } from "react";
import { SparksIcon, LiveIcon, ClubsIcon, MarketIcon, VerifiedBadgeIcon } from "./Icons";

const liveEvents = [
  { icon: <ClubsIcon size={14} />, text: "Alex S. unlocked Delhi VIP Alpha Club (500 Sparks)" },
  { icon: <LiveIcon size={14} />, text: "1,420 users currently connected in live P2P video calls" },
  { icon: <SparksIcon size={14} />, text: "Sarah M. tipped 250 Sparks on a Live Stream" },
  { icon: <VerifiedBadgeIcon size={14} />, text: "Vikram R. activated ₹1 Anti-Bot Platform Pass" },
  { icon: <MarketIcon size={14} />, text: "New 1-on-1 Fitness Session booked on Marketplace" },
];

export default function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveEvents.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentEvent = liveEvents[currentIndex];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '100px',
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '13px',
      color: '#FFFFFF',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      maxWidth: 'fit-content',
      margin: '0 auto 24px auto'
    }}>
      <span className="live-dot" />
      <span style={{ fontWeight: 800, letterSpacing: '0.04em', fontSize: '11px', color: '#AAAAAA' }}>PULSE LIVE LOG:</span>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: '#FFFFFF', fontWeight: 500 }}>
        {currentEvent.icon}
        <span>{currentEvent.text}</span>
      </div>
    </div>
  );
}
