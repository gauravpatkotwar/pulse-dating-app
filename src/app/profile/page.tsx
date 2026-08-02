"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import styles from "../../page.module.css";
import { useAppContext } from "../context/AppContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile } = useAppContext();

  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Populate form with existing data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setAge(profile.age?.toString() || "");
      setGender(profile.gender || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage("");

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        displayName,
        age: parseInt(age) || null,
        gender,
        bio,
      });
      setMessage("Profile updated successfully!");
    } catch (error: any) {
      console.error(error);
      setMessage("Error updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || !profile) {
    return <div style={{ color: "white", padding: "2rem", textAlign: "center" }}>Loading profile...</div>;
  }

  return (
    <main className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="bento-card" style={{ width: '100%', maxWidth: '500px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="h2" style={{ margin: 0 }}>My Profile</h2>
          <button 
            onClick={() => router.push('/')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            ✕ Close
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '80px' }}>
            {gender === 'Female' ? '👩' : (gender === 'Male' ? '👦' : '🧑')}
          </span>
          <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>Your Avatar</p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={styles.inputField} 
              style={{ width: '100%' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={styles.inputField}
                style={{ width: '100%' }}
                required 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.inputField}
                style={{ width: '100%', appearance: 'none' }}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.inputField}
              style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
              placeholder="Tell others about yourself..."
            />
          </div>

          {message && (
            <p style={{ 
              color: message.includes("Error") ? "#FF5C5C" : "var(--accent-lime)", 
              textAlign: "center", 
              margin: 0 
            }}>
              {message}
            </p>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '8px' }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}
