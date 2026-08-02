"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import { AvatarMale, AvatarFemale, AvatarOther, VideoIcon, ClubsIcon } from "../../components/Icons";

interface Message {
  id: string;
  sender: string;
  gender: "Female" | "Male" | "Other";
  text: string;
  time: string;
}

export default function ClubRoomPage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.clubId as string;
  const { username, profile } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Rahul S.", gender: "Male", text: "Hey everyone! Welcome to the club room.", time: "10:14 PM" },
    { id: "2", sender: "Priya K.", gender: "Female", text: "Excited to connect with everyone here tonight!", time: "10:15 PM" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: profile?.displayName || username || "You",
      gender: profile?.gender === "Female" ? "Female" : profile?.gender === "Male" ? "Male" : "Other",
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
              <ClubsIcon size={20} /> Club Room
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ID: {clubId} • Live Group Chat</span>
          </div>
        </div>

        <button onClick={handleStartGroupCall} className="btn-primary">
          <VideoIcon size={16} color="#000" /> Start Group Video Call
        </button>
      </header>

      {/* Main Chat Interface */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', overflow: 'hidden' }}>
        
        {/* Messages List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {msg.gender === "Female" ? <AvatarFemale size={20} /> : msg.gender === "Male" ? <AvatarMale size={20} /> : <AvatarOther size={20} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{msg.sender}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{msg.time}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)', padding: '12px 16px', borderRadius: '4px 16px 16px 16px', fontSize: '14px', maxWidth: '80%', lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to the club room..."
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>

      </div>
    </main>
  );
}
