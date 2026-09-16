import type { Metadata } from "next";
import "./globals.css";
import { ApolloProviderWrapper } from "@/components/ApolloProvider";

export const metadata: Metadata = {
  title: "AI Native Platform",
  description: "Production-oriented AI SaaS platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
