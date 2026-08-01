import React from 'react';

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* A sleek, modern pulse/heartbeat line using the lime green UI accent color */}
        <path 
          d="M2 12H6.5L9 4L15 20L17.5 12H22" 
          stroke="var(--accent)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* A subtle glowing dot at the end of the pulse */}
        <circle cx="22" cy="12" r="3" fill="var(--accent)" />
      </svg>
      <span style={{ 
        fontSize: size * 0.8, 
        fontWeight: 700, 
        color: '#fff', 
        letterSpacing: '-1px',
        lineHeight: 1
      }}>
        Pulse.
      </span>
    </div>
  );
}
