import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navigation/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Yelave | AI/ML Engineer & Developer",
  description: "Portfolio of Yash Yelave - Intelligence in Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
