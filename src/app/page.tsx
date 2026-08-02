"use client";

import { useAppContext } from "./context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LiveTicker from "./components/LiveTicker";

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

  const handleStartRandomCall = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    router.push(`/call/${newRoomId}`);
  };

  return (
    <main className="app-container">
      {/* Live Activity Feed Banner */}
      <LiveTicker />

      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '44px', height: '44px', background: 'var(--accent-gradient)', 
            borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#000', fontWeight: 'bold', fontSize: '22px', boxShadow: '0 0 20px rgba(196, 240, 66, 0.3)'
          }}>
            P
          </div>
          <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #FFF 0%, #AAA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Pulse
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Discover</Link>
          <Link href="/live" style={{ color: '#FF5C5C', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><span className="live-dot" style={{ background: '#FF5C5C' }} /> Live</Link>
          <Link href="/clubs" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>🏰 Clubs</Link>
          <Link href="/marketplace" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>🛍️ Marketplace</Link>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--card-border)' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✨ {profile?.tokens || 0}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sparks</span>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">Sign In</Link>
          )}
        </nav>
      </header>

      {isAuthenticated ? (
        <div className="home-layout">
          
          {/* Left Sidebar (User ID Badge) */}
          <aside className="glass-panel glass-panel-vip animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Avatar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ 
                width: '104px', 
                height: '104px', 
                borderRadius: '50%', 
                background: 'rgba(0,0,0,0.6)', 
                border: '2px solid rgba(255,215,0,0.4)',
                boxShadow: '0 0 24px rgba(255,215,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '52px',
                marginBottom: '16px'
              }}>
                {profile?.gender === 'Male' ? '👦' : profile?.gender === 'Female' ? '👩' : '👽'}
              </div>
              
              <h2 style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                {profile?.displayName || "Anonymous"} 
                {profile?.isVerified && <span style={{ color: '#1D9BF0', fontSize: '18px' }}>✓</span>}
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                {profile?.age ? `${profile.age} years old` : 'Age not set'}
              </p>
              
              {/* Premium & Activation Badges */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: 'var(--accent-gradient)', color: '#000' }}>
                  {isPremium ? 'PRO MEMBER' : 'STANDARD'}
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: 'rgba(92,255,122,0.15)', color: '#5CFF7A', border: '1px solid rgba(92,255,122,0.3)' }}>
                  🛡️ VERIFIED USER
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
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-primary)' }}>{profile?.tokens || 0}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pulse Sparks</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/checkout" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>✨ Get Pulse Sparks</Link>
              <button onClick={logout} className="btn-outline" style={{ borderColor: 'transparent', color: 'var(--accent-danger)' }}>Sign Out</button>
            </div>
          </aside>


          {/* Main Content Feed */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Actions Hero */}
            <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(145deg, rgba(30,30,35,0.9) 0%, rgba(12,12,15,0.95) 100%)' }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '24px' }}>Start Connecting</h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '420px', lineHeight: 1.5 }}>
                  Launch a high-definition, peer-to-peer WebRTC video call with screen share instantly.
                </p>
              </div>
              <button onClick={handleStartRandomCall} className="btn-primary" style={{ padding: '16px 32px' }}>
                📸 New Video Call
              </button>
            </div>

            {/* Join Call Input */}
            <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 style={{ marginTop: 0 }}>Join an existing room</h3>
              <form onSubmit={handleJoinCall} style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <input 
                  type="text" 
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID (e.g. knd1mcuk)"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn-outline" disabled={!roomId.trim()}>
                  Join Room
                </button>
              </form>
            </div>

            {/* Featured Marketplace & Clubs Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              <div className="glass-panel glass-panel-vip" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => router.push('/clubs')}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏰</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>VIP & Public Clubs</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                  Browse interest-based community hubs or join paid VIP clubs for exclusive alpha calls.
                </p>
                <div style={{ marginTop: '16px', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '14px' }}>
                  Explore Clubs →
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => router.push('/marketplace')}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛍️</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Skills Marketplace</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                  Buy & sell 1-on-1 coaching, language practice, advice, and digital products for Pulse Coins.
                </p>
                <div style={{ marginTop: '16px', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '14px' }}>
                  Visit Marketplace →
                </div>
              </div>

            </div>

          </section>

        </div>
      ) : (
        /* Logged Out Hero */
        <div style={{ textAlign: 'center', marginTop: '100px', maxWidth: '800px', margin: '100px auto 0' }} className="animate-fade-in">
          <h1 style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px' }}>
            The ultra-luxurious platform for <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>real connections.</span>
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
