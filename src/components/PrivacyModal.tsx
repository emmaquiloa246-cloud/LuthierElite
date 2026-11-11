import React from 'react';
import { X, ShieldCheck, Lock, FileText, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0D0D0D] border border-[#333333] shadow-2xl rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222] bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center text-black font-serif font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-white font-medium">
                Aviso de Privacidad & Protección de Datos
              </h2>
              <span className="text-xs text-[#C5A059] uppercase tracking-[0.2em] font-medium block mt-0.5">
                Luthier Elite • Colección 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#D1D5DB] hover:text-white bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] rounded-none cursor-pointer"
            aria-label="Cerrar aviso de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 text-[#D1D5DB] text-sm leading-relaxed">
          <div className="bg-[#141414] border border-[#2a2a2a] p-4">
            <p className="text-xs md:text-sm text-white font-medium">
              En cumplimiento de la normativa de protección de datos personales y los estándares de transparencia académica, se informa a los usuarios y evaluadores de este prototipo sobre el tratamiento de la información recabada.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider text-[#C5A059] mb-1.5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C5A059]" />
                <span>1. Datos Recopilados</span>
              </h3>
              <p className="text-xs text-[#D1D5DB]">
                A través del formulario de consultas técnicas y reservas acústicas se recopilan exclusivamente: dirección de correo electrónico, número de teléfono/WhatsApp y usuario de redes sociales o conservatorio musical.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider text-[#C5A059] mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>2. Finalidad del Tratamiento</span>
              </h3>
              <p className="text-xs text-[#D1D5DB]">
                Los datos son utilizados únicamente para gestionar solicitudes de información técnica sobre la colección 2026, agendar sesiones de audición acústica en los talleres y emitir presupuestos o certificados de autenticidad para músicos solistas.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider text-[#C5A059] mb-1.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>3. Confidencialidad & No Cesión a Terceros</span>
              </h3>
              <p className="text-xs text-[#D1D5DB]">
                Luthier Elite no comercializa, transfiere ni cede datos a terceros con fines publicitarios o lucrativos. La información de pago simulada en el checkout es procesada localmente con fines didácticos en un entorno seguro de sandbox.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#222222] bg-[#111111] flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-[#C5A059] hover:bg-[#d8b570] text-black font-bold text-xs uppercase tracking-[0.2em] px-6 py-2.5 transition-colors cursor-pointer"
          >
            Aceptar & Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
