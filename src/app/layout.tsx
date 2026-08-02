import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import FloatingDock from "./components/FloatingDock";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Pulse - Matte Black Stealth Network",
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
          {children}
          <FloatingDock />
        </AppProvider>
      </body>
    </html>
  );
}
