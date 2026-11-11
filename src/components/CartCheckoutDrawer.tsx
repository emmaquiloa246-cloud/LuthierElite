import React, { useState } from 'react';
import { Instrument, CartItem } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Ticket,
  Building,
  RotateCcw,
  Download,
  AlertCircle
} from 'lucide-react';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (instrumentId: string, delta: number) => void;
  onRemoveFromCart: (instrumentId: string) => void;
  onClearCart: () => void;
  onExploreCatalog: () => void;
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onExploreCatalog,
}) => {
  // Checkout Steps: 'cart' | 'checkout' | 'processing' | 'success'
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout' | 'processing' | 'success'>('cart');
  
  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Customer & Shipping Info
  const [buyerName, setBuyerName] = useState('Alejandro Rossi');
  const [buyerEmail, setBuyerEmail] = useState('a.rossi@filarmonica.org');
  const [buyerPhone, setBuyerPhone] = useState('+34 612 345 678');
  const [shippingAddress, setShippingAddress] = useState('Calle Serrano 45, 3º Izq');
  const [shippingCity, setShippingCity] = useState('Madrid');
  const [shippingZip, setShippingZip] = useState('28001');

  // Payment Info
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'financing'>('card');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 2026');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('912');
  const [orderNumber, setOrderNumber] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.instrument.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingCost = 0; // Courtesy special thermal carrier
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'CONSERVATORIO' || clean === 'LUTHIER2026' || clean === 'ELITE') {
      setDiscountPercent(10);
      setCouponMessage({ type: 'success', text: '¡Cupón aplicado! 10% de descuento concedido.' });
    } else if (clean === 'ESTUDIANTE') {
      setDiscountPercent(5);
      setCouponMessage({ type: 'success', text: '¡Cupón de estudiante aplicado! 5% de descuento concedido.' });
    } else {
      setDiscountMessage({ type: 'error', text: 'Cupón no válido. Pruebe con "LUTHIER2026" o "CONSERVATORIO".' });
    }
  };

  const setDiscountMessage = (msg: { type: 'success' | 'error'; text: string }) => {
    setCouponMessage(msg);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!buyerName.trim() || !buyerEmail.trim() || !shippingAddress.trim()) {
      setFormError('Por favor complete los datos obligatorios de envío.');
      return;
    }

    // Start simulated processing
    setCurrentStep('processing');
    const generatedOrderNum = `LE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    setTimeout(() => {
      setCurrentStep('success');
    }, 1600);
  };

  const handleFinishAndReset = () => {
    onClearCart();
    setCurrentStep('cart');
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-xl bg-[#0D0D0D] border-l border-[#222222] shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-[#222222] bg-[#111111] flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#C5A059]">
                  Luthier Elite • Pasarela Segura 2026
                </span>
              </div>
              <h2 className="font-serif text-2xl font-light text-[#F0F0F0] tracking-wide mt-0.5">
                {currentStep === 'cart' && 'Bolsa de Compra'}
                {currentStep === 'checkout' && 'Finalizar Pedido'}
                {currentStep === 'processing' && 'Verificando Transacción...'}
                {currentStep === 'success' && 'Confirmación de Compra'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] rounded-none transition-colors cursor-pointer"
              aria-label="Cerrar bolsa de compra"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* STEP 1: PROCESSING SPINNER */}
            {currentStep === 'processing' && (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-2 border-[#C5A059] border-t-transparent animate-spin flex items-center justify-center" />
                <h3 className="font-serif text-xl text-[#F0F0F0] font-light">
                  Procesando Pago Seguro
                </h3>
                <p className="text-xs text-[#888888] font-light max-w-xs leading-relaxed">
                  Conectando con la pasarela bancaria cifrada de 256 bits y emitiendo el certificado de autenticidad Luthier Elite...
                </p>
              </div>
            )}

            {/* STEP 2: SUCCESS RECEIPT */}
            {currentStep === 'success' && (
              <div className="bg-[#111111] border border-[#C5A059] p-6 space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#18261a] text-[#C5A059] border border-[#C5A059] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.25em] font-medium">
                    Transacción Completada con Éxito
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#F0F0F0]">
                    ¡Enhorabuena, {buyerName}!
                  </h3>
                  <p className="text-xs text-[#888888] font-light">
                    Su pedido ha sido registrado en nuestro taller central de 2026.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="bg-[#141414] p-4 border border-[#262626] space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-[#888888] pb-2 border-b border-[#222222]">
                    <span>Nº de Pedido:</span>
                    <strong className="text-[#C5A059]">{orderNumber}</strong>
                  </div>
                  <div className="flex justify-between text-[#888888] pb-2 border-b border-[#222222]">
                    <span>Destinatario:</span>
                    <span className="text-[#F0F0F0]">{buyerName}</span>
                  </div>
                  <div className="flex justify-between text-[#888888] pb-2 border-b border-[#222222]">
                    <span>Entrega en:</span>
                    <span className="text-[#F0F0F0] text-right truncate max-w-[200px]">{shippingAddress}, {shippingCity}</span>
                  </div>
                  <div className="flex justify-between text-[#888888] pb-2 border-b border-[#222222]">
                    <span>Método de Pago:</span>
                    <span className="text-[#F0F0F0]">
                      {paymentMethod === 'card' && 'Tarjeta Bancaria (•••• 2026)'}
                      {paymentMethod === 'transfer' && 'Transferencia SEPA'}
                      {paymentMethod === 'financing' && 'Financiación 0% TAE'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-[#888888]">Importe Total Pagado:</span>
                    <span className="text-[#C5A059] text-base font-bold">{finalTotal.toLocaleString()} €</span>
                  </div>
                </div>

                {/* Additional notes */}
                <div className="p-3 bg-[#161616] border border-[#2a2a2a] text-[11px] text-[#A0A0A0] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>
                    Se ha enviado la factura oficial y el <strong>Certificado Digital de Calibración Acústica 2026</strong> a <span className="text-[#C5A059]">{buyerEmail}</span>.
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      alert(`[Luthier Elite 2026]\nDescargando comprobante fiscal y certificado acústico oficial para el pedido ${orderNumber}.\nImporte: ${finalTotal.toLocaleString()} €.`);
                    }}
                    className="w-full bg-[#161616] hover:bg-[#202020] text-[#F0F0F0] border border-[#333333] hover:border-[#C5A059] py-3 text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Descargar Certificado y Recibo</span>
                  </button>
                  <button
                    onClick={handleFinishAndReset}
                    className="w-full bg-[#C5A059] text-black py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors cursor-pointer shadow-lg"
                  >
                    Volver a la Galería Musical
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EMPTY CART */}
            {currentStep !== 'processing' && currentStep !== 'success' && cart.length === 0 && (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#141414] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#777777]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#F0F0F0] font-light">
                  Su bolsa de compra está vacía
                </h3>
                <p className="text-xs text-[#888888] font-light max-w-sm mx-auto leading-relaxed">
                  Aún no ha seleccionado instrumentos para compra directa. Explore nuestro catálogo de piezas de cuerda, viento y concierto.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onExploreCatalog();
                    }}
                    className="bg-[#C5A059] text-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#d8b570] transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Explorar Catálogo 2026</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CART VIEW WITH ITEMS */}
            {currentStep === 'cart' && cart.length > 0 && (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#222222]">
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] font-medium">
                      Instrumentos Seleccionados ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[10px] text-[#777777] hover:text-red-400 uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Vaciar Carrito
                    </button>
                  </div>

                  <div className="divide-y divide-[#222222] bg-[#111111] border border-[#222222]">
                    {cart.map((item) => (
                      <div key={item.instrument.id} className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#141414] p-1 border border-[#2a2a2a] flex items-center justify-center shrink-0">
                          <img
                            src={item.instrument.image}
                            alt={item.instrument.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-[#F0F0F0] font-light truncate">
                            {item.instrument.name}
                          </h4>
                          <span className="text-[10px] text-[#777777] uppercase tracking-wider block">
                            {item.instrument.category} • Año 2026
                          </span>
                          <span className="text-xs text-[#C5A059] font-mono font-medium mt-1 block">
                            {item.instrument.price.toLocaleString()} € c/u
                          </span>
                        </div>

                        {/* Quantity and Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center border border-[#333333] bg-[#161616]">
                            <button
                              onClick={() => onUpdateQuantity(item.instrument.id, -1)}
                              className="p-1 hover:bg-[#252525] text-[#888888] hover:text-white transition-colors cursor-pointer"
                              title="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono text-[#F0F0F0]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.instrument.id, 1)}
                              className="p-1 hover:bg-[#252525] text-[#888888] hover:text-white transition-colors cursor-pointer"
                              title="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#F0F0F0]">
                              {(item.instrument.price * item.quantity).toLocaleString()} €
                            </span>
                            <button
                              onClick={() => onRemoveFromCart(item.instrument.id)}
                              className="text-[#666666] hover:text-red-400 p-1 transition-colors cursor-pointer"
                              title="Eliminar de la cesta"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="bg-[#111111] p-3.5 border border-[#222222]">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Cupón (ej: LUTHIER2026)"
                        className="w-full bg-[#161616] text-xs pl-9 pr-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0] uppercase tracking-wider"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#1a1a1a] hover:bg-[#242424] text-[#C5A059] border border-[#333333] hover:border-[#C5A059] px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                  {couponMessage && (
                    <p className={`text-[11px] mt-2 ${couponMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="bg-[#111111] p-4 border border-[#222222] space-y-2 text-xs font-light">
                  <div className="flex justify-between text-[#888888]">
                    <span>Subtotal de Instrumentos:</span>
                    <span className="font-mono text-[#F0F0F0]">{subtotal.toLocaleString()} €</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Descuento de Conservatorio ({discountPercent}%):</span>
                      <span className="font-mono">-{discountAmount.toLocaleString()} €</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#888888]">
                    <span>Envío Asegurado Especial Térmico:</span>
                    <span className="text-[#C5A059] font-medium">0 € (Cortesía 2026)</span>
                  </div>

                  <div className="flex justify-between text-[#888888]">
                    <span>Certificado de Garantía Vitalicia:</span>
                    <span className="text-[#C5A059] font-medium">Incluido</span>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#222222] flex justify-between items-center">
                    <span className="text-sm font-medium text-[#F0F0F0] uppercase tracking-wider">
                      Total a Pagar:
                    </span>
                    <span className="font-serif text-2xl font-normal text-[#C5A059]">
                      {finalTotal.toLocaleString()} €
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setCurrentStep('checkout')}
                  className="w-full bg-[#C5A059] text-black py-3.5 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#d8b570] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Datos y Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* STEP 5: CHECKOUT DATA & PAYMENT */}
            {currentStep === 'checkout' && cart.length > 0 && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                {/* Back to Cart button */}
                <button
                  type="button"
                  onClick={() => setCurrentStep('cart')}
                  className="text-xs text-[#888888] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Volver a la lista de instrumentos</span>
                </button>

                {formError && (
                  <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Shipping & Musician Data */}
                <div className="space-y-3 bg-[#111111] p-4 border border-[#222222]">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold flex items-center gap-2">
                    <Building className="w-3.5 h-3.5" />
                    <span>1. Datos del Músico y Dirección de Entrega</span>
                  </h4>

                  <div>
                    <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Nombre y Apellidos"
                      className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                        Teléfono Móvil
                      </label>
                      <input
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                      Dirección de Envío *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Calle, número, piso, conservatorio..."
                      className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={shippingZip}
                        onChange={(e) => setShippingZip(e.target.value)}
                        className="w-full bg-[#161616] text-xs px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 bg-[#111111] p-4 border border-[#222222]">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>2. Método de Pago Seguro</span>
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#C5A059] bg-[#1a1710] text-[#C5A059]'
                          : 'border-[#262626] bg-[#141414] text-[#888888] hover:border-[#333333]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] font-medium block">Tarjeta</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'transfer'
                          ? 'border-[#C5A059] bg-[#1a1710] text-[#C5A059]'
                          : 'border-[#262626] bg-[#141414] text-[#888888] hover:border-[#333333]'
                      }`}
                    >
                      <Building className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] font-medium block">SEPA Directo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('financing')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'financing'
                          ? 'border-[#C5A059] bg-[#1a1710] text-[#C5A059]'
                          : 'border-[#262626] bg-[#141414] text-[#888888] hover:border-[#333333]'
                      }`}
                    >
                      <Lock className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] font-medium block">0% TAE (24m)</span>
                    </button>
                  </div>

                  {/* Card fields */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                          Número de Tarjeta (Simulado)
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 •••• •••• ••••"
                          className="w-full bg-[#161616] text-xs font-mono px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                            Caducidad
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/AA"
                            className="w-full bg-[#161616] text-xs font-mono px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1">
                            CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className="w-full bg-[#161616] text-xs font-mono px-3 py-2 border border-[#2a2a2a] focus:border-[#C5A059] text-[#F0F0F0]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'transfer' && (
                    <div className="p-3 bg-[#161616] border border-[#2a2a2a] text-xs text-[#888888] space-y-1">
                      <p className="text-[#F0F0F0] font-medium">IBAN del Atelier Luthier Elite:</p>
                      <p className="font-mono text-[#C5A059]">ES89 0049 1500 0512 3456 7890</p>
                      <p className="text-[10px] text-[#777777]">Concepto: Pedido 2026 + Su Nombre</p>
                    </div>
                  )}

                  {paymentMethod === 'financing' && (
                    <div className="p-3 bg-[#161616] border border-[#2a2a2a] text-xs text-[#888888] space-y-1">
                      <p className="text-[#F0F0F0] font-medium">Financiación aprobada al 0% TAE:</p>
                      <p className="font-mono text-[#C5A059]">24 cuotas mensuales de {Math.round(finalTotal / 24).toLocaleString()} €/mes</p>
                      <p className="text-[10px] text-[#777777]">Sin comisiones de apertura para orquestas y conservatorios.</p>
                    </div>
                  )}
                </div>

                {/* Final Checkout Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] text-black py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#d8b570] transition-colors shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Confirmar y Pagar {finalTotal.toLocaleString()} €</span>
                  </button>
                  <p className="text-[10px] text-center text-[#666666] font-light mt-2 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#C5A059]" />
                    <span>Pago simulado protegido con cifrado TLS 1.3 de grado bancario</span>
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
