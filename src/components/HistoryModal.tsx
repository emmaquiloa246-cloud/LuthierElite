import React from 'react';
import { X, Award, Trees, Sparkles, Hammer, Music, Clock } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCatalog: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onExploreCatalog,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border border-[#222222] shadow-2xl rounded-none p-6 md:p-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] rounded-none transition-colors z-20 cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-[10px] font-medium text-[#C5A059] uppercase tracking-[0.3em] block mb-2">
            Herencia & Maestría
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-[#F0F0F0] font-light tracking-wide">
            Historia de Luthier Elite
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-3" />
        </div>

        <div className="space-y-6 text-sm md:text-base text-[#888888] font-light leading-relaxed">
          <p>
            Fundada con el firme compromiso de preservar y perfeccionar el arte secular de la luthería europea, 
            <strong className="text-[#F0F0F0] font-normal"> Luthier Elite</strong> une talleres históricos de Cremona, Mittenwald y París. 
            Cada instrumento que cruza nuestras puertas ha sido forjado con paciencia, respetando los métodos 
            y fórmulas que definieron la época dorada de la música clásica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-[#111111] p-5 border border-[#222222] text-center">
              <Trees className="w-6 h-6 text-[#C5A059] mx-auto mb-2.5" />
              <h4 className="font-serif text-[#F0F0F0] text-base mb-1 font-normal tracking-wide">Maderas Nobles</h4>
              <p className="text-xs text-[#777777] font-light leading-relaxed">
                Abeto de Val di Fiemme y arce de los Balcanes con secado natural de más de 20 años.
              </p>
            </div>

            <div className="bg-[#111111] p-5 border border-[#222222] text-center">
              <Hammer className="w-6 h-6 text-[#C5A059] mx-auto mb-2.5" />
              <h4 className="font-serif text-[#F0F0F0] text-base mb-1 font-normal tracking-wide">100% Hecho a Mano</h4>
              <p className="text-xs text-[#777777] font-light leading-relaxed">
                Vaciado de bóvedas y calibración acústica con gubias tradicionales y barnices al aceite.
              </p>
            </div>

            <div className="bg-[#111111] p-5 border border-[#222222] text-center">
              <Music className="w-6 h-6 text-[#C5A059] mx-auto mb-2.5" />
              <h4 className="font-serif text-[#F0F0F0] text-base mb-1 font-normal tracking-wide">Afinación Suprema</h4>
              <p className="text-xs text-[#777777] font-light leading-relaxed">
                Resonancia balanceada y respuesta dinámica para orquestas y solistas de conservatorio.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-4 italic text-[#F0F0F0] bg-[#141414] py-3.5 pr-4">
            «Un instrumento musical no es simplemente un objeto de madera o latón; es un templo sonoro que espera la respiración y el tacto del intérprete para cobrar vida eterna.»
          </div>

          <p>
            Nuestros vientos de metal y madera son seleccionados individualmente en fábricas históricas de Alemania y Francia, sometidos a pruebas de compresión de pistones, estanqueidad de zapatillas y afinación armónica por solistas en activo.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#222222] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-medium text-[#888888] hover:text-white uppercase tracking-[0.2em] cursor-pointer"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onClose();
              onExploreCatalog();
            }}
            className="bg-[#C5A059] text-black px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors cursor-pointer"
          >
            Explorar Nuestro Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
