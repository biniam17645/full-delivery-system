import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  ChevronRight, 
  Star, 
  Heart,
  ShoppingBag,
  Bike,
  ShieldCheck,
  Search,
  ArrowRight,
  Utensils,
  Store,
  Briefcase,
  User,
  Coffee,
  ShoppingBasket,
  Smartphone,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { HeroPhoneMockup } from './HeroPhoneMockup';
import { 
  Merchant, 
  Product, 
  Category, 
  LanguageCode, 
  ProductOptionChoice, 
  ProductVariant 
} from '../types';
import { getTranslation } from '../i18n';

interface LandingPageViewProps {
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
  currentUser: any;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
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
  currentUser
}) => {
  const t = getTranslation(language);

  // Active Menu / Order Modal state
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'food' | 'coffee' | 'grocery' | 'honey'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductOptionChoice>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Categories list matching beU aesthetic in Kech goods
  const serviceCategories = [
    {
      id: 'food',
      title: 'Food & Restaurants',
      desc: 'Local restaurants, cafes and fast food, delivered hot.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      badge: 'Fast delivery'
    },
    {
      id: 'coffee',
      title: 'Highland Coffee & Bunna',
      desc: 'Traditional claypot jebena bunna, fresh roasted Arsi highland coffee.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
      badge: 'Arsi specialty'
    },
    {
      id: 'bakery',
      title: 'Bakery & Pastries',
      desc: 'Fresh croissants, honey baklava, cakes and sweet treats.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
      badge: 'Freshly baked'
    },
    {
      id: 'grocery',
      title: 'Groceries & Mart',
      desc: 'Produce, dairy, pantry staples and household essentials.',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
      badge: 'Same-day'
    },
    {
      id: 'honey',
      title: 'Mount Chilalo Honey',
      desc: '100% pure organic raw white mountain honey.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
      badge: 'Organic'
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy & Health',
      desc: 'Medicine, vitamins and health products, delivered discreetly.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
      badge: 'Discreet'
    },
    {
      id: 'parcel',
      title: 'Parcel & Courier',
      desc: 'Fast document, package and gift courier across Asela by bicycle.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
      badge: 'Instant dispatch'
    },
    {
      id: 'drinks',
      title: 'Drinks & Fresh Juices',
      desc: 'Fresh fruit juices, mango smoothies and cold beverages.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
      badge: 'Chilled'
    }
  ];

  const filteredProducts = products.filter(p => {
    if (selectedCategoryTab === 'all') return true;
    if (selectedCategoryTab === 'food') return p.productType === 'food';
    if (selectedCategoryTab === 'coffee') return p.tags.includes('coffee') || p.tags.includes('bunna');
    if (selectedCategoryTab === 'grocery') return p.productType === 'retail';
    if (selectedCategoryTab === 'honey') return p.tags.includes('honey');
    return true;
  });

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
    <div className="bg-white dark:bg-[#0E0917] text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION (Directly matching beudelivery.com hero layout in Kech colors & goods) */}
      <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden bg-white dark:bg-[#0E0917] pt-8 pb-16">
        
        {/* Subtle decorative curved background on the right matching beU */}
        <div 
          className="pointer-events-none absolute -top-[10%] -right-[5%] h-[115%] w-[55%] rounded-bl-[55%] bg-[linear-gradient(135deg,rgba(91,20,132,0.06),rgba(255,122,0,0.05))]"
          aria-hidden="true" 
        />
        
        {/* Animated subtle floating glow dots */}
        <span className="bg-grad animate-floatY pointer-events-none absolute left-[4%] top-[14%] h-3 w-3 rounded-full opacity-[0.25]" aria-hidden="true" />
        <span className="bg-grad animate-floatY pointer-events-none absolute left-[7%] top-[68%] h-5 w-5 rounded-full opacity-[0.15] [animation-duration:7s]" aria-hidden="true" />
        <span className="bg-grad animate-floatY pointer-events-none absolute right-[6%] top-[35%] h-[15px] w-[15px] rounded-full opacity-[0.2] [animation-duration:6s]" aria-hidden="true" />

        <div className="mx-auto max-w-[1200px] px-6 w-full relative z-10">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
            
            {/* Left Hero Content */}
            <div className="text-center lg:text-left space-y-6">
              
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-800 bg-[#5B1484]/[0.08] dark:bg-[#5B1484]/30 px-4 py-1.5 text-xs font-extrabold text-[#5B1484] dark:text-[#BA68C8]">
                <span className="animate-pulseDot h-2 w-2 rounded-full bg-[#FF7A00]" aria-hidden="true" />
                <span>Now live across all of Asela • አሁን በመላው አሰላ</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-extrabold text-[clamp(36px,4.8vw,66px)] leading-[1.08] tracking-tight text-zinc-950 dark:text-zinc-50">
                <span>Food, Grocery &amp;</span> <br />
                <span className="grad-text">Courier Delivery</span> <br />
                <span>in Asela</span>
              </h1>

              {/* Sub-headline */}
              <p className="mx-auto lg:mx-0 max-w-[480px] text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                We Deliver Convenience To Your Door
              </p>

              {/* Description */}
              <p className="mx-auto lg:mx-0 max-w-[480px] text-sm sm:text-base leading-[1.75] text-zinc-600 dark:text-zinc-400">
                Food, groceries, parcels, and local goods delivered anywhere in Asela, in as fast as 25 minutes. From Arsi University to Gonde &amp; Kebele 01-04. Trusted by over 50,000 customers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                <a
                  href="#menu-section"
                  className="sheen bg-grad inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_28px_rgba(255,122,0,0.38)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Order Now</span>
                </a>

                <a
                  href="#how"
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 px-7 py-[15px] text-[15px] font-bold text-zinc-800 dark:text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B1484] hover:text-[#5B1484] dark:hover:text-[#BA68C8] cursor-pointer"
                >
                  <span>How It Works</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Social Proof Counter */}
              <div className="mt-7 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex" aria-hidden="true">
                  <span className="bg-grad -mr-[9px] flex h-[36px] w-[36px] items-center justify-center rounded-full border-[2.5px] border-white dark:border-zinc-900 text-[10px] font-bold text-white shadow-xs">AB</span>
                  <span className="bg-grad -mr-[9px] flex h-[36px] w-[36px] items-center justify-center rounded-full border-[2.5px] border-white dark:border-zinc-900 text-[10px] font-bold text-white shadow-xs">TK</span>
                  <span className="bg-grad -mr-[9px] flex h-[36px] w-[36px] items-center justify-center rounded-full border-[2.5px] border-white dark:border-zinc-900 text-[10px] font-bold text-white shadow-xs">MH</span>
                  <span className="bg-grad -mr-[9px] flex h-[36px] w-[36px] items-center justify-center rounded-full border-[2.5px] border-white dark:border-zinc-900 text-[10px] font-bold text-white shadow-xs">YB</span>
                </div>
                <span className="ml-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-950 dark:text-zinc-100 font-extrabold">50,000+ users</strong> trust Kech in Asela
                </span>
              </div>

            </div>

            {/* Right Phone Mockup (Exact beU realistic SVG app mockup) */}
            <div className="flex items-center justify-center">
              <HeroPhoneMockup onOrderClick={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION (beU gradient ribbon with huge stats & watermark) */}
      <section className="bg-grad relative overflow-hidden py-16 text-white" aria-label="Kech statistics">
        <span 
          className="pointer-events-none absolute -bottom-[12%] -right-[2%] select-none font-black text-[clamp(140px,28vw,340px)] leading-none tracking-tighter text-white/5"
          aria-hidden="true"
        >
          25
        </span>

        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="px-4 py-4 text-center sm:px-6 lg:[&:not(:first-child)]:border-l lg:border-white/20">
              <div className="mb-1 text-[clamp(36px,4.5vw,56px)] font-black leading-none tracking-tight">
                50K+
              </div>
              <div className="text-xs font-bold uppercase tracking-[1.5px] text-white/80">
                Happy Users
              </div>
            </div>

            <div className="px-4 py-4 text-center sm:px-6 lg:[&:not(:first-child)]:border-l lg:border-white/20">
              <div className="mb-1 text-[clamp(36px,4.5vw,56px)] font-black leading-none tracking-tight">
                25,000+
              </div>
              <div className="text-xs font-bold uppercase tracking-[1.5px] text-white/80">
                Orders Monthly
              </div>
            </div>

            <div className="px-4 py-4 text-center sm:px-6 lg:[&:not(:first-child)]:border-l lg:border-white/20">
              <div className="mb-1 text-[clamp(36px,4.5vw,56px)] font-black leading-none tracking-tight">
                120+
              </div>
              <div className="text-xs font-bold uppercase tracking-[1.5px] text-white/80">
                Active Partners
              </div>
            </div>

            <div className="px-4 py-4 text-center sm:px-6 lg:[&:not(:first-child)]:border-l lg:border-white/20">
              <div className="mb-1 text-[clamp(36px,4.5vw,56px)] font-black leading-none tracking-tight">
                25 Min
              </div>
              <div className="text-xs font-bold uppercase tracking-[1.5px] text-white/80">
                Average Delivery
              </div>
            </div>

            <div className="px-4 py-4 text-center sm:px-6 lg:[&:not(:first-child)]:border-l lg:border-white/20 col-span-2 md:col-span-1">
              <div className="mb-1 text-[clamp(36px,4.5vw,56px)] font-black leading-none tracking-tight">
                8 KM
              </div>
              <div className="text-xs font-bold uppercase tracking-[1.5px] text-white/80">
                Asela Radius
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "WHAT WE DELIVER" (beU Services grid: Everything You Need, In One App) */}
      <section id="services" className="relative overflow-hidden bg-white dark:bg-[#0E0917] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[2px] text-[#5B1484] dark:text-[#BA68C8]">
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
              <span>What We Deliver</span>
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              Everything You Need,<br />In One App
            </h2>
            <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              From hot Ethiopian meals and fresh bakery to organic honey, groceries, and parcels, Kech delivers it all across Asela.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'coffee') setSelectedCategoryTab('coffee');
                  else if (cat.id === 'food') setSelectedCategoryTab('food');
                  else if (cat.id === 'grocery') setSelectedCategoryTab('grocery');
                  else if (cat.id === 'honey') setSelectedCategoryTab('honey');
                  else setSelectedCategoryTab('all');

                  const el = document.getElementById('menu-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF7A00]/40 hover:shadow-[0_18px_44px_rgba(91,20,132,0.12)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    <img src={cat.image} alt={cat.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="mb-1.5 font-extrabold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-[#5B1484] dark:group-hover:text-[#BA68C8] transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-[11px] font-bold text-[#FF7A00]">
                  <span>Explore category</span>
                  <span>→</span>
                </div>

                {/* Animated bottom gradient bar on hover */}
                <span className="bg-grad absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. "BUILT FOR EVERYONE" (beU 4-Audience Cards: Personal, Merchants, Business, Riders) */}
      <section id="audiences" className="relative overflow-hidden py-24 bg-zinc-50 dark:bg-[#120D1E]">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[2px] text-[#5B1484] dark:text-[#BA68C8]">
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
              <span>Built for Everyone</span>
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              One Platform, Every Need
            </h2>
            <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Whether you're ordering lunch at Arsi Campus, running an Asela cafe, or looking to ride as a bicycle courier, Kech is built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* 1. Personal */}
            <div 
              onClick={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B1484] hover:shadow-xl cursor-pointer"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B1484]/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                🧍
              </div>
              <h3 className="mb-2 font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Personal
              </h3>
              <p className="mb-6 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Order food, groceries, medicine and more, or send a parcel across Asela in 25 minutes.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-black text-[#FF7A00]">
                <span>Order Now</span>
                <span>→</span>
              </span>
            </div>

            {/* 2. Merchants */}
            <div 
              onClick={() => onOpenAuth('signup')}
              className="group flex flex-col rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B1484] hover:shadow-xl cursor-pointer"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF7A00]/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                🛍️
              </div>
              <h3 className="mb-2 font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Merchants &amp; Cafes
              </h3>
              <p className="mb-6 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Grow your restaurant or grocery store with more daily orders handled by our Asela bicycle fleet.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-black text-[#FF7A00]">
                <span>Become a Partner</span>
                <span>→</span>
              </span>
            </div>

            {/* 3. Business */}
            <div 
              onClick={() => onOpenAuth('signup')}
              className="group flex flex-col rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B1484] hover:shadow-xl cursor-pointer"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/40 text-3xl transition-transform duration-300 group-hover:scale-110">
                🏢
              </div>
              <h3 className="mb-2 font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Hotels &amp; Business
              </h3>
              <p className="mb-6 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Hospitality dining, e-commerce last-mile parcel dispatch, and bulk distribution in Arsi zone.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-black text-[#FF7A00]">
                <span>Explore Business</span>
                <span>→</span>
              </span>
            </div>

            {/* 4. Riders */}
            <div 
              onClick={() => onOpenAuth('signup')}
              className="group flex flex-col rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B1484] hover:shadow-xl cursor-pointer"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#009688]/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                🚴
              </div>
              <h3 className="mb-2 font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Bicycle Riders
              </h3>
              <p className="mb-6 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Join our bicycle &amp; motorbike courier team in Asela and earn transparent task rates every day.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-black text-[#FF7A00]">
                <span>Ride With Us</span>
                <span>→</span>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 5. "ORDER IN 3 EASY STEPS" (beU Simple Process) */}
      <section id="how" className="relative overflow-hidden bg-white dark:bg-[#0E0917] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[2px] text-[#5B1484] dark:text-[#BA68C8]">
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
              <span>Simple Process</span>
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              Order in 3 Easy Steps
            </h2>
            <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Getting food or goods in Asela has never been easier. Open Kech and you're seconds away from your favorite spot.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="group text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[2.5px] border-[#5B1484] bg-white dark:bg-zinc-900 text-2xl font-black text-[#5B1484] dark:text-[#BA68C8] shadow-[0_4px_20px_rgba(91,20,132,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-grad group-hover:text-white">
                01
              </div>
              <h3 className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Open the Web / App
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Browse 120+ restaurants, cafes, and supermarkets across Asela with 1-tap Google Sign In.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[2.5px] border-[#FF7A00] bg-white dark:bg-zinc-900 text-2xl font-black text-[#FF7A00] shadow-[0_4px_20px_rgba(255,122,0,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-grad group-hover:text-white">
                02
              </div>
              <h3 className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Place Your Order
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Choose your dishes or goods, confirm your delivery Kebele in Asela, and pay via Telebirr, CBE Birr or Cash.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[2.5px] border-[#009688] bg-white dark:bg-zinc-900 text-2xl font-black text-[#009688] shadow-[0_4px_20px_rgba(0,150,136,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-grad group-hover:text-white">
                03
              </div>
              <h3 className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Get It Delivered
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Track your bicycle courier live through preparation, pickup, and arrival at your doorstep in ~25 minutes.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE MENU & GOODS CATALOG (Real products, cart, Telebirr checkout) */}
      <section id="menu-section" className="py-24 bg-zinc-50 dark:bg-[#120D1E] border-t border-zinc-200/80 dark:border-purple-950/40">
        <div className="mx-auto max-w-[1200px] px-6 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF7A00]">
                <span>Asela Online Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Order Food &amp; Retail Online
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setSelectedCategoryTab('all')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategoryTab === 'all'
                    ? 'bg-[#5B1484] text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setSelectedCategoryTab('coffee')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategoryTab === 'coffee'
                    ? 'bg-[#5B1484] text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                ☕ Bunna &amp; Pastry
              </button>
              <button
                onClick={() => setSelectedCategoryTab('food')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategoryTab === 'food'
                    ? 'bg-[#5B1484] text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                🍲 Meals &amp; Tibs
              </button>
              <button
                onClick={() => setSelectedCategoryTab('grocery')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategoryTab === 'grocery'
                    ? 'bg-[#5B1484] text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                🛒 Groceries &amp; Honey
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const merchant = merchants.find(m => m.id === product.merchantId);
              const isAdded = justAddedId === product.id;

              return (
                <div
                  key={product.id}
                  className="rounded-3xl p-4 bg-white dark:bg-[#150F22] border border-zinc-200/80 dark:border-purple-950/40 shadow-xs hover:shadow-xl hover:border-[#FF7A00]/50 transition duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={product.imageUrl}
                        alt={product.name[language] || product.name.en}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-[#5B1484] text-white text-[10px] font-black uppercase">
                          {product.productType === 'retail' ? 'Retail' : 'Fresh Kitchen'}
                        </span>
                      </div>
                      {product.prepTimeMinutes && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur text-white text-[10px] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#FF7A00]" />
                          <span>{product.prepTimeMinutes} min</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-[11px] font-black text-[#FF7A00] uppercase tracking-wider">
                        {merchant ? (merchant.name[language] || merchant.name.en) : 'Asela Venue'}
                      </div>
                      <h3 className="text-base font-extrabold text-zinc-950 dark:text-zinc-100 group-hover:text-[#5B1484] dark:group-hover:text-[#BA68C8] transition leading-snug">
                        {product.name[language] || product.name.en}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                        {product.description[language] || product.description.en}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-zinc-950 dark:text-zinc-100">
                        {product.basePriceBirr} {t.common.currency}
                      </span>
                    </div>

                    <button
                      onClick={() => openCustomization(product)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        isAdded
                          ? 'bg-[#009688] text-white'
                          : 'sheen bg-grad text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
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
      </section>

      {/* 7. MARQUEE PARTNER STRIP (beU Partners Marquee in Asela venues) */}
      <section className="border-y border-black/5 dark:border-white/10 bg-white dark:bg-[#0E0917] py-14" aria-label="Our partners">
        <div className="mx-auto max-w-[1200px] px-6 text-center mb-8">
          <p className="text-xs font-black uppercase tracking-[2px] text-zinc-400">
            Trusted by 120+ restaurants, cafes, supermarkets &amp; pharmacies in Asela
          </p>
        </div>

        <div className="marquee-mask relative w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-6 px-6">
            {merchants.concat(merchants).map((m, idx) => (
              <div
                key={`${m.id}-${idx}`}
                className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl px-5 py-3 border border-black/5 dark:border-white/10 bg-white dark:bg-[#150F22] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:scale-105 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{m.logo}</span>
                  <div className="text-left">
                    <div className="font-extrabold text-xs text-zinc-900 dark:text-zinc-100 truncate max-w-[100px]">
                      {m.name[language] || m.name.en}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      ⭐ {m.rating} (Asela)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. "WHY KECH — BUILT FOR ASELA" (beU Feature Grid) */}
      <section id="why" className="relative overflow-hidden bg-white dark:bg-[#0E0917] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[2px] text-[#5B1484] dark:text-[#BA68C8]">
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
              <span>Why Kech</span>
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              Built for Asela
            </h2>
            <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              We're not just another delivery app. We're a homegrown platform engineered for Mount Chilalo terrain, local payment systems, and fast doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">Lightning Fast</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Just 25 minutes on average across every corner of Asela and Arsi University.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">120+ Partners</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Restaurants, cafes, supermarkets and pharmacies, all in one seamless app.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">All of Asela</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Kebele 01, 02, 03, 04, Arsi Uni and outskirts covered reliably.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">Easy Payment</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Pay instantly via Telebirr, CBE Birr, or cash on delivery upon arrival.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">Eco Bicycle Fleet</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Trained local riders navigating Asela's highland topography with speed.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#5B1484] transition">
              <div className="bg-grad flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 font-extrabold text-lg text-zinc-900 dark:text-zinc-100">Safe &amp; Reliable</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Vetted riders and a real-time support team tracking every delivery.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION (beU Customer Love) */}
      <section id="testimonials" className="relative overflow-hidden bg-zinc-50 dark:bg-[#120D1E] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[2px] text-[#5B1484] dark:text-[#BA68C8]">
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
              <span>Customer Love</span>
              <span className="h-[1.5px] w-5 rounded bg-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              What Asela Is Saying
            </h2>
            <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Over 50,000 people across Asela choose Kech every week. Here's what they say.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-xs space-y-4">
              <div className="text-[#FF7A00] text-sm tracking-widest">★★★★★</div>
              <p className="text-xs sm:text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                “Late study sessions near Arsi University used to mean walking in the cold. Now I can order Aba Jifar bunna and hot tibs right to the campus gate in under 20 minutes.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="bg-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">KA</span>
                <div>
                  <div className="text-xs font-extrabold text-zinc-950 dark:text-zinc-100">Kalkidan</div>
                  <div className="text-[11px] text-zinc-400">Student, Arsi University</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-xs space-y-4">
              <div className="text-[#FF7A00] text-sm tracking-widest">★★★★★</div>
              <p className="text-xs sm:text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                “I run Habesha Kitchen in Kebele 03. Kech bicycle couriers doubled our lunch delivery orders without us needing to buy or maintain our own motorbikes.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="bg-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">BR</span>
                <div>
                  <div className="text-xs font-extrabold text-zinc-950 dark:text-zinc-100">Bruk Tadesse</div>
                  <div className="text-[11px] text-zinc-400">Restaurant Partner, Kebele 03</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 dark:border-purple-950/40 bg-white dark:bg-[#150F22] p-8 shadow-xs space-y-4">
              <div className="text-[#FF7A00] text-sm tracking-widest">★★★★★</div>
              <p className="text-xs sm:text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                “Telebirr integration is seamless. You click order, confirm with Telebirr PIN, and the courier calls you as soon as they reach Posta Bet square.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="bg-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">NA</span>
                <div>
                  <div className="text-xs font-extrabold text-zinc-950 dark:text-zinc-100">Nahom Bekele</div>
                  <div className="text-[11px] text-zinc-400">Customer, Kebele 02</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. DOWNLOAD & START GETTING DELIVERED TODAY (beU #download gradient section) */}
      <section id="download" className="bg-grad relative overflow-hidden py-24 text-white text-center">
        <span 
          className="pointer-events-none absolute -bottom-[6%] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-black text-[clamp(70px,18vw,240px)] tracking-wider text-white/5"
          aria-hidden="true"
        >
          DOWNLOAD
        </span>

        <div className="mx-auto max-w-[1200px] px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Start Getting Things<br />Delivered Today
          </h2>
          <p className="mx-auto max-w-[460px] text-sm sm:text-base leading-relaxed text-white/90">
            Join over 50,000 people across Asela who already rely on Kech for food, groceries, parcels, and more.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="sheen inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-base font-black text-[#5B1484] shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#FF7A00]" />
              <span>Order on Web Now</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3.5 text-xs font-semibold">
            <a
              href="https://t.me/KechDeliveryBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              <span>✈️</span>
              <span>Telegram Bot @KechDeliveryBot</span>
            </a>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-white backdrop-blur-sm">
              <span>📱</span>
              <span>Google Play App (Android)</span>
            </div>

            <a
              href="tel:9533"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <PhoneCall className="w-4 h-4 text-[#FF7A00]" />
              <span>Call 9533 (Asela Hotline)</span>
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#150F22] border border-purple-200 dark:border-purple-900/60 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-black text-[#5B1484] dark:text-[#BA68C8] uppercase tracking-wider">
                  {activeModalProduct.productType === 'retail' ? 'Retail Options' : 'Custom Options & Modifiers'}
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
                          ? 'border-[#5B1484] bg-[#5B1484]/10 text-[#5B1484] dark:text-[#BA68C8] font-bold'
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{v.name[language] || v.name.en}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{v.sku}</div>
                      <div className="text-xs font-black mt-1 text-[#FF7A00]">{v.priceBirr} {t.common.currency}</div>
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
                            ? 'border-[#5B1484] bg-[#5B1484]/10 text-[#5B1484] dark:text-[#BA68C8]'
                            : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#5B1484] bg-[#5B1484] text-white' : 'border-zinc-400'
                          }`}>
                            {isSelected && <span className="text-[10px]">✓</span>}
                          </div>
                          <span>{choice.name[language] || choice.name.en}</span>
                        </div>
                        {choice.priceAdjustmentBirr > 0 ? (
                          <span className="font-bold text-[#FF7A00]">
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
                  className="px-6 py-2.5 rounded-xl bg-[#5B1484] hover:bg-[#4A148C] text-white text-xs font-black shadow-md shadow-purple-950/25 flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#FF7A00]" />
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
