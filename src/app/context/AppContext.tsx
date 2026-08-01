"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type AppContextType = {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
  deductTokens: (amount: number) => boolean;
  username: string;
  isAuthenticated: boolean;
  login: (email: string) => void;
  loginAnonymous: () => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<number>(0);
  const [username, setUsername] = useState<string>("Anonymous Fox");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedTokens = localStorage.getItem("pulse_tokens");
    if (savedTokens) setTokens(parseInt(savedTokens));
    
    const savedAuth = localStorage.getItem("pulse_auth");
    const savedUser = localStorage.getItem("pulse_user");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      if (savedUser) setUsername(savedUser);
    } else if (pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  useEffect(() => {
    localStorage.setItem("pulse_tokens", tokens.toString());
  }, [tokens]);

  const deductTokens = (amount: number) => {
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };
  
  const login = (email: string) => {
    setIsAuthenticated(true);
    setUsername(email.split('@')[0]);
    localStorage.setItem("pulse_auth", "true");
    localStorage.setItem("pulse_user", email.split('@')[0]);
    router.push('/');
  };
  
  const loginAnonymous = () => {
    setIsAuthenticated(true);
    setUsername("Anonymous_" + Math.floor(Math.random() * 1000));
    localStorage.setItem("pulse_auth", "true");
    localStorage.setItem("pulse_user", "Anonymous");
    router.push('/');
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("pulse_auth");
    router.push('/login');
  };

  return (
    <AppContext.Provider value={{ tokens, setTokens, deductTokens, username, isAuthenticated, login, loginAnonymous, logout }}>
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
