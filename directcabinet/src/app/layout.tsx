import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DirectCabinet - Cabinet de placement IT a marge transparente",
  description: "Le premier cabinet de placement IT a marge fixe transparente. Economisez 30% sur vos freelances. Toutes les garanties d un cabinet, sans la marge cachee.",
  keywords: "freelance IT, placement freelance, cabinet staffing transparent, consultant data, developpeur freelance",
  openGraph: {
    title: "DirectCabinet - Staffing IT transparent",
    description: "Economisez 30% sur vos freelances IT. Marge fixe de 50 euros/jour au lieu de 30% caches.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
