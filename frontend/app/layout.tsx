import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "⚽ FIFA World Cup 2026 | AI Smart Stadium",
  description:
    "AI Powered FIFA World Cup Smart Stadium & Event Management Platform",
  keywords: [
    "FIFA",
    "World Cup",
    "AI",
    "Smart Stadium",
    "Next.js",
    "FastAPI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#071322] text-white antialiased overflow-x-hidden">
        <AuthProvider>
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-120px] left-[-120px] h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[160px]" />

            <div className="absolute bottom-[-150px] right-[-120px] h-[480px] w-[480px] rounded-full bg-cyan-500/15 blur-[160px]" />

            <div className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-[140px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
          </div>

          <Navbar />

          <main
            id="main-content"
            className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-8"
          >
            {children}
          </main>

          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}