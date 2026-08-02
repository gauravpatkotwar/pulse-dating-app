"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

interface MarketplaceItem {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar: string;
  category: "Skills & Services" | "Digital Downloads" | "1-on-1 Coaching" | "Custom Media";
  priceCoins: number;
  description: string;
  rating: number;
  salesCount: number;
}

const initialItems: MarketplaceItem[] = [
  {
    id: "m1",
    title: "1-on-1 Dating Profile Review & Advice",
    sellerName: "Sophia R.",
    sellerAvatar: "👩",
    category: "1-on-1 Coaching",
    priceCoins: 300,
    description: "Get a personalized 20-minute video session reviewing your dating profile photos and bio to get 5x more matches.",
    rating: 4.9,
    salesCount: 42
  },
  {
    id: "m2",
    title: "Custom Birthday Video Shoutout",
    sellerName: "Alex M.",
    sellerAvatar: "👦",
    category: "Custom Media",
    priceCoins: 150,
    description: "I will record a fun, personalized 60-second video message for you or your friends.",
    rating: 5.0,
    salesCount: 88
  },
  {
    id: "m3",
    title: "Personalized Fitness & Diet Plan PDF",
    sellerName: "Elena V.",
    sellerAvatar: "👩",
    category: "Digital Downloads",
    priceCoins: 200,
    description: "A comprehensive 4-week home workout guide and macro meal plan tailored for busy individuals.",
    rating: 4.8,
    salesCount: 120
  },
  {
    id: "m4",
    title: "Conversational Spanish Practice (30 Mins)",
    sellerName: "Carlos G.",
    sellerAvatar: "🧑",
    category: "Skills & Services",
    priceCoins: 250,
    description: "Practice fluent conversational Spanish with a native speaker over a private 1-on-1 Pulse call.",
    rating: 5.0,
    salesCount: 15
  }
];

export default function MarketplacePage() {
  const router = useRouter();
  const { tokens, deductTokens } = useAppContext();
  const [items, setItems] = useState<MarketplaceItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const categories = ["All", "1-on-1 Coaching", "Skills & Services", "Digital Downloads", "Custom Media"];

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: MarketplaceItem) => {
    if (purchasedIds.includes(item.id)) {
      alert("You have already purchased this item!");
      return;
    }

    if (tokens < item.priceCoins) {
      alert(`Insufficient Pulse Coins! You need ${item.priceCoins} Coins, but you have ${tokens} Coins.`);
      router.push('/checkout');
      return;
    }

    const success = deductTokens(item.priceCoins);
    if (success) {
      setPurchasedIds([...purchasedIds, item.id]);
      alert(`🎉 Purchase Successful! You unlocked "${item.title}". ${item.priceCoins} Pulse Coins transferred to ${item.sellerName}.`);
    }
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
            <h1 className="h2" style={{ margin: 0 }}>Pulse Marketplace</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Buy & Sell Skills, Services & Digital Products</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>🪙 {tokens}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Coins</span>
          </div>

          <Link href="/marketplace/create" className="btn-primary" style={{ textDecoration: 'none' }}>
            + List Your Skill
          </Link>
        </div>
      </header>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "btn-primary" : "btn-outline"}
            style={{ padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Marketplace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredItems.map(item => {
          const isPurchased = purchasedIds.includes(item.id);
          return (
            <div 
              key={item.id} 
              className="glass-panel" 
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
            >
              <div>
                {/* Category & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '12px', fontWeight: 600, padding: '4px 10px', 
                    borderRadius: '100px', background: 'rgba(255,255,255,0.1)', color: 'var(--accent-primary)' 
                  }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    ⭐ {item.rating} ({item.salesCount} sold)
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                {/* Seller Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{item.sellerAvatar}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>by {item.sellerName}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '14px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Price</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    🪙 {item.priceCoins} Coins
                  </div>
                </div>

                <button 
                  onClick={() => handlePurchase(item)}
                  className={isPurchased ? "btn-outline" : "btn-primary"}
                  style={{ padding: '10px 20px', fontSize: '14px', background: isPurchased ? 'rgba(92,255,122,0.2)' : undefined, color: isPurchased ? '#5CFF7A' : undefined }}
                >
                  {isPurchased ? "Unlocked ✓" : "Buy Skill"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
