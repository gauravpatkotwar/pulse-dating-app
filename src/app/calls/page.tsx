"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import Wallet from "../components/Wallet";

export default function CallsPage() {
  const { deductTokens, username } = useAppContext();
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const CALL_COST = 5;

  // Access user's local camera
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (callStatus !== "idle" && !isVideoOff) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(s => {
          stream = s;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera error:", err));
    }
    
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [callStatus, isVideoOff]);

  const initiateCall = () => {
    if (deductTokens(CALL_COST)) {
      setCallStatus("calling");
      // Simulate answering after 3 seconds
      setTimeout(() => {
        setCallStatus("connected");
      }, 3000);
    } else {
      alert(`Not enough Pulse Coins! A video call costs ${CALL_COST} 🪙.`);
    }
  };

  const endCall = () => {
    setCallStatus("idle");
  };

  return (
    <main className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ color: 'var(--accent)' }}>←</a> 
          Video & Audio
        </h1>
        <Wallet />
      </header>

      <div className="bento-grid" style={{ flex: 1, marginTop: '24px' }}>
        
        {/* Main Video Area */}
        <div className="bento-card" style={{ gridColumn: 'span 8', minHeight: '600px', display: 'flex', flexDirection: 'column', padding: 0, position: 'relative', background: '#000' }}>
          
          {callStatus === "idle" && (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📞</div>
              <h2 className="h3">Ready to Connect?</h2>
              <p className="text-muted" style={{ marginBottom: '24px' }}>Start an anonymous video call. Costs {CALL_COST} 🪙</p>
              <button className="btn-primary" onClick={initiateCall} style={{ padding: '16px 40px', fontSize: '18px' }}>
                Start Call (5 🪙)
              </button>
            </div>
          )}

          {callStatus === "calling" && (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <div className="avatarPlaceholder" style={{ fontSize: '80px', marginBottom: '16px' }}>🦊</div>
              <h2 className="h3">Calling Lucky Fox...</h2>
              <p className="text-muted">Connecting securely peer-to-peer</p>
            </div>
          )}

          {callStatus === "connected" && (
            <div style={{ width: '100%', height: '100%', background: '#111', position: 'relative' }}>
              {/* Mock Remote Video (Animated gradient for demo) */}
              <div style={{ 
                width: '100%', height: '100%', 
                background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                 <span style={{ fontSize: '120px', opacity: 0.5 }}>🦊</span>
              </div>
              <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '100px', color: '#C4F042' }}>
                ● 00:14
              </div>
            </div>
          )}

          {/* Local Video Picture-in-Picture */}
          {callStatus !== "idle" && (
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              width: '200px',
              height: '300px',
              background: '#222',
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {!isVideoOff ? (
                <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
              ) : (
                <span style={{ fontSize: '40px' }}>{username[0]?.toUpperCase() || 'A'}</span>
              )}
            </div>
          )}
        </div>

        {/* Call Controls Sidebar */}
        <div className="bento-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 className="h3">Call Controls</h2>
            <p className="text-muted">Manage your connection and privacy</p>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              disabled={callStatus === "idle"}
              style={{
                background: isMuted ? 'rgba(255,92,92,0.1)' : '#1a1a1a',
                color: isMuted ? '#FF5C5C' : '#fff',
                padding: '24px', borderRadius: '24px', fontSize: '18px', fontWeight: 600,
                border: `1px solid ${isMuted ? '#FF5C5C' : 'rgba(255,255,255,0.1)'}`,
                cursor: callStatus === "idle" ? 'not-allowed' : 'pointer',
                opacity: callStatus === "idle" ? 0.5 : 1
              }}
            >
              {isMuted ? '🔇 Unmute Microphone' : '🎙️ Mute Microphone'}
            </button>

            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              disabled={callStatus === "idle"}
              style={{
                background: isVideoOff ? 'rgba(255,92,92,0.1)' : '#1a1a1a',
                color: isVideoOff ? '#FF5C5C' : '#fff',
                padding: '24px', borderRadius: '24px', fontSize: '18px', fontWeight: 600,
                border: `1px solid ${isVideoOff ? '#FF5C5C' : 'rgba(255,255,255,0.1)'}`,
                cursor: callStatus === "idle" ? 'not-allowed' : 'pointer',
                opacity: callStatus === "idle" ? 0.5 : 1
              }}
            >
              {isVideoOff ? '📷 Turn Video On' : '📸 Turn Video Off'}
            </button>
            
            {callStatus !== "idle" && (
              <button 
                onClick={endCall}
                style={{
                  background: '#FF5C5C', color: '#fff', padding: '24px', borderRadius: '24px', fontSize: '18px', fontWeight: 600, cursor: 'pointer', marginTop: 'auto'
                }}
              >
                End Call
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
