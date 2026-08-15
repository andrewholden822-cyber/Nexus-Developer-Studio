import React, { useState } from 'react';
import { Terminal, Sparkles, ArrowRight, Check, Copy, Play, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { STUDIO_STATS } from '../data/studioData';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenInquiry: () => void;
  onJumpToWorkbench: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenEstimator,
  onOpenInquiry,
  onJumpToWorkbench,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'architecture' | 'benchmark'>('terminal');
  const [copied, setCopied] = useState(false);
  const [activeTerminalCommand, setActiveTerminalCommand] = useState(0);

  const terminalCommands = [
    {
      cmd: 'npx nexus-studio init my-system --stack=fullstack-ai',
      output: [
        '✔ Resolving architecture blueprints... [PostgreSQL + Gemini 3.7 + Go + React 19]',
        '✔ Provisioning zero-trust TLS & eBPF observability layer...',
        '✔ Edge CDN routing configured with sub-30ms global latency target.',
        '🚀 Ready: Deployment mesh online at https://my-system.internal.mesh',
      ],
    },
    {
      cmd: 'nexus benchmark --concurrency=50000 --region=global',
      output: [
        '⚡ Running distributed load test across 12 edge clusters...',
        '📊 Total requests processed: 1,500,000 in 3.12s',
        '⏱  p50 latency: 18.4ms | p95: 28.1ms | p99: 41.2ms',
        '✅ Zero packet drops. CPU utilization balanced at 41%.',
      ],
    },
    {
      cmd: 'curl -X POST https://api.nexus.studio/v1/health',
      output: [
        'HTTP/2 200 OK',
        'Content-Type: application/json',
        '{"status":"nominal","activeNodes":64,"uptimeSLA":"99.994%","queueDepth":0}',
      ],
    },
  ];

  const handleCopyCmd = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="studio-hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#0A0A0A]">
      {/* Background ambient lighting and grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Studio Eyebrow Bar */}
            <div className="flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.3em]">
                Development & Design Systems
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter uppercase text-white leading-[0.92]">
              Engineering <br />
              <span className="text-zinc-500">The Invisible</span>
            </h1>

            {/* Description Subtext in Editorial Serif */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed italic font-serif">
              We build high-performance digital products, AI engines, and distributed architectures for startups and enterprises that demand precision, scale, and uncompromising aesthetic clarity.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                id="btn-hero-start-project"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-ai-workbench"
                onClick={onJumpToWorkbench}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>AI Scoper</span>
              </button>

              <button
                id="btn-hero-estimate-budget"
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-4 py-3 rounded-full bg-transparent hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Cost</span>
              </button>
            </div>

            {/* Elegant Studio Stats in Minimalist Typography */}
            <div className="pt-6 border-t border-zinc-850/60 w-full flex flex-wrap gap-8 sm:gap-12">
              <div className="flex flex-col">
                <span className="text-3xl font-mono font-medium text-white">04+</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Years of Craft</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-mono font-medium text-white">42</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Products Shipped</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-mono font-medium text-white">&lt;30ms</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Edge SLA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Studio Console & Architecture Preview */}
          <div className="lg:col-span-5">
            <div className="bg-[#0D0D0D] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-750"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                  <span className="ml-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">nexus-console // v3.4</span>
                </div>
                
                {/* Console Mode Tabs */}
                <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-md border border-zinc-800 text-[10px] font-mono uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeTab === 'terminal' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    CLI
                  </button>
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeTab === 'architecture' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Mesh
                  </button>
                  <button
                    onClick={() => setActiveTab('benchmark')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeTab === 'benchmark' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Metrics
                  </button>
                </div>
              </div>

              {/* Terminal Content Body */}
              <div className="p-4 sm:p-5 font-mono text-xs min-h-[310px] flex flex-col justify-between">
                
                {activeTab === 'terminal' && (
                  <div className="space-y-4">
                    {/* Command Selector Buttons */}
                    <div className="flex flex-wrap gap-1.5 pb-2 border-b border-zinc-800/80">
                      {terminalCommands.map((cmd, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTerminalCommand(idx)}
                          className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${
                            activeTerminalCommand === idx
                              ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                              : 'bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          cmd_{idx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Active Command Prompt */}
                    <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 text-zinc-300">
                      <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
                        <span className="text-white font-bold">$</span>
                        <span className="text-zinc-300">{terminalCommands[activeTerminalCommand].cmd}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCmd(terminalCommands[activeTerminalCommand].cmd)}
                        className="ml-2 p-1 text-zinc-500 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Output Lines */}
                    <div className="space-y-1.5 pl-1 text-zinc-400 text-[11px]">
                      {terminalCommands[activeTerminalCommand].output.map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-zinc-600 select-none">&gt;</span>
                          <span className={line.includes('Ready') || line.includes('200 OK') || line.includes('Zero') ? 'text-white font-medium' : 'text-zinc-400'}>
                            {line}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'architecture' && (
                  <div className="space-y-3 py-1">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wider pb-2 border-b border-zinc-800">
                      // Studio Topology Reference (Tier-1 Enterprise Mesh)
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded bg-zinc-950 border border-zinc-850 flex flex-col gap-1">
                        <span className="text-zinc-600 text-[9px] uppercase tracking-wider">INGRESS LAYER</span>
                        <span className="text-white font-medium">Cloudflare Edge + TLS 1.3</span>
                        <span className="text-zinc-400 text-[10px]">Anycast • 240+ PoPs</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-950 border border-zinc-850 flex flex-col gap-1">
                        <span className="text-zinc-600 text-[9px] uppercase tracking-wider">ENGINE</span>
                        <span className="text-white font-medium">Go / Rust Daemons</span>
                        <span className="text-zinc-400 text-[10px]">Docker • K8s Cluster</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-950 border border-zinc-850 flex flex-col gap-1">
                        <span className="text-zinc-600 text-[9px] uppercase tracking-wider">PERSISTENCE</span>
                        <span className="text-white font-medium">Postgres + pgvector</span>
                        <span className="text-zinc-400 text-[10px]">Multi-AZ • Wal-G</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-950 border border-zinc-850 flex flex-col gap-1">
                        <span className="text-zinc-600 text-[9px] uppercase tracking-wider">INTELLIGENCE</span>
                        <span className="text-white font-medium">Gemini 3.7 + SSE</span>
                        <span className="text-zinc-400 text-[10px]">Streaming RAG Pipeline</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'benchmark' && (
                  <div className="space-y-3 py-1">
                    <div className="flex items-center justify-between text-[11px] pb-2 border-b border-zinc-800 text-zinc-400 font-mono">
                      <span>Telemetry Feed</span>
                      <span className="text-white font-bold">Realtime SLA: 99.994%</span>
                    </div>

                    <div className="space-y-2.5 text-[11px]">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>p99 Edge Latency</span>
                          <span className="text-white font-semibold">24.2 ms</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full w-[24%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Throughput Capacity</span>
                          <span className="text-white font-semibold">500,000 QPS</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-300 rounded-full w-[82%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Memory Safety (Rust Core)</span>
                          <span className="text-white font-semibold">100% Zero-Panic</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full w-[100%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Footer Bar */}
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                    <span>Direct Senior Partner Access</span>
                  </div>
                  <button
                    onClick={onJumpToWorkbench}
                    className="text-zinc-300 hover:text-white flex items-center gap-1 font-mono uppercase tracking-wider text-[10px]"
                  >
                    Open Workbench &rarr;
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
