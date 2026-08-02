"use client";

import { useAppContext } from "./context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LiveTicker from "./components/LiveTicker";
import OrbitalRadar from "./components/OrbitalRadar";
import DiscoverDeck from "./components/DiscoverDeck";
import { CurrencyCoinIcon } from "./components/Icons";
import Logo from "./components/Logo";

export default function Home() {
  const { isAuthenticated, user, profile, logout, isPremium } = useAppContext();
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      router.push(`/call/${roomId.trim()}`);
    }
  };

  return (
    <main className="app-container">
      {/* Live Activity Ticker */}
      <LiveTicker />

      {/* Stealth Brand Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Logo size={36} />
        </div>
        
        {/* User Sparks Balance Pill */}
        {isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/checkout" style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255, 255, 255, 0.05)', padding: '8px 20px', 
              borderRadius: '100px 12px 100px 12px', border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none', color: '#FFFFFF',
              boxShadow: '0 4px 20px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2)'
            }}>
              <CurrencyCoinIcon size={16} />
              <span style={{ color: '#FFFFFF', fontWeight: 800 }}>{profile?.tokens || 0}</span>
              <span style={{ fontSize: '13px', color: '#888888' }}>Sparks</span>
            </Link>
          </div>
        )}
      </header>

      {isAuthenticated ? (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', marginTop: '16px', alignItems: 'start' }}>
          
          {/* Left Sidebar (Stealth User ID Badge) */}
          <aside className="glass-panel glass-panel-vip animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Avatar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ 
                width: '96px', 
                height: '96px', 
                borderRadius: '50%', 
                background: '#000000', 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                {profile?.gender === 'Male' ? '👦' : profile?.gender === 'Female' ? '👩' : '👽'}
              </div>
              
              <h2 style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '22px' }}>
                {profile?.displayName || "Anonymous"} 
                {profile?.isVerified && <span style={{ color: '#FFFFFF', fontSize: '16px' }}>✓</span>}
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                {profile?.age ? `${profile.age} years old` : 'Age not set'}
              </p>
              
              {/* Status Badges */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '100px 4px 100px 4px', fontSize: '11px', fontWeight: 800, background: '#FFFFFF', color: '#000000' }}>
                  {isPremium ? 'PRO MEMBER' : 'STANDARD'}
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '100px 4px 100px 4px', fontSize: '11px', fontWeight: 800, background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                  🛡️ VERIFIED
                </span>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800 }}>{profile?.subscriberCount || 0}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Subscribers</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>{profile?.tokens || 0}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pulse Sparks</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/profile" className="btn-outline" style={{ textAlign: 'center', textDecoration: 'none' }}>Edit Profile</Link>
              <Link href="/checkout" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>✨ Get Pulse Sparks</Link>
              <button onClick={logout} className="btn-outline" style={{ borderColor: 'transparent', color: '#888888' }}>Sign Out</button>
            </div>
          </aside>


          {/* Main Asymmetric Centerpiece Grid */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Interactive Radar Hub */}
            <div className="glass-panel animate-fade-in" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#888888', letterSpacing: '0.12em', marginBottom: '8px' }}>
                INTERACTIVE ORBITAL RADAR
              </div>
              <h2 style={{ margin: 0, fontSize: '28px' }}>P2P Active Stream Orbit</h2>

              <OrbitalRadar />
            </div>

            {/* 3D Perspective Card Deck & Direct Join Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'center' }}>
              
              {/* 3D Deck */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#888888', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  3D PERSPECTIVE MATCH DECK
                </div>
                <DiscoverDeck />
              </div>

              {/* Join Room Box */}
              <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ marginTop: 0, fontSize: '18px' }}>Join Room Direct</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Enter a room code to jump directly into a private encrypted video call.
                </p>
                <form onSubmit={handleJoinCall} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Room Code (e.g. knd1mcuk)"
                  />
                  <button type="submit" className="btn-primary" disabled={!roomId.trim()}>
                    Join Encrypted Room
                  </button>
                </form>
              </div>

            </div>

          </section>

        </div>
      ) : (
        /* Logged Out Hero */
        <div style={{ textAlign: 'center', marginTop: '100px', maxWidth: '800px', margin: '100px auto 0' }} className="animate-fade-in">
          <h1 style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', color: '#FFFFFF' }}>
            The matte black stealth network for <span style={{ textDecoration: 'underline' }}>real connections.</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            Encrypted video calling, VIP creator hubs, and a tokenized skill marketplace, built on a state-of-the-art WebRTC network.
          </p>
          <Link href="/login" className="btn-primary" style={{ padding: '18px 40px', fontSize: '18px', textDecoration: 'none' }}>
            Get Started Now
          </Link>
        </div>
      )}
    </main>
  );
}
