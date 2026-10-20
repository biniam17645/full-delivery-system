import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  Bike, 
  ArrowRight, 
  Check, 
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface OnboardingCardsProps {
  onExploreMenu: () => void;
  onBecomePartner: () => void;
  onApplyCourier: () => void;
}

export const OnboardingCards: React.FC<OnboardingCardsProps> = ({
  onExploreMenu,
  onBecomePartner,
  onApplyCourier,
}) => {
  return (
    <section id="partner" className="py-20 bg-gray-50/70 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6A1B9A] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
            <span>Join the Kech Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            One Platform, Built for Everyone in Asela
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Whether you want breakfast delivered, more orders for your cafe, or daily earnings as a courier, Kech connects Asela.
          </p>
        </div>

        {/* 3 Structured Segment Cards (beU / DoorDash Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: FOR CUSTOMERS */}
          <div className="group relative rounded-3xl bg-white border border-gray-200/80 p-8 shadow-xs hover:shadow-xl hover:border-[#6A1B9A]/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6A1B9A] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#6A1B9A] group-hover:text-white transition-all duration-300">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-[#6A1B9A] text-xs font-extrabold uppercase tracking-wider">
                  For Customers
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  Delicious Food Delivered Fast
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Order from Asela's favorite cafes, traditional kitchens, and roasteries. Enjoy hot meals, cold drinks, and Mount Chilalo honey at your door.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Doorstep delivery in 15–25 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Low delivery fee starting from 35 ETB</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Pay via Telebirr, CBE Birr or Cash</span>
                </li>
              </ul>

            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={onExploreMenu}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-bold text-sm shadow-md shadow-purple-950/15 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-[#FF9800] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 2: FOR MERCHANTS & CAFES */}
          <div className="group relative rounded-3xl bg-white border border-gray-200/80 p-8 shadow-xs hover:shadow-xl hover:border-[#FF9800]/50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#FF9800] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF9800] group-hover:text-white transition-all duration-300">
                  <Store className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
                  For Merchants &amp; Cafes
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  Grow Your Cafe Business in Asela
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Expand your customer base beyond your physical tables. Reach hungry students, families, and office workers across all 4 kebeles of Asela.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Zero upfront listing or setup cost</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Free order tablet &amp; kitchen ticket app</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Dedicated bicycle couriers assigned automatically</span>
                </li>
              </ul>

            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={onBecomePartner}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-bold text-sm shadow-md shadow-amber-950/15 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-4 h-4 text-gray-950 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 3: FOR COURIERS & DRIVERS */}
          <div id="courier" className="group relative rounded-3xl bg-white border border-gray-200/80 p-8 shadow-xs hover:shadow-xl hover:border-[#009688]/50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#009688] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#009688] group-hover:text-white transition-all duration-300">
                  <Bike className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-extrabold uppercase tracking-wider">
                  For Couriers / Drivers
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  Ride &amp; Earn with Kech
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Turn your bicycle or motorbike into daily income. Pick up orders from top Asela cafes and deliver across town on your own flexible schedule.
                </p>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Competitive task rates + 100% of tips</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Bicycles welcomed — healthy &amp; green</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#009688]" />
                  <span>Fast daily payouts to Telebirr or CBE Birr</span>
                </li>
              </ul>

            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={onApplyCourier}
                className="w-full py-3.5 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-sm shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Apply as Courier</span>
                <ArrowRight className="w-4 h-4 text-[#FF9800] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
