import { useAppContext } from "./context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '20px' }}>
            P
          </div>
          <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em' }}>Pulse</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Discover</Link>
          <Link href="/marketplace" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>🛍️ Marketplace</Link>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '100px', border: '1px solid var(--card-border)' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>🪙 {profile?.tokens || 0}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tokens</span>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">Sign In</Link>
          )}
        </nav>
      </header>

      {isAuthenticated ? (
        <div className="home-layout">
          
          {/* Left Sidebar (User ID Badge) */}
          <aside className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Avatar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                background: 'rgba(0,0,0,0.5)', 
                border: '2px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                {profile?.gender === 'Male' ? '👦' : profile?.gender === 'Female' ? '👩' : '👽'}
              </div>
              
              <h2 style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                {profile?.displayName || "Anonymous"} 
                {profile?.isVerified && <span style={{ color: '#1D9BF0', fontSize: '16px' }}>✓</span>}
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                {profile?.age ? `${profile.age} years old` : 'Age not set'}
              </p>
              
              {/* Premium Badge */}
              <div style={{ marginTop: '12px', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: isPremium ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', color: isPremium ? '#000' : 'white' }}>
                {isPremium ? 'PRO MEMBER' : 'STANDARD'}
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{profile?.subscriberCount || 0}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Subscribers</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-primary)' }}>{profile?.tokens || 0}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pulse Coins</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/profile" className="btn-outline" style={{ textAlign: 'center', textDecoration: 'none' }}>Edit Profile</Link>
              <button onClick={logout} className="btn-outline" style={{ borderColor: 'transparent', color: 'var(--accent-danger)' }}>Sign Out</button>
            </div>
          </aside>


          {/* Main Content Feed */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Actions Hero */}
            <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(145deg, rgba(25,25,25,0.8) 0%, rgba(10,10,10,0.9) 100%)' }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Start Connecting</h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '400px', lineHeight: 1.5 }}>
                  Launch a secure, peer-to-peer video call instantly. No downloads required.
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

            {/* Placeholder for Creator Feed / Matches */}
            <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.3s', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <h3>Creator Feed coming soon</h3>
              <p>This space will feature premium locked content and galleries.</p>
            </div>

          </section>

        </div>
      ) : (
        /* Logged Out Hero */
        <div style={{ textAlign: 'center', marginTop: '120px', maxWidth: '800px', margin: '120px auto 0' }} className="animate-fade-in">
          <h1 style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px' }}>
            The premium platform for <span style={{ color: 'var(--accent-primary)' }}>real connections.</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            Secure video calling, premium creator subscriptions, and real-time interactions, all built on a state-of-the-art encrypted network.
          </p>
          <Link href="/login" className="btn-primary" style={{ padding: '18px 40px', fontSize: '18px', textDecoration: 'none' }}>
            Get Started Now
          </Link>
        </div>
      )}
    </main>
  );
}
