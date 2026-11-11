import React, { useState } from 'react';
import { Instrument } from '../types';
import { X, Plus, Edit3, Trash2, Check, AlertCircle, Package, Layers, DollarSign, RefreshCw, Search, ShieldCheck } from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruments: Instrument[];
  onAddInstrument: (instrument: Instrument) => void;
  onEditInstrument: (instrument: Instrument) => void;
  onDeleteInstrument: (id: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  instruments,
  onAddInstrument,
  onEditInstrument,
  onDeleteInstrument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Form State for Create / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cuerda' as Instrument['category'],
    subcategory: '',
    price: 3500,
    origin: 'Cremona, Italia',
    materials: '',
    craftLevel: 'Maestro Luthier' as Instrument['craftLevel'],
    image: '',
    shortDescription: '',
    fullDescription: '',
    inStock: true,
    yearOfCraft: '2026',
    woodType: '',
    varnish: '',
  });

  if (!isOpen) return null;

  const totalValue = instruments.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = instruments.filter((i) => i.inStock).length;

  const filteredInstruments = instruments.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startCreate = () => {
    setFormData({
      name: '',
      category: 'Cuerda',
      subcategory: 'Cuerda Frotada',
      price: 4500,
      origin: 'Cremona, Italia',
      materials: 'Abeto alpino y Arce seleccionado',
      craftLevel: 'Maestro Luthier',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV4QVF84q4K7vosI77_byXQIc34rTs2rKhNyYuqpOahmTuT_PqQV2O4XIXnb4OoPw3EDBD5coLdulDS9RuM8F-rgRkAWrI0mrXtb2X4cI3KTvaCV-4xkjnm5wg5-fMw5I6CsgeXESmhLm_drDNXg7YQveiLulfIPF_78YPWQuSSbKmDLYzaxgolu7v5Uvb3XJoP2N-TMtb6Co8R63D1YRDIXgR2Xwdi-BBotq0UYltl4z8b51tjFN_',
      shortDescription: 'Instrumento maestro recién forjado en el taller.',
      fullDescription: 'Construido artesanalmente con maderas estacionadas y calibración acústica de concierto.',
      inStock: true,
      yearOfCraft: '2026',
      woodType: 'Abeto centenario',
      varnish: 'Barniz al aceite ámbar',
    });
    setIsCreating(true);
    setEditingInstrument(null);
  };

  const startEdit = (inst: Instrument) => {
    setEditingInstrument(inst);
    setIsCreating(false);
    setFormData({
      name: inst.name,
      category: inst.category,
      subcategory: inst.subcategory || '',
      price: inst.price,
      origin: inst.origin,
      materials: inst.materials,
      craftLevel: inst.craftLevel,
      image: inst.image,
      shortDescription: inst.shortDescription,
      fullDescription: inst.fullDescription,
      inStock: inst.inStock,
      yearOfCraft: inst.specifications.yearOfCraft || '2026',
      woodType: inst.specifications.woodType || '',
      varnish: inst.specifications.varnish || '',
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isCreating) {
      const newInst: Instrument = {
        id: `inst-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        currency: 'EUR',
        origin: formData.origin,
        materials: formData.materials,
        craftLevel: formData.craftLevel,
        image: formData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV4QVF84q4K7vosI77_byXQIc34rTs2rKhNyYuqpOahmTuT_PqQV2O4XIXnb4OoPw3EDBD5coLdulDS9RuM8F-rgRkAWrI0mrXtb2X4cI3KTvaCV-4xkjnm5wg5-fMw5I6CsgeXESmhLm_drDNXg7YQveiLulfIPF_78YPWQuSSbKmDLYzaxgolu7v5Uvb3XJoP2N-TMtb6Co8R63D1YRDIXgR2Xwdi-BBotq0UYltl4z8b51tjFN_',
        altText: `${formData.name} artesanal`,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        specifications: {
          woodType: formData.woodType,
          varnish: formData.varnish,
          yearOfCraft: formData.yearOfCraft,
        },
        audioPreset: 'violin',
        inStock: formData.inStock,
        featured: false,
      };
      onAddInstrument(newInst);
      setActionSuccess(`Instrumento «${newInst.name}» añadido al catálogo.`);
    } else if (editingInstrument) {
      const updatedInst: Instrument = {
        ...editingInstrument,
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        origin: formData.origin,
        materials: formData.materials,
        craftLevel: formData.craftLevel,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        inStock: formData.inStock,
        specifications: {
          ...editingInstrument.specifications,
          woodType: formData.woodType,
          varnish: formData.varnish,
          yearOfCraft: formData.yearOfCraft,
        },
      };
      onEditInstrument(updatedInst);
      setActionSuccess(`Instrumento «${updatedInst.name}» actualizado.`);
    }

    setIsCreating(false);
    setEditingInstrument(null);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleToggleStock = (inst: Instrument) => {
    const updated = { ...inst, inStock: !inst.inStock };
    onEditInstrument(updated);
    setActionSuccess(`Stock de «${inst.name}» cambiado a ${updated.inStock ? 'Disponible' : 'Agotado'}.`);
    setTimeout(() => setActionSuccess(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0D0D0D] border border-[#222222] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#222222] bg-[#111111] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a1a1a] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                  Panel de Control Luthier Elite
                </span>
                <span className="px-1.5 py-0.5 bg-[#1f1a10] border border-[#C5A059]/40 text-[#C5A059] text-[9px] uppercase tracking-wider">
                  Admin 2026
                </span>
              </div>
              <h2 className="font-serif text-2xl text-[#F0F0F0] font-light tracking-wide">
                Gestión de Inventario & Talleres
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startCreate}
              className="bg-[#C5A059] hover:bg-[#d8b570] text-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Instrumento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] transition-colors cursor-pointer"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action success alert */}
        {actionSuccess && (
          <div className="bg-[#141e15] border-b border-[#C5A059] p-2.5 px-6 text-xs text-[#C5A059] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 md:p-6 bg-[#0F0F0F] border-b border-[#222222]">
          <div className="bg-[#141414] p-3.5 border border-[#222222]">
            <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
              Total Instrumentos
            </span>
            <span className="font-serif text-2xl text-[#F0F0F0] font-medium">
              {instruments.length}
            </span>
          </div>
          <div className="bg-[#141414] p-3.5 border border-[#222222]">
            <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
              En Stock Inmediato
            </span>
            <span className="font-serif text-2xl text-emerald-400 font-medium">
              {inStockCount}
            </span>
          </div>
          <div className="bg-[#141414] p-3.5 border border-[#222222]">
            <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
              Valor de Catálogo
            </span>
            <span className="font-mono text-xl text-[#C5A059] font-medium">
              {totalValue.toLocaleString()} €
            </span>
          </div>
          <div className="bg-[#141414] p-3.5 border border-[#222222]">
            <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
              Garantía & Autenticidad
            </span>
            <span className="font-sans text-xs text-[#A0A0A0] font-medium flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              Certificados 2026
            </span>
          </div>
        </div>

        {/* Content Container (Split when editing/creating or full table) */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {isCreating || editingInstrument ? (
            /* Instrument Form (Add / Edit) */
            <div className="max-w-3xl mx-auto bg-[#111111] p-6 border border-[#262626] mb-6">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#222222]">
                <h3 className="font-serif text-xl text-[#F0F0F0] font-light">
                  {isCreating ? 'Añadir Nuevo Instrumento al Catálogo' : `Editar «${formData.name}»`}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingInstrument(null);
                  }}
                  className="text-xs text-[#888888] hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                      Nombre del Instrumento *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Oboe d'Amore de Concierto"
                      className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                      Categoría *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as Instrument['category'] })
                      }
                      className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                    >
                      <option value="Cuerda">Cuerda</option>
                      <option value="Viento Metal">Viento Metal</option>
                      <option value="Viento Madera">Viento Madera</option>
                      <option value="Percusión">Percusión</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                      Precio (€) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                      Procedencia / Taller *
                    </label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="Cremona, Italia"
                      className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                      Año de Fabricación
                    </label>
                    <input
                      type="text"
                      value={formData.yearOfCraft}
                      onChange={(e) => setFormData({ ...formData, yearOfCraft: e.target.value })}
                      placeholder="2026"
                      className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                    Materiales / Maderas
                  </label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    placeholder="Abeto de Val di Fiemme y arce de los Balcanes"
                    className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                    Descripción Breve
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Resumen acústico para tarjeta de catálogo..."
                    className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] px-3 py-2"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs text-[#D0D0D0] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 accent-[#C5A059]"
                    />
                    <span>Disponible en inventario (En Stock)</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#222222]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingInstrument(null);
                    }}
                    className="px-4 py-2 border border-[#333333] text-xs uppercase tracking-wider text-[#888888] hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C5A059] hover:bg-[#d8b570] text-black px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer shadow-md"
                  >
                    {isCreating ? 'Guardar Instrumento' : 'Actualizar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {/* Search Bar for Inventory */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#666666]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por nombre, categoría o taller..."
                className="w-full bg-[#141414] border border-[#262626] text-xs text-[#F0F0F0] pl-9 pr-3 py-2 focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
              />
            </div>
            <span className="text-xs text-[#777777]">
              Mostrando {filteredInstruments.length} de {instruments.length} instrumentos
            </span>
          </div>

          {/* Instruments Inventory Table */}
          <div className="border border-[#222222] bg-[#0E0E0E] overflow-x-auto">
            <table className="w-full text-left text-xs text-[#A0A0A0]">
              <thead className="bg-[#141414] text-[10px] uppercase tracking-wider text-[#888888] border-b border-[#222222]">
                <tr>
                  <th className="py-3 px-4">Instrumento</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Procedencia</th>
                  <th className="py-3 px-4">Año</th>
                  <th className="py-3 px-4">Precio</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c]">
                {filteredInstruments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-sm text-[#777777]">
                      No se encontraron instrumentos que coincidan con «{searchTerm}».
                    </td>
                  </tr>
                ) : (
                  filteredInstruments.map((inst) => (
                    <tr key={inst.id} className="hover:bg-[#121212] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={inst.image}
                            alt={inst.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-contain bg-[#161616] p-1 border border-[#262626]"
                          />
                          <div>
                            <span className="font-serif text-[#F0F0F0] text-sm block font-normal">
                              {inst.name}
                            </span>
                            <span className="text-[10px] text-[#666666] truncate max-w-xs block">
                              {inst.craftLevel}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] uppercase tracking-wider bg-[#1a1a1a] text-[#C5A059] px-2 py-0.5 border border-[#2a2a2a]">
                          {inst.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#C0C0C0]">{inst.origin}</td>
                      <td className="py-3 px-4 text-[#888888]">
                        {inst.specifications.yearOfCraft || '2026'}
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-[#C5A059]">
                        {inst.price.toLocaleString()} €
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStock(inst)}
                          className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold border cursor-pointer ${
                            inst.inStock
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                              : 'bg-red-950/40 text-red-300 border-red-800'
                          }`}
                          title="Click para alternar disponibilidad"
                        >
                          {inst.inStock ? 'En Stock' : 'Agotado'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(inst)}
                            className="p-1.5 text-[#888888] hover:text-[#C5A059] hover:bg-[#1f1f1f] border border-transparent hover:border-[#333333] transition-colors cursor-pointer"
                            title="Editar instrumento"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Desea eliminar «${inst.name}» del catálogo?`)) {
                                onDeleteInstrument(inst.id);
                                setActionSuccess(`Instrumento «${inst.name}» eliminado.`);
                                setTimeout(() => setActionSuccess(null), 2500);
                              }
                            }}
                            className="p-1.5 text-[#888888] hover:text-red-400 hover:bg-[#1f1f1f] border border-transparent hover:border-[#333333] transition-colors cursor-pointer"
                            title="Eliminar de inventario"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
