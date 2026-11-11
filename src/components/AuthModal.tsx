import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: 'user' | 'admin' }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Por favor, introduzca su correo electrónico.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Formato de correo no válido. Debe incluir "@" y un dominio (ej: maestro@luthier.com).');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Por favor, introduzca su nombre y apellidos.');
      return;
    }

    // Determine role (admin demo convenience or standard musician)
    const isAdmin = email.toLowerCase().includes('admin');
    const role: 'user' | 'admin' = isAdmin ? 'admin' : 'user';
    const userName = name.trim() || (isAdmin ? 'Administrador Luthier' : email.split('@')[0]);

    setSuccessMessage(
      mode === 'login'
        ? `¡Bienvenido de nuevo, ${userName}!`
        : `¡Cuenta creada exitosamente para ${userName}!`
    );

    setTimeout(() => {
      onLoginSuccess({ name: userName, email, role });
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setSuccessMessage('');
    }, 1200);
  };

  const handleQuickFill = (role: 'musician' | 'admin') => {
    setErrorMessage('');
    if (role === 'admin') {
      setEmail('admin@luthierelite.com');
      setPassword('Admin2026Secure!');
      setName('Director de Taller');
    } else {
      setEmail('maestro.solista@conservatorio.es');
      setPassword('MusicaClasica2026*');
      setName('Mtro. Daniel Rossi');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D0D0D] border border-[#222222] shadow-2xl p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#262626] transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-[#161616] border border-[#C5A059] mx-auto flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#C5A059]" />
          </div>
          <span className="text-[10px] font-medium text-[#C5A059] uppercase tracking-[0.25em] block mb-1">
            Portal de Acceso Exclusivo
          </span>
          <h2 className="font-serif text-2xl text-[#F0F0F0] font-light tracking-wide">
            {mode === 'login' ? 'Iniciar Sesión' : 'Registro de Músico'}
          </h2>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#141414] border border-[#262626] mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#1e1e1e] text-[#C5A059] border border-[#333333]'
                : 'text-[#888888] hover:text-white border border-transparent'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-[#1e1e1e] text-[#C5A059] border border-[#333333]'
                : 'text-[#888888] hover:text-white border border-transparent'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-[#C5A059] text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#C5A059]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#888888] mb-1">
                Nombre y Apellidos *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-[#666666]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Maestro Alejandro Rossi"
                  className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] pl-10 pr-3 py-2.5 focus:outline-none placeholder-[#555555]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#888888] mb-1">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#666666]" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@conservatorio.org"
                className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] pl-10 pr-3 py-2.5 focus:outline-none placeholder-[#555555]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#888888] mb-1">
              Contraseña Segura *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#666666]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-[#C5A059] text-xs text-[#F0F0F0] pl-10 pr-10 py-2.5 focus:outline-none placeholder-[#555555] font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#666666] hover:text-[#C5A059] cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Encryption & security placeholder indicator */}
            <div className="flex items-center justify-between text-[10px] text-[#666666] mt-1.5 font-light">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                <span>Cifrado TLS 256-bit</span>
              </span>
              <span>Min. 6 caracteres</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#C5A059] hover:bg-[#d8b570] text-black py-3 text-xs font-semibold uppercase tracking-[0.25em] transition-colors cursor-pointer shadow-lg mt-2"
          >
            {mode === 'login' ? 'Entrar al Atelier' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Demo Quick Fill Shortcuts for Evaluation */}
        <div className="mt-6 pt-5 border-t border-[#222222]">
          <span className="text-[10px] uppercase tracking-wider text-[#666666] block text-center mb-2">
            Accesos de Demostración Académica
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('musician')}
              className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#C5A059] text-[10px] text-[#A0A0A0] hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              Demo: Músico
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#C5A059] text-[10px] text-[#C5A059] hover:text-white uppercase tracking-wider transition-colors cursor-pointer font-medium"
            >
              Demo: Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
