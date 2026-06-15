// src/apps/web/app/[locale]/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getMessages } from 'next-intl/server';
import MissionClientWrapper from "../../components/providers/MissionClientWrapper";
import { MissionProvider } from "../../context/MissionProvider"; // Import du provider

// Polices
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Mission Spatiale - Alunissage d'urgence",
  description: "Escape game de simulation spatiale.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Récupération des messages i18n
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-hidden bg-space-950">
        {/*
            On enveloppe tout dans le MissionProvider pour Zustand/Logic
            puis dans MissionClientWrapper pour le rendu (CRT, Sockets)
        */}
        <MissionProvider>
          <MissionClientWrapper messages={messages} locale={locale}>
            {children}
          </MissionClientWrapper>
        </MissionProvider>
      </body>
    </html>
  );
}
