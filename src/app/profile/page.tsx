"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";
import { AvatarFemale, AvatarMale, AvatarOther, InstagramIcon, FacebookIcon, TikTokIcon, YouTubeIcon, WebsiteIcon } from "../components/Icons";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile } = useAppContext();

  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  // Social Media Links state
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Populate form with existing data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setAge(profile.age?.toString() || "");
      setGender(profile.gender || "");
      setBio(profile.bio || "");

      if (profile.socialLinks) {
        setInstagram(profile.socialLinks.instagram || "");
        setFacebook(profile.socialLinks.facebook || "");
        setTiktok(profile.socialLinks.tiktok || "");
        setYoutube(profile.socialLinks.youtube || "");
        setWebsite(profile.socialLinks.website || "");
      }
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage("");

    const socialLinks = {
      instagram,
      facebook,
      tiktok,
      youtube,
      website
    };

    try {
      if (user.uid !== 'mock-user-id') {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          displayName,
          age: parseInt(age) || null,
          gender,
          bio,
          socialLinks
        });
      }
      // Local state update for mock user
      if (profile) {
        profile.displayName = displayName;
        profile.age = parseInt(age) || undefined;
        profile.gender = gender;
        profile.bio = bio;
        profile.socialLinks = socialLinks;
      }
      setMessage("Profile & Social Links updated successfully!");
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
    <main className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 24px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '540px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="h2" style={{ margin: 0 }}>Edit Stealth Profile</h2>
          <button 
            onClick={() => router.push('/')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '18px' }}
          >
            ✕ Close
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            {gender === 'Female' ? <AvatarFemale size={48} /> : (gender === 'Male' ? <AvatarMale size={48} /> : <AvatarOther size={48} />)}
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '13px' }}>Your Stealth Avatar</p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ width: '100%' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ width: '100%' }}
                required 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ width: '100%' }}
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
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* Social Media App Links Section */}
          <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "16px", marginTop: "8px" }}>
            <label style={{ display: "block", marginBottom: "12px", color: "#FFFFFF", fontSize: "14px", fontWeight: 800 }}>
              🔗 Connected App & Social Links (Publicly Clickable)
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <InstagramIcon size={20} />
                <input 
                  type="url" 
                  value={instagram} 
                  onChange={(e) => setInstagram(e.target.value)} 
                  placeholder="https://instagram.com/yourhandle" 
                  style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }} 
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FacebookIcon size={20} />
                <input 
                  type="url" 
                  value={facebook} 
                  onChange={(e) => setFacebook(e.target.value)} 
                  placeholder="https://facebook.com/yourprofile" 
                  style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }} 
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TikTokIcon size={20} />
                <input 
                  type="url" 
                  value={tiktok} 
                  onChange={(e) => setTiktok(e.target.value)} 
                  placeholder="https://tiktok.com/@yourhandle" 
                  style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }} 
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <YouTubeIcon size={20} />
                <input 
                  type="url" 
                  value={youtube} 
                  onChange={(e) => setYoutube(e.target.value)} 
                  placeholder="https://youtube.com/@yourchannel" 
                  style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }} 
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <WebsiteIcon size={20} />
                <input 
                  type="url" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  placeholder="https://yourwebsite.com" 
                  style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }} 
                />
              </div>
            </div>
          </div>

          {message && (
            <div style={{ 
              color: message.includes('Error') ? 'var(--accent-danger)' : '#FFFFFF', 
              fontSize: '14px', 
              textAlign: 'center',
              fontWeight: 700 
            }}>
              {message}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={isSaving} style={{ marginTop: '8px' }}>
            {isSaving ? 'Saving Changes...' : 'Save Profile & Social Links'}
          </button>
        </form>
      </div>
    </main>
  );
}
