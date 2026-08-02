"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "../../lib/firebase";

export type UserProfile = {
  displayName?: string;
  bio?: string;
  age?: number;
  gender?: string;
  tokens: number;
  isPremium: boolean;
  onboardingComplete?: boolean;
};

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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();

  // 1. Listen for Firebase Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
      
      if (!firebaseUser && pathname !== '/login') {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // 2. Listen for Firestore Profile Changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        
        if (!data.onboardingComplete) {
          // Redirect to onboarding if they haven't completed it
          if (pathname !== '/onboarding') router.push('/onboarding');
        } else {
          // If onboarding is complete and they are on the login page, take them to home
          if (pathname === '/login') router.push('/');
        }
      } else {
        // Initialize new user cloud profile
        const newProfile: UserProfile = {
          tokens: 0,
          isPremium: false,
        };
        setDoc(userDocRef, newProfile, { merge: true });
        
        if (pathname !== '/onboarding') {
          router.push('/onboarding');
        }
      }
    });

    return () => unsubscribe();
  }, [user, pathname, router]);

  // Cloud Write wrappers
  const setTokens: React.Dispatch<React.SetStateAction<number>> = (value) => {
    if (!user) return;
    
    if (typeof value === "function") {
       const newVal = value(profile?.tokens || 0);
       setDoc(doc(db, "users", user.uid), { tokens: newVal }, { merge: true });
    } else {
       setDoc(doc(db, "users", user.uid), { tokens: value }, { merge: true });
    }
  };

  const setPremium = (status: boolean) => {
    if (!user) return;
    setDoc(doc(db, "users", user.uid), { isPremium: status }, { merge: true });
  };

  const deductTokens = (amount: number) => {
    if (profile && profile.tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    signOut(auth).then(() => {
      router.push('/login');
    });
  };

  // Fallbacks for UI components that rely on the old flat properties
  const tokens = profile?.tokens || 0;
  const isPremium = profile?.isPremium || false;
  const username = profile?.displayName || user?.email?.split('@')[0] || "Anonymous";
  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{ 
      user, profile, tokens, setTokens, deductTokens, 
      username, isAuthenticated, isPremium, setPremium, 
      logout, isLoading 
    }}>
      {/* Show nothing while initial auth state loads to prevent flash of login page */}
      {isLoading ? null : children}
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
