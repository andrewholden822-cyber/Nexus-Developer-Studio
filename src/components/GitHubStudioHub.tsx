import React, { useState, useEffect } from 'react';
import { GitHubRepoData, GitHubRepoAnalysis } from '../types';
import {
  Github,
  Search,
  Star,
  GitFork,
  AlertCircle,
  ShieldCheck,
  Zap,
  Code2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

const PRESET_REPOS = [
  { label: 'Tailwind CSS', repo: 'tailwindlabs/tailwindcss' },
  { label: 'React Core', repo: 'facebook/react' },
  { label: 'Next.js', repo: 'vercel/next.js' },
  { label: 'Golang', repo: 'golang/go' },
];

const STUDIO_OPEN_SOURCE = [
  {
    name: 'nexus-fluid-physics',
    fullName: 'nexus-studio/fluid-physics',
    description: 'GPU-accelerated WebGL particle fluid dynamics & spring solver for interactive UI canvas experiences.',
    stars: 3840,
    forks: 290,
    language: 'TypeScript',
    license: 'MIT',
    tag: 'Creative Dev',
    cloneCommand: 'git clone https://github.com/nexus-studio/fluid-physics.git',
  },
  {
    name: 'nexus-ebpf-mesh',
    fullName: 'nexus-studio/ebpf-mesh',
    description: 'Kernel-level edge packet routing daemon & zero-overhead microservice telemetry collector in Rust.',
    stars: 5120,
    forks: 410,
    language: 'Rust / Go',
    license: 'Apache-2.0',
    tag: 'Cloud & Infra',
    cloneCommand: 'git clone https://github.com/nexus-studio/ebpf-mesh.git',
  },
  {
    name: 'pgvector-hnsw-toolkit',
    fullName: 'nexus-studio/pgvector-hnsw-toolkit',
    description: 'Production utilities for hybrid full-text + HNSW vector similarity search with automated index warmups.',
    stars: 2470,
    forks: 185,
    language: 'TypeScript / SQL',
    license: 'MIT',
    tag: 'AI Systems',
    cloneCommand: 'git clone https://github.com/nexus-studio/pgvector-hnsw-toolkit.git',
  },
];

export const GitHubStudioHub: React.FC = () => {
  const [repoInput, setRepoInput] = useState('tailwindlabs/tailwindcss');
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [repoData, setRepoData] = useState<GitHubRepoData | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<GitHubRepoAnalysis | null>(null);
  const [copiedClone, setCopiedClone] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchRepoInfo = async (targetRepo: string) => {
    setLoadingRepo(true);
    setErrorMsg(null);
    setAnalysis(null);

    try {
      const res = await fetch(`/api/github/repo?repo=${encodeURIComponent(targetRepo)}`);
      const data = await res.json();
      if (data && data.success && data.repo) {
        setRepoData(data.repo);
      } else {
        setErrorMsg(data.error || 'Could not locate repository on GitHub.');
      }
    } catch (err) {
      setErrorMsg('Failed to communicate with GitHub API.');
    } finally {
      setLoadingRepo(false);
    }
  };

  useEffect(() => {
    fetchRepoInfo('tailwindlabs/tailwindcss');
  }, []);

  const handleRunAudit = async () => {
    if (!repoData || analyzing) return;
    setAnalyzing(true);

    try {
      const res = await fetch('/api/github/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoData }),
      });
      const data = await res.json();
      if (data && data.success && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('GitHub analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClone(id);
    setTimeout(() => setCopiedClone(null), 2000);
  };

  return (
    <section id="github" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                GitHub Integration // Open Source Hub
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Works With GitHub.
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base font-serif italic font-light leading-relaxed">
              Inspect public repositories, run automated architectural audits with Gemini Flash-Lite, and explore NEXUS open-source systems.
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Visit Studio GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Top: Interactive Repository Inspector & Analyzer */}
        <div className="bg-[#0D0D0D] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-white" />
                <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                  Live GitHub Repository Inspector
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1">
                Enter any public GitHub repo (<code className="font-mono text-zinc-300">owner/repo</code>) to inspect live metrics and perform an AI architectural audit.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Presets:</span>
              {PRESET_REPOS.map((item) => (
                <button
                  key={item.repo}
                  onClick={() => {
                    setRepoInput(item.repo);
                    fetchRepoInfo(item.repo);
                  }}
                  className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (repoInput.trim()) {
                fetchRepoInfo(repoInput.trim());
              }
            }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Github className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="e.g. tailwindlabs/tailwindcss or facebook/react"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-xs font-mono text-zinc-100 placeholder:text-zinc-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loadingRepo}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:bg-zinc-800 text-black font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {loadingRepo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Inspect Repository</span>
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Fetched Repo Overview Card */}
          {repoData && !loadingRepo && (
            <div className="mt-6 pt-6 border-t border-zinc-850 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                      <span>{repoData.fullName}</span>
                      <a
                        href={repoData.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light max-w-2xl">
                    {repoData.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunAudit}
                    disabled={analyzing}
                    className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg group"
                  >
                    {analyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        <span>Auditing with Flash-Lite...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300 group-hover:text-white" />
                        <span>Run AI Architecture Audit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Repo Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center gap-3">
                  <Star className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">Stars</div>
                    <div className="text-white font-bold">{repoData.stars.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center gap-3">
                  <GitFork className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">Forks</div>
                    <div className="text-white font-bold">{repoData.forks.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">Primary Language</div>
                    <div className="text-white font-bold">{repoData.language}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">License</div>
                    <div className="text-white font-bold truncate max-w-[120px]">{repoData.license}</div>
                  </div>
                </div>
              </div>

              {/* Topics Pills */}
              {repoData.topics && repoData.topics.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">Topics:</span>
                  {repoData.topics.slice(0, 8).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              {/* AI Architecture Audit Results */}
              {analysis && (
                <div className="mt-6 p-6 rounded-xl bg-zinc-950 border border-zinc-700/80 shadow-2xl space-y-6 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                        {analysis.healthScore}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
                          <span>AI Architecture & Health Score</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                            Gemini Flash-Lite Verified
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light mt-0.5">
                          {analysis.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Performance & Scalability */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-zinc-300 font-mono uppercase font-bold text-[11px]">
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <span>Performance & Latency Optimization</span>
                      </div>
                      <ul className="space-y-2">
                        {analysis.performanceOpportunities.map((item, idx) => (
                          <li key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 font-light leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Security Hardening */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-zinc-300 font-mono uppercase font-bold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                        <span>Security & Supply Chain Audit</span>
                      </div>
                      <ul className="space-y-2">
                        {analysis.securityReview.map((item, idx) => (
                          <li key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 font-light leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Modernization Roadmap */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-zinc-300 font-mono uppercase font-bold text-[11px] mb-3">
                      <Layers className="w-3.5 h-3.5 text-white" />
                      <span>Recommended Modernization Roadmap</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {analysis.modernizationRoadmap.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-zinc-850 text-xs">
                          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                            Phase 0{idx + 1}
                          </div>
                          <p className="text-zinc-300 font-light">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom: Studio Open Source Repositories Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white font-mono">
                Studio Open-Source Libraries
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-1">
                Battle-tested microservices, graphics solvers, and vector search utilities authored by NEXUS engineers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO_OPEN_SOURCE.map((repo) => (
              <div
                key={repo.name}
                className="p-6 rounded-2xl bg-[#0D0D0D] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                      {repo.tag}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Star className="w-3.5 h-3.5 text-white" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold font-mono text-white mb-2">
                    {repo.fullName}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-850 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{repo.language}</span>
                    <span>License: {repo.license}</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-[11px] font-mono text-zinc-300">
                    <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate flex-1 font-mono text-[10px]">{repo.cloneCommand}</span>
                    <button
                      onClick={() => copyText(repo.cloneCommand, repo.name)}
                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy Clone Command"
                    >
                      {copiedClone === repo.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
