import React from 'react';
import { 
  X, 
  User, 
  Clock, 
  CreditCard, 
  MapPin, 
  HelpCircle, 
  LogOut, 
  ShieldCheck, 
  ChevronRight, 
  Bike, 
  Sparkles,
  Zap
} from 'lucide-react';
import { LanguageCode } from '../types';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    authProvider: 'google' | 'phone';
  } | null;
  onLogout: () => void;
  onOpenOrders: () => void;
  activeOrderCount: number;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  isOpen,
  onClose,
  language,
  user,
  onLogout,
  onOpenOrders,
  activeOrderCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-sm h-full bg-white dark:bg-[#120D1E] border-l border-purple-100 dark:border-purple-900/40 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
        
        {/* Top Header & Profile Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-black uppercase tracking-wider text-[#6A1B9A] dark:text-[#BA68C8] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF9800]" />
              <span>Kech Account</span>
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Card */}
          {user ? (
            <div className="p-4 rounded-3xl bg-gradient-to-br from-[#6A1B9A]/10 via-[#FF9800]/5 to-transparent border border-[#6A1B9A]/20 flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#6A1B9A] shadow-md"
                />
                {user.authProvider === 'google' && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center p-0.5" title="Google Verified">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.25 5.42l4.03-3.15Z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {user.fullName}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {user.email}
                </p>
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#009688]/10 text-[#009688] dark:text-[#26A69A]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Kech Asela Member</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
              <User className="w-8 h-8 text-zinc-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Guest Customer</div>
              <div className="text-[11px] text-zinc-500">Sign in to sync your orders & Telebirr</div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => { onOpenOrders(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#6A1B9A]/10 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8]">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Order History & Active Tracking</span>
              </div>
              {activeOrderCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-[#FF9800] text-zinc-950 text-[10px] font-black">
                  {activeOrderCount} live
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition" />
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#6A1B9A]/10 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#009688]/10 text-[#009688]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span>Payment Methods (Telebirr & CBE)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#6A1B9A]/10 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FF9800]/10 text-[#FF9800]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Saved Addresses in Asela</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#6A1B9A]/10 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-[#6A1B9A] dark:text-purple-300">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span>Asela Courier Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition" />
            </button>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
          <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
            <span className="font-bold text-zinc-700 dark:text-zinc-300">Asela Operations:</span> Kebele 01-04 & Arsi University Delivery Core.
          </div>

          {user && (
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </aside>
    </div>
  );
};
