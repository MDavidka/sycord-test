"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Zap, Coins, RefreshCw, Play } from "lucide-react";

export default function AiHostingPage() {
  const [selectedModel, setSelectedNode] = useState<string>("Llama 3 8B (Instruct)");
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchLogs, setBenchLogs] = useState<string[]>([]);

  const models = [
    { name: "Llama 3 8B (Instruct)", memory: "16GB VRAM", tps: 92, ttft: "42ms", cost: "$0.12" },
    { name: "Llama 3 70B (FP16)", memory: "140GB VRAM", tps: 34, ttft: "120ms", cost: "$0.84" },
    { name: "Stable Diffusion XL", memory: "24GB VRAM", tps: 1.2, ttft: "1.4s", cost: "$0.45" },
  ];

  const handleBenchmark = (modelName: string) => {
    setSelectedNode(modelName);
    setBenchmarking(true);
    const mod = models.find(m => m.name === modelName)!;
    setBenchLogs([
      `$ sycord-inference run --model "${mod.name}"`,
      `Initializing TensorRT-LLM container execution...`,
      `✓ Model loaded into GPU memory. Allocated: ${mod.memory}`
    ]);

    setTimeout(() => {
      setBenchLogs(prev => [
        ...prev,
        `Warming up CUDA cores... running inference test...`,
        `Time to First Token (TTFT): ${mod.ttft}`,
        `Generation speed: ${mod.tps} ${modelName.includes("Diffusion") ? "images / sec" : "tokens / sec"}`
      ]);
    }, 1000);

    setTimeout(() => {
      setBenchLogs(prev => [
        ...prev,
        "",
        `--- Benchmark results for ${mod.name} ---`,
        `GPU Cluster: 8x NVIDIA H100 PCIe (80GB)`,
        `Average Generation Speed: ${mod.tps} ${modelName.includes("Diffusion") ? "images/sec" : "tokens/sec"}`,
        `Estimated Cost per 1M Tokens: ${mod.cost}`,
        "✓ AI Serverless GPU Container operational. Ready for API integration."
      ]);
      setBenchmarking(false);
    }, 2500);
  };

  return (
    <div className="relative bg-gray-950 min-h-screen py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Serverless AI <span className="text-cyan-400">GPU Inference</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Deploy open-source LLMs and image models instantly on our cluster of NVIDIA H100 and A100 GPUs. Pay only for the milliseconds you compute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Model Selector (Left Column) */}
          <div className="lg:col-span-4 rounded-xl border border-gray-800 bg-gray-900/10 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white mb-2">Select AI Model</h2>
            <div className="space-y-2.5">
              {models.map((mod) => (
                <button
                  key={mod.name}
                  onClick={() => handleBenchmark(mod.name)}
                  disabled={benchmarking}
                  className={`w-full text-left rounded-lg border p-4 transition-all flex items-center justify-between ${
                    selectedModel === mod.name
                      ? "border-cyan-500/40 bg-cyan-500/5 text-white"
                      : "border-gray-800 bg-gray-900/30 text-gray-400 hover:border-gray-700 hover:text-white"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">{mod.name}</p>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">Memory: {mod.memory} &bull; {mod.cost}/1M tokens</p>
                  </div>
                  <Play className="w-4 h-4 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Benchmark Playground (Right Column) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-1 flex-grow flex flex-col min-h-[380px] justify-between shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900 bg-gray-900/40">
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> gpu-cluster@sycord-ai
                </span>
                <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-2.5 py-0.5 text-[10px] text-cyan-400">
                  <Cpu className="w-3 h-3 animate-pulse" />
                  NVIDIA H100 Active
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="p-5 font-mono text-xs text-gray-300 flex-grow bg-gray-950/50 space-y-2">
                {benchLogs.length === 0 ? (
                  <div className="text-gray-500 italic">
                    Select any open-source model on the left and click to run a live CUDA inference benchmark.
                  </div>
                ) : (
                  benchLogs.map((log, i) => (
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
                {benchmarking && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Allocating GPU resources & running CUDA kernel...</span>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-4 text-center">
                <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase font-mono">Generation Speed</span>
                <p className="font-bold text-white mt-1 text-lg">
                  {models.find(m => m.name === selectedModel)?.tps} {selectedModel.includes("Diffusion") ? "img/s" : "tok/s"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-4 text-center">
                <Cpu className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase font-mono">VRAM Allocated</span>
                <p className="font-bold text-white mt-1 text-lg">
                  {models.find(m => m.name === selectedModel)?.memory}
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/10 p-4 text-center">
                <Coins className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase font-mono">Est. Cost / 1M Tok</span>
                <p className="font-bold text-white mt-1 text-lg">
                  {models.find(m => m.name === selectedModel)?.cost}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}