"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, Cpu, Globe, Server, Activity, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [ping, setPing] = useState<number | null>(null);
  const pathname = usePathname();

  // Simulate real-time latency to the nearest edge node
  useEffect(() => {
    const interval = setInterval(() => {
      const basePing = 12;
      const jitter = Math.floor(Math.random() * 5) - 2; // -2ms to +2ms
      setPing(Math.max(8, basePing + jitter));
    }, 3000);
    setPing(12);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Features", href: "/#features", icon: Cpu },
    { name: "Pricing", href: "/pricing", icon: Server },
    { name: "Global Network", href: "/network", icon: Globe },
    { name: "AI GPU Hosting", href: "/ai-hosting", icon: Terminal },
    { name: "Console Demo", href: "/dashboard", icon: Activity },
    { name: "Support", href: "/contact", icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                <Terminal className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-0.5 rounded-lg bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                sycord<span className="text-cyan-400">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-cyan-400 ${
                    isActive ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 opacity-70" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Call to Action & Live Status */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Edge Status */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Edge Active</span>
              {ping && <span className="text-emerald-500/60 border-l border-emerald-500/20 pl-2">{ping}ms</span>}
            </div>

            <Link
              href="/dashboard"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-gray-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              Launch Console
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-800 bg-gray-950/95 px-2 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
          
          <div className="border-t border-gray-800 pt-4 px-3 space-y-3">
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational (99.99%)</span>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-gray-950 hover:bg-cyan-400"
            >
              Launch Console
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}