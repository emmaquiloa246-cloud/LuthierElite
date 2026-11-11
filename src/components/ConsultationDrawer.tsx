import React, { useState } from 'react';
import { Instrument, CartItem, ConsultationRequest } from '../types';
import { X, Trash2, Calendar, Send, CheckCircle2, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (instrumentId: string) => void;
  onClearCart: () => void;
  directInstrument?: Instrument | null;
}

export const ConsultationDrawer: React.FC<ConsultationDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onClearCart,
  directInstrument,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [social, setSocial] = useState('');
  const [serviceType, setServiceType] = useState<ConsultationRequest['serviceType']>('Prueba Acústica Privada');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      // Clear form on reset after brief feedback
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setSocial('');
    setMessage('');
    setPreferredDate('');
    onClearCart();
    onClose();
  };

  const totalEstimate = cart.reduce((sum, item) => sum + item.instrument.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#0D0D0D] border-l border-[#222222] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#222222] bg-[#111111] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-medium tracking-[0.25em] text-[#C5A059]">
                Atelier & Conservatorio
              </span>
              <h2 className="font-serif text-2xl font-light text-[#F0F0F0] tracking-wide">
                Dossier de Consulta
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] rounded-none transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSuccess ? (
              <div className="bg-[#111111] border border-[#C5A059] p-8 text-center space-y-4 my-8">
                <div className="w-16 h-16 bg-[#1a1a1a] text-[#C5A059] border border-[#C5A059] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-light text-[#F0F0F0]">
                  ¡Solicitud Registrada!
                </h3>
                <p className="text-xs text-[#888888] font-light leading-relaxed">
                  Muchas gracias, <strong className="text-[#F0F0F0] font-normal">{fullName || 'estimado músico'}</strong>. 
                  Uno de nuestros maestros luthiers se pondrá en contacto con usted a través de{' '}
                  <span className="text-[#C5A059] font-medium">{email || phone || social || 'sus datos indicados'}</span>{' '}
                  para coordinar su prueba acústica y responder a sus consultas.
                </p>
                <div className="pt-4 border-t border-[#222222]">
                  <button
                    onClick={handleReset}
                    className="w-full bg-[#C5A059] text-black py-3 rounded-none text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors cursor-pointer"
                  >
                    Volver al Catálogo
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Selected Instruments List */}
                {cart.length > 0 ? (
                  <div className="bg-[#111111] p-4 border border-[#222222]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-medium text-[#C5A059] uppercase tracking-[0.25em] flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Instrumentos Seleccionados ({cart.length})</span>
                      </h4>
                      <button
                        onClick={onClearCart}
                        className="text-[10px] text-[#666666] hover:text-[#ba1a1a] uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Vaciar
                      </button>
                    </div>

                    <div className="space-y-3 divide-y divide-[#222222]">
                      {cart.map((item) => (
                        <div key={item.instrument.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#141414] p-1 border border-[#262626] flex items-center justify-center">
                            <img
                              src={item.instrument.image}
                              alt={item.instrument.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-serif font-light text-[#F0F0F0] truncate">
                              {item.instrument.name}
                            </h5>
                            <span className="text-xs text-[#C5A059] font-mono">
                              {item.instrument.price.toLocaleString()} €
                            </span>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.instrument.id)}
                            className="p-1.5 text-[#666666] hover:text-[#C5A059] transition-colors cursor-pointer"
                            title="Eliminar de la lista"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#222222] flex justify-between items-center text-xs font-light text-[#888888]">
                      <span>Valor estimado de catálogo:</span>
                      <span className="text-sm font-mono font-medium text-[#C5A059]">
                        {totalEstimate.toLocaleString()} €
                      </span>
                    </div>
                  </div>
                ) : directInstrument ? (
                  <div className="bg-[#111111] p-3 border border-[#222222] flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#141414] p-1 border border-[#262626] flex items-center justify-center">
                      <img
                        src={directInstrument.image}
                        alt={directInstrument.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C5A059] font-medium uppercase tracking-[0.2em]">Consulta sobre:</span>
                      <h5 className="text-sm font-serif font-light text-[#F0F0F0]">{directInstrument.name}</h5>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#111111] p-4 border border-[#222222] text-center text-xs text-[#777777] font-light leading-relaxed">
                    Puede consultar sobre cualquier instrumento o agendar una visita a nuestro taller para probar la acústica en persona.
                  </div>
                )}

                {/* Consultation Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Maestro Alejandro Rossi"
                      className="contact-input text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] placeholder-[#555555] w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="contact-input text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] placeholder-[#555555] w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="contact-input text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] placeholder-[#555555] w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                      Redes Sociales / Instagram
                    </label>
                    <input
                      type="text"
                      value={social}
                      onChange={(e) => setSocial(e.target.value)}
                      placeholder="@usuario"
                      className="contact-input text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] placeholder-[#555555] w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                      Tipo de Servicio
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ConsultationRequest['serviceType'])}
                      className="w-full text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                    >
                      <option value="Prueba Acústica Privada">Prueba Acústica Privada en Taller</option>
                      <option value="Compra Directa">Compra Directa y Envío Asegurado</option>
                      <option value="Restauración / Ajuste">Ajuste de Alma / Restauración</option>
                      <option value="Consulta General">Consulta de Disponibilidad / Asesoría</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                      Fecha Preferente de Cita (Opcional)
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-[0.2em] mb-1.5">
                      Observaciones o Consulta Acústica
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Indique sus preferencias de afinación, tiro de cuerda, requisitos orquestales o dudas..."
                      className="w-full text-xs bg-[#111111] px-3.5 py-2.5 rounded-none border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] placeholder-[#555555] resize-none font-light"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#C5A059] text-black py-3.5 rounded-none text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#d8b570] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud a Luthier</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
