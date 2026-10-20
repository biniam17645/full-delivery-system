import React from 'react';
import { Bike } from 'lucide-react';

export const AselaMapSection: React.FC = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 bg-kechPurple/10 text-kechPurple rounded-full text-xs font-bold uppercase tracking-wider">
            Live City Map
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Active Coverage in Asela</h2>
          <p className="text-gray-600 text-sm mt-1">
            Real-time bicycle delivery routes connecting shops, cafes, and residents.
          </p>
        </div>

        {/* SVG Animated Asela Map Graphic */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 relative overflow-hidden">
          <div className="w-full h-80 bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Animated Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 400" fill="none">
              <path d="M0 100 H800 M0 200 H800 M0 300 H800" stroke="#FF9800" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M200 0 V400 M400 0 V400 M600 0 V400" stroke="#6A1B9A" strokeWidth="1" strokeDasharray="4 4" />
              {/* Delivery Route Lines */}
              <path d="M150 250 Q 300 120 450 220 T 700 150" stroke="#FF9800" strokeWidth="4" fill="none" />
              <path d="M220 100 Q 400 300 620 280" stroke="#009688" strokeWidth="3" strokeDasharray="6 6" fill="none" />
            </svg>

            {/* Landmark Pins in Asela */}
            <div className="absolute top-16 left-1/4 flex flex-col items-center">
              <div className="w-4 h-4 bg-kechOrange rounded-full map-ping"></div>
              <span className="text-[10px] font-bold text-white bg-kechOrange/90 px-2 py-0.5 rounded mt-1 shadow">
                Arsi University Zone
              </span>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-5 h-5 bg-kechPurple rounded-full map-ping border-2 border-white"></div>
              <span className="text-[11px] font-bold text-white bg-kechPurple px-2.5 py-1 rounded-md mt-1 shadow-lg">
                Asela City Center Hub
              </span>
            </div>

            <div className="absolute bottom-16 right-1/4 flex flex-col items-center">
              <div className="w-4 h-4 bg-kechTeal rounded-full map-ping"></div>
              <span className="text-[10px] font-bold text-white bg-kechTeal px-2 py-0.5 rounded mt-1 shadow">
                Residential Zone
              </span>
            </div>

            {/* Animated Moving Bike Icon on Map Route */}
            <div className="absolute top-1/3 left-1/3 animate-bounce">
              <div className="bg-white p-2 rounded-full shadow-lg border-2 border-kechOrange flex items-center justify-center">
                <Bike className="w-5 h-5 text-kechPurple" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-between items-center text-xs text-gray-500 px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-kechPurple rounded-full inline-block"></span> Active Hubs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-kechOrange rounded-full inline-block"></span> Active Bicycle Fleet
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-kechTeal rounded-full inline-block"></span> Partner Cafes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
