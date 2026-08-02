"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAppContext } from "../context/AppContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile } = useAppContext();
  
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If they already completed onboarding, redirect to home
    if (profile?.onboardingComplete) {
      router.push('/');
    }
  }, [profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        age: parseInt(age),
        gender,
        bio,
        onboardingComplete: true
      }, { merge: true });
      
      router.push('/');
    } catch (err) {
      console.error("Error saving profile", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-main)',
      padding: '24px'
    }}>
      <div className="bento-card" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <h1 className="h2" style={{ marginBottom: '8px' }}>Create Your Profile</h1>
          <p className="text-muted">Tell us a bit about yourself so others can connect with you.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="How should we call you?"
              required
              maxLength={30}
              style={{
                background: '#000', border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 16px', borderRadius: '12px', color: '#fff',
                outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Age</label>
              <input 
                type="number" 
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="18"
                required
                min={18}
                max={120}
                style={{
                  background: '#000', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 16px', borderRadius: '12px', color: '#fff',
                  outline: 'none', fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Gender</label>
              <select 
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
                style={{
                  background: '#000', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 16px', borderRadius: '12px', color: '#fff',
                  outline: 'none', fontFamily: 'inherit', appearance: 'none'
                }}
              >
                <option value="" disabled>Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Bio</label>
            <textarea 
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="What are you looking for?"
              required
              rows={4}
              maxLength={300}
              style={{
                background: '#000', border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 16px', borderRadius: '12px', color: '#fff',
                outline: 'none', fontFamily: 'inherit', resize: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving Profile..." : "Complete Setup"}
          </button>
        </form>

      </div>
    </div>
  );
}
