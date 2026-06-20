"use client";

import React, { useState } from "react";
import { Globe, RefreshCw, Terminal, CheckCircle2, ChevronRight } from "lucide-react";

export default function NetworkPage() {
  const [selectedNode, setSelectedNode] = useState<string>("Frankfurt (EU-Central)");
  const [testing, setTesting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const nodes = [
    { name: "New York (US-East)", ip: "104.28.12.4", provider: "Equinix NY4", peering: "DE-CIX, GTT" },
    { name: "Frankfurt (EU-Central)", ip: "84.22.115.9", provider: "Interxion FRA6", peering: "DE-CIX, GTT, Telia" },
    { name: "Tokyo (AP-Northeast)", ip: "172.54.91.2", provider: "Equinix TY3", peering: "BBIX, JPNAP" },
    { name: "Singapore (AP-Southeast)", ip: "203.11.45.8", provider: "Equinix SG1", peering: "Equinix IX, SGIX" },
    { name: "London (UK-West)", ip: "185.12.190.1", provider: "Telehouse North", peering: "LINX, GTT" },
  ];

  const handleNodeTest = (nodeName: string) => {
    setSelectedNode(nodeName);
    setTesting(true);
    const node = nodes.find(n => n.name === nodeName)!;
    setConsoleLogs([
      `$ ping -c 4 ${node.ip}`,
      `PING ${node.ip} (${node.ip}) 56(84) bytes of data.`
    ]);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        `64 bytes from ${node.ip}: icmp_seq=1 ttl=64 time=${nodeName.includes("Frankfurt") ? "8.4" : nodeName.includes("London") ? "32.1" : nodeName.includes("New York") ? "14.2" : "124.5"} ms`
      ]);
    }, 600);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        `64 bytes from ${node.ip}: icmp_seq=2 ttl=64 time=${nodeName.includes("Frankfurt") ? "8.2" : nodeName.includes("London") ? "31.9" : nodeName.includes("New York") ? "14.5" : "122.1"} ms`,
        `64 bytes from ${node.ip}: icmp_seq=3 ttl=64 time=${nodeName.includes("Frankfurt") ? "8.5" : nodeName.includes("London") ? "32.4" : nodeName.includes("New York") ? "14.1" : "125.0"} ms`
      ]);
    }, 1200);

    setTimeout(() => {
      let avg = "8.3";
      if (nodeName.includes("London")) avg = "32.1";
      else if (nodeName.includes("New York")) avg = "14.2";
      else if (nodeName.includes("Tokyo")) avg = "123.8";
      else if (nodeName.includes("Singapore")) avg = "146.5";

      setConsoleLogs(prev => [
        ...prev,
        `64 bytes from ${node.ip}: icmp_seq=4 ttl=64 time=${avg} ms`,
        "",
        `--- ${node.ip} ping statistics ---`,
        `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`,
        `rtt min/avg/max/mdev = ${avg}/${avg}/${avg}/0.12 ms`,
        "✓ Connection verified. Node performing at optimal routing capacity."
      ]);
      setTesting(false);
    }, 2000);
  };

  return (
    <div className="relative bg-gray-950 min-h-screen py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Anycast Global <span className="text-cyan-400">Network Map</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Sycord operates high-speed edge routing nodes in tier-1 financial and technology hubs. Select a node to run a live diagnostic check.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Node Selector (Left Column) */}
          <div className="lg:col-span-4 rounded-xl border border-gray-800 bg-gray-900/10 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white mb-2">Select Edge Facility</h2>
            <div className="space-y-2.5">
              {nodes.map((node) => (
                <button
                  key={node.name}
                  onClick={() => handleNodeTest(node.name)}
                  disabled={testing}
                  className={`w-full text-left rounded-lg border p-4 transition-all flex items-center justify-between ${
                    selectedNode === node.name
                      ? "border-cyan-500/40 bg-cyan-500/5 text-white"
                      : "border-gray-800 bg-gray-900/30 text-gray-400 hover:border-gray-700 hover:text-white"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">{node.name}</p>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">{node.ip} &bull; {node.provider}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Console (Right Column) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-1 flex-grow flex flex-col min-h-[380px] justify-between shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900 bg-gray-900/40">
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> traceroute@sycord-anycast
                </span>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-0.5 text-[10px] text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Active
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="p-5 font-mono text-xs text-gray-300 flex-grow bg-gray-950/50 space-y-2">
                {consoleLogs.length === 0 ? (
                  <div className="text-gray-500 italic">
                    Select any edge node on the left to trigger an automated SSH ping diagnostic test.
                  </div>
                ) : (
                  consoleLogs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`${
                        log.startsWith("✓") ? "text-emerald-400" :
                        log.startsWith("$") ? "text-cyan-400" : "text-gray-300"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
                {testing && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Resolving routing hops...</span>
                  </div>
                )}
              </div>

            </div>

            {/* Peering Information */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-500 uppercase font-mono">Data Center Provider</span>
                <p className="font-semibold text-white mt-1">
                  {nodes.find(n => n.name === selectedNode)?.provider}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-mono">BGP Peering Exchanges</span>
                <p className="font-semibold text-white mt-1">
                  {nodes.find(n => n.name === selectedNode)?.peering}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}