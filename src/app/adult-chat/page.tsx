"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

export default function AdultChatPage() {
  const { deductTokens, username, isAuthenticated, isPremium } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const CHAT_COST = 2; // 2 🪙 per adult message

  // Mock initial adult chat history
  useEffect(() => {
    setMessages([
      {
        id: "1", senderId: "system", senderName: "System",
        text: "Welcome to the 18+ Adult Zone. Keep it respectful. Messages here cost 2 🪙.",
        timestamp: new Date(Date.now() - 10000)
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !isAuthenticated) return;

    if (deductTokens(CHAT_COST)) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: "me",
        senderName: username,
        text: inputText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMsg]);
      setInputText("");

      // Mock bot reply
      setTimeout(() => {
        const botReply: Message = {
          id: Date.now().toString() + "-bot",
          senderId: "bot",
          senderName: "Spicy Fox 🦊",
          text: "That's interesting... tell me more.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botReply]);
      }, 1500);
    } else {
      alert("Not enough Pulse Coins! You need 2 🪙 to send a message here.");
    }
  };

  return (
    <main className="app-container" style={{ position: 'relative' }}>
      {/* Premium Gate Modal Overlay */}
      {!isPremium && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.9)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="bento-card" style={{ maxWidth: '400px', textAlign: 'center', border: '1px solid var(--accent)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>💎</div>
            <h1 className="h2" style={{ color: 'var(--accent)', marginBottom: '8px' }}>Premium Required</h1>
            <p className="text-muted" style={{ marginBottom: '24px' }}>
              The Adult Talk section is an exclusive feature for our Premium subscribers. Upgrade your account to unlock this zone.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <a href="/"
                style={{
                  background: 'var(--accent)', color: '#000', padding: '16px', borderRadius: '100px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none'
                }}
              >
                View Premium Plans
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Age Gate Modal Overlay */}
      {isPremium && !isAgeVerified && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="bento-card" style={{ maxWidth: '400px', textAlign: 'center', border: '1px solid #FF5C5C' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔞</div>
            <h1 className="h2" style={{ color: '#FF5C5C', marginBottom: '8px' }}>Age Restricted Zone</h1>
            <p className="text-muted" style={{ marginBottom: '24px' }}>
              This section is for adults only. You must be 18 years or older to enter this chat room.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <button 
                onClick={() => setIsAgeVerified(true)}
                style={{
                  background: '#FF5C5C', color: '#fff', padding: '16px', borderRadius: '100px', fontWeight: 600, cursor: 'pointer', border: 'none'
                }}
              >
                I am 18 or older - Enter
              </button>
              <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                I am under 18 - Go Back
              </a>
            </div>
          </div>
        </div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ color: '#FF5C5C' }}>←</a> 
          <span style={{ color: '#FF5C5C' }}>18+ Adult Talk</span>
        </h1>
        <Wallet />
      </header>

      <div className="bento-grid" style={{ flex: 1, marginTop: '24px', height: 'calc(100vh - 120px)' }}>
        
        {/* Chat Area */}
        <div className="bento-card" style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', padding: 0, height: '100%', border: '1px solid rgba(255, 92, 92, 0.2)' }}>
          
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            background: 'radial-gradient(circle at top, rgba(255,92,92,0.05) 0%, transparent 50%)'
          }}>
            {messages.map(msg => {
              const isMe = msg.senderId === "me";
              const isSystem = msg.senderId === "system";
              
              if (isSystem) {
                return (
                  <div key={msg.id} style={{ textAlign: 'center', padding: '16px 0' }}>
                    <span style={{ background: 'rgba(255, 92, 92, 0.1)', color: '#FF5C5C', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600 }}>
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div key={msg.id} style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {!isMe && <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '12px' }}>{msg.senderName}</span>}
                  <div style={{
                    background: isMe ? '#FF5C5C' : '#1a1a1a',
                    color: isMe ? '#fff' : '#fff',
                    padding: '12px 16px',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    border: isMe ? 'none' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px', background: '#0a0a0a' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Send a spicy message (${CHAT_COST} 🪙)`}
              style={{
                flex: 1,
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '16px 20px',
                borderRadius: '100px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button type="submit" disabled={!inputText.trim()} style={{
              background: inputText.trim() ? '#FF5C5C' : '#333',
              color: '#fff',
              border: 'none',
              padding: '0 32px',
              borderRadius: '100px',
              fontWeight: 600,
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}>
              Send
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
