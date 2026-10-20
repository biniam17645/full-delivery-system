import React from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  Zap, 
  Bell, 
  ShieldCheck 
} from 'lucide-react';

interface AppDownloadSectionProps {
  onDirectApkDownload: () => void;
}

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({
  onDirectApkDownload
}) => {
  return (
    <section id="download" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#6A1B9A] via-[#5B1484] to-[#4A148C] text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          
          {/* Subtle Decorative Elements */}
          <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 rounded-full bg-[#FF9800]/20 blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kech Android &amp; Web Platform</span>
              </div>

              {/* Title as requested */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Order Faster on the <br />
                <span className="text-[#FF9800]">Kech Mobile App</span>
              </h2>

              {/* Description as requested */}
              <p className="text-base sm:text-lg text-purple-100 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Get live delivery updates, exclusive merchant discounts, and 3-tap ordering. Specially optimized for fast loading and low bandwidth on Asela mobile networks.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 pt-2 text-left">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9800] shrink-0" />
                  <span>Real-time bicycle GPS tracking</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9800] shrink-0" />
                  <span>Telebirr &amp; CBE Birr 1-tap pay</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9800] shrink-0" />
                  <span>Direct phone call to courier</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9800] shrink-0" />
                  <span>Ultra-lightweight APK (18 MB)</span>
                </div>
              </div>

              {/* Download CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                
                {/* 1. Direct APK Download Button */}
                <button
                  onClick={onDirectApkDownload}
                  className="sheen w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-extrabold text-sm shadow-xl shadow-amber-950/30 active:scale-95 transition cursor-pointer flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5 text-gray-950" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold tracking-wider leading-tight text-amber-950">
                      Direct Download
                    </div>
                    <div className="text-sm font-black leading-tight">
                      Download APK (v2.4.0)
                    </div>
                  </div>
                </button>

                {/* 2. Google Play Store Badge Button */}
                <button
                  onClick={onDirectApkDownload}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/20 text-white font-bold text-xs shadow-lg active:scale-95 transition cursor-pointer flex items-center justify-center gap-3"
                >
                  {/* Google Play Icon */}
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M3.6 1.8L13.7 12 3.6 22.2C3.3 21.8 3 21.2 3 20.4V3.6c0-.8.3-1.4.6-1.8z" fill="#00E5FF"/>
                    <path d="M17.1 8.6L13.7 12l3.4 3.4 3.9-2.2c1.1-.6 1.1-1.7 0-2.4l-3.9-2.2z" fill="#FFC107"/>
                    <path d="M3.6 1.8l10.1 10.2 3.4-3.4L6.1.4C5.1-.2 4.1-.1 3.6 1.8z" fill="#4CAF50"/>
                    <path d="M3.6 22.2l13.5-7.8-3.4-3.4L3.6 21.2c.5 1.9 1.5 2 2.5 1.4z" fill="#F44336"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-gray-300">GET IT ON</div>
                    <div className="text-sm font-black tracking-tight">Google Play</div>
                  </div>
                </button>

              </div>

              {/* Version & Security Tag */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-[11px] text-purple-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#009688]" />
                  Verified Safe &amp; Clean
                </span>
                <span>•</span>
                <span>Requires Android 6.0+</span>
                <span>•</span>
                <span>Free Download</span>
              </div>

            </div>

            {/* Right Mobile Phone Mockup Column (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              
              {/* Phone Frame Mockup */}
              <div className="relative w-64 sm:w-72 rounded-[42px] bg-gray-900 p-3 shadow-2xl border-4 border-gray-800 ring-1 ring-white/20 select-none">
                
                {/* Speaker Ear Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-10 h-1 rounded-full bg-gray-700" />
                </div>

                {/* Inner Screen */}
                <div className="rounded-[32px] overflow-hidden bg-white text-gray-900 p-4 pt-7 space-y-3.5">
                  
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Delivering to</div>
                      <div className="text-xs font-black text-gray-900 flex items-center gap-1">
                        <span>Asela, Kebele 02</span>
                        <span className="text-[#FF9800]">▼</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center text-[10px] font-bold">
                      ከች
                    </div>
                  </div>

                  {/* Mock Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] text-white space-y-1">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF9800] text-gray-950 font-bold uppercase">
                      New User
                    </span>
                    <div className="text-xs font-extrabold">20% Off Your First Order</div>
                    <div className="text-[10px] text-purple-200">Use code: KECHASELA</div>
                  </div>

                  {/* Mock Category Chips */}
                  <div className="flex gap-1.5 overflow-x-hidden text-[10px] font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-[#6A1B9A] text-white">All</span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">Cafes</span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">Habesha</span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">Bakery</span>
                  </div>

                  {/* Mock Cafe Card 1 */}
                  <div className="p-2.5 rounded-xl border border-gray-100 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-gray-900">Gonde Cafe &amp; Roastery</span>
                      <span className="text-[10px] text-[#FF9800] font-bold">⭐ 4.9</span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Traditional Jebena Bunna • Macchiato
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-700 pt-1 border-t border-gray-50">
                      <span>🚲 15–20 min</span>
                      <span className="text-[#6A1B9A]">35 ETB fee</span>
                    </div>
                  </div>

                  {/* Mock Active Delivery Bar */}
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <span className="animate-spin text-xs">⚙️</span>
                      <span>Courier on bicycle: Dawit B.</span>
                    </div>
                    <span className="font-black text-[#FF9800]">ETA: 8m</span>
                  </div>

                  {/* Mock Navigation Bar */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-around text-[10px] text-gray-400 font-bold">
                    <span className="text-[#6A1B9A]">Home</span>
                    <span>Browse</span>
                    <span>Orders</span>
                    <span>Profile</span>
                  </div>

                </div>

              </div>

              {/* Floating QR Code Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white text-gray-900 shadow-xl border border-gray-100">
                <div className="w-10 h-10 bg-gray-900 rounded-lg p-1 flex items-center justify-center text-white">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-black text-gray-900">Scan to Download</div>
                  <div className="text-[9px] text-gray-500">Direct Android APK</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
