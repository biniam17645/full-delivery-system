import React from 'react';
import { Zap, Leaf, Store } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <section className="animate-in fade-in duration-300">
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1.5 bg-kechPurple/10 text-kechPurple rounded-full text-xs font-bold uppercase tracking-wider">
              About KECH Delivery
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
              Empowering Local Mobility & Logistics in <span className="text-kechOrange">Asela</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
              KECH DELIVERY is an eco-friendly express delivery network connecting residents, local cafes, and eco-conscious bicycle riders in Asela. We bridge the gap between merchants and consumers with speed, sustainability, and reliability.
            </p>
          </div>

          {/* Core Values & Mission Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-kechPurple/10 text-kechPurple rounded-2xl flex items-center justify-center mb-5">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Express</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Optimized eco-bike routes mean your meals, drinks, and urgent parcels arrive piping hot and fresh in minutes.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-kechOrange/10 text-kechOrange rounded-2xl flex items-center justify-center mb-5">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Green & Sustainable</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our bicycle-first fleet keeps Asela clean, zero-emission, and noise-free while providing healthy work opportunities for young riders.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-kechTeal/10 text-kechTeal rounded-2xl flex items-center justify-center mb-5">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Empowering Local Commerce</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We boost local restaurants, coffee shops, and retail stores by giving them direct access to digital customer orders without overhead cost.
              </p>
            </div>
          </div>

          {/* Key Statistics Banner */}
          <div className="bg-gradient-to-r from-kechPurpleDark via-kechPurple to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-kechOrange">15+ Min</div>
                <div className="text-xs text-purple-200 mt-1 uppercase font-semibold">Average Delivery Time</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-kechOrange">50+</div>
                <div className="text-xs text-purple-200 mt-1 uppercase font-semibold">Local Partner Merchants</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-kechOrange">100%</div>
                <div className="text-xs text-purple-200 mt-1 uppercase font-semibold">Asela Neighborhood Coverage</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-kechOrange">5,000+</div>
                <div className="text-xs text-purple-200 mt-1 uppercase font-semibold">Deliveries Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
