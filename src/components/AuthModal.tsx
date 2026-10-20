import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Store,
  Hotel,
  Bike,
  ShoppingBag
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LanguageCode } from '../types';

export type SelectedAccountRole = 'customer' | 'merchant' | 'hotel' | 'courier';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  language: LanguageCode;
  onLoginSuccess: (userProfile: {
    fullName: string;
    email: string;
    avatarUrl: string;
    authProvider: 'google' | 'phone';
    role: SelectedAccountRole;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  language,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<SelectedAccountRole>('customer');
  const [phoneNumber, setPhoneNumber] = useState('+251 911 445 566');
  const [fullName, setFullName] = useState('Biniam Amdework');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const roleOptions: { id: SelectedAccountRole; title: string; desc: string; icon: any }[] = [
    {
      id: 'customer',
      title: language === 'am' ? 'ሸማች / ደንበኛ' : language === 'om' ? 'Maamila' : 'Shop as Customer',
      desc: language === 'am' ? 'ምግብና ሸቀጥ ማዘዣ' : 'Order food & goods in Asela',
      icon: ShoppingBag
    },
    {
      id: 'merchant',
      title: language === 'am' ? 'ምግብ ቤት / ካፌ' : language === 'om' ? 'Daldalaa' : 'Restaurant & Cafe',
      desc: language === 'am' ? 'የንግድ ሽያጭና ሜኑ' : 'Sell menus & groceries',
      icon: Store
    },
    {
      id: 'hotel',
      title: language === 'am' ? 'ሆቴል' : language === 'om' ? 'Hoteela' : 'Hotel Partner',
      desc: language === 'am' ? 'የሆቴል መስተንግዶ' : 'Hospitality dining & services',
      icon: Hotel
    },
    {
      id: 'courier',
      title: language === 'am' ? 'የብስክሌት አድራሽ' : language === 'om' ? 'Geessituu' : 'Courier Fleet',
      desc: language === 'am' ? 'ዕቃዎችን ማድረስ' : 'Deliver runs on bicycle/bike',
      icon: Bike
    }
  ];

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        fullName: 'Biniam Amdework',
        email: 'biniam.amdework@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        authProvider: 'google',
        role: selectedRole
      });
      onClose();
    }, 700);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOtpSent(true);
      }, 600);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess({
          fullName: fullName || 'Kech User',
          email: `${phoneNumber.replace(/[^0-9]/g, '')}@kech.et`,
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          authProvider: 'phone',
          role: selectedRole
        });
        onClose();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#150F22] border border-purple-100 dark:border-purple-900/40 shadow-2xl p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="space-y-1">
          <BrandLogo size="md" variant="horizontal" />
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 pt-2">
            {mode === 'signup' 
              ? (language === 'am' ? 'የከች አካውንት ይፍጠሩ' : language === 'om' ? 'Herreega Kech Uumaa' : 'Create your Kech Account')
              : (language === 'am' ? 'ወደ ከች ይግቡ' : language === 'om' ? 'Gara Kech Seenaa' : 'Welcome Back to Kech')
            }
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {language === 'am' 
              ? 'ፈጣን የማድረሻ ሥርዓት በአሰላ ከተማ' 
              : 'Asela’s trusted on-demand delivery ecosystem'
            }
          </p>
        </div>

        {/* CHOOSE ROLE DURING REGISTRATION (Explicit Requirement) */}
        {mode === 'signup' && (
          <div className="space-y-2 pt-1">
            <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Choose Your Account Type:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRole === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedRole(opt.id)}
                    className={`p-2.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] ring-2 ring-[#6A1B9A]/20'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-[#6A1B9A] text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      {isSelected && <span className="text-[10px] font-black text-[#6A1B9A]">✓</span>}
                    </div>
                    <div className="mt-2">
                      <div className="font-extrabold text-xs">{opt.title}</div>
                      <div className="text-[10px] text-zinc-400 leading-tight line-clamp-1">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PRIORITIZED ONE-TAP GOOGLE AUTH BUTTON */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-black text-sm border-2 border-zinc-200 dark:border-zinc-800 hover:border-[#6A1B9A] dark:hover:border-[#BA68C8] shadow-xs hover:shadow-md transition flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.25 5.42l4.03-3.15Z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
            </svg>
            <span>{isLoading ? 'Connecting Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          <span className="absolute px-3 bg-white dark:bg-[#150F22] text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {language === 'am' ? 'ወይም በስልክ ቁጥር' : 'Or with Phone Number'}
          </span>
        </div>

        {/* Ethiopian Phone Number Form */}
        <form onSubmit={handlePhoneSubmit} className="space-y-3">
          {mode === 'signup' && !isOtpSent && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {language === 'am' ? 'ሙሉ ስም' : 'Full Name'}
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Biniam Amdework"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
                />
              </div>
            </div>
          )}

          {!isOtpSent ? (
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {language === 'am' ? 'የስልክ ቁጥር (ቴሌብር / ኢትዮ ቴሌኮም)' : 'Phone (Telebirr / Ethio Telecom)'}
              </label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+251 911 234 567"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 p-3.5 rounded-2xl bg-[#6A1B9A]/10 border border-[#6A1B9A]/20">
              <div className="text-xs font-bold text-[#6A1B9A] dark:text-[#BA68C8]">
                Enter 4-Digit OTP Code sent to {phoneNumber}
              </div>
              <input
                type="text"
                maxLength={4}
                autoFocus
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="4 2 8 9"
                className="w-full text-center tracking-widest text-lg font-mono font-black py-2 rounded-xl bg-white dark:bg-zinc-900 border border-purple-300 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-black text-xs shadow-md shadow-purple-900/30 flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
          >
            <span>
              {isOtpSent 
                ? 'Verify & Complete' 
                : (mode === 'signup' ? 'Complete Registration' : 'Sign In with Phone')
              }
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Sign Up and Sign In */}
        <div className="text-center pt-1 text-xs text-zinc-500">
          {mode === 'signup' ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signin'); setIsOtpSent(false); }}
                className="font-bold text-[#FF9800] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setIsOtpSent(false); }}
                className="font-bold text-[#FF9800] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
