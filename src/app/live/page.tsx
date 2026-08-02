"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

export interface LiveStream {
  id: string;
  hostName: string;
  hostAvatar: string;
  isVerified: boolean;
  title: string;
  category: "Chat & Chill" | "Music & DJ" | "Gaming" | "Q&A Session";
  viewerCount: number;
  tokensEarned: number;
  thumbnailEmoji: string;
}

const initialStreams: LiveStream[] = [
  {
    id: "stream-1",
    hostName: "Sophia R.",
    hostAvatar: "👩",
    isVerified: true,
    title: "Late Night Q&A + Music Chill Lounge 🎶",
    category: "Music & DJ",
    viewerCount: 1420,
    tokensEarned: 8400,
    thumbnailEmoji: "🎸"
  },
  {
    id: "stream-2",
    hostName: "Alex M.",
    hostAvatar: "👦",
    isVerified: true,
    title: "Crypto, Tech & Startup Founders AMA 🚀",
    category: "Chat & Chill",
    viewerCount: 890,
    tokensEarned: 12500,
    thumbnailEmoji: "💻"
  },
  {
    id: "stream-3",
    hostName: "Elena V.",
    hostAvatar: "👩",
    isVerified: true,
    title: "Fitness & Wellness Q&A + Live Workout 🏋️‍♀️",
    category: "Q&A Session",
    viewerCount: 610,
    tokensEarned: 4300,
    thumbnailEmoji: "🔥"
  }
];

export default function LiveDirectoryPage() {
  const router = useRouter();
  const { tokens } = useAppContext();
  const [streams] = useState<LiveStream[]>(initialStreams);

  const handleGoLive = () => {
    const streamId = `live-${Math.random().toString(36).substring(2, 8)}`;
    router.push(`/live/${streamId}?host=true`);
  };

  return (
    <main className="app-container">
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => router.push('/')} 
            style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '24px', cursor: 'pointer' }}
          >
            ←
          </button>
          <div>
            <h1 className="h2" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" /> Pulse Live Streams
            </h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Watch creators, send virtual gifts & interact in real time</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>🪙 {tokens}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Coins</span>
          </div>

          <button onClick={handleGoLive} className="btn-primary">
            🎥 Go Live Now
          </button>
        </div>
      </header>

      {/* Streams Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {streams.map(stream => (
          <div 
            key={stream.id}
            className="glass-panel glass-panel-vip"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px', cursor: 'pointer' }}
            onClick={() => router.push(`/live/${stream.id}`)}
          >
            <div>
              {/* Thumbnail Header */}
              <div style={{ 
                height: '160px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(25,25,35,0.9) 0%, rgba(10,10,15,0.95) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', position: 'relative', overflow: 'hidden'
              }}>
                {stream.thumbnailEmoji}

                <div style={{ 
                  position: 'absolute', top: '12px', left: '12px', background: '#FF5C5C', color: 'white',
                  fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px' 
                }}>
                  <span className="live-dot" style={{ background: '#FFF', boxShadow: 'none' }} /> LIVE
                </div>

                <div style={{ 
                  position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white',
                  fontSize: '12px', padding: '4px 10px', borderRadius: '100px', backdropFilter: 'blur(10px)'
                }}>
                  👁️ {stream.viewerCount.toLocaleString()}
                </div>
              </div>

              {/* Title & Host */}
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>
                  {stream.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{stream.hostAvatar}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{stream.hostName}</span>
                    {stream.isVerified && <span style={{ color: '#1D9BF0', fontSize: '14px' }}>✓</span>}
                  </div>

                  <span style={{ fontSize: '13px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    🪙 {stream.tokensEarned} earned
                  </span>
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>
              🍿 Watch Broadcast & Send Gifts
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
