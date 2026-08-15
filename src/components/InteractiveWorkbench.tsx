import React, { useState } from 'react';
import { Sparkles, Calculator, Code2, ArrowRight, Check, Copy, Download, RefreshCw, Send, Layers, ShieldCheck, Clock, DollarSign, Cpu, Database } from 'lucide-react';
import { AIScopeResult } from '../types';
import { SAMPLE_CODE_SNIPPETS } from '../data/studioData';

interface InteractiveWorkbenchProps {
  onDirectInquiry: (initialData: { projectType?: string; budget?: string; message?: string }) => void;
}

export const InteractiveWorkbench: React.FC<InteractiveWorkbenchProps> = ({ onDirectInquiry }) => {
  const [activeTab, setActiveTab] = useState<'ai-scoper' | 'cost-calculator' | 'code-lab'>('ai-scoper');

  // AI Scoper Form State
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Web & AI Application');
  const [targetScale, setTargetScale] = useState('100k - 500k monthly active users');
  const [techPreferences, setTechPreferences] = useState('TypeScript, React 19, Go/Node, PostgreSQL, Gemini API');
  const [requirements, setRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprintResult, setBlueprintResult] = useState<AIScopeResult | null>(null);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  // Estimator Form State
  const [estPlatform, setEstPlatform] = useState<'web' | 'xbox' | 'ai' | 'cloud' | 'mobile'>('web');
  const [estScale, setEstScale] = useState<'startup' | 'growth' | 'enterprise'>('growth');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'auth',
    'realtime',
    'admin',
  ]);
  const [teamPacing, setTeamPacing] = useState<'standard' | 'turbo'>('standard');

  // Code Lab State
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Preset prompts for AI Scoper
  const scoperPresets = [
    {
      title: 'Xbox Series X|S App & Publishing',
      name: 'Vortex Live Xbox Experience',
      type: 'Xbox App Development & Publishing',
      req: 'Native 4K 120Hz Xbox Series X|S application with 10-foot TV spatial gamepad navigation, Xbox Live Gamertag auth, low-latency media streaming, and Microsoft Store certification.',
    },
    {
      title: 'Generative AI Workspace',
      name: 'OmniAI Workflow Canvas',
      type: 'Generative AI & Agentic System',
      req: 'Multi-modal canvas workspace where users can chat with Gemini, generate structured documents, and automate multi-step API research tasks with streaming feedback.',
    },
    {
      title: 'High-QPS Financial Ledger',
      name: 'Vortex Transaction Core',
      type: 'FinTech & Distributed Systems',
      req: 'Sub-millisecond ledger system with deterministic state log, WebSocket market data broadcast, and bank-grade cryptographic audit trails.',
    },
    {
      title: 'Collaborative Design Tool',
      name: 'Prism Multi-User Studio',
      type: 'Real-time Web Application',
      req: '60fps collaborative graphics editor with CRDT multiplayer synchronization, infinite canvas, and WebGL shader effects.',
    },
  ];

  const handleApplyPreset = (p: typeof scoperPresets[0]) => {
    setProjectName(p.name);
    setProjectType(p.type);
    setRequirements(p.req);
  };

  const handleGenerateScope = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai-scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: projectName || 'Custom Studio Project',
          projectType,
          targetScale,
          techPreferences,
          requirements: requirements || 'High-performance distributed system with real-time UI.',
        }),
      });

      const data = await response.json();
      if (data && data.blueprint) {
        setBlueprintResult(data.blueprint);
      }
    } catch (err) {
      console.error('Failed to generate scope via API:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyBlueprint = () => {
    if (!blueprintResult) return;
    const text = JSON.stringify(blueprintResult, null, 2);
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  // Estimator Calculations
  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let baseWeeks = 4;
    let baseBudgetPerSprint = 9500; // 2-week sprint

    if (estPlatform === 'xbox') baseWeeks += 3;
    if (estPlatform === 'ai') baseWeeks += 3;
    if (estPlatform === 'cloud') baseWeeks += 2;
    if (estPlatform === 'mobile') baseWeeks += 3;

    if (estScale === 'growth') baseWeeks += 2;
    if (estScale === 'enterprise') baseWeeks += 4;

    baseWeeks += selectedModules.length * 1;

    if (teamPacing === 'turbo') {
      baseWeeks = Math.max(4, Math.round(baseWeeks * 0.7));
      baseBudgetPerSprint = 16000; // 4 engineers
    }

    const sprints = Math.ceil(baseWeeks / 2);
    const totalEstimateMin = sprints * baseBudgetPerSprint;
    const totalEstimateMax = Math.round(totalEstimateMin * 1.25);

    return {
      weeks: baseWeeks,
      sprints,
      minCost: totalEstimateMin,
      maxCost: totalEstimateMax,
    };
  };

  const estimate = calculateEstimate();

  return (
    <section id="workbench" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                Studio Workbench & Interactive Tools
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Engineering Lab.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base font-serif italic font-light">
              Test our AI architecture scoper, calculate timelines and team sizing, or inspect live production code patterns.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('ai-scoper')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ai-scoper'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Scoper</span>
            </button>
            <button
              onClick={() => setActiveTab('cost-calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'cost-calculator'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cost Estimator</span>
            </button>
            <button
              onClick={() => setActiveTab('code-lab')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'code-lab'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Lab</span>
            </button>
          </div>
        </div>

        {/* TAB 1: AI Architecture Scoper */}
        {activeTab === 'ai-scoper' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-5 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>AI SYSTEM ARCHITECT</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                  Gemini 3.7
                </span>
              </div>

              {/* Quick Presets */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  Load Template:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scoperPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleGenerateScope} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Distributed Payment Mesh"
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1">Architecture Category</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200"
                  >
                    <option>Full-Stack Web & AI Application</option>
                    <option>Xbox App Development & Publishing</option>
                    <option>Mobile App Development (iOS & Android)</option>
                    <option>Generative AI & Agentic System</option>
                    <option>FinTech & Distributed Systems</option>
                    <option>Cloud Infrastructure & High-QPS Ops</option>
                    <option>Interactive 3D / WebGL Creative Tool</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1">Target Concurrency / Scale</label>
                  <select
                    value={targetScale}
                    onChange={(e) => setTargetScale(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200"
                  >
                    <option>10k - 50k monthly active users</option>
                    <option>100k - 500k monthly active users</option>
                    <option>1M+ global scale & sub-50ms p99</option>
                    <option>Internal Enterprise / SOC2 compliant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1">Requirements & Vision</label>
                  <textarea
                    rows={4}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Describe key features, data throughput, AI models needed, or specific latency constraints..."
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200 leading-relaxed resize-none font-sans font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 rounded-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing System Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Architecture Blueprint</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Blueprint Output Column */}
            <div className="lg:col-span-7 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl min-h-[480px] flex flex-col justify-between">
              {blueprintResult ? (
                <div className="space-y-6">
                  {/* Top bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-white font-bold uppercase tracking-wider">
                      <Check className="w-4 h-4 text-white" />
                      <span>ARCHITECTURAL BLUEPRINT READY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyBlueprint}
                        className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedBlueprint ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBlueprint ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-850">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                      EXECUTIVE ARCHITECTURE SUMMARY
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-serif italic font-light">
                      {blueprintResult.summary}
                    </p>
                  </div>

                  {/* Recommended Stack Matrix */}
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Recommended Production Stack
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 bg-zinc-950 rounded border border-zinc-850">
                        <span className="text-zinc-500 text-[10px] block uppercase">FRONTEND</span>
                        <span className="text-white font-semibold">{blueprintResult.recommendedStack.frontend}</span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded border border-zinc-850">
                        <span className="text-zinc-500 text-[10px] block uppercase">BACKEND / API</span>
                        <span className="text-white font-semibold">{blueprintResult.recommendedStack.backend}</span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded border border-zinc-850">
                        <span className="text-zinc-500 text-[10px] block uppercase">DATABASE & CACHE</span>
                        <span className="text-white font-semibold">{blueprintResult.recommendedStack.database}</span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded border border-zinc-850">
                        <span className="text-zinc-500 text-[10px] block uppercase">AI & INFRASTRUCTURE</span>
                        <span className="text-zinc-200 font-semibold">{blueprintResult.recommendedStack.ai_layer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestones Roadmap */}
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Estimated Delivery Milestones ({blueprintResult.estimatedEffortWeeks})
                    </span>
                    <div className="space-y-2">
                      {blueprintResult.milestones.map((m, i) => (
                        <div key={i} className="p-3 bg-zinc-950 rounded border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                          <div>
                            <span className="font-bold text-white block">{m.phase}</span>
                            <span className="text-zinc-400 text-[11px] font-light">{m.deliverables}</span>
                          </div>
                          <span className="font-mono text-white text-[11px] shrink-0 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                            {m.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security & Team Sizing Footer */}
                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="text-zinc-400">
                      <span className="text-zinc-500 uppercase">Team: </span>
                      <span className="text-white">{blueprintResult.recommendedTeamSize}</span>
                    </div>
                    <button
                      onClick={() =>
                        onDirectInquiry({
                          projectType,
                          message: `Blueprint Reference: ${projectName}\nSummary: ${blueprintResult.summary}`,
                        })
                      }
                      className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Build With Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-zinc-500">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                      System Blueprint Generator
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mt-1 font-light">
                      Select a template on the left or enter your product requirements. Our engine will synthesize an end-to-end architecture recommendation.
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyPreset(scoperPresets[0])}
                    className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Try Sample: OmniAI Workflow Canvas
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Project Sizing & Cost/Timeline Estimator */}
        {activeTab === 'cost-calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls Left Column */}
            <div className="lg:col-span-7 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              {/* Platform Tier */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                  1. Core Architecture Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'web', label: 'Full-Stack Web', desc: 'React 19 + Node' },
                    { id: 'xbox', label: 'Xbox App', desc: 'Series X|S & Store' },
                    { id: 'mobile', label: 'Mobile App', desc: 'iOS & Android' },
                    { id: 'ai', label: 'AI / RAG', desc: 'Gemini + Vector' },
                    { id: 'cloud', label: 'High-QPS Ops', desc: 'K8s + Edge Mesh' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstPlatform(item.id as any)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        estPlatform === item.id
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono uppercase">{item.label}</div>
                      <div className={`text-[10px] mt-0.5 ${estPlatform === item.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Scale */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                  2. Traffic & SLA Requirement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'startup', label: 'MVP / Seed', sla: '99.9% SLA' },
                    { id: 'growth', label: 'Scale / Series A-B', sla: '99.99% • Multi-AZ' },
                    { id: 'enterprise', label: 'Enterprise Global', sla: 'Sub-50ms • SOC2' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setEstScale(s.id as any)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        estScale === s.id
                          ? 'bg-zinc-800 border-zinc-500 text-white ring-1 ring-zinc-500'
                          : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono uppercase">{s.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{s.sla}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Functional Modules */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                  3. Key Architectural Modules Needed
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'auth', label: 'Auth0 / WebAuthn & RBAC' },
                    { id: 'realtime', label: 'WebSocket & Live Stream' },
                    { id: 'vector', label: 'pgvector / RAG Index' },
                    { id: 'gamepad', label: '10-Foot Gamepad Navigation' },
                    { id: 'xboxlive', label: 'Xbox Live & Store Cert' },
                    { id: 'billing', label: 'Stripe Billing Engine' },
                    { id: 'admin', label: 'Custom Admin Ops Portal' },
                    { id: 'soc2', label: 'SOC2 & Pen-Test Ready' },
                  ].map((mod) => {
                    const isChecked = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-zinc-900 border-zinc-600 text-white'
                            : 'bg-zinc-950/60 border-zinc-850 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <span>{mod.label}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Team Velocity */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                  4. Studio Team Velocity
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTeamPacing('standard')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      teamPacing === 'standard'
                        ? 'bg-zinc-900 border-zinc-600 text-white'
                        : 'bg-zinc-950 border-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono uppercase">Standard Studio Squad</div>
                    <div className="text-[11px] text-zinc-500 mt-1">2 Senior Engineers + Technical Lead</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTeamPacing('turbo')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      teamPacing === 'turbo'
                        ? 'bg-zinc-900 border-zinc-600 text-white'
                        : 'bg-zinc-950 border-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono text-white uppercase">Turbo Velocity Sprint</div>
                    <div className="text-[11px] text-zinc-500 mt-1">4 Senior Engineers + Systems Architect</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Estimate Summary Right Column */}
            <div className="lg:col-span-5 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  PROJECT SPRINT SCOPE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white uppercase">
                  Fixed-Sprint Model
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-850 text-center space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Estimated Delivery Time</span>
                <div className="text-4xl font-bold font-mono text-white">
                  {estimate.weeks} <span className="text-lg font-normal text-zinc-500">Weeks</span>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  ({estimate.sprints} Two-Week Production Sprints)
                </div>
              </div>

              {/* Budget Range */}
              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-850 space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span className="uppercase">Investment Range</span>
                  <span className="text-white font-semibold">
                    ${(estimate.minCost / 1000).toFixed(0)}k - ${(estimate.maxCost / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-serif italic font-light leading-relaxed">
                  Includes end-to-end architecture, staging environments, production deployment, automated test suite, and 30-day post-launch warranty.
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-zinc-850 text-zinc-400">
                  <span>Base Architecture:</span>
                  <span className="text-white">{estPlatform.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-850 text-zinc-400">
                  <span>Target SLA Tier:</span>
                  <span className="text-white">{estScale.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-850 text-zinc-400">
                  <span>Active Modules:</span>
                  <span className="text-white">{selectedModules.length} selected</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() =>
                  onDirectInquiry({
                    projectType: `${estPlatform.toUpperCase()} Platform (${estScale})`,
                    budget: `$${(estimate.minCost / 1000).toFixed(0)}k - $${(estimate.maxCost / 1000).toFixed(0)}k`,
                    message: `Estimated Sprint Scope: ${estimate.weeks} Weeks (${estimate.sprints} Sprints). Selected Modules: ${selectedModules.join(', ')}.`,
                  })
                }
                className="w-full py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        )}

        {/* TAB 3: Code Lab */}
        {activeTab === 'code-lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Snippet Picker Left */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Production Code Patterns
              </span>
              {SAMPLE_CODE_SNIPPETS.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveSnippetIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeSnippetIndex === idx
                      ? 'bg-zinc-900 border-zinc-500 text-white'
                      : 'bg-zinc-950/80 border-zinc-850 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold font-mono uppercase">{snippet.title}</div>
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-2 font-light">
                    {snippet.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Code Display Right */}
            <div className="lg:col-span-8 bg-[#0D0D0D] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-zinc-800">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <Code2 className="w-4 h-4 text-white" />
                  <span className="uppercase">{SAMPLE_CODE_SNIPPETS[activeSnippetIndex].title}</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(SAMPLE_CODE_SNIPPETS[activeSnippetIndex].code);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-x-auto bg-[#090909] font-mono text-xs leading-relaxed text-zinc-200">
                <pre>
                  <code>{SAMPLE_CODE_SNIPPETS[activeSnippetIndex].code}</code>
                </pre>
              </div>

              <div className="p-4 bg-[#0D0D0D] border-t border-zinc-800 text-xs text-zinc-400 font-sans">
                <span className="font-mono text-white font-semibold mr-1 uppercase">ENGINEERING NOTE:</span>
                {SAMPLE_CODE_SNIPPETS[activeSnippetIndex].description}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
