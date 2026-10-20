import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  ChevronRight, 
  ChevronDown,
  Star, 
  Heart,
  ShoppingBag,
  Bike,
  Search,
  ArrowRight,
  Filter,
  Layers,
  Utensils,
  Store,
  Briefcase,
  User,
  ShoppingBasket
} from 'lucide-react';
import { 
  Merchant, 
  Product, 
  Category, 
  LanguageCode, 
  ProductOptionChoice, 
  ProductVariant 
} from '../types';
import { getTranslation } from '../i18n';

interface CustomerViewProps {
  language: LanguageCode;
  merchants: Merchant[];
  products: Product[];
  categories: Category[];
  isDarkMode: boolean;
  onAddToCart: (product: Product, selectedVariant?: ProductVariant, selectedOptions?: { groupId: string; choiceId: string; choiceName: string; extraPrice: number }[]) => void;
  onOpenCart: () => void;
  activeOrderCount: number;
  onViewLiveOrder: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenUserSidebar: () => void;
  currentCategory: 'restaurants' | 'groceries' | 'retail' | 'services';
  onSelectCategory: (cat: 'restaurants' | 'groceries' | 'retail' | 'services') => void;
  currentUser: any;
}

export const CustomerView: React.FC<CustomerViewProps> = ({
  language,
  merchants,
  products,
  categories,
  isDarkMode,
  onAddToCart,
  onOpenCart,
  activeOrderCount,
  onViewLiveOrder,
  onOpenAuth,
  onOpenUserSidebar,
  currentCategory,
  onSelectCategory,
  currentUser
}) => {
  const t = getTranslation(language);

  // Filters State matching image_1.png wireframe
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string[]>([]);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [selectedShopTypes, setSelectedShopTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Customization Modal State
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductOptionChoice>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const toggleFavorite = (merchantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [merchantId]: !prev[merchantId] }));
  };

  const cuisineOptions = [
    { id: 'habesha', label: 'Ethiopian Habesha' },
    { id: 'coffee', label: 'Bunna & Roastery' },
    { id: 'pastry', label: 'Bakery & Sweets' },
    { id: 'burger', label: 'Burgers & Grills' },
    { id: 'fasting', label: 'Vegetarian / Fasting' },
  ];

  const shopTypeOptions = [
    { id: 'cafe', label: 'Cafes & Bunna' },
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'hotel', label: 'Hotels & Dining' },
    { id: 'supermarket', label: 'Supermarkets' },
  ];

  // Filtering Logic
  const filteredMerchants = useMemo(() => {
    return merchants.filter((m) => {
      // Category tab
      if (currentCategory === 'restaurants' && m.category !== 'restaurant' && m.category !== 'cafe' && m.category !== 'hotel') {
        return false;
      }
      if (currentCategory === 'groceries' && m.category !== 'supermarket') {
        return false;
      }
      if (currentCategory === 'retail' && m.category !== 'supermarket' && m.category !== 'retail') {
        return false;
      }

      // Shop multi-select
      if (selectedShops.length > 0 && !selectedShops.includes(m.id)) {
        return false;
      }

      // Shop type
      if (selectedShopTypes.length > 0 && !selectedShopTypes.includes(m.category)) {
        return false;
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (m.name[language] || m.name.en).toLowerCase().includes(q);
        const addressMatch = m.location.addressText.toLowerCase().includes(q);
        if (!nameMatch && !addressMatch) return false;
      }

      return true;
    });
  }, [merchants, currentCategory, selectedShops, selectedShopTypes, searchQuery, language]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (currentCategory === 'groceries' && p.productType !== 'retail') {
        return false;
      }
      if (currentCategory === 'restaurants' && p.productType !== 'food') {
        return false;
      }
      if (selectedShops.length > 0 && !selectedShops.includes(p.merchantId)) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (p.name[language] || p.name.en).toLowerCase().includes(q);
        const descMatch = (p.description[language] || p.description.en).toLowerCase().includes(q);
        if (!nameMatch && !descMatch) return false;
      }
      return true;
    });
  }, [products, currentCategory, selectedShops, searchQuery, language]);

  const openCustomization = (product: Product) => {
    setActiveModalProduct(product);
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }

    const initialChoices: Record<string, ProductOptionChoice> = {};
    if (product.optionGroups) {
      product.optionGroups.forEach(group => {
        if (group.minSelections > 0 && group.choices.length > 0) {
          initialChoices[group.id] = group.choices[0];
        }
      });
    }
    setSelectedOptions(initialChoices);
  };

  const handleConfirmAdd = () => {
    if (!activeModalProduct) return;

    const formattedOptions = Object.entries(selectedOptions).map(([groupId, choice]) => ({
      groupId,
      choiceId: choice.id,
      choiceName: choice.name[language] || choice.name.en,
      extraPrice: choice.priceAdjustmentBirr
    }));

    onAddToCart(activeModalProduct, selectedVariant, formattedOptions);
    setJustAddedId(activeModalProduct.id);
    setTimeout(() => setJustAddedId(null), 1800);
    setActiveModalProduct(null);
  };

  const calculateModalTotal = () => {
    if (!activeModalProduct) return 0;
    let total = selectedVariant?.priceBirr ?? activeModalProduct.basePriceBirr;
    Object.values(selectedOptions).forEach(choice => {
      total += choice.priceAdjustmentBirr;
    });
    return total;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* 2-COLUMN MAIN PAGE LAYOUT MATCHING WIREFRAME (image_1.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR (Col-Span 3) matching wireframe */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 bg-white dark:bg-[#150F22] p-5 rounded-3xl border border-zinc-200/80 dark:border-purple-950/40 shadow-xs">
          
          {/* Main Category List */}
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory('restaurants')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                currentCategory === 'restaurants'
                  ? 'bg-purple-100 dark:bg-purple-950/70 text-[#6A1B9A] dark:text-[#BA68C8] font-black'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#6A1B9A]" />
              <span>Restaurants</span>
            </button>

            <button
              onClick={() => onSelectCategory('groceries')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                currentCategory === 'groceries'
                  ? 'bg-purple-100 dark:bg-purple-950/70 text-[#6A1B9A] dark:text-[#BA68C8] font-black'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <ShoppingBasket className="w-4 h-4 text-[#FF9800]" />
              <span>Groceries</span>
            </button>

            <button
              onClick={() => onSelectCategory('retail')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                currentCategory === 'retail'
                  ? 'bg-purple-100 dark:bg-purple-950/70 text-[#6A1B9A] dark:text-[#BA68C8] font-black'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#009688]" />
              <span>Retail</span>
            </button>

            <button
              onClick={() => onSelectCategory('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                currentCategory === 'services'
                  ? 'bg-purple-100 dark:bg-purple-950/70 text-[#6A1B9A] dark:text-[#BA68C8] font-black'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Services</span>
            </button>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* Sub Menus section matching mockup */}
          <div className="space-y-1">
            <div className="text-[11px] font-black uppercase tracking-wider text-zinc-400 px-3">
              Side Bars
            </div>
            <button className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition text-left">
              <span>Sub menus</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* Filters Section matching image_1.png */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-zinc-400 px-3">
              <span>Filters</span>
              <Filter className="w-3.5 h-3.5" />
            </div>

            {/* Checkbox Group: Cuisine Type */}
            <div className="space-y-2 px-1">
              <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">Cuisine type</span>
              <div className="space-y-1.5">
                {cuisineOptions.map((c) => {
                  const checked = selectedCuisineTypes.includes(c.id);
                  return (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setSelectedCuisineTypes(prev => checked ? prev.filter(x => x !== c.id) : [...prev, c.id]);
                        }}
                        className="rounded border-zinc-300 text-[#6A1B9A] focus:ring-[#6A1B9A] cursor-pointer"
                      />
                      <span>{c.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Checkbox Group: Specific Merchant / Shop */}
            <div className="space-y-2 px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">Shop / Restaurant</span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {merchants.map((m) => {
                  const checked = selectedShops.includes(m.id);
                  return (
                    <label key={m.id} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-white truncate">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setSelectedShops(prev => checked ? prev.filter(x => x !== m.id) : [...prev, m.id]);
                        }}
                        className="rounded border-zinc-300 text-[#6A1B9A] focus:ring-[#6A1B9A] cursor-pointer shrink-0"
                      />
                      <span className="truncate">{m.name[language] || m.name.en}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Checkbox Group: Shop Type */}
            <div className="space-y-2 px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">Shop type</span>
              <div className="space-y-1.5">
                {shopTypeOptions.map((st) => {
                  const checked = selectedShopTypes.includes(st.id);
                  return (
                    <label key={st.id} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setSelectedShopTypes(prev => checked ? prev.filter(x => x !== st.id) : [...prev, st.id]);
                        }}
                        className="rounded border-zinc-300 text-[#6A1B9A] focus:ring-[#6A1B9A] cursor-pointer"
                      />
                      <span>{st.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* User Profile Card matching bottom of left sidebar in image_1.png */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate">
                  {currentUser ? currentUser.fullName : 'User Ramtura'}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">
                  {currentUser ? currentUser.email : '@faan_annt'}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs font-bold text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
              <button 
                onClick={onOpenUserSidebar}
                className="w-full flex items-center gap-2 py-1 px-1.5 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] text-left cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>User profile</span>
              </button>
              <button 
                onClick={onViewLiveOrder}
                className="w-full flex items-center gap-2 py-1 px-1.5 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] text-left cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Order ({activeOrderCount} live)</span>
              </button>
              <button 
                onClick={onOpenUserSidebar}
                className="w-full flex items-center gap-2 py-1 px-1.5 hover:text-[#6A1B9A] dark:hover:text-[#BA68C8] text-left cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Account</span>
              </button>
            </div>
          </div>

        </aside>

        {/* RIGHT MAIN BODY CONTENT (Col-Span 9) matching wireframe */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* PURPLE HERO BANNER (Directly matching wireframe in image_1.png) */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#6A1B9A] via-[#5A1482] to-[#4A148C] text-white p-6 sm:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left text */}
            <div className="space-y-4 max-w-md z-10 text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Fast & Reliable <br />
                Delivery in Asela
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Ethiopian food and retail delivery in Asela. Guaranteed fast doorstep service.
              </p>
              <div>
                <button
                  onClick={() => {
                    const el = document.getElementById('highlights-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#FF9800] hover:bg-[#F57C00] text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-950/20 active:scale-95 transition cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Illustration: Bicycle Messenger in Orange with Backpack (matching image_1.png) */}
            <div className="relative z-10 shrink-0 w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
              <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto drop-shadow-2xl">
                {/* Speed Lines */}
                <line x1="20" y1="90" x2="60" y2="90" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                <line x1="10" y1="110" x2="50" y2="110" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                <line x1="25" y1="130" x2="70" y2="130" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
                <line x1="210" y1="90" x2="260" y2="90" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
                <line x1="220" y1="110" x2="270" y2="110" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

                {/* Ground Line */}
                <line x1="30" y1="175" x2="250" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />

                {/* Bicycle Rear Wheel */}
                <circle cx="85" cy="145" r="28" stroke="#FFFFFF" strokeWidth="5" fill="none" />
                <circle cx="85" cy="145" r="5" fill="#FF9800" />

                {/* Bicycle Front Wheel */}
                <circle cx="195" cy="145" r="28" stroke="#FFFFFF" strokeWidth="5" fill="none" />
                <circle cx="195" cy="145" r="5" fill="#FF9800" />

                {/* Bike Frame */}
                <path d="M 85 145 L 125 145 L 175 115 L 125 115 Z" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 125 145 L 120 100" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 195 145 L 170 95 L 155 98" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                {/* Saddle */}
                <path d="M 108 100 L 132 100" stroke="#FF9800" strokeWidth="6" strokeLinecap="round" />

                {/* Cyclist Legs */}
                <path d="M 120 100 L 105 125 L 120 145" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                {/* Cyclist Torso in Orange T-shirt */}
                <path d="M 120 95 L 155 85" stroke="#FF9800" strokeWidth="12" strokeLinecap="round" />

                {/* Cyclist Arms to Handlebar */}
                <path d="M 152 82 L 168 96" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

                {/* Large Orange Delivery Backpack on Back */}
                <rect x="98" y="60" width="28" height="34" rx="6" fill="#FF9800" stroke="#FFFFFF" strokeWidth="2.5" transform="rotate(-15 105 75)" />
                <text x="100" y="80" fill="#FFFFFF" fontSize="9" fontWeight="bold" transform="rotate(-15 105 75)">ከች</text>

                {/* Cyclist Head with Yellow/Orange Helmet */}
                <circle cx="160" cy="62" r="12" fill="#FF9800" />
                <path d="M 150 56 Q 166 52 174 62" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            {/* Background subtle watermark */}
            <div className="absolute right-0 bottom-0 translate-y-8 translate-x-8 text-[120px] font-black text-white/5 select-none pointer-events-none">
              ከች
            </div>
          </div>

          {/* LOCAL MERCHANT HIGHLIGHTS (Directly matching wireframe in image_1.png) */}
          <div id="highlights-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                Local merchant highlights
              </h2>
              <span className="text-xs text-zinc-400 font-bold hidden sm:inline">
                Top rated partners in Asela
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {merchants.map((merchant) => {
                const isFav = !!favorites[merchant.id];
                return (
                  <div
                    key={merchant.id}
                    onClick={() => {
                      setSelectedShops([merchant.id]);
                    }}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-[#150F22] border border-zinc-200/80 dark:border-purple-950/40 p-2.5 shadow-xs hover:shadow-md hover:border-[#6A1B9A] transition cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      {/* Image container */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <img
                          src={merchant.coverImage}
                          alt={merchant.name[language] || merchant.name.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          loading="lazy"
                        />
                        {/* Heart wishlist button */}
                        <button
                          onClick={(e) => toggleFavorite(merchant.id, e)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-400 hover:text-rose-500 flex items-center justify-center transition shadow-xs"
                          aria-label="Save merchant"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Merchant name & rating */}
                      <div>
                        <h3 className="font-extrabold text-xs text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#6A1B9A] transition">
                          {merchant.name[language] || merchant.name.en}
                        </h3>
                        <div className="text-[10px] text-zinc-400 truncate">
                          Ethiopian
                        </div>
                        <div className="flex items-center gap-0.5 text-[#FF9800] text-[10px] mt-0.5">
                          <Star className="w-3 h-3 fill-[#FF9800]" />
                          <Star className="w-3 h-3 fill-[#FF9800]" />
                          <Star className="w-3 h-3 fill-[#FF9800]" />
                          <Star className="w-3 h-3 fill-[#FF9800]" />
                          <Star className="w-3 h-3 fill-[#FF9800]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SHOPPING SECTION (Matching wireframe category banners in image_1.png) */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
              Shopping
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div 
                onClick={() => onSelectCategory('groceries')}
                className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="text-3xl">🥦</div>
                <div>
                  <div className="font-black text-xs text-zinc-900 dark:text-zinc-100">Fresh Produce</div>
                  <div className="text-[10px] text-zinc-500">Asela local market</div>
                </div>
              </div>

              <div 
                onClick={() => onSelectCategory('groceries')}
                className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/30 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="text-3xl">🍯</div>
                <div>
                  <div className="font-black text-xs text-zinc-900 dark:text-zinc-100">Chilalo Honey</div>
                  <div className="text-[10px] text-zinc-500">100% Organic white</div>
                </div>
              </div>

              <div 
                onClick={() => onSelectCategory('restaurants')}
                className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/30 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="text-3xl">☕</div>
                <div>
                  <div className="font-black text-xs text-zinc-900 dark:text-zinc-100">Habesha Bunna</div>
                  <div className="text-[10px] text-zinc-500">Fresh roasted beans</div>
                </div>
              </div>

              <div 
                onClick={() => onSelectCategory('retail')}
                className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="text-3xl">🛍️</div>
                <div>
                  <div className="font-black text-xs text-zinc-900 dark:text-zinc-100">Daily Retail</div>
                  <div className="text-[10px] text-zinc-500">Supermarket items</div>
                </div>
              </div>
            </div>
          </div>

          {/* CATALOG / DISHES SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                Menu & Dishes for Doorstep Delivery
              </h2>
              <span className="text-xs text-zinc-400">
                {filteredProducts.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const merchant = merchants.find(m => m.id === product.merchantId);
                const isAdded = justAddedId === product.id;

                return (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#150F22] border border-zinc-200/80 dark:border-purple-950/40 shadow-xs hover:border-[#6A1B9A] transition flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="relative h-40 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <img
                          src={product.imageUrl}
                          alt={product.name[language] || product.name.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="px-2 py-0.5 rounded-md bg-[#6A1B9A] text-white text-[10px] font-black uppercase">
                            {product.productType === 'retail' ? 'Retail' : 'Fresh Food'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-extrabold text-[#009688]">
                          {merchant ? (merchant.name[language] || merchant.name.en) : ''}
                        </div>
                        <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#6A1B9A] transition">
                          {product.name[language] || product.name.en}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                          {product.description[language] || product.description.en}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <div className="text-base font-black text-zinc-900 dark:text-zinc-100">
                        {product.basePriceBirr} {t.common.currency}
                      </div>

                      <button
                        onClick={() => openCustomization(product)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                          isAdded
                            ? 'bg-[#009688] text-white'
                            : 'bg-[#6A1B9A] hover:bg-[#5A1482] text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-[#FF9800]" />
                            <span>Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* OPTIONS & CUSTOMIZATION MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#150F22] border border-purple-200 dark:border-purple-900/60 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-black text-[#6A1B9A] dark:text-[#BA68C8] uppercase tracking-wider">
                  {activeModalProduct.productType === 'retail' ? 'Retail Options' : 'Custom Options & Add-ons'}
                </span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                  {activeModalProduct.name[language] || activeModalProduct.name.en}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Retail Variants if exists */}
            {activeModalProduct.variants && activeModalProduct.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                  Available Sizes / Weights (SKU)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {activeModalProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] font-bold'
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{v.name[language] || v.name.en}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{v.sku}</div>
                      <div className="text-xs font-black mt-1 text-[#FF9800]">{v.priceBirr} {t.common.currency}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Food Options Groups */}
            {activeModalProduct.optionGroups && activeModalProduct.optionGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <span>{group.title[language] || group.title.en}</span>
                  <span className="text-[10px] text-zinc-400">Select option</span>
                </div>

                <div className="space-y-1.5">
                  {group.choices.map((choice) => {
                    const isSelected = selectedOptions[group.id]?.id === choice.id;
                    return (
                      <button
                        key={choice.id}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [group.id]: choice }))}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8]'
                            : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#6A1B9A] bg-[#6A1B9A] text-white' : 'border-zinc-400'
                          }`}>
                            {isSelected && <span className="text-[10px]">✓</span>}
                          </div>
                          <span>{choice.name[language] || choice.name.en}</span>
                        </div>
                        {choice.priceAdjustmentBirr > 0 ? (
                          <span className="font-bold text-[#FF9800]">
                            +{choice.priceAdjustmentBirr} {t.common.currency}
                          </span>
                        ) : (
                          <span className="text-zinc-400 text-[11px]">Free</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bottom Actions */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] text-zinc-400">Price Total</span>
                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                  {calculateModalTotal()} {t.common.currency}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="px-6 py-2.5 rounded-xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white text-xs font-black shadow-md shadow-purple-950/25 flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#FF9800]" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
