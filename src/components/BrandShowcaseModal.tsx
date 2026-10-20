import React from 'react';
import { X, Palette, Sparkles, Check, Share2, Bike, Shield } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LanguageCode } from '../types';

interface BrandShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const BrandShowcaseModal: React.FC<BrandShowcaseModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#120D1E] border border-purple-200 dark:border-purple-900/50 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                ከች (Kech) Brand Identity & Physical Assets
              </h2>
              <p className="text-xs text-zinc-500">
                Official approved brand book & equipment specifications for Asela couriers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Colors Swatches (Approved Palette) */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Strict Color Palette System
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Dynamic Purple */}
            <div className="p-4 rounded-2xl bg-[#6A1B9A] text-white space-y-2 shadow-lg shadow-purple-950/20">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>Primary Accent</span>
                <span>#6A1B9A</span>
              </div>
              <div className="text-lg font-black tracking-tight">Dynamic Purple</div>
              <p className="text-[11px] text-purple-100/80">
                Primary brand color, main navigation, key buttons, and active states.
              </p>
            </div>

            {/* Fast Orange */}
            <div className="p-4 rounded-2xl bg-[#FF9800] text-zinc-950 space-y-2 shadow-lg shadow-amber-950/20">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-900">
                <span>Secondary CTA</span>
                <span>#FF9800</span>
              </div>
              <div className="text-lg font-black tracking-tight">Fast Orange</div>
              <p className="text-[11px] text-zinc-900/80">
                Express speed highlights, flash discounts, and high-priority secondary CTAs.
              </p>
            </div>

            {/* Teal Accent */}
            <div className="p-4 rounded-2xl bg-[#009688] text-white space-y-2 shadow-lg shadow-teal-950/20">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>Selective Accent</span>
                <span>#009688</span>
              </div>
              <div className="text-lg font-black tracking-tight">Vibrant Teal</div>
              <p className="text-[11px] text-teal-100/80">
                Selective accents, verified merchant badges, and delivery success indicators.
              </p>
            </div>
          </div>
        </div>

        {/* Physical Courier Gear: Helmet & Thermal Backpack (Section 3D) */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Physical Gear Assets (Asela Bicycle & Motorbike Fleet)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Courier Helmet */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-purple-100 dark:border-purple-900/30 space-y-3">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#6A1B9A] to-[#3B0D56] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#FF9800] text-zinc-950 text-[10px] font-black uppercase">
                  Safety Gear
                </div>
                <div className="text-4xl mb-1">⛑️</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-white">ከች</span>
                  <span className="text-xs font-bold text-[#FF9800]">KECH</span>
                </div>
                <div className="text-[10px] text-purple-200 mt-0.5">Asela Fleet Aerodynamic Helmet</div>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                  Certified Courier Aerodynamic Helmet
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Matte dark purple shell with reflective orange visibility strip and high-contrast Ge'ez 'ከች' branding.
                </p>
              </div>
            </div>

            {/* Insulated Delivery Backpack */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-purple-100 dark:border-purple-900/30 space-y-3">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#120D1E] to-[#6A1B9A] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#009688] text-white text-[10px] font-black uppercase">
                  Thermal Hot/Cold
                </div>
                <div className="text-4xl mb-1">🎒</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-white">ከች</span>
                  <span className="text-xs font-bold text-[#FF9800]">KECH</span>
                </div>
                <div className="text-[10px] text-purple-200 mt-0.5">Heavy-Duty Thermal Delivery Pack</div>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                  Insulated 45L Delivery Backpack
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Weatherproof insulated food delivery box backpack engineered for bicycle couriers navigating Asela's elevation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Banners Mockup (Section 3D) */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#6A1B9A] via-[#4A148C] to-[#120D1E] text-white space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-[#FF9800]">
              Social Media & Telegram Channel Mockup
            </span>
            <span className="font-mono text-[11px] text-purple-200">@KechDeliveryBot</span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <BrandLogo size="lg" showSubtitle={false} />
            <div>
              <div className="text-lg font-black">ከች — ፈጣን አድራሽ በአሰላ</div>
              <div className="text-xs text-purple-200">
                Telegram Mini App • Instant Food, Groceries & Parcel Dispatch in Oromia
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
