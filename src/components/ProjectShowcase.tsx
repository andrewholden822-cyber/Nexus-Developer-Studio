import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/studioData';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, X, ShieldAlert, Cpu, GitBranch, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  onOpenInquiryForProject: (projectTitle: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenInquiryForProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'AI Systems', 'Cloud & Infra', 'Xbox & TV Ecosystem', 'FinTech', 'Web Platforms', 'Creative Dev'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="case-studies" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                Selected Case Studies // 2024-2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Engineered For Scale.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base font-serif italic font-light">
              A breakdown of production architectures we designed and deployed for enterprise teams, high-growth startups, and creative platforms.
            </p>
          </div>

          {/* Filter Pills in Elegant Dark */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl p-6 flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-black"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4 pb-3 border-b border-zinc-800/80">
                  <span className="px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-zinc-500">{project.client} • {project.year}</span>
                </div>

                {/* Card Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <div className="w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 flex items-center justify-center text-zinc-500 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </h3>
                
                <p className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                  {project.tagline}
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6 font-light">
                  {project.description}
                </p>

                {/* Highlights / Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-950 rounded-lg border border-zinc-850 mb-6">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm font-bold font-mono text-white">
                        {m.value}
                      </span>
                      <span className="text-[11px] text-zinc-400 leading-tight">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Tags & Inspect Trigger */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-500 rounded">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="w-full py-2.5 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Inspect Architecture</span>
                </button>
              </div>
            </div>
          ))}

          {/* High-Contrast Studio Spotlight Card in Grid */}
          <div className="bg-white text-black p-6 rounded-xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-600 mb-4 pb-3 border-b border-zinc-200">
                <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[10px] uppercase tracking-wider font-bold">
                  SLA GUARANTEE
                </span>
                <span className="text-[11px]">Direct Partner Squad</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-black mb-2 uppercase">
                Rapid MVP to Enterprise Scale
              </h3>
              
              <p className="text-xs text-zinc-700 font-serif italic mb-6 leading-relaxed">
                "We don't ship prototypes that have to be rebuilt. Every line of code written by Nexus is engineered for production load from Day 1."
              </p>

              <div className="space-y-2 text-xs font-mono text-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>14-day zero-to-architecture sprint</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>Direct Slack/Discord senior channel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>100% intellectual property handover</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onOpenInquiryForProject('New Custom Project')}
                className="w-full py-3 px-4 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Sizing RFP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Deep Dive Architecture Modal in Elegant Dark */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0D0D0D] border border-zinc-800 rounded-xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-zinc-100">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                  <span className="text-white font-semibold">{activeProjectModal.category}</span>
                  <span>•</span>
                  <span>{activeProjectModal.client}</span>
                  <span>•</span>
                  <span>{activeProjectModal.year}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                  {activeProjectModal.title}
                </h3>
                <p className="text-sm font-mono text-zinc-400 mt-1">
                  {activeProjectModal.tagline}
                </p>
              </div>

              <button
                onClick={() => setActiveProjectModal(null)}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6">
              
              {/* Metrics Section */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Verified Production Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProjectModal.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-850">
                      <div className="text-lg font-bold font-mono text-white">{m.value}</div>
                      <div className="text-xs font-semibold text-zinc-300">{m.label}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{m.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Overview */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  System Architecture & Topography
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-lg border border-zinc-850 font-light">
                  {activeProjectModal.architecture.overview}
                </p>
              </div>

              {/* Execution Flow Steps */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Data Flow Pipeline
                </h4>
                <div className="space-y-2">
                  {activeProjectModal.architecture.flow.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-zinc-950/80 rounded-lg border border-zinc-850 text-xs text-zinc-300 font-mono">
                      <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges vs Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                    <ShieldAlert className="w-4 h-4 text-zinc-400" />
                    <span className="uppercase tracking-wider">Technical Challenges</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
                    {activeProjectModal.architecture.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-200 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="uppercase tracking-wider">Engineering Solutions</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                    {activeProjectModal.architecture.solutions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-md uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                Need similar architecture for your product?
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeProjectModal.title;
                    setActiveProjectModal(null);
                    onOpenInquiryForProject(title);
                  }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build Similar System</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
