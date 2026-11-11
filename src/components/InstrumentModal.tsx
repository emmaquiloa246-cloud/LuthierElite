import React, { useState } from 'react';
import { Instrument } from '../types';
import { X, Volume2, VolumeX, ShieldCheck, MapPin, Sparkles, Check, Send, ShoppingBag } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

interface InstrumentModalProps {
  instrument: Instrument | null;
  onClose: () => void;
  onAddToCart: (instrument: Instrument) => void;
  onConsultDirectly: (instrument: Instrument) => void;
  isInCart: boolean;
}

export const InstrumentModal: React.FC<InstrumentModalProps> = ({
  instrument,
  onClose,
  onAddToCart,
  onConsultDirectly,
  isInCart,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!instrument) return null;

  const handleToggleSound = () => {
    if (isPlaying) {
      soundEngine.stopAll();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      soundEngine.playInstrumentPreview(instrument.audioPreset, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border border-[#333333] shadow-2xl rounded-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-[#D1D5DB] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#333333] hover:border-[#C5A059] rounded-none transition-colors z-20 cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10">
          {/* Left: Instrument Portrait & Audio Player */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#111111] p-6 border border-[#262626] relative shadow-inner">
            <div className="absolute top-3 left-3 bg-[#C5A059] text-black text-xs uppercase font-bold tracking-[0.2em] px-3 py-1 rounded-none shadow">
              {instrument.craftLevel}
            </div>

            <div className="relative w-full h-72 md:h-80 flex items-center justify-center my-4">
              <img
                src={instrument.image}
                alt={instrument.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Audio Sampler Control */}
            <div className="w-full bg-[#161616] border border-[#333333] p-3.5 mt-2 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleSound}
                  className={`p-3 rounded-none text-black transition-all cursor-pointer ${
                    isPlaying ? 'bg-[#C5A059] animate-pulse' : 'bg-[#C5A059] hover:bg-[#d8b570]'
                  }`}
                  title="Reproducir muestra armónica acústica"
                >
                  {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div>
                  <span className="text-xs font-bold text-white block uppercase tracking-wider">
                    {isPlaying ? 'Sonando Afinación...' : 'Escuchar Acústica'}
                  </span>
                  <span className="text-xs text-[#D1D5DB]">Timbre natural del atelier</span>
                </div>
              </div>
              <span className="text-xs text-[#C5A059] font-mono font-bold bg-black/60 px-2 py-1 border border-[#C5A059]/40">
                442 Hz
              </span>
            </div>
          </div>

          {/* Right: Detailed Artisan Specifications */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C5A059] font-semibold uppercase tracking-[0.25em] mb-2">
                <MapPin className="w-4 h-4" />
                <span>{instrument.origin}</span>
                <span>•</span>
                <span>{instrument.category}</span>
              </div>

              <h2 className="font-serif text-[32px] md:text-[38px] text-[#F0F0F0] font-light leading-tight tracking-wide">
                {instrument.name}
              </h2>
              <div className="w-16 h-0.5 bg-[#C5A059] my-3" />

              <div className="text-2xl font-mono text-[#C5A059] font-bold mt-2 mb-4">
                {instrument.price.toLocaleString()} €
                <span className="text-xs font-sans text-[#D1D5DB] font-normal ml-2">
                  (IVA y estuche artesanal acolchado incluido)
                </span>
              </div>

              <p className="text-sm md:text-base text-[#D1D5DB] font-normal leading-relaxed mb-6">
                {instrument.fullDescription}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-[#111111] p-5 border border-[#333333] mb-6 shadow-md">
                <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Ficha Técnica de Luthería Certificada</span>
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 text-xs md:text-sm">
                  {instrument.specifications.woodType && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Materia prima:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.woodType}</dd>
                    </div>
                  )}
                  {instrument.specifications.varnish && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Acabado / Barniz:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.varnish}</dd>
                    </div>
                  )}
                  {instrument.specifications.tuning && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Afinación / Tonalidad:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.tuning}</dd>
                    </div>
                  )}
                  {instrument.specifications.weight && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Peso:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.weight}</dd>
                    </div>
                  )}
                  {instrument.specifications.dimensions && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Dimensiones:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.dimensions}</dd>
                    </div>
                  )}
                  {instrument.specifications.yearOfCraft && (
                    <div>
                      <dt className="text-[#9CA3AF] font-medium">Año de Forja:</dt>
                      <dd className="text-white font-semibold mt-0.5">{instrument.specifications.yearOfCraft}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Quality Guarantee Note */}
              <div className="flex items-center gap-2.5 text-xs text-[#E5E7EB] mb-6 font-normal bg-[#141414] p-3 border border-[#2a2a2a]">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>Certificado de autenticidad emitido y garantía de ajuste por maestro luthier durante 5 años.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#262626]">
              <button
                onClick={() => onAddToCart(instrument)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-none text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer border ${
                  isInCart
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                    : 'bg-[#161616] text-[#F0F0F0] border-[#444444] hover:border-[#C5A059] hover:text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>En el Carrito</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onConsultDirectly(instrument);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#C5A059] text-black py-3.5 px-5 rounded-none text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Prueba Sonora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
