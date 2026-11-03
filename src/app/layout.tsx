import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-loaded",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-loaded",
});

export const metadata: Metadata = {
  title: "StudioSpace | Find your space. Create your vision.",
  description:
    "A creative workspace marketplace for photographers, filmmakers, podcasters, musicians and independent creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-base-100 text-base-content">
        <div aria-hidden="true" className="grain-overlay" />
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}