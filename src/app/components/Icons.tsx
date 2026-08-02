import React from "react";

// Generic Icon Props
export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// 1. Discover Pulse Icon (Frequency Wave)
export function DiscoverIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H7L10 3L14 21L17 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 2. Live Broadcast Radar Signal Icon
export function LiveIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill={color} />
      <path d="M16.24 7.76A6 6 0 0 1 16.24 16.24M7.76 16.24A6 6 0 0 1 7.76 7.76" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M4.93 19.07A10 10 0 0 1 4.93 4.93" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// 3. Clubs Fortress Dome Icon
export function ClubsIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 12H5V21H19V12H22L12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V15H15V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 4. Marketplace Cube Icon
export function MarketIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6H21" stroke={color} strokeWidth="2" />
      <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 5. Pulse Sparks Starburst Icon
export function SparksIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill={color} />
    </svg>
  );
}

// 6. Profile Avatar Icon
export function ProfileIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
      <path d="M4 21V19C4 16.7909 5.79086 15 8 15H16C18.2091 15 20 16.7909 20 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Video Camera Aperture Icon
export function VideoIcon({ size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="2" />
      <path d="M16 10L22 7V17L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 8. Stealth Verified Badge Icon
export function VerifiedBadgeIcon({ size = 16, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 3.26L18.36 2.82L19.91 5.77L23 6.91L23 10.25L24.82 13.06L23.27 16.01L23.71 19.28L20.62 20.54L19.07 23.49L15.73 23.49L12.92 25.31L10.11 23.49L6.77 23.49L5.22 20.54L2.13 19.28L2.57 16.01L1.02 13.06L2.84 10.25L2.84 6.91L5.93 5.77L7.48 2.82L10.75 3.26L12 2Z" fill="rgba(255,255,255,0.15)" stroke={color} strokeWidth="1.5" />
      <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 9. Virtual Gift: Rose Icon
export function GiftRoseIcon({ size = 24, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="2" fill="rgba(255,255,255,0.1)" />
      <path d="M12 13V22M12 17C14 17 17 15 17 13M12 19C10 19 7 17 7 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 10. Virtual Gift: Diamond Icon
export function GiftDiamondIcon({ size = 24, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3L2 9L12 21L22 9L18 3H6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3L7 9L12 21L17 9L13 3" stroke={color} strokeWidth="1.5" />
      <path d="M2 9H22" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// 11. Virtual Gift: Rocket Icon
export function GiftRocketIcon({ size = 24, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 16.5C3 19.5 2 22 2 22C2 22 4.5 21 7.5 19.5L12 15L9 12L4.5 16.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15L19.5 7.5C21 6 22 2 22 2C22 2 18 3 16.5 4.5L9 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9L18 12" stroke={color} strokeWidth="2" />
    </svg>
  );
}

// 12. Virtual Gift: Crown Icon
export function GiftCrownIcon({ size = 24, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19H22L20 7L15 13L12 4L9 13L4 7L2 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

// 13. Minimalist Line-Art Avatars
export function AvatarMale({ size = 48, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="18" r="8" stroke={color} strokeWidth="2" />
      <path d="M10 40C10 32.268 16.268 26 24 26C31.732 26 38 32.268 38 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarFemale({ size = 48, color = "#FFFFFF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="7" stroke={color} strokeWidth="2" />
      <path d="M14 16C12 24 10 26 10 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M34 16C36 24 38 26 38 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 40C12 33.3726 17.3726 28 24 28C30.6274 28 36 33.3726 36 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
