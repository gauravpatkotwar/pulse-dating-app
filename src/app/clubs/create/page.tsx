"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClubPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Social & Dating");
  const [icon, setIcon] = useState("🔥");
  const [isVIP, setIsVIP] = useState(false);
  const [entryFeeCoins, setEntryFeeCoins] = useState(500);

  const icons = ["🔥", "⚡", "🌙", "🎧", "🍿", "☕", "🎮", "🚀", "💡", "🎨"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Please fill in a club name and description.");
      return;
    }

    if (isVIP && entryFeeCoins <= 0) {
      alert("Please set a valid VIP entry fee in Pulse Coins.");
      return;
    }

    alert(`🎉 Success! Your ${isVIP ? 'VIP Paid' : 'Public'} club "${name}" has been created! ${isVIP ? `Entry fee: ${entryFeeCoins} Coins (80% paid to you, 20% platform commission).` : ''}`);
    router.push('/clubs');
  };

  return (
    <main className="app-container" style={{ maxWidth: '650px', margin: '40px auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => router.back()} 
          style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '24px', cursor: 'pointer' }}
        >
          ←
        </button>
        <div>
          <h1 className="h2" style={{ margin: 0 }}>Create a New Club</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Build your open community hub on Pulse.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Select Icon */}
        <div>
          <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Choose Club Icon
          </label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {icons.map(ic => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  border: icon === ic ? '2px solid var(--accent-primary)' : '1px solid var(--card-border)',
                  background: icon === ic ? 'rgba(196,240,66,0.1)' : 'rgba(0,0,0,0.3)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Club Name */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Club Name
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. Bangalore Late Night Founders Club"
            style={{ width: '100%' }}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Social & Dating">Social & Dating</option>
            <option value="Tech & Business">Tech & Business</option>
            <option value="Music & Party">Music & Party</option>
            <option value="Hobbies & Movies">Hobbies & Movies</option>
          </select>
        </div>

        {/* VIP Club Access Settings */}
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: 600 }}>
            <input 
              type="checkbox" 
              checked={isVIP}
              onChange={(e) => setIsVIP(e.target.checked)}
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)' }}
            />
            👑 Make this a Paid VIP Club
          </label>
          
          {isVIP && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                Entry Fee in Pulse Coins (🪙)
              </label>
              <input 
                type="number"
                value={entryFeeCoins}
                onChange={(e) => setEntryFeeCoins(Number(e.target.value))}
                min={50}
                placeholder="e.g. 500"
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', display: 'block' }}>
                💡 You earn 80% of all entry fees (400 Coins per member). Pulse keeps a 20% platform commission.
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Description & Guidelines
          </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Tell people what this club is about and what kind of conversations happen here..."
            rows={4}
            style={{ width: '100%', resize: 'vertical' }}
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '16px' }}>
          {isVIP ? "👑 Create Paid VIP Club" : "🏰 Create Public Club"}
        </button>
      </form>
    </main>
  );
}
