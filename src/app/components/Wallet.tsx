"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Wallet() {
  const { tokens, setTokens } = useAppContext();

  const handleTopUp = () => {
    // Mock top-up for the demo
    const amount = parseInt(prompt("How many Pulse Coins would you like to buy? (e.g., 100)", "100") || "0");
    if (amount > 0) {
      setTokens(prev => prev + amount);
      alert(`Success! You bought ${amount} coins.`);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      background: '#1c1c1c',
      padding: '8px 16px',
      borderRadius: '100px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <span style={{ fontSize: '18px' }}>🪙</span>
      <span style={{ fontWeight: 600, color: '#C4F042' }}>{tokens}</span>
      <button 
        onClick={handleTopUp}
        style={{
          background: 'transparent',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '4px 10px',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Top Up
      </button>
    </div>
  );
}
