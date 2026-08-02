"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { MarketIcon, SparksIcon, AvatarFemale, AvatarMale, AvatarOther } from "../components/Icons";

interface MarketplaceItem {
  id: string;
  title: string;
  sellerName: string;
  gender: "Female" | "Male" | "Other";
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
    gender: "Female",
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
    gender: "Male",
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
    gender: "Female",
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
    gender: "Other",
    category: "Skills & Services",
    priceCoins: 250,
    description: "Practice real-world conversational Spanish 1-on-1 in a comfortable, friendly video call environment.",
    rating: 4.9,
    salesCount: 15
  }
];

export default function MarketplacePage() {
  const router = useRouter();
  const { tokens, deductTokens } = useAppContext();
  const [items] = useState<MarketplaceItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Skills & Services", "Digital Downloads", "1-on-1 Coaching", "Custom Media"];

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: MarketplaceItem) => {
    if (deductTokens(item.priceCoins)) {
      alert(`Success! You have purchased "${item.title}" for ${item.priceCoins} Sparks.`);
    } else {
      alert(`Insufficient Sparks! You need ${item.priceCoins} Sparks to purchase this service.`);
      router.push("/checkout");
    }
  };

  return (
    <main className="app-container" style={{ paddingTop: '20px' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888888', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '4px' }}>
            <MarketIcon size={16} /> CREATOR SKILLS & SERVICES MARKETPLACE
          </div>
          <h1 style={{ margin: 0, fontSize: '32px' }}>Skills & Digital Products</h1>
        </div>

        <Link href="/marketplace/create" className="btn-primary" style={{ textDecoration: 'none' }}>
          + List Your Product / Skill
        </Link>
      </header>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="btn-outline"
            style={{
              borderRadius: '100px',
              padding: '10px 20px',
              fontSize: '13px',
              background: selectedCategory === cat ? '#FFFFFF' : 'rgba(255,255,255,0.03)',
              color: selectedCategory === cat ? '#000000' : '#FFFFFF',
              borderColor: selectedCategory === cat ? '#FFFFFF' : 'var(--card-border)',
              fontWeight: selectedCategory === cat ? 800 : 500
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredItems.map((item) => (
          <div key={item.id} className="glass-panel glass-panel-vip" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              {/* Category & Seller Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ 
                  fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', 
                  background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' 
                }}>
                  {item.category}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.gender === "Female" ? <AvatarFemale size={16} /> : item.gender === "Male" ? <AvatarMale size={16} /> : <AvatarOther size={16} />}
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.sellerName}</span>
                </div>
              </div>

              {/* Title & Rating */}
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', lineHeight: 1.3 }}>
                {item.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888888', marginBottom: '12px' }}>
                <span>★ {item.rating}</span>
                <span>•</span>
                <span>{item.salesCount} orders completed</span>
              </div>

              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>

            {/* Price & Action */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>PRICE</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <SparksIcon size={16} /> {item.priceCoins} Sparks
                </div>
              </div>

              <button onClick={() => handlePurchase(item)} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                Order Service
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
