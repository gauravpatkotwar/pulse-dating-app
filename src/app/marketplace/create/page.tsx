"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";

export default function CreateListingPage() {
  const router = useRouter();
  const { profile } = useAppContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Skills & Services");
  const [priceCoins, setPriceCoins] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || priceCoins <= 0) {
      alert("Please fill in all fields with valid information.");
      return;
    }

    alert(`🎉 Success! Your skill "${title}" has been listed on the Pulse Marketplace for ${priceCoins} Coins.`);
    router.push('/marketplace');
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
          <h1 className="h2" style={{ margin: 0 }}>List a Skill or Product</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Monetize your expertise and sell directly to Pulse users.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Listing Title
          </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. 1-on-1 Fitness Coaching Session (30 mins)"
            style={{ width: '100%' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="1-on-1 Coaching">1-on-1 Coaching</option>
            <option value="Skills & Services">Skills & Services</option>
            <option value="Digital Downloads">Digital Downloads</option>
            <option value="Custom Media">Custom Media</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Price in Pulse Coins (🪙)
          </label>
          <input 
            type="number" 
            value={priceCoins} 
            onChange={(e) => setPriceCoins(Number(e.target.value))} 
            placeholder="e.g. 250"
            min={10}
            style={{ width: '100%' }}
            required
          />
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            Note: Pulse takes a 15% platform commission on completed sales.
          </span>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Description & Delivery Details
          </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe what the buyer receives and how you will deliver the service..."
            rows={4}
            style={{ width: '100%', resize: 'vertical' }}
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '12px', padding: '16px' }}>
          🚀 Publish Listing
        </button>
      </form>
    </main>
  );
}
