import React from 'react';
import { ShoppingBag, Bike } from 'lucide-react';
import { PageType } from '../../types/navigation';
import { AselaMapSection } from './AselaMapSection';
import { AppDownloadSection } from './AppDownloadSection';
import { CustomerReviewsSection } from './CustomerReviewsSection';

interface HomePageProps {
  navigateTo: (page: PageType) => void;
  onApkDownload: () => void;
  onPlayStoreClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigateTo,
  onApkDownload,
  onPlayStoreClick,
}) => {
  return (
    <section className="animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-kechPurpleDark via-kechPurple to-purple-900 text-white overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-kechOrange/20 border border-kechOrange/40 text-kechOrangeLight text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Fast Delivery in Asela
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Fast, Reliable <br /><span className="text-kechOrange">Everyday Delivery</span>
              </h1>
              <p className="mt-4 text-lg text-purple-100 max-w-xl">
                From your favorite food to urgent packages, KECH DELIVERY connects consumers, merchants, and riders across Asela in real-time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigateTo('consumers')} 
                  className="bg-kechOrange hover:bg-kechOrangeDark text-white px-7 py-3.5 rounded-xl font-bold shadow-lg transition flex items-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" /> Order Anything
                </button>
                <button 
                  onClick={() => navigateTo('riders')} 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded-xl font-bold backdrop-blur-sm transition flex items-center gap-2 cursor-pointer transform active:scale-95"
                >
                  <Bike className="w-5 h-5" /> Join as Rider
                </button>
              </div>
            </div>

            {/* Stylized Smartphone App Mockup (SVG Graphic) */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-gray-900 p-4 rounded-[40px] shadow-2xl border-4 border-gray-700 relative">
                {/* Phone Notch */}
                <div className="w-32 h-5 bg-gray-900 rounded-b-xl mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 z-20"></div>
                
                {/* Screen Content */}
                <div className="bg-white rounded-[32px] overflow-hidden pt-6 pb-4 px-4 text-gray-800">
                  {/* Screen Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-kechPurple text-white rounded-lg font-black text-xs flex items-center justify-center">K</div>
                      <span className="font-bold text-xs text-kechPurple">KECH App</span>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Asela • Live</span>
                  </div>
                  
                  {/* App Feed Card 1 */}
                  <div className="mt-4 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-kechOrange rounded-xl flex items-center justify-center text-white font-bold text-lg">🍔</div>
                      <div>
                        <h5 className="font-bold text-xs text-gray-900">Arsi Café & Restaurant</h5>
                        <p className="text-[10px] text-gray-500">15-25 min • Fast Delivery</p>
                        <span className="text-[10px] text-kechOrange font-bold">★ 4.9 (120+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* App Feed Card 2 */}
                  <div className="mt-3 p-3 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-kechPurple rounded-xl flex items-center justify-center text-white font-bold text-lg">☕</div>
                      <div>
                        <h5 className="font-bold text-xs text-gray-900">Central Pastry & Fresh Juice</h5>
                        <p className="text-[10px] text-gray-500">10-15 min • Local Favorite</p>
                        <span className="text-[10px] text-kechPurple font-bold">★ 4.8 (85+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Tracker Widget */}
                  <div className="mt-4 bg-kechPurple text-white p-3 rounded-2xl">
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span>Active Order #482</span>
                      <span className="text-kechOrangeLight">On the way 🚴</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-kechOrange h-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive City Map Section */}
      <AselaMapSection />

      {/* App Download Section */}
      <AppDownloadSection 
        onApkDownload={onApkDownload} 
        onPlayStoreClick={onPlayStoreClick} 
      />

      {/* Customer Reviews & Testimonials Section */}
      <CustomerReviewsSection />
    </section>
  );
};
