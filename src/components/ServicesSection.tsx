import React, { useState } from 'react';
import { SERVICES } from '../data/studioData';
import { Layers, Cpu, Server, Sparkles, Zap, Check, ArrowRight, Code2, Smartphone, Globe, Palette, ShieldCheck } from 'lucide-react';

interface ServicesSectionProps {
  onOpenInquiryForService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiryForService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[1px] bg-zinc-700"></span>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
              Studio Capabilities // Engineering Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
            Services & Core Practices
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-serif italic font-light leading-relaxed">
            Specialized engineering squads delivering bespoke web development, high-performance mobile apps, and refined UI/UX design systems.
          </p>
        </div>

        {/* Highlighted 3-Pillar Cards for Web Development, Mobile App Development, and UI/UX Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SERVICES.slice(0, 3).map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900/90 border-zinc-500 shadow-2xl ring-1 ring-zinc-500/40'
                    : 'bg-[#0D0D0D] border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${isSelected ? 'bg-white text-black border-white' : 'bg-zinc-950 border-zinc-800 text-zinc-300'}`}>
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase tracking-wider">{service.technologies.slice(0, 3).join(', ')}</span>
                  <span className="text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Scope <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column Interactive Capabilities Showcase for Deep Inspection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-2 px-1">
              Select Practice for Detailed Specs:
            </div>
            {SERVICES.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-500 shadow-xl shadow-black ring-1 ring-zinc-500/50'
                      : 'bg-zinc-950/80 border-zinc-850 hover:bg-zinc-900/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold tracking-tight uppercase transition-colors ${
                          isSelected ? 'text-white' : 'text-zinc-300'
                        }`}>
                          {service.title}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-light">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border shrink-0 hidden sm:inline-block ${
                      isSelected
                        ? 'bg-zinc-800 text-white border-zinc-600 font-bold'
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                    }`}
                  >
                    {service.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Service Details Panel */}
          <div className="lg:col-span-7 bg-[#0D0D0D] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-750 text-white font-semibold text-[10px] uppercase tracking-wider">
                  {activeService.badge}
                </span>
                <span className="text-zinc-500">// DETAILED SPECIFICATION</span>
              </div>
              <button
                onClick={() => onOpenInquiryForService(activeService.title)}
                className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Request brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                  {activeService.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                  {activeService.tagline}
                </p>
                <p className="text-sm text-zinc-300 mt-3 leading-relaxed font-light">
                  {activeService.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Key Engineering Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-zinc-300 font-light"
                    >
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Primary Tech Stack & Protocols
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA footer inside card */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-zinc-500">
                  Standard engagement: 4 to 12 weeks
                </span>
                <button
                  onClick={() => onOpenInquiryForService(activeService.title)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Book Discovery Call
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
