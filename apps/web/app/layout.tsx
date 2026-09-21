import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Nexora AI",
  description:
    "AI-native full-stack application platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-[#050505] text-white">
        <Navbar />

        <div id="page-scroll" className="h-[calc(100vh-73px)] overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}