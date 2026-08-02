"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function Wallet() {
  const { tokens } = useAppContext();
  const router = useRouter();

  const handleTopUp = () => {
    router.push('/checkout');
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
