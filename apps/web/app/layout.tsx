import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora AI",
  description: "Build intelligent applications. Ship them like software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}