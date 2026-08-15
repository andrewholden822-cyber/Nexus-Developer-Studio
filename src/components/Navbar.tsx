import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Command, ArrowRight, Menu, X, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenCommandPalette: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEstimator,
  onOpenCommandPalette,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pingMs, setPingMs] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate realistic network latency jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setPingMs(Math.floor(22 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="studio-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800/60 py-3 shadow-2xl'
          : 'bg-[#0A0A0A]/40 backdrop-blur-sm border-b border-zinc-850/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Studio Identifier (Elegant Dark Minimal Mark) */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none rounded-lg p-1">
          <div className="w-7 h-7 bg-white flex items-center justify-center rounded-sm shadow-sm group-hover:bg-zinc-200 transition-colors">
            <div className="w-3.5 h-3.5 bg-black rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter uppercase text-sm text-white">
              NEXUS STUDIO
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Systems & Design</span>
          </div>
        </a>

        {/* Live Studio Status Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/60 rounded-full px-3.5 py-1 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">Available Q3/Q4</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
            <Activity className="w-3 h-3 text-zinc-400" />
            <span>Edge: {pingMs}ms</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <a
            href="#services"
            className="hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#case-studies"
            className="hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#github"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>GitHub</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700">Hub</span>
          </a>
          <a
            href="#workbench"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Workbench</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700">AI</span>
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls & Cmd+K Trigger */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="btn-nav-cmd-k"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Open Command Palette (Cmd + K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-[10px]">⌘K</span>
          </button>

          <button
            id="btn-nav-estimate"
            onClick={onOpenEstimator}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-zinc-400" />
            <span>Scope</span>
          </button>

          <button
            id="btn-nav-inquiry"
            onClick={onOpenInquiry}
            className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="btn-mobile-cmd-k"
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            id="btn-toggle-mobile-nav"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-zinc-800 px-4 pt-3 pb-6 mt-2 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-900 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white inline-block"></span>
              Studio Available (Q3/Q4)
            </span>
            <span>Edge: {pingMs}ms</span>
          </div>
          <div className="flex flex-col space-y-1 text-xs font-mono uppercase tracking-wider">
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
            >
              Projects
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
            >
              Capabilities
            </a>
            <a
              href="#workbench"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900 flex items-center justify-between"
            >
              <span>AI Workbench</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-white">LIVE</span>
            </a>
            <a
              href="#tech-radar"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
            >
              Tech Radar
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
            >
              Studio Manifesto
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-zinc-400" />
              Scope Project & Timeline
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
