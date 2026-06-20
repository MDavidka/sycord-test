"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Terminal, Cpu, Globe, Server, Zap, Shield, ChevronRight, 
  ArrowRight, Play, CheckCircle2, AlertCircle, RefreshCw, Layers, Database 
} from "lucide-react";

export default function HomePage() {
  // Configurator State
  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [storage, setStorage] = useState(80);
  const [bandwidth, setBandwidth] = useState(3);
  const [vpsPrice, setVpsPrice] = useState(16);

  // Terminal Simulation State
  const [terminalState, setTerminalState] = useState<"idle" | "connecting" | "cloning" | "building" | "deploying" | "success">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Latency Test State
  const [pinging, setPinging] = useState(false);
  const [latencies, setLatencies] = useState<{ [key: string]: number | string }>({
    "New York (US-East)": "--",
    "Frankfurt (EU-Central)": "--",
    "Tokyo (AP-Northeast)": "--",
    "Singapore (AP-Southeast)": "--",
    "London (UK-West)": "--",
  });

  // Calculate VPS Price dynamically
  useEffect(() => {
    const basePrice = 4; // minimum price
    const cpuCost = (cpu - 1) * 6;
    const ramCost = (ram - 1) * 2;
    const storageCost = (storage - 20) * 0.10;
    const bandwidthCost = (bandwidth - 1) * 2;
    const total = basePrice + cpuCost + ramCost + storageCost + bandwidthCost;
    setVpsPrice(Math.round(total));
  }, [cpu, ram, storage, bandwidth]);

  // Terminal deployment simulation
  const runDeploymentSim = () => {
    if (terminalState !== "idle") return;
    setTerminalState("connecting");
    setTerminalLogs(["Connecting to container sycord-project-prod via SSH on port 32768...", "Authenticating with Ed25519 SSH Key..."]);

    setTimeout(() => {
      setTerminalState("cloning");
      setTerminalLogs(prev => [
        ...prev,
        "✓ Authenticated as user 'sycord'",
        "Cloning repository github.com/sycord/nextjs-boilerplate...",
        "Receiving objects: 100% (452/452), done.",
        "pnpm install --frozen-lockfile"
      ]);
    }, 1500);

    setTimeout(() => {
      setTerminalState("building");
      setTerminalLogs(prev => [
        ...prev,
        "✓ Installed 25 dependencies in 0.8s",
        "npm run build",
        "Creating an optimized production build...",
        "✓ Compiled successfully.",
        "✓ Standalone server output generated inside .next/standalone"
      ]);
    }, 3500);

    setTimeout(() => {
      setTerminalState("deploying");
      setTerminalLogs(prev => [
        ...prev,
        "sycord-deploy",
        "🚀 [Sycord Deploy] Packaging build files into build.tar.gz...",
        "🌐 [Sycord Deploy] Publishing to Edge CDN (sycord.site)...",
        "Unpacking tarball at /var/www/sycord.site/sycord-project-prod..."
      ]);
    }, 6000);

    setTimeout(() => {
      setTerminalState("success");
      setTerminalLogs(prev => [
        ...prev,
        "✅ [Sycord Deploy] Site successfully published!",
        "🔗 Live Link: https://sycord-project-prod.sycord.site"
      ]);
    }, 8500);
  };

  const resetTerminal = () => {
    setTerminalState("idle");
    setTerminalLogs([]);
  };

  // Global Ping Test
  const runPingTest = () => {
    setPinging(true);
    const regions = Object.keys(latencies);
    
    regions.forEach((region, index) => {
      setLatencies(prev => ({ ...prev, [region]: "Pinging..." }));
      
      setTimeout(() => {
        let base = 10;
        if (region.includes("New York")) base = 14;
        else if (region.includes("Frankfurt")) base = 8;
        else if (region.includes("Tokyo")) base = 120;
        else if (region.includes("Singapore")) base = 145;
        else if (region.includes("London")) base = 32;

        const jitter = Math.floor(Math.random() * 8) - 4;
        const result = Math.max(4, base + jitter);
        
        setLatencies(prev => ({ ...prev, [region]: result }));
        
        if (index === regions.length - 1) {
          setPinging(false);
        }
      }, 500 + index * 300);
    });
  };

  return (
    <div className="relative overflow-hidden bg-gray-950 min-h-screen">
      
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 cyber-grid animate-grid-move pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            {/* Announcement Badge */}
            <div className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-400">
              <span className="font-semibold">Sycord Engine v2.0</span>
              <span className="h-3 w-px bg-cyan-500/20" />
              <span className="flex items-center gap-1 hover:text-cyan-300">
                SSH-Native Workspaces <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Edge Hosting & Cloud VPS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Reimagined</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              Deploy serverless web applications, high-performance NVMe cloud servers, and GPU inference nodes on an isolated, SSH-key secured container network. Build fast, scale instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto rounded-lg bg-cyan-500 px-6 py-3 text-center font-semibold text-gray-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Launch Console
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto rounded-lg border border-gray-800 bg-gray-900/50 px-6 py-3 text-center font-semibold text-white transition-all hover:bg-gray-900 hover:border-gray-700"
              >
                View Pricing
              </Link>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-800/60 pt-8 mt-4 text-left max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white">99.99%</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Uptime SLA</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">&lt; 15ms</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Global Latency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">NVMe Storage</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Interactive SSH Terminal Simulation */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto">
            <div className="relative rounded-xl border border-gray-800 bg-gray-950/90 shadow-2xl p-1 overflow-hidden cyber-glow-cyan">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900 bg-gray-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> sycord@console-vps
                </span>
                <span className="w-14" /> {/* Spacer */}
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-gray-300 min-h-[300px] flex flex-col justify-between bg-gray-950/50">
                <div className="space-y-2 leading-relaxed overflow-y-auto max-h-[260px] no-scrollbar">
                  {terminalLogs.length === 0 ? (
                    <div className="text-gray-500 italic">
                      Click the "Trigger Deployment" button below to simulate our automated SSH + Git build and deploy pipeline.
                    </div>
                  ) : (
                    terminalLogs.map((log, i) => (
                      <div 
                        key={i} 
                        className={`${
                          log.startsWith("✓") || log.startsWith("✅") ? "text-emerald-400" :
                          log.startsWith("🚀") || log.startsWith("🌐") ? "text-cyan-400" :
                          log.startsWith("⚠️") ? "text-amber-400" : "text-gray-300"
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                  {terminalState !== "idle" && terminalState !== "success" && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>

                {/* Terminal Footer Controls */}
                <div className="mt-6 pt-4 border-t border-gray-900 flex items-center justify-between gap-4">
                  {terminalState === "idle" ? (
                    <button
                      onClick={runDeploymentSim}
                      className="flex items-center gap-2 rounded bg-cyan-500 px-4 py-2 font-semibold text-gray-950 hover:bg-cyan-400 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Trigger Deployment
                    </button>
                  ) : (
                    <button
                      onClick={resetTerminal}
                      disabled={terminalState !== "success"}
                      className={`flex items-center gap-2 rounded px-4 py-2 font-semibold transition-colors ${
                        terminalState === "success" 
                          ? "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer" 
                          : "bg-gray-900 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Reset Console
                    </button>
                  )}

                  {terminalState === "success" && (
                    <a
                      href="/dashboard"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs font-semibold"
                    >
                      Launch Dashboard <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Latency Tester & Map Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Ping Tool */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for <span className="text-cyan-400">Sub-Millisecond</span> Latency
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We deploy our edge nodes inside tier-1 carrier carrier-neutral data centers directly connected to global internet exchange points. Run a live ping test right now to see the difference.
            </p>

            {/* Global Ping Box */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Global Edge Nodes</span>
                <button
                  onClick={runPingTest}
                  disabled={pinging}
                  className="rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3.5 py-1.5 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${pinging ? "animate-spin" : ""}`} />
                  Run Ping Test
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(latencies).map(([region, ping]) => (
                  <div key={region} className="flex items-center justify-between border-b border-gray-900 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-400">{region}</span>
                    <span className={`font-bold ${
                      ping === "Pinging..." ? "text-cyan-400" :
                      ping === "--" ? "text-gray-600" :
                      (ping as number) < 20 ? "text-emerald-400" :
                      (ping as number) < 50 ? "text-teal-400" : "text-amber-400"
                    }`}>
                      {ping === "Pinging..." ? "Pinging..." : ping === "--" ? "--" : `${ping} ms`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - SVG Map */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full aspect-[1.8/1] rounded-xl border border-gray-900 bg-gray-950/60 p-4 flex items-center justify-center overflow-hidden">
              {/* Map Placeholder Graphic */}
              <svg className="w-full h-full text-gray-800/40" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated continents */}
                <path d="M150 150 C220 120, 260 180, 280 220 C300 260, 240 320, 200 340 C160 360, 120 300, 110 260 Z" fill="currentColor" opacity="0.3" />
                <path d="M450 100 C520 80, 580 120, 620 180 C660 240, 600 320, 520 350 C460 380, 420 280, 410 200 Z" fill="currentColor" opacity="0.3" />
                <path d="M750 200 C820 180, 880 220, 920 280 C960 340, 900 420, 820 450 C760 480, 720 380, 710 300 Z" fill="currentColor" opacity="0.3" />
                
                {/* Glowing Node Lines */}
                <g stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5">
                  <line x1="250" y1="200" x2="520" y2="230" />
                  <line x1="520" y1="230" x2="800" y2="300" />
                  <line x1="250" y1="200" x2="800" y2="300" />
                </g>

                {/* Glowing Nodes */}
                <circle cx="250" cy="200" r="6" fill="#06b6d4" className="animate-pulse" />
                <circle cx="520" cy="230" r="6" fill="#3b82f6" className="animate-pulse" />
                <circle cx="800" cy="300" r="6" fill="#06b6d4" className="animate-pulse" />
                <circle cx="480" cy="180" r="4" fill="#10b981" />
                <circle cx="850" cy="240" r="4" fill="#10b981" />

                {/* Node Labels */}
                <text x="250" y="185" fill="#f9fafb" fontSize="10" fontFamily="monospace" textAnchor="middle">New York</text>
                <text x="520" y="215" fill="#f9fafb" fontSize="10" fontFamily="monospace" textAnchor="middle">Frankfurt</text>
                <text x="800" y="285" fill="#f9fafb" fontSize="10" fontFamily="monospace" textAnchor="middle">Tokyo</text>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Server Configurator / Custom VPS Builder */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build Your Perfect <span className="text-cyan-400">Cloud Server</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Slide and adjust resources in real-time. Zero contract, hourly billing, instant automated container provisioning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Configurator Sliders (Left Column) */}
          <div className="lg:col-span-7 rounded-xl border border-gray-800 bg-gray-900/10 p-6 sm:p-8 space-y-6 flex flex-col justify-center">
            
            {/* CPU Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" /> CPU Cores
                </label>
                <span className="font-mono text-cyan-400 font-bold">{cpu} vCPU</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={cpu}
                onChange={(e) => setCpu(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1 Core</span>
                <span>4 Cores</span>
                <span>8 Cores</span>
                <span>16 Cores</span>
              </div>
            </div>

            {/* RAM Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" /> RAM Memory
                </label>
                <span className="font-mono text-cyan-400 font-bold">{ram} GB DDR5</span>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                step="1"
                value={ram}
                onChange={(e) => setRam(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1 GB</span>
                <span>16 GB</span>
                <span>32 GB</span>
                <span>64 GB</span>
              </div>
            </div>

            {/* NVMe Storage Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" /> NVMe Gen4 Storage
                </label>
                <span className="font-mono text-cyan-400 font-bold">{storage} GB SSD</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={storage}
                onChange={(e) => setStorage(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>20 GB</span>
                <span>100 GB</span>
                <span>250 GB</span>
                <span>500 GB</span>
              </div>
            </div>

            {/* Bandwidth Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" /> High-Speed Bandwidth
                </label>
                <span className="font-mono text-cyan-400 font-bold">{bandwidth} TB / mo</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={bandwidth}
                onChange={(e) => setBandwidth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1 TB</span>
                <span>5 TB</span>
                <span>10 TB</span>
                <span>20 TB</span>
              </div>
            </div>

          </div>

          {/* Pricing Box (Right Column) */}
          <div className="lg:col-span-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-8 flex flex-col justify-between items-center text-center relative overflow-hidden cyber-glow-cyan">
            
            <div className="absolute top-0 right-0 rounded-bl-lg bg-cyan-500/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-cyan-400 border-l border-b border-cyan-500/20">
              Custom Tier
            </div>

            <div className="w-full">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Estimated Cost</h3>
              <div className="flex items-baseline justify-center gap-1 my-6">
                <span className="text-5xl font-extrabold text-white">${vpsPrice}</span>
                <span className="text-gray-400 text-sm">/ month</span>
              </div>
              <p className="text-xs text-cyan-400/80 font-mono mb-6">
                ~ ${(vpsPrice / 730).toFixed(4)} / hour billing
              </p>

              <div className="border-t border-cyan-500/20 pt-6 space-y-3.5 text-sm text-left text-gray-300 w-full max-w-xs mx-auto">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                  <span>Isolated LXC Container</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                  <span>SSH Key Authentication</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                  <span>Dedicated IPv4 & IPv6</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                  <span>10 Gbps Port Speed</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-8">
              <Link
                href="/dashboard"
                className="block w-full rounded-lg bg-cyan-500 py-3 font-semibold text-gray-950 hover:bg-cyan-400 transition-colors"
              >
                Provision Server
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for <span className="text-cyan-400">Developers</span>, Optimized for Scale
          </h2>
          <p className="text-gray-400 mt-3">
            We removed the bloated control panels and slow configurations. Run high-performance websites directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">SSH Key Authentication</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              No passwords, no backdoors. Access containers and deploy code using secure Ed25519 or RSA SSH keys.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">NVMe Gen4 SSD Array</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Experience lightning-fast file operations and database queries with enterprise NVMe Gen4 solid-state drives.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">DDoS Protection</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every server sits behind our advanced path filtering layer, absorbing volumetric attacks up to 12Tbps.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Anycast DNS</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Route your users to the nearest data center instantly with our ultra-fast Anycast routing network.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">AMD EPYC Compute</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We run high-frequency AMD EPYC processors, ensuring your Node, Bun, or Python servers compute in milliseconds.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/20 p-6 flex flex-col gap-4 hover:border-cyan-500/30 hover:bg-gray-900/30 transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Serverless Standalone</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Deploy Next.js in standalone mode to minimize RAM and maximize container request-handling speeds.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}