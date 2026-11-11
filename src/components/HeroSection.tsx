import React, { useState } from 'react';
import { Instrument } from '../types';
import { ArrowRight, Sparkles, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenHistory: () => void;
  onSelectInstrumentByName: (name: string) => void;
  onSubmitContactForm: (data: { email: string; phone: string; social: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenHistory,
  onSelectInstrumentByName,
  onSubmitContactForm,
}) => {
  const [heroMode, setHeroMode] = useState<'informacion' | 'resonancia'>('informacion');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [social, setSocial] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Por favor ingrese su correo electrónico.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Formato de correo no válido. Asegúrese de incluir "@" y un dominio válido (ej: musico@conservatorio.es).');
      return;
    }

    onSubmitContactForm({ email: email.trim(), phone, social });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setPhone('');
      setSocial('');
      setEmailError('');
    }, 5000);
  };

  return (
    <section id="informacion" className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-16">
      {/* Visual Mode Selector Tabs */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#222222]">
        <div className="flex items-center gap-2.5 text-[10px] font-medium text-[#C5A059] uppercase tracking-[0.3em]">
          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none" />
          <span>Presentación del Atelier</span>
        </div>
        <div className="flex items-center bg-[#111111] p-1 border border-[#262626]">
          <button
            onClick={() => setHeroMode('informacion')}
            className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
              heroMode === 'informacion'
                ? 'bg-[#1e1e1e] text-[#C5A059] border border-[#333333]'
                : 'text-[#888888] hover:text-white border border-transparent'
            }`}
          >
            Información & Contactos
          </button>
          <button
            onClick={() => setHeroMode('resonancia')}
            className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
              heroMode === 'resonancia'
                ? 'bg-[#1e1e1e] text-[#C5A059] border border-[#333333]'
                : 'text-[#888888] hover:text-white border border-transparent'
            }`}
          >
            La Resonancia de la Perfección
          </button>
        </div>
      </div>

      {heroMode === 'informacion' ? (
        /* HERO MODE 1: INFORMACIÓN + CONTACTOS */
        <div className="bg-[#0D0D0D] border border-[#222222] p-6 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 relative overflow-hidden">
          {/* Background decorative technical lines */}
          <div className="absolute top-0 bottom-0 left-12 w-px bg-[#222222] opacity-60 hidden md:block" />
          <div className="absolute top-12 left-0 right-0 h-px bg-[#222222] opacity-60" />
          <div className="absolute -right-10 top-10 w-48 h-48 border border-[#222222] rotate-45 pointer-events-none opacity-40" />

          {/* Left Column (Instruments Arrangement Image) */}
          <div className="w-full md:w-2/5 relative min-h-[340px] md:min-h-[440px] flex items-center justify-center z-10">
            <div className="relative group w-full flex items-center justify-center">
              <div className="absolute inset-2 bg-[#141414] border border-[#262626] rotate-1 opacity-90 transition-transform group-hover:rotate-0" />
              <div className="w-32 h-64 border-l-2 border-[#C5A059] opacity-25 absolute -right-2 top-8 rotate-12" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNP4XGTNHqQl16nTadOUQVxCKObiGQoKncFrLVAa7Cf7YRMsaeOvc6hOs0mlSTAHwukHWhxr3NywtsLBbid8VH0mBRHo7Fkk10AY9QDf00TrRIWA1OtQ6J87IeCEG9W_foXzs5RNXvyBiz_Yv5tp8D-Z047DJHvJ2R6pQEMrN18t8Hwfo-Sis0z-edWOzhKXZ4J0usWVsgrozHoWO-GFtE_kuA3WP4TFmgkxuI19fb7R087kpCEa40"
                alt="Colección de instrumentos orquestales Luthier Elite"
                className="w-full max-w-[320px] md:max-w-[340px] object-contain drop-shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 relative z-10"
              />
              <div className="absolute bottom-2 right-2 bg-[#111111]/95 border border-[#333333] px-3 py-1 text-[10px] text-[#C5A059] font-serif uppercase tracking-widest shadow-lg z-20">
                Tradición & Acústica Europea
              </div>
            </div>
          </div>

          {/* Right Column (Content & Contact Form) */}
          <div className="w-full md:w-3/5 flex flex-col z-10 pl-0 md:pl-6">
            <h1 className="font-serif text-[38px] md:text-[52px] text-[#F0F0F0] font-light mb-6 border-b border-[#222222] pb-4 inline-block self-start leading-tight tracking-wide">
              Información.
            </h1>

            <div className="text-[15px] md:text-[17px] text-[#D1D5DB] space-y-4 max-w-2xl leading-relaxed font-normal">
              <p className="border-l-2 border-[#C5A059] pl-4">
                Nuestros instrumentos de cuerda son <strong className="text-white font-semibold">100% hechos a mano</strong>, con madera de resonancia importada de los bosques históricos de Europa (Val di Fiemme y Baviera).
              </p>
              <p className="border-l-2 border-[#C5A059] pl-4">
                Los instrumentos de vientos de metales y madera proceden de talleres de referencia internacional, calibrados rigurosamente para garantizar la máxima <strong className="text-white font-semibold">estabilidad de afinación</strong> en sala sinfónica.
              </p>
              <p className="border-l-2 border-[#C5A059] pl-4">
                En instrumentos de percusión disponemos de una <strong className="text-white font-semibold">gran variedad acústica</strong> afinada a 442 Hz para conservatorios y solistas.
              </p>
            </div>

            {/* Contactos Form (Geometric Balance Card with gold corner brackets) */}
            <div id="contactos" className="mt-8 md:mt-10 bg-[#111111] p-6 md:p-8 border border-[#333333] relative shadow-2xl">
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C5A059]" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C5A059]" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C5A059]" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C5A059]" />

              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-[22px] md:text-[26px] text-[#F0F0F0] font-light uppercase tracking-wider">
                  Contactos & Consultas
                </h2>
                <span className="text-xs text-[#C5A059] uppercase tracking-[0.2em] font-semibold bg-[#1a1710] px-3 py-1 border border-[#C5A059]/40">
                  Atención Inmediata 2026
                </span>
              </div>

              {isSubmitted ? (
                <div className="bg-[#111812] border-2 border-[#C5A059] p-6 text-center my-2 flex flex-col items-center justify-center gap-3 shadow-2xl animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-[#192b1b] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                    <CheckCircle2 className="w-7 h-7 text-[#C5A059]" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium tracking-wide">
                    We received your inquiry, we will contact you soon!
                  </h3>
                  <p className="text-sm text-[#E5E7EB] font-normal max-w-md leading-relaxed">
                    ¡Hemos recibido su consulta, nos pondremos en contacto pronto! Un maestro del atelier se comunicará para responder a sus inquietudes acústicas y coordinar su prueba sonora.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {emailError && (
                    <div className="p-3.5 bg-red-950/60 border border-red-600 text-red-200 text-xs font-medium flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{emailError}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label htmlFor="correo-input" className="w-28 text-xs uppercase tracking-wider font-semibold text-[#E5E7EB]">
                      Correo *:
                    </label>
                    <input
                      id="correo-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="ejemplo@conservatorio.org"
                      className={`contact-input flex-grow text-sm bg-[#161616] text-white border focus:outline-none px-3.5 py-2.5 ${
                        emailError ? 'border-red-500 focus:border-red-400' : 'border-[#333333] focus:border-[#C5A059]'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label htmlFor="cel-input" className="w-28 text-xs uppercase tracking-wider font-semibold text-[#E5E7EB]">
                      Celular:
                    </label>
                    <input
                      id="cel-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="contact-input flex-grow text-sm bg-[#161616] text-white border border-[#333333] focus:border-[#C5A059] px-3.5 py-2.5"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label htmlFor="redes-input" className="w-28 text-xs uppercase tracking-wider font-semibold text-[#E5E7EB]">
                      Redes:
                    </label>
                    <input
                      id="redes-input"
                      type="text"
                      value={social}
                      onChange={(e) => setSocial(e.target.value)}
                      placeholder="@usuario_orquesta"
                      className="contact-input flex-grow text-sm bg-[#161616] text-white border border-[#333333] focus:border-[#C5A059] px-3.5 py-2.5"
                    />
                  </div>

                  {/* Privacy Notice (Compliance) */}
                  <div className="pt-2 pb-1 border-t border-[#222222] text-[11px] leading-relaxed text-[#B0B0B0] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Aviso de Privacidad & Protección de Datos:</strong> Los datos personales facilitados (correo, teléfono y redes) se recopilan con estricta confidencialidad para tramitar su consulta técnica, coordinar citas acústicas en el taller y emitir certificados de autenticidad 2026. Luthier Elite no comercializa ni cede su información a terceros.
                    </span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#C5A059] text-black px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Consulta</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* HERO MODE 2: LA RESONANCIA DE LA PERFECCIÓN */
        <div className="relative w-full min-h-[500px] md:min-h-[560px] flex flex-col md:flex-row max-w-[1280px] mx-auto p-6 md:p-12 gap-8 md:gap-12 overflow-hidden bg-[#0D0D0D] border border-[#222222]">
          {/* Left 40%: Instrument Photography */}
          <div className="w-full md:w-5/12 relative flex items-center justify-center order-1 md:order-none z-10">
            <div className="absolute inset-0 bg-[#141414] border border-[#262626] transform -rotate-2 scale-105" />
            <div className="w-3/4 h-3/4 rounded-full border border-[#222222] absolute flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-1/2 border-t-2 border-[#C5A059] rounded-full rotate-45 opacity-20" />
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZKX5MxnHIVNaJ36dpR5_nKgvbpv00PpvYY-o1aIE2r0UAxur7UecT-5mKKUT6XCn5MakIKki81KTdiM0MEE8f1iCRng5uV-iSErgiJm0DEA6L3BhiZ3cL-scXVu0iFJi97LAB1TrX4og9rFTtrPk1PBJXAUK4K_GocRmNo_BxZyafRReE7Sw_2KG9-JeTz3Yg84VzN9kDJjAb5Cdhplt0GfKANt4i_GRWbY5P5pU8RWQ02T-WqSHS"
              alt="Luthier Elite Violin de Autor"
              referrerPolicy="no-referrer"
              className="relative z-10 w-full max-w-[340px] md:max-w-[380px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => onSelectInstrumentByName('Violín')}
              title="Click para ver especificaciones de este violín"
            />
          </div>

          {/* Right 60%: Welcoming Message & Typography */}
          <div className="w-full md:w-7/12 flex flex-col justify-center order-2 md:order-none z-20">
            <p className="text-xs font-semibold text-[#C5A059] uppercase tracking-[0.3em] mb-4">
              Artesanía y Tradición Musical 2026
            </p>
            <h1 className="font-serif text-[40px] md:text-[56px] text-[#F0F0F0] font-light mb-6 leading-tight tracking-wide">
              La Resonancia <br />
              <span className="italic font-normal text-[#C5A059]">de la Perfección</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#D1D5DB] max-w-2xl mb-8 leading-relaxed border-l-2 border-[#C5A059] pl-6 font-normal">
              Descubra instrumentos forjados con paciencia y maestría. En Luthier Elite, cada pieza es un testamento a siglos de tradición europea, construida para solistas y agrupaciones que exigen una acústica excepcional en cada concierto.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
              <button
                onClick={onExploreCatalog}
                className="bg-[#C5A059] text-black text-xs font-bold px-8 py-3.5 rounded-none hover:bg-[#d8b570] transition-all duration-300 shadow-lg uppercase tracking-widest cursor-pointer"
              >
                Explorar Catálogo 2026
              </button>
              <button
                onClick={onOpenHistory}
                className="group flex items-center gap-2 text-xs font-semibold text-[#E5E7EB] hover:text-white transition-colors uppercase tracking-[0.2em] border border-[#444444] hover:border-[#C5A059] px-6 py-3.5 cursor-pointer bg-[#141414]"
              >
                <span>Nuestra Historia</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#222222] flex flex-wrap items-center gap-6 text-xs text-[#C5C5C5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium">Maderas certificadas de Val di Fiemme</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium">Afinación y ajuste acústico a 442 Hz</span>
              </div>
            </div>
          </div>

          {/* Decorative Technical Lines */}
          <div className="absolute top-0 right-0 w-64 h-full border-r border-[#222222] opacity-40 hidden md:block" />
          <div className="absolute top-1/2 left-0 w-full h-px border-t border-[#222222] opacity-40 hidden md:block" />
        </div>
      )}
    </section>
  );
};
