import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, Italianno } from "next/font/google";
// import AudioPlayer from "@/components/AudioPlayer";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Ovation Creative Studios",
  description: "We help choirs, music ministries, and arts organizations tell their stories with excellence.",
  icons: {
    icon: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${cormorantGaramond.variable} ${italianno.variable}`}
    >
      <body className="bg-black">
        {/* <AudioPlayer /> */}
        {children}
      </body>
    </html>
  );
}

