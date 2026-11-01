import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}