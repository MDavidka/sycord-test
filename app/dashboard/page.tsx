"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Cpu, Globe, Server, Activity, ShieldAlert, Key, Plus, Trash2, RefreshCw, Power } from "lucide-react";

export default function DashboardDemoPage() {
  // SSH Key Manager State
  const [sshKeys, setSshKeys] = useState<Array<{ id: string; name: string; key: string }>>([
    { id: "1", name: "personal-macbook", key: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDp... sycord@macbook" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyVal, setNewKeyVal] = useState("");

  // Server Power State
  const [serverState, setServerState] = useState<"running" | "rebooting" | "stopped">("running");

  // Metrics (Simulated real-time stats)
  const [cpuUsage, setCpuUsage] = useState<number[]>([12, 18, 15, 22, 14, 19, 25, 21, 15, 18]);
  const [ramUsage, setRamUsage] = useState<number[]>([42, 42, 43, 42, 43, 43, 44, 43, 42, 42]);
  const [bandwidth, setBandwidth] = useState<number[]>([1.2, 1.4, 1.1, 2.5, 3.4, 1.2, 0.9, 1.4, 1.8, 1.5]);

  // Push new metric data points in real-time
  useEffect(() => {
    if (serverState !== "running") return;
    const interval = setInterval(() => {
      setCpuUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 25) + 10]);
      setRamUsage(prev => [...prev.slice(1), Math.floor(Math.random() * 3) + 41]);
      setBandwidth(prev => [...prev.slice(1), parseFloat((Math.random() * 3 + 0.5).toFixed(1))]);
    }, 2000);
    return () => clearInterval(interval);
  }, [serverState]);

  // SSH Key Handlers
  const addSshKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName || !newKeyVal) return;
    if (!newKeyVal.startsWith("ssh-")) {
      alert("Invalid SSH key format. Must start with ssh-rsa, ssh-ed25519, etc.");
      return;
    }
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyVal.length > 40 ? `${newKeyVal.substring(0, 30)}...` : newKeyVal
    };
    setSshKeys([...sshKeys, newKey]);
    setNewKeyName("");
    setNewKeyVal("");
  };

  const deleteSshKey = (id: string) => {
    setSshKeys(sshKeys.filter(k => k.id !== id));
  };

  // Server Control Handlers
  const handlePowerAction = (action: "reboot" | "stop" | "start") => {
    if (action === "reboot") {
      setServerState("rebooting");
      setCpuUsage([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setBandwidth([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setTimeout(() => {
        setServerState("running");
      }, 3000);
    } else if (action === "stop") {
      setServerState("stopped");
      setCpuUsage([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setBandwidth([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else if (action === "start") {
      setServerState("running");
    }
  };

  // Render simple responsive custom SVG line chart
  const renderSvgChart = (data: number[], color: string, max: number) => {
    const width = 300;
    const height = 80;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (val / max) * height;
      return `${x},${y}`;
    }).join(" ");

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20 text-cyan-400">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="relative bg-gray-950 min-h-screen py-12 overflow-hidden">
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-6 mb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Sycord Console</span>
            <h1 className="text-2xl font-bold text-white mt-1">sycord-project-prod</h1>
          </div>

          {/* Server Controls */}
          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono ${
              serverState === "running" ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" :
              serverState === "rebooting" ? "border-amber-500/30 bg-amber-500/5 text-amber-400" :
              "border-rose-500/30 bg-rose-500/5 text-rose-400"
            }`}>
              <span className={`relative flex h-1.5 w-1.5 ${serverState === "rebooting" ? "animate-spin" : ""}`}>
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  serverState === "running" ? "animate-ping bg-emerald-400" : ""
                }`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  serverState === "running" ? "bg-emerald-500" :
                  serverState === "rebooting" ? "bg-amber-500" : "bg-rose-500"
                }`}></span>
              </span>
              <span className="capitalize">{serverState}</span>
            </div>

            {/* Actions */}
            {serverState === "running" ? (
              <>
                <button
                  onClick={() => handlePowerAction("reboot")}
                  className="rounded bg-gray-900 border border-gray-800 hover:bg-gray-850 px-3 py-1.5 text-xs text-white font-mono flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reboot
                </button>
                <button
                  onClick={() => handlePowerAction("stop")}
                  className="rounded bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 px-3 py-1.5 text-xs text-rose-400 font-mono flex items-center gap-1 transition-colors"
                >
                  <Power className="w-3.5 h-3.5" /> Stop
                </button>
              </>
            ) : serverState === "stopped" ? (
              <button
                onClick={() => handlePowerAction("start")}
                className="rounded bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs text-gray-950 font-bold font-mono flex items-center gap-1 transition-all"
              >
                <Power className="w-3.5 h-3.5 fill-current" /> Start Server
              </button>
            ) : (
              <button
                disabled
                className="rounded bg-gray-900 border border-gray-800 px-3.5 py-1.5 text-xs text-gray-600 font-mono flex items-center gap-1 cursor-not-allowed"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Rebooting...
              </button>
            )}
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CPU Chart */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 flex items-center gap-1.5"><Cpu className="w-4 h-4 text-cyan-400" /> CPU Usage</span>
              <span className="text-white font-bold">{cpuUsage[cpuUsage.length - 1]}%</span>
            </div>
            {renderSvgChart(cpuUsage, "#06b6d4", 100)}
          </div>

          {/* RAM Chart */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 flex items-center gap-1.5"><Activity className="w-4 h-4 text-cyan-400" /> RAM Allocated</span>
              <span className="text-white font-bold">{(ramUsage[ramUsage.length - 1] / 10).toFixed(1)} GB / 4.0 GB</span>
            </div>
            {renderSvgChart(ramUsage, "#3b82f6", 100)}
          </div>

          {/* Bandwidth Chart */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 flex items-center gap-1.5"><Globe className="w-4 h-4 text-cyan-400" /> Network Speed</span>
              <span className="text-white font-bold">{bandwidth[bandwidth.length - 1]} Gbps</span>
            </div>
            {renderSvgChart(bandwidth, "#10b981", 10)}
          </div>
        </div>

        {/* SSH Key Manager & Server Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SSH Key Manager (Left Column) */}
          <div className="lg:col-span-7 rounded-xl border border-gray-800 bg-gray-900/10 p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-4">
              <Key className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Authorized SSH Keys</h2>
            </div>

            {/* List Keys */}
            <div className="space-y-3">
              {sshKeys.length === 0 ? (
                <div className="text-sm text-gray-500 italic">No SSH keys authorized. Add a key below to enable server terminal access.</div>
              ) : (
                sshKeys.map((k) => (
                  <div key={k.id} className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950/40 p-4 font-mono text-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{k.name}</p>
                      <p className="text-gray-500 text-[10px] break-all max-w-md">{k.key}</p>
                    </div>
                    <button
                      onClick={() => deleteSshKey(k.id)}
                      className="text-gray-500 hover:text-rose-400 p-1.5 rounded hover:bg-rose-500/5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Key Form */}
            <form onSubmit={addSshKey} className="space-y-4 pt-4 border-t border-gray-900">
              <h3 className="text-sm font-semibold text-white">Add New Key</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Key label (e.g. laptop)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="rounded-lg border border-gray-800 bg-gray-950 px-3.5 py-2 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="ssh-rsa AAAAB3NzaC1yc2E..."
                  value={newKeyVal}
                  onChange={(e) => setNewKeyVal(e.target.value)}
                  className="sm:col-span-2 rounded-lg border border-gray-800 bg-gray-950 px-3.5 py-2 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-gray-950 hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Key
              </button>
            </form>
          </div>

          {/* Server Information (Right Column) */}
          <div className="lg:col-span-5 rounded-xl border border-gray-800 bg-gray-900/10 p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-4">
              <Server className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Server Information</h2>
            </div>

            <div className="space-y-4 font-mono text-xs text-gray-300">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-gray-500">SSH Host IP</span>
                <span className="text-white font-semibold">104.22.115.82</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-gray-500">SSH Port</span>
                <span className="text-white font-semibold">32768</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-gray-500">SSH User</span>
                <span className="text-cyan-400 font-semibold">sycord</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-gray-500">Dynamic Host Port</span>
                <span className="text-white font-semibold">22</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-gray-500">Dedicated IPv6</span>
                <span className="text-white font-semibold">2001:db8::ff00:42:8329</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">DDoS Shield Status</span>
                <span className="text-emerald-400 font-semibold">Protected</span>
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs leading-relaxed text-cyan-400/90">
              <p className="font-semibold text-white flex items-center gap-1 mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" /> Host Terminal Connection
              </p>
              Connect directly to this container workspace from your local terminal using:
              <code className="block rounded bg-gray-950 border border-gray-900 p-2.5 mt-2 text-white overflow-x-auto select-all">
                ssh -i ~/.ssh/id_ed25519 -p 32768 sycord@104.22.115.82
              </code>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}