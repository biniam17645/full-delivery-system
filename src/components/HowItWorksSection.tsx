import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  Bike, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface HowItWorksSectionProps {
  onExploreClick: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onExploreClick
}) => {
  const steps = [
    {
      step: '01',
      title: 'Browse',
      subtitle: 'Choose your favorite local cafe or store in Asela.',
      desc: 'Explore authentic menus from top Asela spots like Gonde Cafe, Ras Hotel, Arsi Highland Roastery, and local bakeries.',
      icon: Search,
      color: 'bg-purple-50 text-[#6A1B9A] border-[#6A1B9A]',
      accent: '#6A1B9A'
    },
    {
      step: '02',
      title: 'Order',
      subtitle: 'Select your items and confirm your delivery details.',
      desc: 'Customize options, add special instructions, and confirm your Asela kebele address. Pay effortlessly via Telebirr, CBE Birr, or Cash on Delivery.',
      icon: ShoppingBag,
      color: 'bg-amber-50 text-[#FF9800] border-[#FF9800]',
      accent: '#FF9800'
    },
    {
      step: '03',
      title: 'Receive',
      subtitle: 'Enjoy fast delivery via our local bicycle courier fleet.',
      desc: 'Your friendly Asela bicycle or motorbike courier picks up freshly prepared orders and delivers directly to your doorstep in 15–25 minutes.',
      icon: Bike,
      color: 'bg-teal-50 text-[#009688] border-[#009688]',
      accent: '#009688'
    }
  ];

  return (
    <section id="how" className="py-20 bg-gray-50/80 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6A1B9A] text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-[#FF9800]" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How Kech Works in Asela
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Getting fresh coffee, hot meals, or local goods has never been easier.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="group relative rounded-3xl bg-white border border-gray-200/80 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center md:text-left"
              >
                {/* Step Number & Icon Header */}
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    {/* Big Step Number */}
                    <span className="text-3xl font-black text-gray-300 group-hover:text-[#6A1B9A] transition font-mono">
                      {item.step}
                    </span>

                    {/* Circle Icon Badge */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color} shadow-xs group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-800 leading-snug">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal pt-1">
                      {item.desc}
                    </p>
                  </div>

                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400">
                  <span>Step {idx + 1} of 3</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Fast
                  </span>
                </div>

              </div>
            );
          })}

        </div>

        {/* Interactive CTA Banner */}
        <div className="text-center pt-4">
          <button
            onClick={onExploreClick}
            className="sheen inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-950/20 active:scale-95 transition cursor-pointer"
          >
            <span>Start Exploring Asela Cafes</span>
            <ArrowRight className="w-4 h-4 text-[#FF9800]" />
          </button>
        </div>

      </div>
    </section>
  );
};
