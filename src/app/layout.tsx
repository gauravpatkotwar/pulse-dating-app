import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import FloatingDock from "./components/FloatingDock";
import RomanticParticles from "./components/RomanticParticles";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Pulse - Stealth Romantic Network",
  description: "Connect safely and anonymously on Pulse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>
        <AppProvider>
          <RomanticParticles />
          {children}
          <FloatingDock />
        </AppProvider>
      </body>
    </html>
  );
}
