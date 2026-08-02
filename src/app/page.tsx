"use client";
import styles from "./page.module.css";
import Wallet from "./components/Wallet";
import Logo from "./components/Logo";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const { isAuthenticated, username, logout, isPremium, setPremium, profile } = useAppContext();

  return (
    <main className="app-container">
      {/* Top section: Header */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo size={36} />
        </div>
        <nav className={styles.nav}>
          <a href="#discover">Discover</a>
        </nav>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Wallet />
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontWeight: 600 }}>{username}</span>
              <button className="btn-primary" onClick={logout} style={{ background: '#333', color: '#fff' }}>Logout</button>
            </div>
          ) : (
            <a href="/login" className="btn-primary">Sign In</a>
          )}
        </div>
      </header>


      {/* Secondary Grid */}
      <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '16px' }}>
        
        {/* WebRTC Calling Card */}
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="h3" style={{ margin: '0 0 8px 0' }}>Video & Voice Calling</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Start a secure peer-to-peer WebRTC call.</p>
          </div>
          
          <button 
            onClick={() => {
              const newRoomId = Math.random().toString(36).substring(2, 10);
              window.location.href = `/call/${newRoomId}`;
            }}
            className="btn-primary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            📹 Start New Call
          </button>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Enter Room ID" 
              id="joinRoomInput"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0 12px',
                color: 'white'
              }}
            />
            <button 
              onClick={() => {
                const input = document.getElementById('joinRoomInput') as HTMLInputElement;
                if (input.value) {
                  window.location.href = `/call/${input.value}`;
                }
              }}
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Main Profile / 3D Avatar Area */}
        <div className={`bento-card ${styles.cardHero}`} style={{ position: 'relative' }}>
          <div className={styles.heroContent} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 className="h1" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {profile?.displayName || "Anonymous"} 
                  {profile?.age && <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{profile.age}</span>}
                </h1>
                {profile?.gender && (
                  <span style={{ 
                    display: 'inline-block', marginTop: '8px', padding: '4px 12px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '14px' 
                  }}>
                    {profile.gender}
                  </span>
                )}
              </div>
              <div className={styles.colorDots}>
                <span className={styles.dot} style={{ backgroundColor: '#FF5C5C' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#5CFF7A' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#5CC9FF' }}></span>
              </div>
            </div>

            <div className={styles.avatarContainer} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
               <div className={styles.avatarPlaceholder} style={{ background: 'transparent' }}>
                 <span className={styles.avatarEmoji} style={{ fontSize: '100px' }}>
                   {profile?.gender === 'Female' ? '👩' : (profile?.gender === 'Male' ? '👦' : '🧑')}
                 </span>
               </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
               <p style={{ fontSize: '18px', lineHeight: 1.5, color: '#e0e0e0', fontStyle: 'italic', textAlign: 'center' }}>
                 "{profile?.bio || "Set up your bio in settings to get more matches!"}"
               </p>
            </div>
            
          </div>
        </div>

        {/* Discovery Settings */}
        <div className={`bento-card ${styles.cardSettings}`}>
          <div className={styles.settingsHeader}>
            <h1 className="h2">Discover Pulse's Full Potential</h1>
            <p className="text-muted">Set up your anonymous profile to start connecting</p>
          </div>

          <div className={styles.settingsPanel}>
            <h3 className={styles.panelTitle}>Settings</h3>
            <div className={styles.settingsGrid}>
              <label className={styles.settingToggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleText}>Voice filters</span>
              </label>
              <label className={styles.settingToggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleText}>Blur video initially</span>
              </label>
              <label className={styles.settingToggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleText}>Incognito matching</span>
              </label>
              <label className={styles.settingToggle}>
                <input type="checkbox" />
                <span className={styles.toggleText}>Share exact location</span>
              </label>
            </div>
          </div>
        </div>

        {/* Subscription / Premium Plans */}
        <div className={`bento-card ${styles.cardPlans}`}>
          <div className={styles.plansContainer}>
            <div className={styles.planCard}>
              <div className={styles.planTitle}>Monthly</div>
              <div className={styles.planPrice}>$6.99</div>
              <p className={styles.planDesc}>Month-to-month subscription. Cancel anytime!</p>
            </div>
            <div className={`${styles.planCard} ${styles.planActive}`}>
              <div className={styles.planTitle}>
                Yearly <span className={styles.discountBadge}>-40%</span>
              </div>
              <div className={styles.planPrice}>$49.99</div>
              <p className={styles.planDesc}>Save more with an annual subscription.</p>
            </div>
            <div className={styles.planCard}>
              <div className={styles.planTitle}>Lifetime</div>
              <div className={styles.planPrice}>$119.99</div>
              <p className={styles.planDesc}>One-time payment. Premium forever.</p>
            </div>
          </div>

          <div className={styles.planFooter}>
             <p className="text-muted">With our monthly and yearly plans, you have the freedom to cancel anytime.</p>
             <button 
                className="btn-primary" 
                onClick={() => {
                  if (isPremium) {
                    alert("You already have an active premium subscription.");
                  } else {
                    window.location.href = '/checkout';
                  }
                }}
                style={{ width: '100%', marginTop: '16px', background: isPremium ? '#C4F042' : undefined, color: isPremium ? '#000' : undefined }}
             >
                {isPremium ? '✅ Premium Active' : '✨ Subscribe via Paddle'}
             </button>
          </div>
        </div>


      </div>
    </main>
  );
}
