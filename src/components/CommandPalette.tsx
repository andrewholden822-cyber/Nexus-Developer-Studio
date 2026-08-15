import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Calculator, Layers, Code2, Terminal, ArrowRight, X, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction('open-palette');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectAction]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'ai-scoper',
      title: 'Launch AI Architecture Scoper',
      category: 'Interactive Tools',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      shortcut: 'AI',
    },
    {
      id: 'cost-estimator',
      title: 'Calculate Project Timeline & Budget',
      category: 'Interactive Tools',
      icon: <Calculator className="w-4 h-4 text-cyan-400" />,
      shortcut: 'CALC',
    },
    {
      id: 'case-studies',
      title: 'Browse Production Case Studies',
      category: 'Portfolio',
      icon: <Layers className="w-4 h-4 text-neutral-400" />,
      shortcut: 'WORK',
    },
    {
      id: 'tech-radar',
      title: 'Inspect Studio Tech Radar',
      category: 'Engineering Standards',
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      shortcut: 'STACK',
    },
    {
      id: 'inquiry',
      title: 'Initiate Technical Discovery RFP',
      category: 'Contact',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      shortcut: 'RFP',
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search studio actions..."
            className="w-full bg-transparent text-xs font-mono text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-300 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectAction(item.id);
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-neutral-800/80 flex items-center justify-between group transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-neutral-950 border border-neutral-800 group-hover:border-neutral-700">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-200 group-hover:text-white font-mono">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    {item.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                  {item.shortcut}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-xs font-mono text-neutral-500">
              No matching studio commands found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Navigation: Use arrow keys or click</span>
          <span>Esc to close</span>
        </div>

      </div>
    </div>
  );
};
