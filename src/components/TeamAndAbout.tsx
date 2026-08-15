import React from 'react';
import { TEAM_MEMBERS, TESTIMONIALS } from '../data/studioData';
import { Quote, Github, Linkedin, ShieldCheck, Award, HeartHandshake, Terminal, CheckCircle2 } from 'lucide-react';

export const TeamAndAbout: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Philosophy Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                Studio DNA // Engineering Principles
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Direct Senior Access. Zero Bureaucracy.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-serif italic font-light leading-relaxed">
              Traditional agencies assign your critical project to junior teams managed by non-technical middlemen. At NEXUS, you collaborate directly with Principal Engineers and Systems Architects who have built systems processing billions in transactional volume.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 text-xs font-mono text-zinc-300 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Deterministic Sprints with fixed deliverables</span>
              </div>
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 text-xs font-mono text-zinc-300 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>100% Type-Safe & Automated CI/CD Testing</span>
              </div>
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 text-xs font-mono text-zinc-300 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Zero IP Lock-in — you own 100% of the code</span>
              </div>
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 text-xs font-mono text-zinc-300 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Sub-50ms Global SLA Performance Standard</span>
              </div>
            </div>
          </div>

          {/* Compliance & Standards Card */}
          <div className="lg:col-span-6 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                ENGINEERING PROTOCOLS & SECURITY
              </span>
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <span className="text-white font-bold">[SOC-2]</span>
                <span className="text-zinc-300 font-light">
                  Architectures comply with SOC 2 Type II controls, strict role-based access, and encrypted secrets management.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white font-bold">[WCAG]</span>
                <span className="text-zinc-300 font-light">
                  User interfaces pass WCAG 2.1 AAA accessibility audits with full keyboard navigation and screen reader semantics.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white font-bold">[TEST]</span>
                <span className="text-zinc-300 font-light">
                  Every sprint ships with end-to-end integration tests, load profiling reports, and automated security vulnerability scans.
                </span>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-850 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="uppercase">Verified Studio SLA</span>
              <span className="text-white font-bold">99.99% Uptime Standard</span>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mb-2">
              Leadership & Principal Staff
            </div>
            <h3 className="text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-white">
              The Engineers Building Your System.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0D0D0D] border border-zinc-850 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono font-bold text-white text-base">
                      {member.avatarText}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                      {member.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-mono uppercase">
                    {member.name}
                  </h4>
                  <span className="text-xs font-semibold text-zinc-300 block mt-0.5 uppercase tracking-wider">
                    {member.role}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mt-1">
                    {member.specialty}
                  </span>

                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-850 flex items-center gap-3 text-zinc-400">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="mb-10">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mb-2">
              Client Testimonials
            </div>
            <h3 className="text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-white">
              Trusted by Engineering Leaders.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0D0D0D] border border-zinc-850 rounded-xl p-7 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <Quote className="w-6 h-6 text-zinc-600 mb-4" />
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-serif italic font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-850 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {t.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">{t.author}</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.role} • {t.company}</div>
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
