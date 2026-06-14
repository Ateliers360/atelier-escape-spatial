import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getMessages } from 'next-intl/server';
import MissionClientWrapper from "../../components/providers/MissionClientWrapper";

// Polices (Côté Serveur)
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

// Metadata (Côté Serveur - OK)
export const metadata: Metadata = {
  title: "Mission Spatiale - Alunissage d'urgence",
  description: "Escape game de simulation spatiale.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Les params sont une Promise dans les dernières versions de Next.js
}) {
  const { locale } = await params;

  // Récupération des messages sur le serveur
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-hidden">
        <MissionClientWrapper messages={messages} locale={locale}>
          {children}
        </MissionClientWrapper>
      </body>
    </html>
  );
}
