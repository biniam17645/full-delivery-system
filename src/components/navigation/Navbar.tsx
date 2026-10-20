import React, { useState } from 'react';
import { 
  Info, 
  Layers, 
  ChevronDown, 
  PhoneCall, 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Bike, 
  Store,
  ChefHat,
  Navigation,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { PageType, ActiveOrder } from '../../types/navigation';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  cartCount: number;
  onOpenCart?: () => void;
  activeOrder?: ActiveOrder | null;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  navigateTo, 
  cartCount,
  onOpenCart,
  activeOrder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const handleNav = (page: PageType) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setPortalDropdownOpen(false);
  };

  const isPostLoginView = ['customer-dashboard', 'live-tracking', 'merchant-kds', 'rider-duty'].includes(currentPage);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo (Emblem + "KECH DELIVERY") */}
          <div className="flex items-center gap-4">
            <BrandLogo onClick={() => handleNav(isPostLoginView ? 'customer-dashboard' : 'home')} />
            
            {/* Quick Portal Badges on Desktop */}
            <div className="hidden xl:flex items-center gap-1.5 ml-2 pl-4 border-l border-gray-200 text-xs">
              <button
                onClick={() => handleNav('customer-dashboard')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                  currentPage === 'customer-dashboard'
                    ? 'bg-kechPurple text-white shadow-xs'
                    : 'text-gray-600 hover:text-kechPurple hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop</span>
              </button>

              <button
                onClick={() => handleNav('merchant-kds')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                  currentPage === 'merchant-kds'
                    ? 'bg-kechOrange text-white shadow-xs'
                    : 'text-gray-600 hover:text-kechOrange hover:bg-gray-50'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Kitchen KDS</span>
              </button>

              <button
                onClick={() => handleNav('rider-duty')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 ${
                  currentPage === 'rider-duty'
                    ? 'bg-kechTeal text-white shadow-xs'
                    : 'text-gray-600 hover:text-kechTeal hover:bg-gray-50'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Rider Duty</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6 font-medium text-gray-700 text-sm">
            
            {/* Landing Pages Navigation */}
            <button 
              onClick={() => handleNav('home')} 
              className={`transition py-2 cursor-pointer font-bold ${
                currentPage === 'home' ? 'text-kechPurple' : 'hover:text-kechPurple'
              }`}
            >
              Home
            </button>

            <button 
              onClick={() => handleNav('about')} 
              className={`transition flex items-center gap-1.5 py-2 cursor-pointer ${
                currentPage === 'about' ? 'text-kechPurple font-bold' : 'hover:text-kechPurple'
              }`}
            >
              <Info className="w-4 h-4 text-kechPurple" />
              <span>About Us</span>
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`transition flex items-center gap-1.5 py-2 focus:outline-none cursor-pointer ${
                  ['consumers', 'riders', 'merchants'].includes(currentPage)
                    ? 'text-kechPurple font-bold'
                    : 'hover:text-kechPurple'
                }`}
              >
                <Layers className="w-4 h-4 text-kechPurple" />
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-kechPurple transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 top-full w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 transition-all duration-200 z-50 ${
                  servicesDropdownOpen ? 'block' : 'hidden md:group-hover:block'
                }`}
              >
                <button 
                  onClick={() => handleNav('consumers')} 
                  className={`w-full text-left px-4 py-3 hover:bg-purple-50 hover:text-kechPurple font-medium flex items-center gap-3 transition cursor-pointer ${
                    currentPage === 'consumers' ? 'bg-purple-50 text-kechPurple' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-kechPurple/10 flex items-center justify-center text-kechPurple">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Consumers</div>
                    <div className="text-xs text-gray-400">Order food, drinks & goods</div>
                  </div>
                </button>
                <button 
                  onClick={() => handleNav('riders')} 
                  className={`w-full text-left px-4 py-3 hover:bg-purple-50 hover:text-kechPurple font-medium flex items-center gap-3 transition cursor-pointer ${
                    currentPage === 'riders' ? 'bg-purple-50 text-kechPurple' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-kechOrange/10 flex items-center justify-center text-kechOrange">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">KECH Drivers</div>
                    <div className="text-xs text-gray-400">Ride & earn with us</div>
                  </div>
                </button>
                <button 
                  onClick={() => handleNav('merchants')} 
                  className={`w-full text-left px-4 py-3 hover:bg-purple-50 hover:text-kechPurple font-medium flex items-center gap-3 transition cursor-pointer ${
                    currentPage === 'merchants' ? 'bg-purple-50 text-kechPurple' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-kechTeal/10 flex items-center justify-center text-kechTeal">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Businesses / Merchants</div>
                    <div className="text-xs text-gray-400">Grow cafe & retail sales</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Us */}
            <button 
              onClick={() => handleNav('contact')} 
              className={`transition flex items-center gap-1.5 py-2 cursor-pointer ${
                currentPage === 'contact' ? 'text-kechPurple font-bold' : 'hover:text-kechPurple'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-kechPurple" />
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-3">
            {/* Live Order Indicator button */}
            {activeOrder && (
              <button
                onClick={() => handleNav('live-tracking')}
                className="hidden sm:flex items-center gap-1.5 bg-kechPurple/10 hover:bg-kechPurple/20 text-kechPurple px-3 py-1.5 rounded-xl text-xs font-bold transition border border-kechPurple/30 cursor-pointer animate-pulse"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Track #{activeOrder.orderNumber}</span>
              </button>
            )}

            {/* Cart Button (if items in cart) */}
            {onOpenCart && cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 text-kechOrange" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-kechOrange text-white font-black rounded-full flex items-center justify-center text-[10px] shadow">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Main Primary CTA: Customer Dashboard / Order Now */}
            <button 
              onClick={() => handleNav('customer-dashboard')} 
              className="bg-kechOrange hover:bg-kechOrangeDark text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 transform active:scale-95 cursor-pointer text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Portal</span>
            </button>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-kechPurple focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-kechPurple">
              ⚡ Launch Service Portals
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <button
                onClick={() => handleNav('customer-dashboard')}
                className="p-2 bg-white rounded-xl shadow-xs text-gray-800 hover:text-kechPurple"
              >
                🛍️ Shop
              </button>
              <button
                onClick={() => handleNav('merchant-kds')}
                className="p-2 bg-white rounded-xl shadow-xs text-gray-800 hover:text-kechOrange"
              >
                🍳 Kitchen KDS
              </button>
              <button
                onClick={() => handleNav('rider-duty')}
                className="p-2 bg-white rounded-xl shadow-xs text-gray-800 hover:text-kechTeal"
              >
                🚴 Rider Duty
              </button>
            </div>
          </div>

          <button 
            onClick={() => handleNav('home')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            <Info className="w-4 h-4 text-kechPurple" /> About Us
          </button>
          <button 
            onClick={() => handleNav('consumers')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            <User className="w-4 h-4 text-kechPurple" /> Consumers (Order Food & Goods)
          </button>
          <button 
            onClick={() => handleNav('riders')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            <Bike className="w-4 h-4 text-kechOrange" /> KECH Drivers & Riders
          </button>
          <button 
            onClick={() => handleNav('merchants')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            <Store className="w-4 h-4 text-kechTeal" /> Businesses & Merchants
          </button>
          <button 
            onClick={() => handleNav('contact')} 
            className="w-full text-left px-3 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2.5 hover:bg-purple-50"
          >
            <PhoneCall className="w-4 h-4 text-kechPurple" /> Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
