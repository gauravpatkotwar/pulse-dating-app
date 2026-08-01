"use client";
import styles from "./page.module.css";
import Wallet from "./components/Wallet";
import Logo from "./components/Logo";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const { isAuthenticated, username, logout } = useAppContext();

  return (
    <main className="app-container">
      {/* Top section: Header */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo size={36} />
        </div>
        <nav className={styles.nav}>
          <a href="#discover">Discover</a>
          <a href="/chat">Chat</a>
          <a href="/nsfw-chat" style={{ color: '#FF5C5C', borderBottom: '1px solid #FF5C5C' }}>18+</a>
          <a href="/calls">Calls</a>
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


      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Main Profile / 3D Avatar Area */}
        <div className={`bento-card ${styles.cardHero}`}>
          <div className={styles.heroContent}>
            <div className={styles.avatarControls}>
              <div className={styles.colorDots}>
                <span className={styles.dot} style={{ backgroundColor: '#FF5C5C' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#FFAB5C' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#FFE65C' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#5CFF7A' }}></span>
                <span className={styles.dot} style={{ backgroundColor: '#5CC9FF' }}></span>
              </div>
            </div>
            
            <div className={styles.avatarContainer}>
               {/* Placeholder for 3D character or avatar */}
               <div className={styles.avatarPlaceholder}>
                 <span className={styles.avatarEmoji}>👽</span>
               </div>
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
             <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                ✨ Subscribe
             </button>
          </div>
        </div>

        {/* Recent Matches / Chat Previews */}
        <div className={`bento-card ${styles.cardMatches}`}>
           <div className={styles.matchItem}>
             <div className={styles.matchTime}>Apr 24, 11:35 AM</div>
             <div className="h3">Lucky Fox</div>
             <div className={styles.matchAvatar}>🦊</div>
           </div>
           
           <div className={styles.matchItem}>
             <div className={styles.matchTime}>Apr 18, 3:50 PM</div>
             <div className="h3">Piggy and skate</div>
             <div className={styles.matchAvatar}>🐷</div>
           </div>
        </div>
      </div>
    </main>
  );
}
