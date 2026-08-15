import React, { useState } from 'react';
import { TECH_RADAR } from '../data/studioData';
import { TechItem } from '../types';
import { Radio, Layers, Search, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const TechRadar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRing, setSelectedRing] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Frontend', 'Backend & DB', 'AI & ML', 'DevOps & Cloud', 'Security'];
  const rings = ['All', 'Core', 'Adopt', 'Trial', 'Assess'];

  const filteredTech = TECH_RADAR.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesRing = selectedRing === 'All' || item.ring === selectedRing;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.useCase.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRing && matchesSearch;
  });

  const getRingColor = (ring: string) => {
    switch (ring) {
      case 'Core':
        return 'bg-zinc-800 text-white border-zinc-600 font-bold';
      case 'Adopt':
        return 'bg-zinc-900 text-zinc-200 border-zinc-750';
      case 'Trial':
        return 'bg-zinc-950 text-zinc-400 border-zinc-800';
      case 'Assess':
        return 'bg-zinc-950 text-zinc-500 border-zinc-850';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <section id="tech-radar" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                Studio Stack // Engineering Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Architectural Standard.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base font-serif italic font-light">
              We continuously evaluate emerging languages, runtime environments, and AI primitives. Here is our vetted engineering matrix.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack..."
              className="w-full pl-9 pr-3 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-6 border-b border-zinc-850">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs font-mono text-zinc-500 self-center mr-2 uppercase tracking-wider">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ring Filter */}
          <div className="flex flex-wrap gap-1.5 sm:ml-auto">
            <span className="text-xs font-mono text-zinc-500 self-center mr-2 uppercase tracking-wider">Maturity:</span>
            {rings.map((ring) => (
              <button
                key={ring}
                onClick={() => setSelectedRing(ring)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedRing === ring
                    ? 'bg-white text-black font-bold'
                    : 'bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white'
                }`}
              >
                {ring}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTech.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0D0D0D] border border-zinc-850 rounded-xl p-6 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-white font-mono uppercase">
                    {item.name}
                  </span>
                  <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${getRingColor(item.ring)}`}>
                    {item.ring}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  {item.category}
                </span>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-850 text-[11px] font-mono text-zinc-400 flex items-start gap-1.5 font-light">
                <span className="text-zinc-200 shrink-0 font-bold">&gt;</span>
                <span>{item.useCase}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredTech.length === 0 && (
          <div className="text-center py-12 text-zinc-500 font-mono text-xs uppercase tracking-wider">
            No technologies found matching criteria.
          </div>
        )}

      </div>
    </section>
  );
};
