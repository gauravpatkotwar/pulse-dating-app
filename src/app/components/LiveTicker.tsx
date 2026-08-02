"use client";

import React, { useState, useEffect } from "react";

const liveEvents = [
  "✨ Alex S. unlocked Delhi VIP Alpha Club (500 Sparks)",
  "🎙️ 1,420 users currently connected in live P2P video calls",
  "✨ Sarah M. tipped 250 Sparks on a Live Stream",
  "🛡️ Vikram R. activated ₹1 Anti-Bot Platform Pass",
  "💎 New 1-on-1 Fitness Session booked on Marketplace",
  "⭐ Priya K. created Mumbai Terrace Music Lounge Club"
];

export default function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveEvents.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: 'rgba(255, 215, 0, 0.05)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
      borderRadius: '100px',
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '13px',
      color: '#FFD700',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
      maxWidth: 'fit-content',
      margin: '0 auto 24px auto'
    }}>
      <span className="live-dot" />
      <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>LIVE PULSE ACTIVITY:</span>
      <span style={{ color: '#fff', transition: 'all 0.3s ease' }}>
        {liveEvents[currentIndex]}
      </span>
    </div>
  );
}
