"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

export default function ClubRoomPage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.clubId as string;
  const { username, profile } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Rahul S.", avatar: "👦", text: "Hey everyone! Welcome to the club room.", time: "10:14 PM" },
    { id: "2", sender: "Priya K.", avatar: "👩", text: "Excited to connect with everyone here tonight!", time: "10:15 PM" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: profile?.displayName || username || "You",
      avatar: profile?.gender === "Female" ? "👩" : "👦",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleStartGroupCall = () => {
    const roomCode = `club-${clubId}-${Math.random().toString(36).substring(2, 6)}`;
    router.push(`/call/${roomCode}`);
  };

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 48px)' }}>
      {/* Club Header */}
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => router.push('/clubs')} 
            style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '24px', cursor: 'pointer' }}
          >
            ←
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🏰 Club Room: <span style={{ color: 'var(--accent-primary)' }}>{clubId}</span>
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>● 14 Members Online</span>
          </div>
        </div>

        <button onClick={handleStartGroupCall} className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
          🎙️ Start Group Voice Call
        </button>
      </header>

      {/* Main Chat & Sidebar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px', flex: 1, minHeight: 0 }}>
        
        {/* Chat Feed */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '20px', height: '100%' }}>
          
          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '24px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {msg.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{msg.sender}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{msg.time}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', fontSize: '14px', lineHeight: 1.4, color: '#e0e0e0', maxWidth: '500px' }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message the club..."
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>
              Send
            </button>
          </form>
        </div>

        {/* Members Roster Sidebar */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Club Members</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <span>👑</span> <span style={{ fontWeight: 600 }}>Rahul S.</span> <span style={{ fontSize: '11px', color: 'var(--accent-primary)' }}>(Owner)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <span>👩</span> <span>Priya K.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <span>👦</span> <span>Aarav M.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <span>👩</span> <span>Neha T.</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
