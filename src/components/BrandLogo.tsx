import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  className?: string;
  showText?: boolean;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
  showText = true,
  showSubtitle = true,
}) => {
  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 84,
  };

  const px = pixelSizes[size];

  // Exact vector reproduction of the uploaded Kech logo (Gemini_Generated_Image_z0tsg9z0tsg9z0ts.jpeg):
  // - Top clockwise orange arc ending in rightward arrow head
  // - Bottom purple arc
  // - 3 orange speed dash lines on left
  // - Dynamic purple runner leaning forward
  // - Purple cyclist courier on bike with bright orange delivery backpack
  const LogoEmblem = (
    <div 
      className="relative shrink-0 flex items-center justify-center select-none"
      style={{ width: px, height: px }}
    >
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs transition-transform duration-200"
        aria-label="KECH DELIVERIES Brand Icon"
      >
        {/* 3 Horizontal Orange Speed Streaks on Far Left */}
        <line x1="16" y1="52" x2="34" y2="52" stroke="#FF9800" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="8" y1="62" x2="31" y2="62" stroke="#FF9800" strokeWidth="5" strokeLinecap="round" />
        <line x1="14" y1="72" x2="30" y2="72" stroke="#FF9800" strokeWidth="4.5" strokeLinecap="round" />

        {/* Top Clockwise Arc (Fast Orange #FF9800) */}
        <path
          d="M 45 42 A 46 46 0 0 1 120 48"
          stroke="#FF9800"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Orange Arrow Head pointing East */}
        <polygon
          points="114,35 142,50 114,65"
          fill="#FF9800"
        />

        {/* Bottom Arc (Dynamic Purple #6A1B9A) */}
        <path
          d="M 120 72 A 46 46 0 0 1 45 78"
          stroke="#6A1B9A"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* ================= RUNNER SILHOUETTE (Purple #6A1B9A) ================= */}
        {/* Head */}
        <circle cx="53" cy="36" r="6" fill="#6A1B9A" />

        {/* Forward Leaning Torso */}
        <path
          d="M 46 58 L 54 44"
          stroke="#6A1B9A"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Right Arm (Pumping forward & up) */}
        <path
          d="M 52 44 L 62 48 L 68 42"
          stroke="#6A1B9A"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Arm (Reaching back) */}
        <path
          d="M 50 46 L 42 47 L 34 52"
          stroke="#6A1B9A"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Forward Right Leg (Bent at Knee in Stride) */}
        <path
          d="M 46 58 L 55 68 L 52 79"
          stroke="#6A1B9A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trailing Left Leg (Extended back horizontally) */}
        <path
          d="M 46 58 L 38 71 L 28 72"
          stroke="#6A1B9A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ================= BICYCLE COURIER (Purple + Orange Backpack) ================= */}
        {/* Rear Wheel (Circle outline) */}
        <circle cx="82" cy="80" r="12" stroke="#6A1B9A" strokeWidth="4" fill="none" />
        
        {/* Front Wheel (Circle outline) */}
        <circle cx="114" cy="80" r="12" stroke="#6A1B9A" strokeWidth="4" fill="none" />

        {/* Bicycle Diamond Frame */}
        <path
          d="M 82 80 L 96 80 L 109 68 L 94 68 Z"
          stroke="#6A1B9A"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Seat Tube & Fork */}
        <path d="M 96 80 L 93 59" stroke="#6A1B9A" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M 114 80 L 107 58 L 101 60" stroke="#6A1B9A" strokeWidth="3.6" strokeLinecap="round" />
        {/* Bicycle Saddle */}
        <path d="M 88 59 L 98 59" stroke="#6A1B9A" strokeWidth="5" strokeLinecap="round" />

        {/* Courier Rider Torso leaning to handlebars */}
        <path
          d="M 95 56 L 103 48 L 110 59"
          stroke="#6A1B9A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Courier Head with Forward Cap / Visor */}
        <circle cx="106" cy="38" r="5.5" fill="#6A1B9A" />
        {/* Cap Brim pointing right */}
        <path d="M 104 36 L 114 38" stroke="#6A1B9A" strokeWidth="2.8" strokeLinecap="round" />

        {/* Courier Legs pedaling */}
        <path
          d="M 95 57 L 91 69 L 96 79"
          stroke="#6A1B9A"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vibrant Orange Delivery Backpack (Rectangular with rounded corners) */}
        <rect
          x="81"
          y="38"
          width="11"
          height="14"
          rx="2.5"
          fill="#FF9800"
          transform="rotate(-20 86 45)"
        />
        {/* Backpack strap line */}
        <path d="M 87 40 L 97 49" stroke="#FFE082" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{LogoEmblem}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {LogoEmblem}
        {showText && (
          <div className="mt-2.5 flex flex-col items-center">
            <span className="font-black text-xl sm:text-2xl tracking-tight text-[#6A1B9A] leading-none font-sans uppercase">
              KECH <span className="text-[#FF9800]">DELIVERIES</span>
            </span>
            {showSubtitle && (
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Asela Instant Delivery
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (Ideal for Navbar & Headers):
  // Clean logo mark + "KECH DELIVERIES" (No Amharic characters)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {LogoEmblem}
      {showText && (
        <div className="flex flex-col justify-center text-left">
          <div className="flex items-baseline gap-1.5 font-sans">
            <span className="font-black text-xl sm:text-2xl tracking-tight text-[#6A1B9A] leading-none uppercase">
              KECH
            </span>
            <span className="font-black text-lg sm:text-xl tracking-tight text-[#FF9800] leading-none uppercase">
              DELIVERIES
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-gray-400 leading-tight mt-0.5">
              Asela • On-Demand
            </span>
          )}
        </div>
      )}
    </div>
  );
};
