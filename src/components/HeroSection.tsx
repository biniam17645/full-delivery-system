import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Bike, 
  Coffee, 
  Sparkles,
  Star,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onExploreCafes: (searchArea?: string) => void;
  onOpenAppDownload: () => void;
  onOpenUserAuth: (mode: 'signin' | 'signup') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCafes,
  onOpenAppDownload,
  onOpenUserAuth,
}) => {
  const [addressInput, setAddressInput] = useState('');

  const quickAreas = [
    'Kebele 02 (Center)',
    'Arsi University Campus',
    'Ras Hotel Area',
    'Post Office / Stadium',
    'Kebele 01',
    'Gonde'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreCafes(addressInput);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white pt-6 pb-16 lg:py-20">
      {/* Decorative background blur halos */}
      <div className="pointer-events-none absolute top-10 right-0 -mr-24 w-96 h-96 rounded-full bg-purple-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -ml-24 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/70 border border-purple-200 text-[#6A1B9A] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF9800] animate-pulse" />
              <span>Live Across Asela • 15–25 Mins Average Delivery</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
              Fast &amp; Reliable <br className="hidden sm:inline" />
              <span className="text-[#6A1B9A]">Delivery in Asela</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Your favorite meals, drinks, and local goods delivered right to your doorstep in minutes. Order directly on the web or get our fast mobile app.
            </p>

            {/* Address Search Bar Form */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form 
                onSubmit={handleSearchSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 bg-white rounded-2xl sm:rounded-full border-2 border-purple-100 shadow-xl shadow-purple-900/5 focus-within:border-[#6A1B9A] transition"
              >
                <div className="flex-1 flex items-center gap-3 px-4 py-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#FF9800] shrink-0" />
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Enter your delivery area in Asela..."
                    className="w-full bg-transparent text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="sheen px-7 py-3 rounded-xl sm:rounded-full bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-bold text-sm shadow-md shadow-purple-900/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#FF9800]" />
                  <span>Explore Cafes</span>
                </button>
              </form>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mt-3 pt-1 text-xs text-gray-500">
                <span className="font-semibold text-gray-400">Popular:</span>
                {quickAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setAddressInput(area);
                      onExploreCafes(area);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-purple-100 hover:text-[#6A1B9A] transition text-gray-600 font-medium cursor-pointer"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons for Web Ordering vs App */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onExploreCafes()}
                className="px-6 py-3 rounded-full bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-extrabold text-sm shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>Order on Web Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenUserAuth('signup')}
                className="px-6 py-3 rounded-full border-2 border-gray-200 hover:border-[#6A1B9A] text-gray-800 hover:text-[#6A1B9A] font-bold text-sm transition cursor-pointer"
              >
                Create Free Account
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#6A1B9A]">15–25m</div>
                <div className="text-xs text-gray-500 font-medium">Doorstep Speed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FF9800]">35 ETB</div>
                <div className="text-xs text-gray-500 font-medium">Low Delivery Fee</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">4.9 ★</div>
                <div className="text-xs text-gray-500 font-medium">Customer Rating</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column (5 cols) with ANIMATED BIKE COURIER */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-purple-100 overflow-hidden">
              
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center font-black text-xs tracking-tight">
                    KD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">KECH DELIVERIES</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live Dispatch Active in Asela
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#FF9800] text-[11px] font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>20 min arrival</span>
                </div>
              </div>

              {/* COURIER & BIKE ANIMATION CONTAINER */}
              <div className="relative my-3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#4A148C] via-[#6A1B9A] to-[#8E24AA] p-5 text-white text-center shadow-inner">
                
                {/* Decorative background glow */}
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#FF9800]/25 blur-xl" />

                {/* Animated SVG Bicycle Courier Visual */}
                <div className="relative z-10 flex items-center justify-center py-2 select-none">
                  <svg viewBox="0 0 280 150" fill="none" className="w-full h-40 drop-shadow-xl overflow-visible">
                    
                    {/* Animated Speed Wind Trails (Gliding from left to right) */}
                    <line x1="15" y1="45" x2="60" y2="45" stroke="#FFA726" strokeWidth="3" strokeLinecap="round" className="animate-speedStream1" />
                    <line x1="5" y1="65" x2="55" y2="65" stroke="#FF9800" strokeWidth="3.5" strokeLinecap="round" className="animate-speedStream2" />
                    <line x1="20" y1="85" x2="65" y2="85" stroke="#FFA726" strokeWidth="3" strokeLinecap="round" className="animate-speedStream3" />

                    {/* Road Line with Dashed Movement */}
                    <line x1="10" y1="135" x2="270" y2="135" stroke="rgba(255,255,255,0.25)" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="20" y1="135" x2="60" y2="135" stroke="#FF9800" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
                    <line x1="100" y1="135" x2="150" y2="135" stroke="#FF9800" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
                    <line x1="190" y1="135" x2="240" y2="135" stroke="#FF9800" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />

                    {/* ANIMATED BIKE & RIDER GROUP (With subtle vertical pedaling cadence bob) */}
                    <g className="animate-bikeBob">
                      
                      {/* === Rear Wheel with Rotating Spokes === */}
                      <g transform="translate(100, 108)">
                        {/* Outer Tire */}
                        <circle cx="0" cy="0" r="24" stroke="#FFFFFF" strokeWidth="4" fill="none" />
                        <circle cx="0" cy="0" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                        {/* Hub */}
                        <circle cx="0" cy="0" r="4.5" fill="#FF9800" />
                        {/* Rotating Spokes */}
                        <g className="animate-wheelSpin">
                          <line x1="0" y1="-23" x2="0" y2="23" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-23" y1="0" x2="23" y2="0" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-16" y1="-16" x2="16" y2="16" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-16" y1="16" x2="16" y2="-16" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                        </g>
                      </g>

                      {/* === Front Wheel with Rotating Spokes === */}
                      <g transform="translate(195, 108)">
                        {/* Outer Tire */}
                        <circle cx="0" cy="0" r="24" stroke="#FFFFFF" strokeWidth="4" fill="none" />
                        <circle cx="0" cy="0" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                        {/* Hub */}
                        <circle cx="0" cy="0" r="4.5" fill="#FF9800" />
                        {/* Rotating Spokes */}
                        <g className="animate-wheelSpin">
                          <line x1="0" y1="-23" x2="0" y2="23" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-23" y1="0" x2="23" y2="0" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-16" y1="-16" x2="16" y2="16" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                          <line x1="-16" y1="16" x2="16" y2="-16" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                        </g>
                      </g>

                      {/* === Bicycle Diamond Frame === */}
                      {/* Rear dropouts to bottom bracket (140, 108) */}
                      <path d="M 100 108 L 138 108 L 175 78 L 136 78 Z" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Seat tube: BB (138, 108) to saddle (132, 68) */}
                      <path d="M 138 108 L 132 68" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
                      {/* Front fork & head tube: front hub (195, 108) to headset (175, 78) to handlebar (170, 68) */}
                      <path d="M 195 108 L 178 72 L 168 74" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
                      
                      {/* Saddle */}
                      <path d="M 120 68 L 142 68" stroke="#FF9800" strokeWidth="5.5" strokeLinecap="round" />

                      {/* Crank & Pedal */}
                      <circle cx="138" cy="108" r="6" fill="#FF9800" />
                      <line x1="138" y1="108" x2="146" y2="120" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                      <line x1="142" y1="120" x2="152" y2="120" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" />

                      {/* === Courier Rider Figure (Matching uploaded brand mark) === */}
                      {/* Pelvis & Lower Torso */}
                      <path d="M 134 68 L 148 56" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
                      
                      {/* Upper Torso leaning forward to handlebar */}
                      <path d="M 148 56 L 168 52" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

                      {/* Arms reaching to handlebar */}
                      <path d="M 166 52 L 173 70" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Legs pedaling */}
                      <path d="M 134 68 L 126 88 L 146 118" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Head with Forward Visor Cap */}
                      <circle cx="172" cy="38" r="8" fill="#FF9800" />
                      {/* Cap Visor pointing East */}
                      <path d="M 166 34 L 184 38" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />

                      {/* Signature Fast Orange Thermal Backpack with "KECH" Wordmark */}
                      <rect
                        x="122"
                        y="36"
                        width="24"
                        height="30"
                        rx="5"
                        fill="#FF9800"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        transform="rotate(-18 134 51)"
                      />
                      {/* Clean English "KECH" text on bag */}
                      <text
                        x="125"
                        y="55"
                        fill="#FFFFFF"
                        fontSize="8"
                        fontWeight="900"
                        fontFamily="system-ui, sans-serif"
                        letterSpacing="0.5"
                        transform="rotate(-18 134 51)"
                      >
                        KECH
                      </text>
                      {/* Backpack reflective safety strip */}
                      <line x1="124" y1="44" x2="144" y2="44" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" transform="rotate(-18 134 51)" />

                    </g>
                  </svg>
                </div>

                <div className="relative z-10 pt-1 flex items-center justify-between text-xs px-2 border-t border-white/10 pt-2">
                  <div className="text-left">
                    <div className="font-black text-sm text-white">Asela Bicycle Fleet</div>
                    <div className="text-[10px] text-purple-200">Swift, Eco-Friendly &amp; Zero Traffic Delay</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px]">
                    15–25 MINS
                  </span>
                </div>

              </div>

              {/* Sample Quick Cafe Items in Visual */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Popular Deliveries in Asela Right Now
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">☕</span>
                    <div className="text-left">
                      <div className="text-xs font-bold text-gray-900">Arsi Highland Jebena Bunna</div>
                      <div className="text-[10px] text-gray-500">Gonde Cafe &amp; Roastery • 15 min</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#6A1B9A]">30 ETB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍲</span>
                    <div className="text-left">
                      <div className="text-xs font-bold text-gray-900">Special Siga Tibs &amp; Injera</div>
                      <div className="text-[10px] text-gray-500">Ras Hotel Asela • 25 min</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#6A1B9A]">240 ETB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍯</span>
                    <div className="text-left">
                      <div className="text-xs font-bold text-gray-900">Mount Chilalo Pure White Honey</div>
                      <div className="text-[10px] text-gray-500">Chilalo Organic Mart • 20 min</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#6A1B9A]">450 ETB</span>
                </div>
              </div>

              {/* Action Hint */}
              <button
                onClick={onOpenAppDownload}
                className="w-full mt-3 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6A1B9A] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Download Android APK for exclusive discounts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
