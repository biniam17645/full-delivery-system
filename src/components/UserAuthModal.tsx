import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Phone,
  Globe
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onLoginSuccess: (user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    authProvider: 'google' | 'email';
  }) => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        fullName: 'Biniam Amdework',
        email: 'biniam.amdework@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        authProvider: 'google'
      });
      onClose();
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        fullName: fullName || emailOrPhone.split('@')[0] || 'Kech Web Customer',
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@kech.et`,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        authProvider: 'email'
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-8 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <BrandLogo size="md" variant="horizontal" />
          <h3 className="text-2xl font-black text-gray-900 pt-2">
            {mode === 'signin' ? 'Sign In to Kech Web' : 'Create Web Account'}
          </h3>
          <p className="text-xs text-gray-500">
            {mode === 'signin'
              ? 'Order food and groceries on the web without installing an app.'
              : 'Join Kech to enjoy 1-click web ordering, live courier tracking, and saved addresses.'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex p-1 rounded-xl bg-gray-100 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'signin' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'signup' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Tap Google Sign In Priority Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-3 active:scale-95 transition cursor-pointer"
        >
          {/* Official Google 'G' Logo */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.25 5.42l4.03-3.15Z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">or with email/phone</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs font-bold text-gray-700">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Biniam Amdework"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
              />
            </div>
          )}

          <div className="space-y-1">
            <label>Email Address or Phone Number</label>
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="e.g. name@example.com or +251 9..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none font-medium"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label>Password</label>
              {mode === 'signin' && (
                <button type="button" className="text-[11px] text-[#6A1B9A] hover:underline font-bold">
                  Forgot?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-extrabold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In' : 'Create Web Account'}</span>
                <ArrowRight className="w-4 h-4 text-[#FF9800]" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
            <Globe className="w-3.5 h-3.5 text-[#009688]" />
            <span>Web ordering is fully supported across all desktop &amp; mobile browsers</span>
          </div>
        </form>

      </div>
    </div>
  );
};
