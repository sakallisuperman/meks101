import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter, Next.js 14'te tam desteklenen temel Google fontu
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "meks101",
  description: "Türk Okey 101 - 3 kişilik varyant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
