import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Twitter, ArrowUp, Activity, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="studio-footer" className="bg-[#0A0A0A] border-t border-zinc-900 py-20 text-xs font-mono text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-white text-xs">
                NX
              </div>
              <span className="font-bold text-white text-sm tracking-wider uppercase">
                NEXUS DEVELOPER STUDIO
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-sans font-light">
              An elite creative technology & software engineering studio. We build distributed systems, generative AI engines, and high-performance digital products for ambitious teams.
            </p>

            <div className="flex items-center gap-3 text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                Systems Operational
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                {utcTime}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-2.5">
            <span className="text-white font-semibold uppercase tracking-wider block mb-3 text-[11px]">
              Studio
            </span>
            <div><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></div>
            <div><a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a></div>
            <div><a href="#workbench" className="hover:text-white transition-colors">AI Workbench</a></div>
            <div><a href="#tech-radar" className="hover:text-white transition-colors">Tech Radar</a></div>
            <div><a href="#team" className="hover:text-white transition-colors">Staff & Philosophy</a></div>
          </div>

          {/* Engineering Protocols */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-white font-semibold uppercase tracking-wider block mb-3 text-[11px]">
              Engineering Standards
            </span>
            <div className="text-zinc-400">SOC 2 Type II Compliance</div>
            <div className="text-zinc-400">WCAG 2.1 AAA Semantics</div>
            <div className="text-zinc-400">eBPF Zero-Downtime Mesh</div>
            <div className="text-zinc-400">pgvector RAG Pipelines</div>
            <div className="text-zinc-400">Sub-50ms Global Edge Routing</div>
          </div>

          {/* Connect & Top */}
          <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-white font-semibold uppercase tracking-wider block mb-3 text-[11px]">
                Connect
              </span>
              <div className="flex items-center gap-3 text-zinc-400 mb-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-950 border border-zinc-800 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-950 border border-zinc-800 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-950 border border-zinc-800 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer self-start uppercase tracking-wider text-[11px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} NEXUS Developer Studio LLC. All rights reserved. Code licensed under MIT / Commercial SLA.
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:underline">Security Vulnerability Program</a>
            <span>•</span>
            <a href="#contact" className="hover:underline">PGP Public Key</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
