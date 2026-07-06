/**
 * Root Layout — wraps every page with the shared Nav and Footer.
 *
 * Next.js App Router: this file is the outermost shell.
 * Every page is rendered inside the {children} slot.
 *
 * Google Fonts are loaded via the `next/font` package — they're inlined as
 * CSS variables at build time, so no extra network request is needed.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/presentation/components/Nav";
import Footer from "@/presentation/components/Footer";

// next/font automatically optimises and self-hosts the font.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyen Quoc Cong — Portfolio",
  description:
    "Mobile & Full Stack Developer specialising in Flutter, React Native, and modern web technologies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://congnguyen.vercel.app",
    siteName: "Cong Nguyen Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect hints are managed automatically by next/font — nothing extra needed here. */}
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
