import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "Hexing Inventory",
  description: "Inventory Information System for Hexing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garamond.variable} antialiased`}
      >
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
