import type { Metadata } from "next";
import { Lato } from "next/font/google";
import MobileBottomNav from "./components/MobileBottomNav";
import "./globals.css";
import LoginModal from "@/app/components/modals/LoginModal"; 
import RegisterModal from "@/app/components/modals/RegisterModal"; // Import it
import Navbar from "@/app/components/Navbar";
import MobileHeader from "./components/MobileHeader";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 2. Replace Geist variables with lato.variable */}
      <body className={`${lato.variable} antialiased font-sans`}>
        <LoginModal /> 
        <RegisterModal />
        <Navbar />
        <MobileHeader />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}