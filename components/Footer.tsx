import React from "react";
import Link from "next/link";
import { Terminal, Github, Twitter, Cpu, Globe, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Terminal className="h-4 w-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">sycord.</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              High-performance, edge-first cloud hosting and serverless infrastructure built for modern developers.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Infrastructure Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Infrastructure</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Edge Hosting</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Cloud VPS</Link></li>
              <li><Link href="/ai-hosting" className="hover:text-cyan-400 transition-colors">GPU Serverless</Link></li>
              <li><Link href="/network" className="hover:text-cyan-400 transition-colors">Anycast DNS</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-cyan-400 transition-colors">Platform Features</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">API Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">System Status</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">SLA Guarantee</Link></li>
            </ul>
          </div>

          {/* Trust Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Security & SLA</h3>
            <div className="flex items-start gap-2.5 rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-xs leading-relaxed">
              <Shield className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">ISO 27001 Certified</p>
                <p className="text-gray-400 mt-0.5">Fully compliant data centers with 99.99% network uptime SLA guarantee.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {currentYear} Sycord Technology. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">SLA Agreement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}