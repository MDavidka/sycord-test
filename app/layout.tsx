import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Sycord | High-Performance Edge Hosting & Cloud VPS",
  description: "Deploy next-generation serverless apps, high-performance NVMe Cloud VPS, and GPU inference servers on Sycord's global edge network.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body className="font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}