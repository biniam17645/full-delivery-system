import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Bike, 
  MapPin, 
  Phone, 
  Download, 
  Check, 
  ArrowRight,
  Coffee
} from 'lucide-react';
import { Merchant } from '../types';

interface CafeDetailModalProps {
  cafe: Merchant | null;
  isOpen: boolean;
  onClose: () => void;
  onGetAppClick: () => void;
}

export const CafeDetailModal: React.FC<CafeDetailModalProps> = ({
  cafe,
  isOpen,
  onClose,
  onGetAppClick
}) => {
  if (!isOpen || !cafe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-gray-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Cover Photo */}
        <div className="relative h-48 w-full bg-gray-100 shrink-0">
          <img
            src={cafe.coverImage}
            alt={cafe.name.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center transition shadow-xs cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-0.5 rounded-md bg-[#6A1B9A] text-[10px] font-extrabold uppercase">
              {cafe.category}
            </span>
            <h3 className="text-2xl font-black text-white mt-1 leading-tight">
              {cafe.name.en}
            </h3>
            <div className="flex items-center gap-2 text-xs text-purple-100 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF9800]" />
              <span>{cafe.location.addressText}</span>
            </div>
          </div>
        </div>

        {/* Cafe Body Info */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center text-xs">
            <div>
              <div className="font-extrabold text-[#6A1B9A] text-sm flex items-center justify-center gap-1">
                <Bike className="w-4 h-4" />
                <span>15–25 min</span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium">Delivery Time</div>
            </div>

            <div>
              <div className="font-extrabold text-[#009688] text-sm">
                35 ETB
              </div>
              <div className="text-[10px] text-gray-500 font-medium">Asela Flat Fee</div>
            </div>

            <div>
              <div className="font-extrabold text-amber-900 text-sm flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FF9800] text-[#FF9800]" />
                <span>{cafe.rating}</span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium">{cafe.reviewCount} reviews</div>
            </div>
          </div>

          {/* Featured Dishes List */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#FF9800]" />
              <span>Popular Dishes &amp; Specialties</span>
            </h4>

            <div className="space-y-2">
              {(cafe.featuredDishes || []).map((dish, i) => (
                <div
                  key={dish}
                  className="p-3 rounded-xl border border-gray-100 hover:border-purple-200 transition flex items-center justify-between bg-white text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-50 text-[#6A1B9A] font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-bold text-gray-900">{dish}</div>
                      <div className="text-[10px] text-gray-500">Fresh daily in Asela</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#6A1B9A]">Available on App</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notice to download mobile app to place live order */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 border border-purple-100 space-y-2">
            <div className="text-xs font-black text-gray-900">
              📲 Ready to order from {cafe.name.en}?
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Download the Kech Mobile App (or get the APK directly) to enjoy 3-tap checkout, Telebirr payments, and live courier tracking to your location.
            </p>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onGetAppClick();
            }}
            className="flex-2 py-3 rounded-xl bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-black text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Order on Kech App</span>
          </button>
        </div>

      </div>
    </div>
  );
};
