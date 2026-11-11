import React, { useState } from 'react';
import { X, Layers, CheckCircle2, Shield, Eye, Palette, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

interface DesignAppendixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignAppendixModal: React.FC<DesignAppendixModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'standardization' | 'alternative' | 'accessibility'>('standardization');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border border-[#333333] shadow-2xl rounded-none">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222] bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center text-black font-serif font-bold text-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-white font-medium">
                Apéndice de Diseño & Proceso Académico
              </h2>
              <span className="text-xs text-[#C5A059] uppercase tracking-[0.2em] font-medium block mt-0.5">
                Luthier Elite • Documento de Entrega 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#D1D5DB] hover:text-white bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] rounded-none cursor-pointer"
            aria-label="Cerrar apéndice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-[#222222] bg-[#141414] px-6">
          <button
            onClick={() => setActiveTab('standardization')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'standardization'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#9CA3AF] hover:text-white'
            }`}
          >
            1. Estandarización Visual Oficial
          </button>
          <button
            onClick={() => setActiveTab('alternative')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'alternative'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#9CA3AF] hover:text-white'
            }`}
          >
            2. Artefacto de Proceso (Versión Clara)
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'accessibility'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#9CA3AF] hover:text-white'
            }`}
          >
            3. Métricas & Accesibilidad
          </button>
        </div>

        {/* Modal body content */}
        <div className="p-6 md:p-8 space-y-6 text-[#D1D5DB] text-sm leading-relaxed">
          {activeTab === 'standardization' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#141414] border border-[#2a2a2a] p-5">
                <h3 className="font-serif text-lg text-white font-medium mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#C5A059]" />
                  <span>Tema Primario Oficial: Dark Luxury "Geometric Balance"</span>
                </h3>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  Para la presentación académica final, el equipo ha estandarizado la interfaz a una <strong>versión única y definitiva</strong>. Se seleccionó la estética de <em>Atelier Nocturno</em> con fondos profundos (<code className="text-[#C5A059] font-mono">#0D0D0D</code>, <code className="text-[#C5A059] font-mono">#141414</code>) y acentos en pan de oro (<code className="text-[#C5A059] font-mono">#C5A059</code>).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#262626] bg-[#111111] p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Beneficios para la Presentación</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-[#D1D5DB]">
                    <li><strong>Afinidad con el dominio:</strong> Evoca la atmósfera de un auditorio sinfónico y talleres de luthería centenarios.</li>
                    <li><strong>Realce de las piezas:</strong> Los barnices y metales dorados destacan con mayor tridimensionalidad sobre fondo oscuro.</li>
                    <li><strong>Claridad en proyectores:</strong> Rediseñado con contraste reforzado (<code className="font-mono text-white">#D1D5DB</code>) para visibilidad perfecta en salas iluminadas.</li>
                  </ul>
                </div>

                <div className="border border-[#262626] bg-[#111111] p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059]">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Decisión Arquitectónica</span>
                  </h4>
                  <p className="text-xs text-[#D1D5DB] leading-relaxed">
                    Siguiendo las pautas de diseño para proyectos de grado, se descartó el conmutador dinámico claro/oscuro en tiempo real para preservar la coherencia estilística del catálogo y evitar inconsistencias en las capturas de pantalla de la memoria técnica.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alternative' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#141414] border border-[#2a2a2a] p-5">
                <h3 className="font-serif text-lg text-white font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#C5A059]" />
                  <span>Artefacto de Proceso: Exploración Previa en Modo Claro</span>
                </h3>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  Durante la fase de prototipado temprano (Sprint 1), se exploró un enfoque minimalista con fondo marfil pergamino (<code className="text-[#C5A059] font-mono">#FAF9F6</code>) y tipografía en carbón puro.
                </p>
              </div>

              {/* Wireframe Simulation Mockup */}
              <div className="border-2 border-dashed border-[#444444] bg-[#F5F4F0] text-[#1A1A1A] p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#D1D0C9] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#8C6D37] text-white flex items-center justify-center text-xs font-serif font-bold">L</div>
                    <span className="font-serif font-bold text-sm tracking-widest uppercase text-[#1A1A1A]">Luthier Elite (Prototipo Claro v1.0)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#E8E6DF] px-2 py-0.5 text-[#555555] font-semibold border border-[#D1D0C9]">
                    Artefacto Archivador de Proceso
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="border border-[#DCDAD2] bg-white p-3 shadow-sm">
                    <span className="text-[10px] text-[#8C6D37] font-bold uppercase tracking-wider block mb-1">Módulo Violín</span>
                    <p className="text-[#4A4A4A] text-[11px] leading-snug">Estructura editorial inspirada en catálogos de subastas Sotheby's (Fondo marfil, líneas finas).</p>
                  </div>
                  <div className="border border-[#DCDAD2] bg-white p-3 shadow-sm">
                    <span className="text-[10px] text-[#8C6D37] font-bold uppercase tracking-wider block mb-1">Módulo Acústica</span>
                    <p className="text-[#4A4A4A] text-[11px] leading-snug">Ajuste tonal para 442 Hz y visualizador de formas de onda senoidales armónicas.</p>
                  </div>
                  <div className="border border-[#DCDAD2] bg-white p-3 shadow-sm">
                    <span className="text-[10px] text-[#8C6D37] font-bold uppercase tracking-wider block mb-1">Dictamen del Jurado</span>
                    <p className="text-[#4A4A4A] text-[11px] leading-snug">Se acordó migrar al tema oscuro "Geometric Balance" para maximizar el impacto escénico en auditorio.</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#9CA3AF] bg-[#111111] p-3 border border-[#222222]">
                <em>Nota académica:</em> Este artefacto queda registrado en la documentación del proyecto como evidencia de evolución de diseño y validación de usuario antes del despliegue oficial.
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#141414] border border-[#2a2a2a] p-5">
                <h3 className="font-serif text-lg text-white font-medium mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#C5A059]" />
                  <span>Cumplimiento de Accesibilidad (WCAG 2.1 AA) & Contraste</span>
                </h3>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  Para asegurar que el prototipo sea accesible tanto en teléfonos móviles como en proyectores de clase, se realizaron los siguientes ajustes sistemáticos en esta entrega:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-[#111111] p-3.5 border border-[#222222]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Aclarado de Textos de Párrafo</h4>
                    <p className="text-xs text-[#D1D5DB] mt-0.5">
                      Sustitución de tonos grises apagados (<code className="text-[#C5A059]">#888888</code>, <code className="text-[#C5A059]">#666666</code>) por tonos luminosos (<code className="text-white">#D1D5DB</code>, <code className="text-white">#E5E7EB</code>), elevando el contraste por encima de 8:1 frente al fondo negro.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#111111] p-3.5 border border-[#222222]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Aumento de Escala Tipográfica Mínima</h4>
                    <p className="text-xs text-[#D1D5DB] mt-0.5">
                      Eliminación de etiquetas microscópicas (de 9px/10px se escalaron a mínimo 12px con pesos <code>font-semibold</code> o <code>font-medium</code> y espaciado de letras óptico).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#111111] p-3.5 border border-[#222222]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Avisos Legales y de Privacidad Explícitos</h4>
                    <p className="text-xs text-[#D1D5DB] mt-0.5">
                      Incorporación del aviso de protección de datos en el formulario de contacto y la nota de descargo algorítmica en el motor de recomendaciones acústicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#222222] bg-[#111111] flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF]">
            Tienda Musical Melodía • Proyecto Académico de Luthería 2026
          </span>
          <button
            onClick={onClose}
            className="bg-[#C5A059] hover:bg-[#d8b570] text-black font-bold text-xs uppercase tracking-[0.2em] px-6 py-2.5 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
