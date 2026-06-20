"use client";

import React, { useState } from "react";
import { ShieldCheck, MessageSquare, Send, RefreshCw } from "lucide-react";

export default function ContactPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Welcome to Sycord Support! I am your automated systems assistant. Ask me anything about our SSH workspaces, server pricing, Anycast DNS, or SLA guarantees." }
  ]);
  const [typing, setTyping] = useState(false);

  // Simulated AI Chatbot responses
  const getAiResponse = (input: string): string => {
    const query = input.toLowerCase();
    if (query.includes("pricing") || query.includes("cost") || query.includes("cheap")) {
      return "Sycord pricing is billed hourly. Developer nodes start at just $4/month (1GB RAM, 1 Core, 20GB NVMe SSD). Our standard production node is $16/month (4GB RAM, 2 Cores, 80GB NVMe SSD). You can customize your resources dynamically in the slider on our pricing page!";
    }
    if (query.includes("ssh") || query.includes("key") || query.includes("connect")) {
      return "To keep our platform secure, we completely disable password log-in. You connect to your isolated container workspaces using standard SSH Key-Based Authentication (RSA or Ed25519 keys). You can add or manage your public keys directly inside our developer console.";
    }
    if (query.includes("sla") || query.includes("uptime") || query.includes("refund")) {
      return "We offer a strict 99.99% network uptime SLA guarantee. If uptime drops below 99.99% in any billing cycle, you are automatically entitled to account credits (ranging from 10% up to a 100% full refund if uptime falls below 95%).";
    }
    if (query.includes("latency") || query.includes("ping") || query.includes("location") || query.includes("speed")) {
      return "Our global edge nodes are hosted in top-tier facilities including Frankfurt, London, New York, Tokyo, and Singapore. We use Anycast BGP routing to automatically send your users to the closest node, achieving sub-15ms global latencies.";
    }
    if (query.includes("gpu") || query.includes("ai") || query.includes("inference")) {
      return "We provide serverless GPU inference clusters featuring NVIDIA H100 and A100 GPUs. You can load open-source models like Llama 3 or Stable Diffusion XL instantly and pay only for the milliseconds of compute time used during inference.";
    }
    return "Thank you for reaching out! That's a great question. For specific technical requests, our system engineers are available 24/7. You can also open a formal ticket inside the developer console, or email us directly at support@sycord.site.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getAiResponse(userMsg);
      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className="relative bg-gray-950 min-h-screen py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            System Status & <span className="text-cyan-400">Support</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Our global infrastructure is monitored 24/7/365. Chat with our automated systems assistant or open a support ticket.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Live Status & SLA (Left Column) */}
          <div className="lg:col-span-5 rounded-xl border border-gray-800 bg-gray-900/10 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-900 pb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Infrastructure Health</h2>
              </div>

              {/* Status Indicators */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                  <span className="text-gray-400">Edge Routing (Anycast)</span>
                  <span className="text-emerald-400 font-semibold font-mono">Operational</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                  <span className="text-gray-400">LXC Container Hypervisors</span>
                  <span className="text-emerald-400 font-semibold font-mono">Operational</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                  <span className="text-gray-400">GPU Serverless Clusters</span>
                  <span className="text-emerald-400 font-semibold font-mono">Operational</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                  <span className="text-gray-400">Anycast DNS Servers</span>
                  <span className="text-emerald-400 font-semibold font-mono">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database & Backup Nodes</span>
                  <span className="text-emerald-400 font-semibold font-mono">Operational</span>
                </div>
              </div>
            </div>

            {/* Uptime Guarantee Box */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-emerald-400/90 mt-6">
              <p className="font-semibold text-white flex items-center gap-1 mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" /> 99.99% Network Uptime Verified
              </p>
              Our monitoring systems recorded 100% network availability over the past 30 days across all active edge nodes.
            </div>
          </div>

          {/* AI Chat Assistant (Right Column) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-1 flex-grow flex flex-col h-[420px] justify-between shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900 bg-gray-900/40">
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> sycord-support-daemon
                </span>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-0.5 text-[10px] text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Online
                </div>
              </div>

              {/* Chat Thread */}
              <div className="p-5 overflow-y-auto flex-grow bg-gray-950/50 space-y-4 no-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-xl px-4 py-2.5 text-sm max-w-md leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-500 text-gray-950 font-medium"
                        : "border border-gray-800 bg-gray-900/40 text-gray-300"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-2.5 text-sm text-cyan-400 flex items-center gap-1.5">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Assistant is typing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-900 flex items-center gap-2 bg-gray-900/20">
                <input
                  type="text"
                  placeholder="Ask about pricing, SSH, latency, or SLAs..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={typing}
                  className="flex-grow rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={typing || !chatInput.trim()}
                  className="rounded-lg bg-cyan-500 p-2.5 text-gray-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 fill-current" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}