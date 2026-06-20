"use client";

import React, { useState } from "react";
import { Check, Shield, HelpCircle, AlertTriangle, Coins } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [slaUptime, setSlaUptime] = useState<number>(99.9);
  const [slaCredit, setSlaCredit] = useState<number>(0);

  const calculateSlaCredit = (val: number) => {
    setSlaUptime(val);
    if (val >= 99.99) setSlaCredit(0);
    else if (val >= 99.9) setSlaCredit(10); // 10% credit
    else if (val >= 99.0) setSlaCredit(25); // 25% credit
    else if (val >= 95.0) setSlaCredit(50); // 50% credit
    else setSlaCredit(100); // 100% refund
  };

  const discount = billingCycle === "yearly" ? 0.8 : 1; // 20% discount

  const plans = [
    {
      name: "Edge Developer",
      price: 4,
      description: "Perfect for personal sites, portfolios, and APIs.",
      features: [
        "1 Shared vCPU (AMD EPYC)",
        "1 GB DDR5 RAM",
        "20 GB NVMe Gen4 Storage",
        "1 TB Bandwidth / month",
        "Global Edge CDN Integration",
        "1 SSH Key authorized",
        "Dedicated IPv6",
      ],
      cta: "Deploy Now",
      popular: false,
    },
    {
      name: "Cloud Production",
      price: 16,
      description: "Optimized for high-traffic apps and databases.",
      features: [
        "2 Dedicated vCPUs",
        "4 GB DDR5 RAM",
        "80 GB NVMe Gen4 Storage",
        "3 TB Bandwidth / month",
        "Anycast DNS & Path-Routing",
        "Unlimited SSH Keys authorized",
        "Dedicated IPv4 & IPv6",
        "Daily automated backups",
      ],
      cta: "Provision Node",
      popular: true,
    },
    {
      name: "Edge Scale VPS",
      price: 48,
      description: "For demanding business APIs and microservices.",
      features: [
        "4 Dedicated vCPUs",
        "8 GB DDR5 RAM",
        "160 GB NVMe Gen4 Storage",
        "10 TB Bandwidth / month",
        "Advanced DDoS Shield (12Tbps)",
        "Dedicated RAM & CPU limits",
        "Dedicated IPv4 & IPv6",
        "Custom ISO mounting",
        "24/7/365 priority support",
      ],
      cta: "Provision VPS",
      popular: false,
    },
  ];

  return (
    <div className="relative bg-gray-950 min-h-screen py-16 sm:py-24 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Transparent, <span className="text-cyan-400">Developer-First</span> Pricing
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            No hidden fees, no overage shocks. Upgrade, downgrade, or cancel anytime. All plans are billed hourly.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-white font-semibold" : "text-gray-400"}`}>Billed Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-cyan-400 transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-white font-semibold" : "text-gray-400"}`}>
              Billed Yearly <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-400 font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border flex flex-col justify-between p-8 relative overflow-hidden transition-all hover:translate-y-[-4px] ${
                plan.popular
                  ? "border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                  : "border-gray-800 bg-gray-900/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 rounded-bl-lg bg-cyan-500 px-3 py-1 text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-400 text-sm mt-2 min-h-[40px]">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 my-6 border-b border-gray-800 pb-6">
                  <span className="text-4xl font-extrabold text-white">
                    ${Math.round(plan.price * discount)}
                  </span>
                  <span className="text-gray-500 text-sm">/ month</span>
                </div>

                <ul className="space-y-3 text-sm text-gray-300">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <Check className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  className={`w-full rounded-lg py-3 text-center font-semibold transition-all ${
                    plan.popular
                      ? "bg-cyan-500 text-gray-950 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "border border-gray-800 bg-gray-900/40 text-white hover:bg-gray-900 hover:border-gray-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SLA Interactive Widget */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400">
              <Shield className="w-3.5 h-3.5" /> 99.99% Network SLA
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Our 99.99% Uptime SLA <span className="text-cyan-400">Guarantee</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We stand by our network stability. If our uptime drops below 99.99%, we automatically credit your account. Use the calculator to simulate SLA refund tiers.
            </p>

            {/* SLA Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">Simulated Monthly Uptime</span>
                <span className="text-cyan-400 font-bold">{slaUptime.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="100"
                step="0.05"
                value={slaUptime}
                onChange={(e) => calculateSlaCredit(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>90% (Outage)</span>
                <span>99.0%</span>
                <span>99.9%</span>
                <span>99.99% (SLA Target)</span>
              </div>
            </div>
          </div>

          {/* Refund Box */}
          <div className="lg:col-span-5 rounded-xl border border-gray-800 bg-gray-950/60 p-6 flex flex-col items-center justify-center text-center">
            <Coins className="w-10 h-10 text-cyan-400 mb-2" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Account Credit Refund</h3>
            <div className="text-5xl font-extrabold text-white my-4">
              {slaCredit}%
            </div>
            <p className="text-xs text-gray-400 max-w-[240px]">
              {slaCredit === 0 
                ? "All systems operational within standard SLA parameters." 
                : `SLA breach detected. You are entitled to a ${slaCredit}% hosting credit refund.`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}