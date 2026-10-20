import React from 'react';
import { 
  X, 
  ChevronLeft, 
  MoreVertical, 
  Clock, 
  ShoppingBag, 
  User, 
  Bike, 
  CheckCircle2, 
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LanguageCode, Order, Delivery } from '../types';

interface TelegramMiniAppViewProps {
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  activeOrder: Order | null;
  onOpenCart: () => void;
  onViewOrders: () => void;
}

export const TelegramMiniAppView: React.FC<TelegramMiniAppViewProps> = ({
  language,
  onSelectLanguage,
  activeOrder,
  onOpenCart,
  onViewOrders
}) => {
  return (
    <div className="max-w-sm mx-auto my-6 rounded-[40px] p-3 bg-zinc-900 border-4 border-zinc-800 shadow-2xl overflow-hidden font-sans">
      {/* Phone Notch & Telegram Top Bar */}
      <div className="bg-[#17212B] text-white rounded-[32px] overflow-hidden border border-zinc-700/60 flex flex-col min-h-[680px] justify-between">
        
        {/* Telegram Header */}
        <div className="bg-[#242F3D] px-4 py-3 flex items-center justify-between text-xs border-b border-zinc-700/50">
          <div className="flex items-center gap-2 text-sky-400 font-medium cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-sm leading-tight">Telegram Mini App</div>
            <div className="text-[10px] text-zinc-400 font-mono">@KechDeliveryBot</div>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <MoreVertical className="w-4 h-4" />
            <X className="w-4 h-4" />
          </div>
        </div>

        {/* Telegram Inner WebApp Content matching exact image */}
        <div className="p-5 flex-1 bg-white text-zinc-900 flex flex-col justify-between space-y-5">
          
          {/* Top Close indicator */}
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-100 pb-2">
            <span className="font-bold text-zinc-600">Close</span>
            <span className="text-zinc-400">✕</span>
          </div>

          {/* Centered Large Emblem Logo & Ethiopic 'ከች' (Directly matching right phone mockup) */}
          <div className="text-center py-4 space-y-2 flex flex-col items-center justify-center">
            <BrandLogo size="xl" variant="vertical" />
          </div>

          {/* Simple Language Selector: Flags & short codes (en, am, af) */}
          <div className="space-y-1.5">
            <div className="p-2 rounded-2xl bg-zinc-100 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <span>{language === 'am' ? '🇪🇹' : language === 'om' ? '🇪🇹' : '🇬🇧'}</span>
                <span>{language === 'am' ? 'Amharic (አማርኛ)' : language === 'om' ? 'Afaan Oromoo' : 'English'}</span>
              </span>
              <span className="text-zinc-400 text-[10px]">▼</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-xs font-bold text-center">
              <button
                onClick={() => onSelectLanguage('am')}
                className={`py-1.5 rounded-xl border transition ${
                  language === 'am' ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]' : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                }`}
              >
                🇪🇹 am
              </button>
              <button
                onClick={() => onSelectLanguage('en')}
                className={`py-1.5 rounded-xl border transition ${
                  language === 'en' ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]' : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                }`}
              >
                🇬🇧 en
              </button>
              <button
                onClick={() => onSelectLanguage('om')}
                className={`py-1.5 rounded-xl border transition ${
                  language === 'om' ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]' : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                }`}
              >
                🇪🇹 af
              </button>
            </div>
          </div>

          {/* Active Delivery Pill Button (Green matching image) */}
          <div className="pt-2">
            <button
              onClick={onViewOrders}
              className="w-full py-3 rounded-2xl bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#2E7D32] border border-[#A5D6A7] font-black text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-98 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" />
              <span>Active Delivery (Asela Bicycle Courier)</span>
            </button>
          </div>

          {/* Telegram Menu Links matching image_1.png */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 text-xs font-bold text-zinc-800">
            <button
              onClick={onOpenCart}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition text-left"
            >
              <ShoppingBag className="w-4 h-4 text-[#6A1B9A]" />
              <span>Order / Basket</span>
            </button>

            <button
              onClick={onViewOrders}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition text-left"
            >
              <Clock className="w-4 h-4 text-[#FF9800]" />
              <span>History</span>
            </button>

            <button
              onClick={onViewOrders}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition text-left"
            >
              <User className="w-4 h-4 text-zinc-600" />
              <span>Account</span>
            </button>
          </div>

        </div>

        {/* Telegram Bottom Safe Area */}
        <div className="bg-[#17212B] py-2 text-center text-[10px] text-zinc-500 font-mono">
          Powered by Kech Asela API
        </div>

      </div>
    </div>
  );
};
