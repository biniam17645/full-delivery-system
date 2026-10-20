import React from 'react';
import { BrandLogo } from './BrandLogo';

interface HeroPhoneMockupProps {
  onOrderClick: () => void;
}

export const HeroPhoneMockup: React.FC<HeroPhoneMockupProps> = ({ onOrderClick }) => {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Floating Badge 1 (Top-Right): 25 Min Delivery */}
      <div 
        className="absolute -right-6 top-8 z-20 hidden md:flex animate-floatY items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white p-3 shadow-[0_12px_32px_rgba(91,20,132,0.14)] border border-purple-100"
        aria-hidden="true"
      >
        <div className="bg-grad flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div>
          <span className="block text-xs font-black leading-tight text-zinc-900">25 Min Delivery</span>
          <span className="block text-[10px] text-zinc-500 font-medium">Asela-wide speed</span>
        </div>
      </div>

      {/* Realistic Interactive SVG Phone Mockup (matching beU aesthetic in Kech colors) */}
      <div className="relative">
        <svg
          width="280"
          height="560"
          viewBox="0 0 274 554"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Kech Delivery App Preview"
          className="max-w-full drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="kech-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B1484" />
              <stop offset="50%" stopColor="#8E24AA" />
              <stop offset="100%" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="kech-phone-border" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A1B38" />
              <stop offset="100%" stopColor="#12081C" />
            </linearGradient>
            <clipPath id="phone-screen-clip">
              <rect x="10" y="10" width="254" height="534" rx="35" />
            </clipPath>
          </defs>

          {/* Outer Phone Shell */}
          <rect x="1" y="1" width="272" height="552" rx="42" fill="url(#kech-phone-border)" />
          <rect x="5" y="5" width="264" height="544" rx="38" fill="#1C1425" />
          
          {/* Inner Screen */}
          <rect x="10" y="10" width="254" height="534" rx="35" fill="#FAFAFA" clipPath="url(#phone-screen-clip)" />
          <rect x="10" y="10" width="254" height="66" rx="35" fill="#FFFFFF" />
          <rect x="10" y="58" width="254" height="12" fill="#FFFFFF" />

          {/* Top Camera Notch */}
          <rect x="97" y="12" width="80" height="24" rx="12" fill="#1C1425" />

          {/* Header Greeting inside app */}
          <text x="24" y="82" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#1A1A1A">
            Good morning! 👋
          </text>
          <text x="24" y="98" fontFamily="system-ui, sans-serif" fontSize="10" fill="#777777">
            What would you like in Asela today?
          </text>

          {/* Mini Logo Emblem in app header */}
          <rect x="210" y="62" width="38" height="38" rx="10" fill="url(#kech-grad-main)" />
          <text x="229" y="86" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16">
            ከ
          </text>

          {/* Search Bar */}
          <rect x="18" y="122" width="238" height="36" rx="18" fill="#F0EDF5" />
          <circle cx="33" cy="140" r="6" fill="none" stroke="#8E24AA" strokeWidth="1.6" />
          <text x="45" y="144" fontFamily="system-ui, sans-serif" fontSize="10.5" fill="#888888">
            Search food, bunna, groceries...
          </text>

          {/* Category Tabs: All, Food, Grocery, Parcel */}
          <rect x="18" y="166" width="54" height="26" rx="13" fill="url(#kech-grad-main)" />
          <text x="45" y="183" fontFamily="system-ui, sans-serif" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="800">
            All
          </text>

          <rect x="78" y="166" width="58" height="26" rx="13" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1" />
          <text x="107" y="183" fontFamily="system-ui, sans-serif" fontSize="10" fill="#555555" textAnchor="middle" fontWeight="600">
            Food
          </text>

          <rect x="142" y="166" width="62" height="26" rx="13" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1" />
          <text x="173" y="183" fontFamily="system-ui, sans-serif" fontSize="10" fill="#555555" textAnchor="middle" fontWeight="600">
            Grocery
          </text>

          <rect x="210" y="166" width="50" height="26" rx="13" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1" />
          <text x="235" y="183" fontFamily="system-ui, sans-serif" fontSize="10" fill="#555555" textAnchor="middle" fontWeight="600">
            Parcel
          </text>

          {/* Big Featured Promo Card: 25 MIN DELIVERY */}
          <rect x="18" y="202" width="238" height="96" rx="16" fill="url(#kech-grad-main)" />
          <text x="32" y="226" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="900" fill="#FFFFFF" letterSpacing="0.5">
            25 MIN DELIVERY
          </text>
          <text x="32" y="244" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(255,255,255,0.9)">
            All across Asela &amp; Arsi Uni
          </text>

          {/* Promo Button */}
          <rect x="32" y="254" width="82" height="24" rx="12" fill="#FFFFFF" />
          <text x="73" y="270" fontFamily="system-ui, sans-serif" fontSize="9.5" fill="#5B1484" textAnchor="middle" fontWeight="800">
            Order Now →
          </text>

          {/* Courier Icon in Promo */}
          <circle cx="210" cy="250" r="28" fill="rgba(255,255,255,0.15)" />
          <text x="210" y="258" fontSize="26" textAnchor="middle">
            🚴
          </text>

          {/* Section: Popular Near You in Asela */}
          <text x="18" y="318" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#1A1A1A">
            Popular in Asela
          </text>

          {/* Card 1: Aba Jifar Bunna */}
          <rect x="18" y="326" width="112" height="92" rx="12" fill="#FFFFFF" stroke="#EFEFEF" strokeWidth="1" />
          <rect x="18" y="326" width="112" height="54" rx="12" fill="#FBF4E8" />
          <text x="74" y="360" fontSize="24" textAnchor="middle">☕</text>
          <text x="26" y="396" fontFamily="system-ui, sans-serif" fontSize="10" fill="#1A1A1A" fontWeight="800">
            Aba Jifar Bunna
          </text>
          <text x="26" y="410" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#777777">
            15–20 min • ⭐ 4.9
          </text>

          {/* Card 2: Habesha Kitchen */}
          <rect x="138" y="326" width="112" height="92" rx="12" fill="#FFFFFF" stroke="#EFEFEF" strokeWidth="1" />
          <rect x="138" y="326" width="112" height="54" rx="12" fill="#F8EAF5" />
          <text x="194" y="360" fontSize="24" textAnchor="middle">🍲</text>
          <text x="146" y="396" fontFamily="system-ui, sans-serif" fontSize="10" fill="#1A1A1A" fontWeight="800">
            Habesha Kitchen
          </text>
          <text x="146" y="410" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#777777">
            20–30 min • ⭐ 4.8
          </text>

          {/* Services Row */}
          <text x="18" y="438" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#1A1A1A">
            Services
          </text>

          {/* Service 1: Food */}
          <rect x="18" y="446" width="54" height="48" rx="12" fill="url(#kech-grad-main)" />
          <text x="45" y="468" fontSize="18" textAnchor="middle">🍽️</text>
          <text x="45" y="485" fontFamily="system-ui, sans-serif" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="700">
            Food
          </text>

          {/* Service 2: Grocery */}
          <rect x="78" y="446" width="54" height="48" rx="12" fill="#F8F3FC" />
          <text x="105" y="468" fontSize="18" textAnchor="middle">🛒</text>
          <text x="105" y="485" fontFamily="system-ui, sans-serif" fontSize="8" fill="#5B1484" textAnchor="middle" fontWeight="700">
            Grocery
          </text>

          {/* Service 3: Parcel */}
          <rect x="138" y="446" width="54" height="48" rx="12" fill="#FFF4EB" />
          <text x="165" y="468" fontSize="18" textAnchor="middle">📦</text>
          <text x="165" y="485" fontFamily="system-ui, sans-serif" fontSize="8" fill="#FF7A00" textAnchor="middle" fontWeight="700">
            Parcel
          </text>

          {/* Service 4: Pharmacy */}
          <rect x="198" y="446" width="54" height="48" rx="12" fill="#E8F8F5" />
          <text x="225" y="468" fontSize="18" textAnchor="middle">💊</text>
          <text x="225" y="485" fontFamily="system-ui, sans-serif" fontSize="8" fill="#009688" textAnchor="middle" fontWeight="700">
            Health
          </text>

          {/* Bottom Tab Bar */}
          <rect x="10" y="496" width="254" height="48" fill="#FFFFFF" />
          <line x1="10" y1="496" x2="264" y2="496" stroke="#ECECEC" strokeWidth="1" />
          
          <rect x="18" y="500" width="50" height="38" rx="8" fill="rgba(91,20,132,0.08)" />
          <text x="43" y="517" fontSize="15" textAnchor="middle">🏠</text>
          <text x="43" y="530" fontFamily="system-ui, sans-serif" fontSize="8" fill="#5B1484" textAnchor="middle" fontWeight="800">Home</text>
          
          <text x="105" y="517" fontSize="15" textAnchor="middle">🔍</text>
          <text x="105" y="530" fontFamily="system-ui, sans-serif" fontSize="8" fill="#888888" textAnchor="middle">Search</text>
          
          <text x="161" y="517" fontSize="15" textAnchor="middle">📋</text>
          <text x="161" y="530" fontFamily="system-ui, sans-serif" fontSize="8" fill="#888888" textAnchor="middle">Orders</text>
          
          <text x="222" y="517" fontSize="15" textAnchor="middle">👤</text>
          <text x="222" y="530" fontFamily="system-ui, sans-serif" fontSize="8" fill="#888888" textAnchor="middle">Profile</text>

          {/* Home indicator bar */}
          <rect x="97" y="546" width="80" height="3" rx="1.5" fill="#1C1425" />
        </svg>
      </div>

      {/* Floating Badge 2 (Bottom-Left): 50K+ Users */}
      <div 
        className="absolute -left-8 bottom-16 z-20 hidden md:flex animate-floatY items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white p-3 shadow-[0_12px_32px_rgba(91,20,132,0.14)] border border-purple-100"
        style={{ animationDelay: '1.2s' }}
        aria-hidden="true"
      >
        <div className="bg-grad flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <span className="block text-xs font-black leading-tight text-zinc-900">50K+ Users</span>
          <span className="block text-[10px] text-zinc-500 font-medium">Across Asela &amp; Arsi</span>
        </div>
      </div>

      {/* Glow under phone */}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-44 -translate-x-1/2 rounded-full bg-[#5B1484]/30 blur-[20px]" aria-hidden="true" />
    </div>
  );
};
