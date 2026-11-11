import React, { useState, useMemo } from 'react';
import { Instrument } from '../types';
import { Search, X, Volume2, ArrowRight, Music } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruments: Instrument[];
  onSelectInstrument: (instrument: Instrument) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  instruments,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return instruments.filter(
      (inst) =>
        inst.name.toLowerCase().includes(q) ||
        inst.category.toLowerCase().includes(q) ||
        inst.origin.toLowerCase().includes(q) ||
        inst.materials.toLowerCase().includes(q) ||
        inst.shortDescription.toLowerCase().includes(q)
    );
  }, [query, instruments]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0D0D0D] border border-[#222222] shadow-2xl overflow-hidden rounded-none">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#222222] bg-[#111111] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por violín, saxofón, corno, madera de abeto, Cremona..."
            className="flex-1 bg-transparent border-none text-base text-[#F0F0F0] focus:outline-none placeholder-[#666666] font-light"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] rounded-none transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-xs text-[#777777]">
              <p className="font-medium text-[#C5A059] uppercase tracking-[0.25em] mb-2">Búsqueda Rápida en el Catálogo</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Violín', 'Saxofón', 'Corno', 'Viola', 'Cuerda', 'Viento Metal'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-[#141414] hover:bg-[#C5A059] hover:text-black text-xs text-[#888888] rounded-none border border-[#262626] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center px-4">
              <div className="w-12 h-12 bg-[#161616] border border-[#2a2a2a] flex items-center justify-center mx-auto mb-3 text-[#C5A059]">
                <Music className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm font-medium text-[#F0F0F0] mb-1">
                We couldn't find any instruments matching that name.
              </p>
              <p className="text-xs text-[#777777] font-light max-w-sm mx-auto">
                No pudimos encontrar ningún instrumento con el término «<span className="text-[#C5A059]">{query}</span>». Pruebe con palabras clave como <span className="text-[#A0A0A0]">violín, corno, saxofón, cuerda</span> o explore las sugerencias.
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-4 px-4 py-1.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#C5A059] text-xs uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-colors cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((inst) => (
                <div
                  key={inst.id}
                  onClick={() => {
                    onSelectInstrument(inst);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-none hover:bg-[#141414] border border-transparent hover:border-[#262626] transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-[#111111] p-1 border border-[#222222] flex items-center justify-center">
                    <img
                      src={inst.image}
                      alt={inst.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base text-[#F0F0F0] font-normal group-hover:text-[#C5A059] transition-colors">
                        {inst.name}
                      </h4>
                      <span className="text-[9px] uppercase tracking-[0.2em] bg-[#1a1a1a] text-[#C5A059] px-2 py-0.5 rounded-none border border-[#2a2a2a]">
                        {inst.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#777777] font-light truncate mt-0.5">
                      {inst.shortDescription}
                    </p>
                    <span className="text-xs font-mono text-[#C5A059]">
                      {inst.price.toLocaleString()} €
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#555555] group-hover:text-[#C5A059] transform group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
