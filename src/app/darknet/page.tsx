"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { LockIcon, VerifiedBadgeIcon, VideoIcon, CurrencyCoinIcon } from "../components/Icons";

interface ShadowItem {
  id: string;
  name: string;
  codename: string;
  cost: number;
  description: string;
  badge: string;
}

const shadowItems: ShadowItem[] = [
  { id: "s1", name: "Ghost Spectre Aura", codename: "SPECTRE_01", cost: 200, description: "Hides your online activity footprint on global radar.", badge: "👻 GHOST" },
  { id: "s2", name: "Encrypted PGP Alias", codename: "ALIAS_PGP", cost: 150, description: "Generates a randomized cryptographic handle for anonymous rooms.", badge: "🔐 ENCRYPTED" },
  { id: "s3", name: "Cipher Key VIP Access", codename: "KEY_CIPHER", cost: 300, description: "Unlocks private encrypted video call channels.", badge: "🔑 CIPHER" },
  { id: "s4", name: "Stealth Signal Jammer", codename: "JAMMER_V2", cost: 500, description: "Prevents profile screenshots during 1-on-1 video calls.", badge: "🛡️ JAMMER" },
];

export default function DarknetPage() {
  const { profile } = useAppContext();
  const router = useRouter();
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INITIALIZING STEALTH DARKNET TERMINAL ROUTER...",
    "ESTABLISHING ENCRYPTED P2P TUNNEL...",
    "PGP KEY FINGERPRINT: 4F92-88B1-99A0-33CD",
    "STATUS: SECURE ANONYMOUS NODE ACTIVE"
  ]);
  const [roomCode, setRoomCode] = useState("");
  const [boughtItems, setBoughtItems] = useState<string[]>([]);

  const handleJoinEncryptedRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      const targetRoom = `darknet-${roomCode.trim()}`;
      setTerminalLogs(prev => [...prev, `CONNECTING TO ENCRYPTED NODE: ${targetRoom}...`]);
      setTimeout(() => {
        router.push(`/call/${targetRoom}`);
      }, 600);
    }
  };

  const handleBuyShadowItem = (item: ShadowItem) => {
    if (boughtItems.includes(item.id)) return;
    setBoughtItems(prev => [...prev, item.id]);
    setTerminalLogs(prev => [...prev, `PURCHASED ITEM: [${item.codename}] -> ${item.cost} SPARKS DEDUCTED`]);
  };

  return (
    <div style={{ minHeight: "80vh", padding: "12px 0", fontFamily: "monospace" }}>
      {/* Darknet Header Banner */}
      <div className="glass-panel glass-panel-vip animate-fade-in" style={{ padding: "32px", marginBottom: "32px", border: "1px solid rgba(255, 255, 255, 0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ background: "rgba(255, 255, 255, 0.12)", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, border: "1px solid rgba(255, 255, 255, 0.2)" }}>
                🕵️ STEALTH DARKNET NODE
              </span>
              <span style={{ color: "#888888", fontSize: "12px" }}>PGP 4096-BIT RSA ENCRYPTED</span>
            </div>
            <h1 style={{ fontSize: "32px", margin: "0 0 6px 0", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              Cyberpunk Darknet Terminal
            </h1>
            <p style={{ fontSize: "13px", color: "#888888", margin: 0, fontFamily: "sans-serif" }}>
              Anonymous encrypted video call rooms, cryptographic alias generation, and shadow perks.
            </p>
          </div>

          <Link href="/" className="btn-outline" style={{ textDecoration: "none", fontSize: "12px" }}>
            ← Exit Darknet Mode
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "28px" }}>
        
        {/* Left Column: Encrypted Room Terminal & Shadow Market */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Encrypted Room Terminal Joiner */}
          <div className="glass-panel animate-fade-in" style={{ padding: "28px", background: "rgba(8, 8, 8, 0.95)" }}>
            <div style={{ fontSize: "11px", color: "#888888", marginBottom: "8px", fontWeight: 800 }}>
              01 // ANONYMOUS ENCRYPTED ROOM TERMINAL
            </div>
            <h2 style={{ fontSize: "22px", margin: "0 0 16px 0" }}>Join Encrypted Shadow Channel</h2>

            <form onSubmit={handleJoinEncryptedRoom} style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="ENTER SECRET CIPHER ROOM CODE (e.g. ALPHA-99)"
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  color: "#FFFFFF",
                  fontFamily: "monospace",
                  fontSize: "13px"
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "14px 24px", fontSize: "13px" }}>
                <LockIcon size={16} color="#000" /> Connect
              </button>
            </form>
          </div>

          {/* Shadow Perks Market */}
          <div>
            <div style={{ fontSize: "11px", color: "#888888", marginBottom: "12px", fontWeight: 800 }}>
              02 // SHADOW MARKET (EXCHANGE SPARKS FOR STEALTH PERKS)
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {shadowItems.map((item) => {
                const isOwned = boughtItems.includes(item.id);
                return (
                  <div key={item.id} className="glass-panel glass-panel-vip animate-fade-in" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#888888" }}>[{item.codename}]</span>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#FFFFFF", background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "4px" }}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "16px", margin: "0 0 6px 0", color: "#FFFFFF", fontFamily: "sans-serif" }}>{item.name}</h3>
                      <p style={{ fontSize: "12px", color: "#888888", fontFamily: "sans-serif", margin: "0 0 16px 0", lineHeight: "1.5" }}>
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleBuyShadowItem(item)}
                      className={isOwned ? "btn-outline" : "btn-primary"}
                      style={{ width: "100%", padding: "10px", fontSize: "12px" }}
                    >
                      {isOwned ? "✅ Perk Activated" : `Unlock for ${item.cost} Sparks`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Terminal Telemetry Output */}
        <div className="glass-panel animate-fade-in" style={{ padding: "24px", background: "#050505", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#FFFFFF" }}>💻 LIVE TELEMETRY</span>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 0 8px #FFF" }}></span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", color: "#AAAAAA" }}>
              {terminalLogs.map((log, index) => (
                <div key={index} style={{ wordBreak: "break-all" }}>
                  <span style={{ color: "#666666" }}>[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px", marginTop: "20px", fontSize: "11px", color: "#666666", textAlign: "center" }}>
            PULSE STEALTH ENGINE V4.2 • ZERO LOGS
          </div>
        </div>

      </div>
    </div>
  );
}
