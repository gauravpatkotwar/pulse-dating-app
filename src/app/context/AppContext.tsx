"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "../../lib/firebase";

export interface UserProfile {
  tokens: number;
  isPremium: boolean;
  onboardingComplete?: boolean;
  displayName?: string;
  age?: number;
  gender?: string;
  bio?: string;
  
  // Social Links
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
  };

  // Platform Entry Pass & Heavy Profile Data
  isActivated?: boolean; // ₹1 Platform Entry Pass
  isVerified?: boolean;
  subscriberCount?: number;
  gallery?: string[]; // Array of image URLs
  lockedContent?: {
    id: string;
    url: string;
    priceTokens: number;
  }[];
  subscriptionPrice?: number;
}

type AppContextType = {
  user: User | null;
  profile: UserProfile | null;
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
  deductTokens: (amount: number) => boolean;
  username: string;
  isAuthenticated: boolean;
  isPremium: boolean;
  setPremium: (status: boolean) => void;
  logout: () => void;
  isLoading: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({ uid: 'mock-user-id', email: 'test@pulse.app' });
  const [profile, setProfile] = useState<UserProfile | null>({
    tokens: 1500,
    isPremium: true,
    isActivated: true, // ₹1 Entry Fee Paid
    onboardingComplete: true,
    displayName: "Jane Doe",
    age: 24,
    gender: "Female",
    bio: "Just here to make some real connections and share exclusive content.",
    isVerified: true,
    subscriberCount: 1420,
    subscriptionPrice: 50,
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
      website: "https://pulse.app"
    },
    gallery: [],
    lockedContent: []
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  // Cloud Write wrappers (Mocked for now)
  const setTokens: React.Dispatch<React.SetStateAction<number>> = (value) => {
    if (typeof value === "function") {
       setProfile(prev => prev ? { ...prev, tokens: value(prev.tokens) } : prev);
    } else {
       setProfile(prev => prev ? { ...prev, tokens: value } : prev);
    }
  };

  const setPremium = (status: boolean) => {
    setProfile(prev => prev ? { ...prev, isPremium: status } : prev);
  };

  const deductTokens = (amount: number) => {
    if (profile && profile.tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    // Mock logout just clears the user for testing
    setUser(null);
    router.push('/login');
  };

  // Fallbacks for UI components that rely on the old flat properties
  const tokens = profile?.tokens || 0;
  const isPremium = profile?.isPremium || false;
  const username = profile?.displayName || "Jane Doe";
  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{ 
      user, profile, tokens, setTokens, deductTokens, 
      username, isAuthenticated, isPremium, setPremium, 
      logout, isLoading 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
