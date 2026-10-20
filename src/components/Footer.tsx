import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Heart,
  Bike,
  Store,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenMerchantModal: (mode: 'signin' | 'register') => void;
  onOpenCourierModal: (mode: 'signin' | 'apply') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMerchantModal,
  onOpenCourierModal,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" variant="horizontal" />
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Kech (ከች) is Asela's premier on-demand delivery platform. Delivering hot meals, claypot Jebena coffee, fresh pastries, and Mount Chilalo honey right to your doorstep.
            </p>

            <div className="pt-2 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF9800] shrink-0" />
                <span>Asela, Oromia Region, Ethiopia (Kebele 01–04)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF9800] shrink-0" />
                <span>+251 911 445 566 / +251 922 889 900</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#FF9800] shrink-0" />
                <span>Telegram Bot: @KechDeliveryBot</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li>
                <button 
                  onClick={() => onScrollToSection('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('cafes')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Featured Cafes &amp; Restaurants
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('how')}
                  className="hover:text-white transition cursor-pointer"
                >
                  How Kech Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('download')}
                  className="hover:text-white transition cursor-pointer text-[#FF9800] font-bold"
                >
                  Download Kech Android APK
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Partners & Couriers */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Partnerships
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li>
                <button
                  onClick={() => onOpenMerchantModal('register')}
                  className="hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-[#FF9800]" />
                  <span>Register Cafe / Restaurant</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenMerchantModal('signin')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Merchant Portal Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCourierModal('apply')}
                  className="hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Bike className="w-3.5 h-3.5 text-[#009688]" />
                  <span>Apply as Bicycle Courier</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCourierModal('signin')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Courier App Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Coverage & Payments */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Asela Coverage
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>• Kebele 01 (Post Office &amp; Stadium)</li>
              <li>• Kebele 02 (Downtown &amp; Central Market)</li>
              <li>• Kebele 03 (Arsi University Campus)</li>
              <li>• Kebele 04 &amp; Gonde</li>
            </ul>

            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase text-gray-400 mb-1.5">
                Supported Payments
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-gray-300">
                <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">Telebirr</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">CBE Birr</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Kech Delivery. All rights reserved. • Built for Asela, Ethiopia.
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition cursor-pointer">Safety &amp; Courier Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
