import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenHistory: () => void;
  onOpenPrivacy: () => void;
  onOpenDesignAppendix: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenHistory,
  onOpenPrivacy,
  onOpenDesignAppendix,
}) => {
  return (
    <footer className="bg-[#080808] border-t border-[#262626] full-width mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12 py-12 max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#C5A059] flex items-center justify-center text-black font-serif font-bold text-sm">
              L
            </div>
            <span className="font-serif text-[#F0F0F0] text-[22px] font-bold uppercase tracking-widest">
              Luthier Elite
            </span>
          </div>
          <p className="text-[#D1D5DB] text-xs md:text-sm font-normal leading-relaxed max-w-sm">
            Artesanía y Tradición Musical 2026. Creando el futuro de la música sinfónica con técnicas centenarias de luthería europea.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenDesignAppendix}
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-[#e4c27b] uppercase tracking-wider font-semibold py-1 border-b border-[#C5A059]/40 hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Apéndice de Proceso & Wireframe</span>
            </button>
          </div>
        </div>

        {/* Contact Links Column */}
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-1">
            Navegación & Contacto
          </span>
          <a
            href="#contactos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contactos');
            }}
            className="text-[#D1D5DB] hover:text-[#C5A059] text-xs uppercase tracking-wider transition-colors duration-200"
          >
            Correo Electrónico de Consultas
          </a>
          <a
            href="#contactos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contactos');
            }}
            className="text-[#D1D5DB] hover:text-[#C5A059] text-xs uppercase tracking-wider transition-colors duration-200"
          >
            Celular & WhatsApp del Atelier
          </a>
          <a
            href="#contactos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contactos');
            }}
            className="text-[#D1D5DB] hover:text-[#C5A059] text-xs uppercase tracking-wider transition-colors duration-200"
          >
            Redes Sociales & Conservatorios
          </a>
          <button
            onClick={onOpenHistory}
            className="text-left text-[#D1D5DB] hover:text-[#C5A059] text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Nuestra Historia & Talleres
          </button>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col gap-3 md:items-end justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPrivacy}
              className="text-[#E5E7EB] hover:text-[#C5A059] text-xs uppercase tracking-wider font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Aviso de Privacidad</span>
            </button>
            <span className="text-[#444444]">|</span>
            <button
              onClick={onOpenPrivacy}
              className="text-[#E5E7EB] hover:text-[#C5A059] text-xs uppercase tracking-wider font-medium transition-colors duration-200 cursor-pointer"
            >
              Términos Legales
            </button>
          </div>
          <p className="text-[#9CA3AF] text-xs mt-4 text-left md:text-right font-normal leading-relaxed">
            © 2026 Luthier Elite (Tienda Musical Melodía).<br />
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
