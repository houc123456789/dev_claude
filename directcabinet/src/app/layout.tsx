import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DirectCabinet - Missions grands comptes, 95% du TJM pour vous",
  description: "Acces aux missions CAC40 sans passer par une ESN. Commission de 5% seulement. Gardez 95% de votre TJM. Paiement garanti a 30 jours.",
  keywords: "freelance IT, missions grands comptes, TJM freelance, consultant data, developpeur freelance, devops freelance, architecte cloud",
  authors: [{ name: "DirectCabinet" }],
  creator: "DirectCabinet",
  publisher: "DirectCabinet",
  robots: "index, follow",
  openGraph: {
    title: "DirectCabinet - Missions grands comptes, 95% du TJM",
    description: "Arretez d'enrichir les ESN. Acces direct aux missions CAC40 avec seulement 5% de commission.",
    type: "website",
    locale: "fr_FR",
    siteName: "DirectCabinet",
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectCabinet - 95% du TJM pour vous",
    description: "Missions grands comptes sans ESN. 5% de commission seulement.",
  },
  alternates: {
    canonical: "https://directcabinet.fr",
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
