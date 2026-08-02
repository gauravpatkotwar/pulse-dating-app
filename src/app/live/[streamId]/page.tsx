"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";

interface Gift {
  id: string;
  name: string;
  emoji: string;
  coins: number;
}

const giftsCatalog: Gift[] = [
  { id: "g1", name: "Rose", emoji: "🌹", coins: 10 },
  { id: "g2", name: "Diamond", emoji: "💎", coins: 50 },
  { id: "g3", name: "Rocket", emoji: "🚀", coins: 200 },
  { id: "g4", name: "Gold Crown", emoji: "👑", coins: 1000 },
];

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  isGift?: boolean;
}

export default function LiveRoomPage() {
  const router = useRouter();
  const params = useParams();
  const streamId = params.streamId as string;
  const { tokens, deductTokens, profile, username } = useAppContext();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", user: "Rahul S.", avatar: "👦", text: "Hey! Loving the stream tonight 🔥" },
    { id: "2", user: "Priya K.", avatar: "👩", text: "Can you play that track again?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [flyingGift, setFlyingGift] = useState<{ sender: string; gift: Gift } | null>(null);
  const [totalStreamCoins, setTotalStreamCoins] = useState(8400);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: profile?.displayName || username || "Viewer",
        avatar: profile?.gender === "Female" ? "👩" : "👦",
        text: inputText.trim(),
      },
    ]);
    setInputText("");
  };

  const handleSendGift = (gift: Gift) => {
    if (tokens < gift.coins) {
      alert(`Insufficient Pulse Coins! You need ${gift.coins} Coins to send a ${gift.emoji} ${gift.name}.`);
      router.push("/checkout");
      return;
    }

    const success = deductTokens(gift.coins);
    if (success) {
      const senderName = profile?.displayName || username || "Viewer";
      const hostCut = Math.floor(gift.coins * 0.8);

      setTotalStreamCoins((prev) => prev + hostCut);

      // Trigger flying gift animation
      setFlyingGift({ sender: senderName, gift });

      // Add gift message to live chat stream
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          user: senderName,
          avatar: profile?.gender === "Female" ? "👩" : "👦",
          text: `sent ${gift.emoji} ${gift.name} (${gift.coins} Coins)!`,
          isGift: true,
        },
      ]);

      // Hide flying gift animation after 3 seconds
      setTimeout(() => {
        setFlyingGift(null);
      }, 3000);
    }
  };

  return (
    <main className="app-container" style={{ height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>
      {/* Header Bar */}
      <header className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => router.push("/live")} style={{ background: "transparent", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}>
            ←
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>👩</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                Sophia R. <span style={{ color: "#1D9BF0", fontSize: "14px" }}>✓</span>
              </h2>
              <span style={{ fontSize: "12px", color: "var(--accent-primary)" }}>🪙 {totalStreamCoins.toLocaleString()} Host Coins</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#FF5C5C", color: "white", padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="live-dot" style={{ background: "#FFF" }} /> 1,420 VIEWERS
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", padding: "6px 14px", borderRadius: "100px", border: "1px solid var(--card-border)" }}>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>🪙 {tokens}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Coins</span>
          </div>
        </div>
      </header>

      {/* Broadcast Viewport & Side Chat Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", flex: 1, minHeight: 0, position: "relative" }}>
        
        {/* Stream Video Container */}
        <div className="glass-panel" style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080a", padding: 0 }}>
          {/* Simulated HD Stream Viewport */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "120px", marginBottom: "16px" }}>🎸</div>
            <h3 style={{ margin: 0, fontSize: "24px" }}>Sophia's Live DJ & Music Chill Lounge</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>Live P2P Stream • HD 1080p</p>
          </div>

          {/* Flying Gift Animation Overlay */}
          {flyingGift && (
            <div
              className="animate-fade-in"
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(135deg, rgba(255,215,0,0.9) 0%, rgba(255,92,92,0.9) 100%)",
                padding: "20px 40px",
                borderRadius: "100px",
                boxShadow: "0 0 50px rgba(255,215,0,0.5)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "#000",
                zIndex: 100,
              }}
            >
              <span style={{ fontSize: "48px" }}>{flyingGift.gift.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "20px" }}>{flyingGift.sender}</div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>
                  sent {flyingGift.gift.name} ({flyingGift.gift.coins} Coins)!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Chat & Gift Tray Sidebar */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", padding: "16px", height: "100%" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>Live Stream Chat</h3>

          {/* Messages Feed */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingRight: "4px" }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "13px" }}>
                <span style={{ fontSize: "18px" }}>{msg.avatar}</span>
                <div>
                  <span style={{ fontWeight: 700, marginRight: "6px" }}>{msg.user}:</span>
                  <span style={{ color: msg.isGift ? "var(--accent-gold)" : "#E0E0E0", fontWeight: msg.isGift ? 700 : 400 }}>
                    {msg.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Send Chat Form */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "8px", marginTop: "12px", marginBottom: "16px" }}>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Comment on live..." style={{ flex: 1, fontSize: "13px", padding: "10px 14px" }} />
            <button type="submit" className="btn-outline" style={{ padding: "0 16px", fontSize: "13px" }}>
              Send
            </button>
          </form>

          {/* Virtual Gift Tray */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--card-border)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "8px", color: "var(--accent-gold)" }}>
              🎁 SEND VIRTUAL GIFTS (80% TO HOST)
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {giftsCatalog.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="btn-outline"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "8px",
                    borderRadius: "12px",
                    borderColor: "rgba(255,215,0,0.2)",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{gift.emoji}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, marginTop: "2px" }}>{gift.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--accent-primary)" }}>🪙 {gift.coins}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
