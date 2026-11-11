import React, { useState } from 'react';
import { Instrument, InstrumentCategory } from '../types';
import { Volume2, VolumeX, Eye, Plus, Check, Filter, ShoppingBag, Music, Sparkles, AlertCircle, Info } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

interface CatalogSectionProps {
  instruments: Instrument[];
  onSelectInstrument: (instrument: Instrument) => void;
  onAddToCart: (instrument: Instrument) => void;
  cartInstrumentIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  instruments,
  onSelectInstrument,
  onAddToCart,
  cartInstrumentIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<InstrumentCategory>('Todos');
  const [showExtended, setShowExtended] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories: InstrumentCategory[] = ['Todos', 'Cuerda', 'Viento Metal', 'Viento Madera', 'Percusión'];

  const getCategoryCount = (cat: InstrumentCategory) => {
    if (cat === 'Todos') return instruments.length;
    return instruments.filter((i) => i.category === cat).length;
  };

  const filteredInstruments = instruments.filter((inst) => {
    if (selectedCategory === 'Todos') return true;
    return inst.category === selectedCategory;
  });

  // Dedicated reference instruments for the iconic bento layout
  const violin = instruments.find((i) => i.id === 'violin-maestro') || instruments[0];
  const saxophone = instruments.find((i) => i.id === 'saxofon-tenor-oro') || instruments[1];
  const corno = instruments.find((i) => i.id === 'corno-frances-doble') || instruments[2];
  const viola = instruments.find((i) => i.id === 'viola-maestro-artesanal') || instruments[3];
  
  // Other instruments for expanded showcase
  const bentoIds = [violin?.id, saxophone?.id, corno?.id, viola?.id].filter(Boolean);
  const otherInstruments = instruments.filter((i) => !bentoIds.includes(i.id));

  const handlePlaySound = (e: React.MouseEvent, instrument: Instrument) => {
    e.stopPropagation();
    if (playingId === instrument.id) {
      soundEngine.stopAll();
      setPlayingId(null);
    } else {
      setPlayingId(instrument.id);
      soundEngine.playInstrumentPreview(instrument.audioPreset, () => {
        setPlayingId(null);
      });
    }
  };

  const isBentoDefault = selectedCategory === 'Todos';

  return (
    <section id="catalogo" className="max-w-[1280px] mx-auto px-4 md:px-12 pb-24 pt-4">
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-[0.3em] block mb-2">
          Colección Exclusiva de Instrumentos 2026
        </span>
        <h2 className="font-serif text-[36px] md:text-[52px] text-[#F0F0F0] inline-block relative font-light tracking-wide">
          Catálogo Oficial
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
        <p className="text-[#D1D5DB] text-sm md:text-base mt-4 max-w-2xl mx-auto font-normal leading-relaxed">
          Instrumentos maestros calibrados para acústica sinfónica y solistas de conservatorio. Maderas europeas y afinación templada a 442 Hz.
        </p>
      </div>

      {/* Category Filter Tabs with Item Counts */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
        {categories.map((cat) => {
          const count = getCategoryCount(cat);
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat !== 'Todos') setShowExtended(true);
              }}
              className={`px-4 md:px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer border rounded-none flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-lg'
                  : 'bg-[#111111] text-[#D1D5DB] border-[#333333] hover:border-[#C5A059] hover:text-white'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[11px] font-mono px-1.5 py-0.5 rounded-none font-bold ${
                  isSelected ? 'bg-black text-[#C5A059]' : 'bg-[#1e1e1e] text-[#C5A059]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Primary Reference Bento Grid (When "Todos" is selected) */}
      {isBentoDefault ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Violín */}
            {violin && (
              <div
                onClick={() => onSelectInstrument(violin)}
                className="group relative bg-[#0D0D0D] border border-[#262626] hover:border-[#C5A059] p-6 flex flex-col items-center justify-center min-h-[360px] transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                  onClick={(e) => handlePlaySound(e, violin)}
                  className={`absolute top-3 right-3 p-2.5 transition-colors z-20 border rounded-none ${
                    playingId === violin.id
                      ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                      : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Escuchar muestra sonora acústica"
                >
                  {playingId === violin.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                  <img
                    src={violin.image}
                    alt={violin.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                <h3 className="font-serif text-[22px] text-[#F0F0F0] font-light mt-auto group-hover:text-[#C5A059] transition-colors tracking-wide">
                  {violin.name}
                </h3>
                <div className="w-10 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                  Cuerda • Cremona
                </span>
                <span className="text-sm text-[#C5A059] font-mono font-bold mt-1">
                  {violin.price.toLocaleString()} €
                </span>
              </div>
            )}

            {/* Card 2: Saxofón (Centerpiece Bento 2x2 on LG) */}
            {saxophone && (
              <div
                onClick={() => onSelectInstrument(saxophone)}
                className="group relative bg-[#0E0E0E] border border-[#2a2a2a] hover:border-[#C5A059] p-6 md:p-8 flex flex-col items-center justify-center min-h-[360px] transition-all duration-300 cursor-pointer overflow-hidden lg:col-span-2 lg:row-span-2 lg:min-h-[520px] shadow-2xl"
              >
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 left-4 bg-[#141414] text-[#C5A059] text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 border border-[#C5A059]/50 z-20">
                  Pieza Destacada 2026
                </div>

                <button
                  onClick={(e) => handlePlaySound(e, saxophone)}
                  className={`absolute top-4 right-4 p-2.5 transition-colors z-20 border rounded-none ${
                    playingId === saxophone.id
                      ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                      : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Escuchar muestra sonora acústica"
                >
                  {playingId === saxophone.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-64 h-64 lg:w-96 lg:h-96 flex items-center justify-center mb-4 my-auto">
                  <img
                    src={saxophone.image}
                    alt={saxophone.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  />
                </div>

                <h3 className="font-serif text-[28px] md:text-[34px] text-[#F0F0F0] font-light mt-auto group-hover:text-[#C5A059] transition-colors tracking-wide">
                  {saxophone.name}
                </h3>
                <div className="w-14 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                  Viento Metal • París
                </span>
                <span className="text-base text-[#C5A059] font-mono font-bold mt-1">
                  {saxophone.price.toLocaleString()} €
                </span>
              </div>
            )}

            {/* Card 3: Corno */}
            {corno && (
              <div
                onClick={() => onSelectInstrument(corno)}
                className="group relative bg-[#0D0D0D] border border-[#262626] hover:border-[#C5A059] p-6 flex flex-col items-center justify-center min-h-[360px] transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                  onClick={(e) => handlePlaySound(e, corno)}
                  className={`absolute top-3 right-3 p-2.5 transition-colors z-20 border rounded-none ${
                    playingId === corno.id
                      ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                      : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Escuchar muestra sonora acústica"
                >
                  {playingId === corno.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                  <img
                    src={corno.image}
                    alt={corno.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                <h3 className="font-serif text-[22px] text-[#F0F0F0] font-light mt-auto group-hover:text-[#C5A059] transition-colors tracking-wide">
                  {corno.name}
                </h3>
                <div className="w-10 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                  Viento Metal • Alemania
                </span>
                <span className="text-sm text-[#C5A059] font-mono font-bold mt-1">
                  {corno.price.toLocaleString()} €
                </span>
              </div>
            )}

            {/* Card 4: Viola */}
            {viola && (
              <div
                onClick={() => onSelectInstrument(viola)}
                className="group relative bg-[#0D0D0D] border border-[#262626] hover:border-[#C5A059] p-6 flex flex-col items-center justify-center min-h-[360px] transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                  onClick={(e) => handlePlaySound(e, viola)}
                  className={`absolute top-3 right-3 p-2.5 transition-colors z-20 border rounded-none ${
                    playingId === viola.id
                      ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                      : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Escuchar muestra sonora acústica"
                >
                  {playingId === viola.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                  <img
                    src={viola.image}
                    alt={viola.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                <h3 className="font-serif text-[22px] text-[#F0F0F0] font-light mt-auto group-hover:text-[#C5A059] transition-colors tracking-wide">
                  {viola.name}
                </h3>
                <div className="w-10 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                  Cuerda • Mittenwald
                </span>
                <span className="text-sm text-[#C5A059] font-mono font-bold mt-1">
                  {viola.price.toLocaleString()} €
                </span>
              </div>
            )}
          </div>

          {/* Extended Grid of remaining 9 instruments */}
          {showExtended && (
            <div className="mt-8 pt-8 border-t border-[#222222]">
              <div className="text-center mb-8">
                <span className="text-xs text-[#C5A059] uppercase tracking-[0.25em] font-semibold block mb-1">
                  Inventario Completo Disponible
                </span>
                <h3 className="font-serif text-2xl text-white font-light">
                  Todos los Instrumentos en Taller ({instruments.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherInstruments.map((instrument) => {
                  const isInCart = cartInstrumentIds.includes(instrument.id);
                  return (
                    <div
                      key={instrument.id}
                      onClick={() => onSelectInstrument(instrument)}
                      className="group relative bg-[#0D0D0D] border border-[#262626] hover:border-[#C5A059] p-6 flex flex-col items-center justify-center min-h-[380px] transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
                    >
                      <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <button
                        onClick={(e) => handlePlaySound(e, instrument)}
                        className={`absolute top-3 right-3 p-2.5 transition-colors z-20 border rounded-none ${
                          playingId === instrument.id
                            ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                            : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                        }`}
                        title="Escuchar muestra sonora acústica"
                      >
                        {playingId === instrument.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                        <img
                          src={instrument.image}
                          alt={instrument.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                        />
                      </div>

                      <h3 className="font-serif text-[20px] text-[#F0F0F0] font-light mt-auto text-center group-hover:text-[#C5A059] transition-colors tracking-wide">
                        {instrument.name}
                      </h3>
                      <div className="w-8 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                      <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                        {instrument.category} • {instrument.origin.split(',')[0]}
                      </span>
                      <span className="text-sm text-[#C5A059] font-mono font-bold mt-1 mb-4">
                        {instrument.price.toLocaleString()} €
                      </span>

                      {/* Direct Action Buttons */}
                      <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#222222] z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectInstrument(instrument);
                          }}
                          className="py-2 px-2.5 bg-[#141414] hover:bg-[#202020] border border-[#333333] text-xs uppercase tracking-wider text-[#E5E7EB] hover:text-white transition-colors text-center font-medium"
                        >
                          Ver Detalles
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(instrument);
                          }}
                          className={`py-2 px-2.5 text-xs uppercase tracking-wider font-semibold transition-colors text-center flex items-center justify-center gap-1 cursor-pointer border ${
                            isInCart
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                              : 'bg-[#C5A059] text-black border-[#C5A059] hover:bg-[#d8b570]'
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>En Carrito</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Añadir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular Filtered Grid when a specific category is chosen */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => {
            const isInCart = cartInstrumentIds.includes(instrument.id);
            return (
              <div
                key={instrument.id}
                onClick={() => onSelectInstrument(instrument)}
                className="group relative bg-[#0D0D0D] border border-[#262626] hover:border-[#C5A059] p-6 flex flex-col items-center justify-center min-h-[400px] transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Sound Preview Button */}
                <button
                  onClick={(e) => handlePlaySound(e, instrument)}
                  className={`absolute top-3 right-3 p-2.5 transition-colors z-20 border rounded-none ${
                    playingId === instrument.id
                      ? 'bg-[#C5A059] text-black border-[#C5A059] animate-pulse'
                      : 'bg-[#141414] text-[#D1D5DB] border-[#333333] hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Escuchar muestra de sonido"
                >
                  {playingId === instrument.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-52 h-52 flex items-center justify-center mb-4">
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                <h3 className="font-serif text-[22px] text-[#F0F0F0] font-light mt-auto text-center group-hover:text-[#C5A059] transition-colors tracking-wide">
                  {instrument.name}
                </h3>
                <div className="w-10 h-px bg-[#333333] mt-2 mb-1 group-hover:bg-[#C5A059] transition-colors" />
                <span className="text-xs text-[#C5C5C5] uppercase tracking-[0.2em] font-semibold">
                  {instrument.subcategory || instrument.category}
                </span>
                <span className="text-xs text-[#9CA3AF] mt-0.5">
                  Origen: {instrument.origin}
                </span>
                <span className="text-base text-[#C5A059] font-mono font-bold mt-1 mb-4">
                  {instrument.price.toLocaleString()} €
                </span>

                {/* Direct Action Buttons */}
                <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#222222] z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectInstrument(instrument);
                    }}
                    className="py-2 px-2.5 bg-[#141414] hover:bg-[#202020] border border-[#333333] text-xs uppercase tracking-wider text-[#E5E7EB] hover:text-white transition-colors text-center font-medium"
                  >
                    Ver Detalles
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(instrument);
                    }}
                    className={`py-2 px-2.5 text-xs uppercase tracking-wider font-semibold transition-colors text-center flex items-center justify-center gap-1 cursor-pointer border ${
                      isInCart
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                        : 'bg-[#C5A059] text-black border-[#C5A059] hover:bg-[#d8b570]'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>En Carrito</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* "Ver Más" Toggle Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            if (selectedCategory !== 'Todos') {
              setSelectedCategory('Todos');
              setShowExtended(true);
            } else {
              setShowExtended(!showExtended);
            }
          }}
          className="bg-[#141414] text-[#F0F0F0] border border-[#333333] hover:border-[#C5A059] hover:text-white px-8 py-3.5 rounded-none text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2"
        >
          <span>{selectedCategory !== 'Todos' ? 'Ver Catálogo Completo (13)' : showExtended ? 'Mostrar Menos' : 'Ver Colección Completa (13 Instrumentos)'}</span>
        </button>
      </div>

      {/* Product Recommendations & Acoustic Affinity Disclaimer Notice (Compliance) */}
      <div className="mt-12 p-4 md:p-5 bg-[#101010] border border-[#2a2a2a] text-xs text-[#A3A3A3] flex items-start gap-3 rounded-none shadow-md">
        <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-white font-semibold uppercase tracking-wider text-[11px]">
            Nota de Descargo & Recomendaciones Acústicas:
          </p>
          <p className="leading-relaxed text-[#D1D5DB]">
            Las sugerencias de afinidad tímbrica, emparejamientos orquestales y recomendaciones de instrumentos son generadas automáticamente por el sistema acústico algorítmico y pueden contener imprecisiones ocasionales. Para una selección definitiva de concierto, recomendamos solicitar una prueba presencial con nuestros maestros luthiers en el atelier de Madrid, Cremona o París.
          </p>
        </div>
      </div>
    </section>
  );
};
