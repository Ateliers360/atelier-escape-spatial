// src/apps/web/app/layout.tsx
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import RootLayout from "./[locale]/layout";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html className={inter.className}>
      <body>
        <RootLayout params={params}>{children}</RootLayout>
      </body>
    </html>
  );
}
