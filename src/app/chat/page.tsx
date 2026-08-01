"use client";

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";

export default function ChatPage() {
  const { deductTokens, username } = useAppContext();
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [inputText, setInputText] = useState("");
  const MESSAGE_COST = 1; // It costs 1 token to send a message

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Try to deduct the cost
    const success = deductTokens(MESSAGE_COST);
    
    if (success) {
      setMessages(prev => [...prev, { sender: username, text: inputText }]);
      setInputText("");
      
      // Mock a reply
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "Lucky Fox", text: "Meow! (I mean, bark?)" }]);
      }, 1500);
    } else {
      alert(`Not enough Pulse Coins! You need ${MESSAGE_COST} coin to send a message.`);
    }
  };

  return (
    <main className="app-container" style={{ maxWidth: '800px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ color: 'var(--accent)' }}>←</a> 
          Chat with Lucky Fox
        </h1>
        <Wallet />
      </header>

      <div style={{
        flex: 1,
        background: 'var(--bg-card)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '500px'
      }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.length === 0 && (
            <p className="text-muted" style={{ textAlign: 'center', marginTop: '40px' }}>
              Send a message to start the conversation! <br/>
              <small>(Cost: {MESSAGE_COST} 🪙 per message)</small>
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.sender === username ? 'flex-end' : 'flex-start',
              background: msg.sender === username ? 'var(--accent)' : '#2a2a2a',
              color: msg.sender === username ? '#000' : '#fff',
              padding: '12px 20px',
              borderRadius: '24px',
              maxWidth: '70%',
              fontWeight: 500
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message... (Costs ${MESSAGE_COST} 🪙)`}
            style={{
              flex: 1,
              background: '#000',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              padding: '16px 24px',
              color: '#fff',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '16px'
            }}
          />
          <button className="btn-primary" onClick={handleSend} style={{ width: '60px', height: '56px', padding: 0 }}>
             ➤
          </button>
        </div>
      </div>
    </main>
  );
}
