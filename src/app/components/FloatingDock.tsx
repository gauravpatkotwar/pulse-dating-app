"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { 
  DiscoverIcon, 
  LiveIcon, 
  ClubsIcon, 
  MarketIcon, 
  SparksIcon, 
  ProfileIcon,
  CurrencyCoinIcon 
} from "./Icons";

export default function FloatingDock() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAppContext();

  const dockItems = [
    { label: "Discover", href: "/", icon: <DiscoverIcon size={18} /> },
    { label: "Live", href: "/live", icon: <LiveIcon size={18} />, badge: "LIVE" },
    { label: "Clubs", href: "/clubs", icon: <ClubsIcon size={18} /> },
    { label: "Market", href: "/marketplace", icon: <MarketIcon size={18} /> },
    { label: "Sparks", href: "/checkout", icon: <CurrencyCoinIcon size={18} />, value: `${profile?.tokens || 0}` },
    { label: "Profile", href: "/profile", icon: <ProfileIcon size={18} /> },
  ];

  return (
    <nav style={{
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      background: "rgba(16, 16, 16, 0.85)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "100px",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
    }}>
      {dockItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => {
              try { router.prefetch(item.href); } catch (e) {}
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "100px",
              color: isActive ? "#FFFFFF" : "#777777",
              background: isActive 
                ? "rgba(255, 255, 255, 0.15)" 
                : "transparent",
              border: isActive ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid transparent",
              textDecoration: "none",
              fontWeight: isActive ? 800 : 500,
              fontSize: "14px",
              transition: "transform 0.1s ease, background 0.1s ease",
              position: "relative",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
            <span>{item.label}</span>
            
            {item.value && (
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                background: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                padding: "2px 6px",
                borderRadius: "100px",
                marginLeft: "2px"
              }}>
                {item.value}
              </span>
            )}

            {item.badge && (
              <span style={{
                fontSize: "9px",
                fontWeight: 800,
                background: "#FFFFFF",
                color: "#000000",
                padding: "1px 5px",
                borderRadius: "100px",
                position: "absolute",
                top: "-4px",
                right: "4px"
              }}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
