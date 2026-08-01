"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";

export default function NsfwChatPage() {
  const { deductTokens, tokens } = useAppContext();
  const [messages, setMessages] = useState<{id: string, text: string, sender: 'me' | 'them'}[]>([
    { id: '1', text: 'Welcome to the 18+ Private Room. Messages here cost 2 🪙 each.', sender: 'them' }
  ]);
  const [inputText, setInputText] = useState("");
  const [isWarningAccepted, setIsWarningAccepted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MSG_COST = 2;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (deductTokens(MSG_COST)) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText, sender: 'me' }]);
      setInputText("");
      
      // Mock response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: "🔥 Sounds good...", sender: 'them' }]);
      }, 1500);
    } else {
      alert(`Not enough Pulse Coins! 18+ messages cost ${MSG_COST} 🪙.`);
    }
  };

  if (!isWarningAccepted) {
    return (
      <main className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="bento-card" style={{ maxWidth: '500px', textAlign: 'center', border: '1px solid #FF5C5C', background: 'rgba(255,92,92,0.05)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔞</div>
          <h1 className="h2" style={{ color: '#FF5C5C', marginBottom: '16px' }}>Age Verification Required</h1>
          <p className="text-muted" style={{ marginBottom: '24px' }}>
            This section contains adult content and mature conversations. You must be 18 years or older to enter. Messages in this private room cost {MSG_COST} 🪙.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="/" style={{ padding: '12px 24px', background: '#333', color: '#fff', borderRadius: '100px', textDecoration: 'none', fontWeight: 600 }}>Exit</a>
            <button 
              onClick={() => setIsWarningAccepted(true)}
              style={{ padding: '12px 24px', background: '#FF5C5C', color: '#fff', borderRadius: '100px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              I am 18 or older
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', paddingBottom: '0' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, paddingBottom: '24px' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FF5C5C' }}>
          <a href="/" style={{ color: '#FF5C5C', textDecoration: 'none' }}>←</a> 
          18+ Private Room 🔞
        </h1>
        <Wallet />
      </header>

      <div className="bento-card" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px', 
        gap: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255,92,92,0.2)',
        marginBottom: '24px'
      }}>
        
        {/* Messages Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          paddingRight: '12px'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'me' ? 'rgba(255,92,92,0.2)' : '#1a1a1a',
              color: msg.sender === 'me' ? '#fff' : 'var(--text-secondary)',
              padding: '16px 20px',
              borderRadius: msg.sender === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              maxWidth: '70%',
              lineHeight: 1.5,
              border: msg.sender === 'me' ? '1px solid rgba(255,92,92,0.4)' : '1px solid rgba(255,255,255,0.05)'
            }}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message privately... (${MSG_COST} 🪙)`}
            style={{
              flex: 1,
              background: '#0a0a0a',
              border: '1px solid rgba(255,92,92,0.3)',
              borderRadius: '100px',
              padding: '16px 24px',
              color: '#fff',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit" 
            disabled={!inputText.trim() || tokens < MSG_COST}
            style={{ 
              background: '#FF5C5C', 
              color: '#fff',
              border: 'none',
              padding: '0 32px',
              borderRadius: '100px',
              fontWeight: 600,
              cursor: (!inputText.trim() || tokens < MSG_COST) ? 'not-allowed' : 'pointer',
              opacity: (!inputText.trim() || tokens < MSG_COST) ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            Send
          </button>
        </form>

      </div>
    </main>
  );
}
