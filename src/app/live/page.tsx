"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { AvatarFemale, AvatarMale, VerifiedBadgeIcon, LiveIcon, SparksIcon } from "../components/Icons";

export interface LiveStream {
  id: string;
  hostName: string;
  gender: "Female" | "Male";
  isVerified: boolean;
  title: string;
  category: "Chat & Chill" | "Music & DJ" | "Gaming" | "Q&A Session";
  viewerCount: number;
  tokensEarned: number;
}

const initialStreams: LiveStream[] = [
  {
    id: "stream-1",
    hostName: "Sophia R.",
    gender: "Female",
    isVerified: true,
    title: "Late Night Q&A + Music Chill Lounge",
    category: "Music & DJ",
    viewerCount: 1420,
    tokensEarned: 8400
  },
  {
    id: "stream-2",
    hostName: "Alex M.",
    gender: "Male",
    isVerified: true,
    title: "Crypto, Tech & Startup Founders AMA",
    category: "Chat & Chill",
    viewerCount: 890,
    tokensEarned: 12500
  },
  {
    id: "stream-3",
    hostName: "Elena V.",
    gender: "Female",
    isVerified: true,
    title: "Fitness & Wellness Q&A + Live Workout",
    category: "Q&A Session",
    viewerCount: 610,
    tokensEarned: 4300
  }
];

export default function LiveDirectoryPage() {
  const router = useRouter();
  const { profile } = useAppContext();
  const [streams] = useState<LiveStream[]>(initialStreams);

  return (
    <main className="app-container" style={{ paddingTop: '20px' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888888', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '4px' }}>
            <LiveIcon size={16} /> LIVE BROADCAST NETWORK
          </div>
          <h1 style={{ margin: 0, fontSize: '32px' }}>Interactive Live Streams</h1>
        </div>

        <Link href="/live/stream-1" className="btn-primary" style={{ textDecoration: 'none' }}>
          <LiveIcon size={16} color="#000" /> Go Live Now
        </Link>
      </header>

      {/* Streams Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {streams.map((stream) => (
          <div 
            key={stream.id}
            className="glass-panel glass-panel-vip"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px', cursor: 'pointer' }}
            onClick={() => router.push(`/live/${stream.id}`)}
          >
            <div>
              {/* Thumbnail Header */}
              <div style={{ 
                height: '160px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(28,28,28,0.9) 0%, rgba(12,12,12,0.95) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <LiveIcon size={48} color="rgba(255,255,255,0.4)" />

                <div style={{ 
                  position: 'absolute', top: '12px', left: '12px', background: '#FFFFFF', color: '#000000',
                  fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px' 
                }}>
                  <span className="live-dot" style={{ background: '#000', boxShadow: 'none' }} /> LIVE
                </div>

                <div style={{ 
                  position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: 'white',
                  fontSize: '12px', padding: '4px 10px', borderRadius: '100px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  👁️ {stream.viewerCount.toLocaleString()}
                </div>
              </div>

              {/* Title & Host */}
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>
                  {stream.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {stream.gender === "Female" ? <AvatarFemale size={18} /> : <AvatarMale size={18} />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{stream.hostName}</span>
                    {stream.isVerified && <VerifiedBadgeIcon size={14} />}
                  </div>

                  <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SparksIcon size={14} /> {stream.tokensEarned}
                  </span>
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>
              Watch Broadcast & Send Gifts
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
