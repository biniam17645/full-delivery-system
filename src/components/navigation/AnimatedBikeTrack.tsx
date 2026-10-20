import React from 'react';

export const AnimatedBikeTrack: React.FC = () => {
  return (
    <div className="animated-bike-track z-30 flex items-center">
      <div className="animated-bike whitespace-nowrap">
        {/* Inline SVG Bike Rider Vector */}
        <svg 
          className="w-9 h-9 text-kechOrange filter drop-shadow" 
          viewBox="0 0 64 64" 
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="16" cy="46" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="48" cy="46" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          <path 
            d="M16 46 L28 46 L36 30 L48 46 M28 46 L24 28 L38 28 M36 30 L22 30" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          <rect x="8" y="24" width="12" height="14" rx="2" fill="#6A1B9A" />
          <circle cx="28" cy="18" r="5" fill="#6A1B9A" />
          <path d="M24 16 C24 12, 32 12, 32 16 Z" fill="#FF9800" />
        </svg>
        <span className="text-xs font-bold text-kechPurple bg-white/90 px-3 py-1 rounded-full shadow-sm border border-kechPurple/20">
          ⚡ KECH Express Rider Active in Asela!
        </span>
      </div>
    </div>
  );
};
