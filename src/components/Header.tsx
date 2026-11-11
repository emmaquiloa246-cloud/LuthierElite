import React from 'react';
import { Instrument, CartItem } from '../types';
import { Search, ShoppingBag, Menu, X, Music, User, Shield, LogOut } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  currentUser: { email: string; role: 'musician' | 'admin' } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  cart,
  onOpenCart,
  onOpenConsultation,
  onOpenSearch,
  onOpenHistory,
  onOpenAuth,
  onOpenAdmin,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'informacion', label: 'Información' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'historia', label: 'Historia', isModal: true },
    { id: 'contactos', label: 'Contactos' },
  ];

  const totalInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleItemClick = (item: { id: string; label: string; isModal?: boolean }) => {
    if (item.isModal) {
      onOpenHistory();
    } else {
      onNavigate(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222] sticky top-0 z-40 transition-shadow duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-3.5 max-w-[1280px] mx-auto min-h-[72px]">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('informacion')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-[#C5A059] rounded-none flex items-center justify-center text-black font-serif font-bold text-base shrink-0">
            L
          </div>
          <div>
            <span className="font-serif text-[#F0F0F0] tracking-widest text-[20px] md:text-[24px] uppercase font-bold block leading-none transition-colors group-hover:text-[#C5A059]">
              Luthier Elite
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D1D5DB] font-semibold block mt-1">
              Artesanía y Tradición Musical 2026
            </span>
          </div>
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && !item.isModal;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 cursor-pointer relative py-1 focus:outline-none flex items-center gap-2 ${
                  isActive
                    ? 'text-[#C5A059]'
                    : 'text-[#D1D5DB] hover:text-white'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Buscar en el catálogo"
            className="p-2.5 text-[#D1D5DB] hover:text-white transition-colors border border-[#333333] hover:border-[#C5A059] bg-[#111111] rounded-none cursor-pointer"
            title="Buscar instrumentos..."
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart & Checkout Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-[#D1D5DB] hover:text-[#C5A059] transition-colors border border-[#333333] hover:border-[#C5A059] bg-[#111111] rounded-none cursor-pointer flex items-center gap-1.5"
            title="Ver bolsa de compra y checkout"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalInCart > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-black text-xs font-mono font-bold w-4 h-4 rounded-none flex items-center justify-center shadow">
                {totalInCart}
              </span>
            )}
          </button>

          {/* Admin Dashboard Quick Access Button */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#141414] hover:bg-[#1a1810] border border-[#333333] hover:border-[#C5A059] text-[#E5E7EB] hover:text-[#C5A059] px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            title="Panel de Control de Inventario para Administradores"
          >
            <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Admin</span>
          </button>

          {/* Authentication Button / User Badge */}
          {currentUser ? (
            <div className="hidden lg:flex items-center gap-2 pl-1 border-l border-[#222222]">
              <div className="flex items-center gap-1.5 bg-[#141414] border border-[#333333] px-2.5 py-1 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${currentUser.role === 'admin' ? 'bg-[#C5A059]' : 'bg-emerald-400'}`} />
                <span className="text-[#F0F0F0] truncate max-w-[110px]">{currentUser.email.split('@')[0]}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-mono font-bold">({currentUser.role})</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-[#9CA3AF] hover:text-red-400 border border-[#333333] bg-[#111111] cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#C5A059] text-[#F0F0F0] hover:text-white px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              title="Iniciar Sesión o Registrarse"
            >
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Acceso</span>
            </button>
          )}

          {/* Consultation Drawer Trigger */}
          <button
            onClick={onOpenConsultation}
            className="hidden md:inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#d8b570] text-black px-4 py-2.5 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 shadow-sm cursor-pointer group"
          >
            <span>Consultar</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#888888] hover:text-white border border-[#222222] bg-[#111111] rounded-none cursor-pointer"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-[#222222] px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`text-left text-xs uppercase tracking-[0.2em] font-medium py-2.5 px-3 rounded-none transition-colors border ${
                  activeSection === item.id
                    ? 'bg-[#141414] text-[#C5A059] border-[#333333]'
                    : 'text-[#888888] hover:text-white border-transparent hover:bg-[#141414]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#222222] grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#141414] border border-[#333333] text-[#F0F0F0] py-2.5 px-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Carrito ({totalInCart})</span>
              </button>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#141414] border border-[#333333] text-[#C5A059] py-2.5 px-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            <div className="pt-2">
              {currentUser ? (
                <div className="flex items-center justify-between p-2.5 bg-[#141414] border border-[#2a2a2a]">
                  <span className="text-xs text-[#F0F0F0] truncate">{currentUser.email}</span>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-400 uppercase tracking-wider font-semibold"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#161616] border border-[#333333] hover:border-[#C5A059] text-[#F0F0F0] py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Iniciar Sesión / Registro</span>
                </button>
              )}
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  onOpenConsultation();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#C5A059] text-black py-3 rounded-none text-center font-semibold text-xs uppercase tracking-widest hover:bg-[#d8b570]"
              >
                Consultar con Luthier
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

