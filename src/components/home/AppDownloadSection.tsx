import React from 'react';
import { Download, Play } from 'lucide-react';

interface AppDownloadSectionProps {
  onApkDownload?: () => void;
  onPlayStoreClick?: () => void;
}

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({
  onApkDownload,
  onPlayStoreClick,
}) => {
  return (
    <div className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-kechPurple to-purple-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="px-3 py-1 bg-kechOrange/20 border border-kechOrange/40 text-kechOrangeLight text-xs font-bold rounded-full uppercase">
                Official Mobile App
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Download the KECH App Today</h2>
              <p className="text-purple-100 mt-2 max-w-xl text-sm sm:text-base">
                Enjoy 3-tap food ordering, live bicycle order tracking, and exclusive daily merchant discounts right from your phone.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                
                {/* Direct APK Download Button */}
                <button 
                  onClick={onApkDownload} 
                  className="bg-kechOrange hover:bg-kechOrangeDark text-white px-6 py-3.5 rounded-xl font-bold shadow-lg transition flex items-center gap-3 cursor-pointer transform active:scale-95"
                >
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase opacity-80 leading-none">Download Directly</div>
                    <div className="text-sm font-extrabold leading-tight">Android .APK File</div>
                  </div>
                </button>

                {/* Google Play Store Badge */}
                <button 
                  onClick={onPlayStoreClick} 
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-xl font-bold shadow-lg transition flex items-center gap-3 border border-gray-700 cursor-pointer transform active:scale-95"
                >
                  <Play className="w-6 h-6 text-green-400 fill-green-400" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase opacity-80 leading-none">Get It On</div>
                    <div className="text-sm font-extrabold leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Metrics / App Badges */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                <span className="text-2xl font-black text-kechOrange">100% Free</span>
                <p className="text-xs text-purple-200 mt-0.5">Lightweight & Fast Installation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                <span className="text-2xl font-black text-kechOrange">Asela City</span>
                <p className="text-xs text-purple-200 mt-0.5">Full Local Neighborhood Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
