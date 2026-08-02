"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Club {
  id: string;
  name: string;
  icon: string;
  category: "Social & Dating" | "Tech & Business" | "Music & Party" | "Hobbies & Movies";
  description: string;
  membersCount: number;
  isPrivate: boolean;
  ownerName: string;
  isJoined?: boolean;
  
  // Paid VIP Club Support
  isVIP?: boolean;
  entryFeeCoins?: number;
}

const initialClubs: Club[] = [
  {
    id: "club-1",
    name: "Delhi Tech & Crypto VIP Alpha",
    icon: "⚡",
    category: "Tech & Business",
    description: "Exclusive club for crypto traders & startup founders. Includes daily alpha calls and private networking.",
    membersCount: 420,
    isPrivate: false,
    ownerName: "Rahul S.",
    isVIP: true,
    entryFeeCoins: 500
  },
  {
    id: "club-2",
    name: "Mumbai Music & Terrace Lounges",
    icon: "🎧",
    category: "Music & Party",
    description: "For people who love live gigs, techno sessions, rooftop parties, and vinyl records.",
    membersCount: 890,
    isPrivate: false,
    ownerName: "Priya K.",
    isVIP: false
  },
  {
    id: "club-3",
    name: "3 AM Philosophy & Deep Talks",
    icon: "🌙",
    category: "Social & Dating",
    description: "A cozy open space for late-night audio calls, deep conversations, life talks, and poetry.",
    membersCount: 3100,
    isPrivate: false,
    ownerName: "Aarav M.",
    isVIP: false
  },
  {
    id: "club-4",
    name: "VIP Elite Dating & Matchmaking",
    icon: "💎",
    category: "Social & Dating",
    description: "Curated high-profile dating club. Verified members, exclusive weekend video mixers.",
    membersCount: 150,
    isPrivate: false,
    ownerName: "Neha T.",
    isVIP: true,
    entryFeeCoins: 1000
  }
];

import { useAppContext } from "../context/AppContext";

export default function ClubsPage() {
  const router = useRouter();
  const { tokens, deductTokens } = useAppContext();
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Social & Dating", "Tech & Business", "Music & Party", "Hobbies & Movies"];

  // Filter clubs based on search query and category
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleJoin = (targetClub: Club) => {
    if (targetClub.isJoined) {
      // Leave club
      setClubs(clubs.map(c => c.id === targetClub.id ? { ...c, isJoined: false, membersCount: c.membersCount - 1 } : c));
      return;
    }

    // Check if it's a Paid VIP Club
    if (targetClub.isVIP && targetClub.entryFeeCoins) {
      if (tokens < targetClub.entryFeeCoins) {
        alert(`🔒 This is a VIP Club requiring ${targetClub.entryFeeCoins} Pulse Coins. You currently have ${tokens} Coins.`);
        router.push('/checkout');
        return;
      }

      const success = deductTokens(targetClub.entryFeeCoins);
      if (success) {
        const ownerCut = Math.floor(targetClub.entryFeeCoins * 0.8); // 80% to owner
        const platformCut = targetClub.entryFeeCoins - ownerCut; // 20% to Pulse
        alert(`🎉 VIP Membership Unlocked! ${targetClub.entryFeeCoins} Coins spent (${ownerCut} to ${targetClub.ownerName}, ${platformCut} platform fee). Welcome to ${targetClub.name}!`);
      } else {
        return;
      }
    }

    // Grant membership
    setClubs(clubs.map(c => c.id === targetClub.id ? { ...c, isJoined: true, membersCount: c.membersCount + 1 } : c));
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
            <h1 className="h2" style={{ margin: 0 }}>Pulse Clubs</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Browse, search, and join open community hubs</p>
          </div>
        </div>

        <Link href="/clubs/create" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Create a Club
        </Link>
      </header>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search clubs by name or topic (e.g. Delhi, Crypto, Music)..."
          style={{ width: '100%', fontSize: '16px', padding: '16px 20px' }}
        />
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}>
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

      {/* Clubs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredClubs.map(club => (
          <div 
            key={club.id} 
            className="glass-panel"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
          >
            <div>
              {/* Icon & Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' 
                }}>
                  {club.icon}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {club.isVIP && (
                    <span style={{ 
                      fontSize: '12px', fontWeight: 700, padding: '4px 10px', 
                      borderRadius: '100px', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#000' 
                    }}>
                      👑 VIP (🪙 {club.entryFeeCoins})
                    </span>
                  )}
                  <span style={{ 
                    fontSize: '12px', fontWeight: 600, padding: '4px 10px', 
                    borderRadius: '100px', background: 'rgba(255,255,255,0.1)', color: 'var(--accent-primary)' 
                  }}>
                    {club.category}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {club.name}
              </h3>

              {/* Description */}
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                {club.description}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888' }}>
                <span>👥 {club.membersCount} members</span>
                <span>👑 Owner: {club.ownerName}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
              <button 
                onClick={() => toggleJoin(club)}
                className={club.isJoined ? "btn-outline" : "btn-primary"}
                style={{ flex: 1, padding: '10px 0', fontSize: '14px', background: club.isJoined ? undefined : (club.isVIP ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : undefined), color: club.isJoined ? undefined : (club.isVIP ? '#000' : undefined) }}
              >
                {club.isJoined ? "Leave Club" : (club.isVIP ? `Unlock VIP (${club.entryFeeCoins} 🪙)` : "Join Club")}
              </button>

              <button 
                onClick={() => router.push(`/clubs/${club.id}`)}
                className="btn-outline"
                style={{ flex: 1, padding: '10px 0', fontSize: '14px' }}
              >
                Enter Hub →
              </button>
            </div>
          </div>
        ))}

        {filteredClubs.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3>No clubs found matching "{searchQuery}"</h3>
            <p>Be the first to start a club with this name!</p>
            <Link href="/clubs/create" className="btn-primary" style={{ marginTop: '16px', display: 'inline-block', textDecoration: 'none' }}>
              Create "{searchQuery}" Club
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
