import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Smartphone, 
  Store, 
  Bike, 
  User, 
  LogIn, 
  UserPlus, 
  Star,
  ChevronRight,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentUser: {
    fullName: string;
    email: string;
    avatarUrl: string;
    authProvider: 'google' | 'email';
  } | null;
  onOpenUserAuth: (mode: 'signin' | 'signup') => void;
  onLogout: () => void;
  onOpenMerchantModal: (mode: 'signin' | 'register') => void;
  onOpenCourierModal: (mode: 'signin' | 'apply') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenUserAuth,
  onLogout,
  onOpenMerchantModal,
  onOpenCourierModal,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'cafes', label: 'Featured Cafes' },
    { id: 'reviews', label: 'Customer Reviews' },
    { id: 'how', label: 'How It Works' },
    { id: 'partner', label: 'Partner with Us' },
  ];

  const handleLinkClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo (KECH DELIVERIES - No Amharic text) */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="cursor-pointer shrink-0"
          >
            <BrandLogo size="md" variant="horizontal" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-[#6A1B9A] transition cursor-pointer font-medium text-gray-700 hover:font-bold"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Web Sign In/Up + Merchant/Driver links + "Get the App" */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Web User Authentication */}
            {currentUser ? (
              <div className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-purple-50 border border-purple-200">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-7 h-7 rounded-full object-cover border border-[#6A1B9A]"
                />
                <span className="text-xs font-black text-gray-900 max-w-[110px] truncate">
                  {currentUser.fullName}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-full hover:bg-purple-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 border-r border-gray-200 pr-2.5 mr-1">
                <button
                  onClick={() => onOpenUserAuth('signin')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:text-[#6A1B9A] hover:bg-purple-50 transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenUserAuth('signup')}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6A1B9A] font-bold text-xs border border-purple-200/70 transition cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Merchant / Courier Links Dropdown / Buttons */}
            <button
              onClick={() => onOpenMerchantModal('signin')}
              className="text-xs font-bold text-gray-600 hover:text-[#6A1B9A] px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-[#6A1B9A]" />
              <span className="hidden xl:inline">Merchants</span>
            </button>

            <button
              onClick={() => onOpenCourierModal('signin')}
              className="text-xs font-bold text-gray-600 hover:text-[#6A1B9A] px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer flex items-center gap-1"
            >
              <Bike className="w-3.5 h-3.5 text-[#FF9800]" />
              <span className="hidden xl:inline">Couriers</span>
            </button>

            {/* Primary CTA: "Get the App" */}
            <button
              onClick={() => handleLinkClick('download')}
              className="sheen ml-1 px-5 py-2.5 rounded-full bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4 text-gray-950" />
              <span>Get the App</span>
            </button>

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {!currentUser ? (
              <button
                onClick={() => onOpenUserAuth('signin')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#6A1B9A] bg-purple-50 border border-purple-200"
              >
                Sign In
              </button>
            ) : (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-7 h-7 rounded-full object-cover border border-[#6A1B9A]"
              />
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:text-[#6A1B9A] transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* FULL-SCREEN OVERLAY MOBILE NAVIGATION (Directly incorporating user template with our touches) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-7 bg-white/98 backdrop-blur-xl md:hidden p-6 animate-fade-in">
          
          {/* Close Button Top Right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Logo */}
          <div className="mb-2">
            <BrandLogo size="md" variant="vertical" showSubtitle={false} />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-5 text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-xl font-bold text-gray-800 hover:text-[#6A1B9A] transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="flex items-center gap-6 pt-2 text-sm font-semibold text-gray-500">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMerchantModal('signin');
                }}
                className="hover:text-[#6A1B9A] transition flex items-center gap-1"
              >
                <Store className="w-4 h-4 text-[#6A1B9A]" />
                <span>Merchants</span>
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCourierModal('signin');
                }}
                className="hover:text-[#6A1B9A] transition flex items-center gap-1"
              >
                <Bike className="w-4 h-4 text-[#FF9800]" />
                <span>Couriers</span>
              </button>
            </div>
          </nav>

          {/* Mobile Web Sign In / Sign Up CTAs */}
          <div className="w-full max-w-xs space-y-2.5 pt-3">
            {currentUser ? (
              <div className="p-3 rounded-2xl bg-purple-50 text-center space-y-2">
                <div className="text-xs font-bold text-gray-900">Signed in as {currentUser.fullName}</div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenUserAuth('signin');
                  }}
                  className="py-2.5 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-800 text-center"
                >
                  Sign In (Web)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenUserAuth('signup');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-purple-100 text-[#6A1B9A] font-bold text-xs text-center"
                >
                  Sign Up (Web)
                </button>
              </div>
            )}

            <button
              onClick={() => handleLinkClick('download')}
              className="sheen w-full py-3.5 rounded-full bg-[#FF9800] text-gray-950 font-black text-sm shadow-lg text-center flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Get the Kech App (APK)</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
