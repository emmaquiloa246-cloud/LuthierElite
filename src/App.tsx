/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INSTRUMENTS_DATA } from './data/instruments';
import { Instrument, CartItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { InstrumentModal } from './components/InstrumentModal';
import { HistoryModal } from './components/HistoryModal';
import { ConsultationDrawer } from './components/ConsultationDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { PrivacyModal } from './components/PrivacyModal';
import { DesignAppendixModal } from './components/DesignAppendixModal';
import { Footer } from './components/Footer';

export default function App() {
  const [instruments, setInstruments] = useState<Instrument[]>(INSTRUMENTS_DATA);
  const [activeSection, setActiveSection] = useState<string>('informacion');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Modals & Drawers
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isDesignAppendixOpen, setIsDesignAppendixOpen] = useState(false);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<{ email: string; role: 'musician' | 'admin' } | null>(null);

  const [directConsultInstrument, setDirectConsultInstrument] = useState<Instrument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Management
  const handleAddToCart = (instrument: Instrument) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.instrument.id === instrument.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        showToast(`«${instrument.name}» (x${updated[existingIndex].quantity}) en su bolsa.`);
        return updated;
      }
      showToast(`«${instrument.name}» añadido a la bolsa de compra.`);
      return [...prev, { instrument, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (instrumentId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.instrument.id === instrumentId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (instrumentId: string) => {
    setCart((prev) => prev.filter((item) => item.instrument.id !== instrumentId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleDirectConsult = (instrument: Instrument) => {
    setDirectConsultInstrument(instrument);
    setIsConsultationOpen(true);
  };

  const handleContactFormSubmit = (data: { email: string; phone: string; social: string }) => {
    showToast('¡Consulta registrada! Un maestro luthier se pondrá en contacto pronto.');
  };

  // Admin Inventory Handlers
  const handleAddInstrument = (newInst: Omit<Instrument, 'id'>) => {
    const created: Instrument = {
      ...newInst,
      id: `inst-${Date.now()}`,
    };
    setInstruments((prev) => [created, ...prev]);
    showToast(`«${created.name}» incorporado al catálogo oficial 2026.`);
  };

  const handleUpdateInstrument = (updated: Instrument) => {
    setInstruments((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    showToast(`«${updated.name}» actualizado en el inventario.`);
  };

  const handleDeleteInstrument = (id: string) => {
    const toRemove = instruments.find((i) => i.id === id);
    setInstruments((prev) => prev.filter((i) => i.id !== id));
    setCart((prev) => prev.filter((item) => item.instrument.id !== id));
    showToast(`«${toRemove?.name || 'Instrumento'}» retirado del inventario.`);
  };

  // Auth Handlers
  const handleLogin = (user: { email: string; role: 'musician' | 'admin' }) => {
    setCurrentUser(user);
    showToast(`Sesión iniciada como ${user.role === 'admin' ? 'Administrador' : 'Músico'} (${user.email.split('@')[0]})`);
    if (user.role === 'admin') {
      setIsAdminOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Ha cerrado su sesión de Luthier Elite.');
  };

  const cartInstrumentIds = cart.map((item) => item.instrument.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F0F0F0] selection:bg-[#C5A059] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141414] text-[#F0F0F0] px-5 py-3 rounded-none shadow-2xl text-[11px] uppercase tracking-[0.2em] font-medium border border-[#C5A059] animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full inline-block" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => {
          setDirectConsultInstrument(null);
          setIsConsultationOpen(true);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        {/* Hero / Information & Contact Section */}
        <HeroSection
          onExploreCatalog={() => handleNavigate('catalogo')}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onSelectInstrumentByName={(name) => {
            const found = instruments.find((i) => i.name.toLowerCase() === name.toLowerCase());
            if (found) setSelectedInstrument(found);
          }}
          onSubmitContactForm={handleContactFormSubmit}
        />

        {/* Geometric separator line */}
        <div className="geometric-line max-w-[1280px] mx-auto my-6 md:my-10" />

        {/* Catalog Section with Reference Bento Grid */}
        <CatalogSection
          instruments={instruments}
          onSelectInstrument={(inst) => setSelectedInstrument(inst)}
          onAddToCart={handleAddToCart}
          cartInstrumentIds={cartInstrumentIds}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenDesignAppendix={() => setIsDesignAppendixOpen(true)}
      />

      {/* Modals & Drawers */}
      <InstrumentModal
        instrument={selectedInstrument}
        onClose={() => setSelectedInstrument(null)}
        onAddToCart={handleAddToCart}
        onConsultDirectly={handleDirectConsult}
        isInCart={selectedInstrument ? cartInstrumentIds.includes(selectedInstrument.id) : false}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onExploreCatalog={() => {
          setIsHistoryOpen(false);
          handleNavigate('catalogo');
        }}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Design Appendix & Academic Process Artifact Modal */}
      <DesignAppendixModal
        isOpen={isDesignAppendixOpen}
        onClose={() => setIsDesignAppendixOpen(false)}
      />

      {/* Cart & Checkout Slide-Over */}
      <CartCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onExploreCatalog={() => {
          setIsCartOpen(false);
          handleNavigate('catalogo');
        }}
      />

      {/* Consultation / Cita Acústica Drawer */}
      <ConsultationDrawer
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setDirectConsultInstrument(null);
        }}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        directInstrument={directConsultInstrument}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        instruments={instruments}
        onSelectInstrument={(inst) => setSelectedInstrument(inst)}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLogin}
      />

      {/* Admin Dashboard Modal (Inventory Control Panel) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        instruments={instruments}
        onAddInstrument={handleAddInstrument}
        onUpdateInstrument={handleUpdateInstrument}
        onDeleteInstrument={handleDeleteInstrument}
      />
    </div>
  );
}
