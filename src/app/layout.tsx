import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}