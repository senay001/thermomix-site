import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thermomix TM7 | thermomutfaksefi.com",
  description: "Türkiye\'nin en akıllı mutfak robotu Thermomix TM7 için sipariş ve bilgi platformu.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{scrollBehavior: 'smooth'}}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
