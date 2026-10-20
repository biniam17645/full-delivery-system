import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Clock, 
  Bike, 
  Search, 
  MapPin, 
  ChevronRight, 
  Sparkles,
  Coffee,
  Utensils,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { Merchant } from '../types';

interface FeaturedCafesSectionProps {
  merchants: Merchant[];
  onSelectCafe: (merchant: Merchant) => void;
  onOpenAppDownload: () => void;
}

export const FeaturedCafesSection: React.FC<FeaturedCafesSectionProps> = ({
  merchants,
  onSelectCafe,
  onOpenAppDownload,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'coffee', label: 'Cafes & Coffee' },
    { id: 'habesha', label: 'Habesha Food' },
    { id: 'pastry', label: 'Pastry & Sweets' },
    { id: 'groceries', label: 'Groceries' },
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMerchants = useMemo(() => {
    return merchants.filter((m) => {
      // Category filter matching
      if (activeCategory === 'coffee') {
        const isCoffee = m.category === 'cafe' || m.slug.includes('coffee') || m.slug.includes('cafe');
        if (!isCoffee) return false;
      } else if (activeCategory === 'habesha') {
        const isHabesha = m.category === 'restaurant' || m.category === 'hotel';
        if (!isHabesha) return false;
      } else if (activeCategory === 'pastry') {
        const isPastry = m.slug.includes('pastry') || (m.featuredDishes || []).some(d => d.toLowerCase().includes('croissant') || d.toLowerCase().includes('cake'));
        if (!isPastry) return false;
      } else if (activeCategory === 'groceries') {
        const isGrocery = m.category === 'supermarket' || m.slug.includes('honey') || m.slug.includes('supermarket');
        if (!isGrocery) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = m.name.en.toLowerCase().includes(q) || m.name.am.toLowerCase().includes(q);
        const addressMatch = m.location.addressText.toLowerCase().includes(q);
        const dishMatch = (m.featuredDishes || []).some(d => d.toLowerCase().includes(q));
        if (!nameMatch && !addressMatch && !dishMatch) return false;
      }

      return true;
    });
  }, [merchants, activeCategory, searchQuery]);

  return (
    <section id="cafes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#6A1B9A] text-xs font-bold">
              <Coffee className="w-3.5 h-3.5 text-[#FF9800]" />
              <span>Registered Asela Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular Cafes &amp; Restaurants in Asela
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Freshly prepared meals, claypot Jebena bunna, and daily groceries delivered to your door.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cafes or dishes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6A1B9A] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Interactive Filter Tags (as specified in prompt: All, Cafes & Coffee, Habesha Food, Pastry & Sweets, Groceries) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#6A1B9A] text-white shadow-md shadow-purple-900/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Cafe Cards Grid */}
        {filteredMerchants.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl space-y-3">
            <div className="text-4xl">☕</div>
            <div className="text-base font-bold text-gray-800">No cafes found matching "{searchQuery}"</div>
            <p className="text-xs text-gray-500">Try adjusting your search or category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#6A1B9A] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMerchants.map((merchant) => {
              const isFav = !!favorites[merchant.id];

              return (
                <div
                  key={merchant.id}
                  onClick={() => onSelectCafe(merchant)}
                  className="group rounded-3xl bg-white border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#6A1B9A]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Cover Image Container */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-gray-100">
                      <img
                        src={merchant.coverImage}
                        alt={merchant.name.en}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />

                      {/* Status / Category Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 text-gray-900 font-extrabold text-[11px] shadow-xs">
                          {merchant.category.toUpperCase()}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] shadow-xs">
                          Open Now
                        </span>
                      </div>

                      {/* Heart Wishlist Button */}
                      <button
                        onClick={(e) => toggleFavorite(merchant.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-400 hover:text-rose-500 flex items-center justify-center transition shadow-xs"
                        aria-label="Save Cafe"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Merchant Details */}
                    <div className="p-5 space-y-3">
                      
                      {/* Name & Rating */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#6A1B9A] transition leading-snug">
                            {merchant.name.en}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{merchant.location.kebele || merchant.location.addressText}</span>
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs font-black shrink-0">
                          <Star className="w-3.5 h-3.5 fill-[#FF9800] text-[#FF9800]" />
                          <span>{merchant.rating}</span>
                        </div>
                      </div>

                      {/* Featured Dish Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(merchant.featuredDishes || []).slice(0, 3).map((dish) => (
                          <span
                            key={dish}
                            className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>

                      {/* Metrics: Delivery Time (15-25 min) & Delivery Fee (35 ETB) */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700">
                        <div className="flex items-center gap-1 text-[#6A1B9A]">
                          <Bike className="w-4 h-4" />
                          <span>15–25 min</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#009688]">
                          <span>35 ETB delivery</span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Action Footer */}
                  <div className="px-5 pb-5 pt-1">
                    <button
                      onClick={() => onSelectCafe(merchant)}
                      className="w-full py-2.5 rounded-xl bg-purple-50 group-hover:bg-[#6A1B9A] text-[#6A1B9A] group-hover:text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5"
                    >
                      <span>View Menu &amp; Order</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
