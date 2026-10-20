import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Star, 
  MapPin, 
  Coffee, 
  Utensils, 
  Sliders, 
  Check, 
  Store,
  DollarSign
} from 'lucide-react';
import { Merchant, LanguageCode } from '../types';

export interface FilterState {
  foodTypes: string[]; // ['coffee', 'pastry', 'habesha', 'burger', 'retail']
  merchantIds: string[]; // Specific merchants selected
  maxPrice: number; // Max ETB
  minRating: number; // 0, 4.0, 4.5
  zone: 'all' | 'zone-a' | 'zone-b' | 'zone-c'; // Zone filter in Asela
  searchQuery: string;
}

interface FilterSidebarProps {
  language: LanguageCode;
  merchants: Merchant[];
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  language,
  merchants,
  filters,
  onChangeFilters,
  onResetFilters,
  totalResultsCount,
  className = ''
}) => {
  const foodTypeOptions = [
    { id: 'coffee', label: { en: 'Coffee & Bunna', am: 'ቡና እና ካፌ', om: 'Buna fi Kaaffee' }, icon: '☕' },
    { id: 'pastry', label: { en: 'Pastry & Bakery', am: 'ጣፋጭ እና ኬክ', om: 'Nyaata Lallaafoo' }, icon: '🥐' },
    { id: 'habesha', label: { en: 'Habesha Meals', am: 'የሀበሻ ባህላዊ ምግቦች', om: 'Nyaata Aadaa' }, icon: '🍲' },
    { id: 'burger', label: { en: 'Burgers & Grill', am: 'በርገር እና ጥብስ', om: 'Baargarii' }, icon: '🍔' },
    { id: 'retail', label: { en: 'Groceries & Honey', am: 'ሱፐርማርኬት እና ማር', om: 'Suupparmaarkatii' }, icon: '🍯' },
  ];

  const zoneOptions = [
    { id: 'all', label: 'All Asela (ሁሉም ዞን)', desc: 'Whole city' },
    { id: 'zone-a', label: 'Zone A (Kebele 01 & 02)', desc: '< 2 km • 15 min' },
    { id: 'zone-b', label: 'Zone B (Arsi University)', desc: '2 - 4 km • 20 min' },
    { id: 'zone-c', label: 'Zone C (Outskirts & Farms)', desc: '4 - 7 km • 30 min' },
  ];

  const toggleFoodType = (typeId: string) => {
    const exists = filters.foodTypes.includes(typeId);
    const updated = exists
      ? filters.foodTypes.filter(t => t !== typeId)
      : [...filters.foodTypes, typeId];
    onChangeFilters({ ...filters, foodTypes: updated });
  };

  const toggleMerchant = (merchantId: string) => {
    const exists = filters.merchantIds.includes(merchantId);
    const updated = exists
      ? filters.merchantIds.filter(m => m !== merchantId)
      : [...filters.merchantIds, merchantId];
    onChangeFilters({ ...filters, merchantIds: updated });
  };

  const hasActiveFilters = 
    filters.foodTypes.length > 0 || 
    filters.merchantIds.length > 0 || 
    filters.maxPrice < 1000 || 
    filters.minRating > 0 || 
    filters.zone !== 'all' ||
    filters.searchQuery !== '';

  return (
    <aside className={`w-full bg-white dark:bg-[#120D1E] rounded-3xl border border-zinc-200 dark:border-purple-900/40 p-5 space-y-6 shadow-sm ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              Filters & Search
            </h3>
            <span className="text-[11px] text-zinc-500">
              {totalResultsCount} items matching
            </span>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-bold text-[#FF9800] hover:text-[#F57C00] transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Food Type Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Food & Category Type
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {foodTypeOptions.map((opt) => {
            const isSelected = filters.foodTypes.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleFoodType(opt.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                  isSelected
                    ? 'bg-[#6A1B9A] text-white shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{opt.icon}</span>
                  <span>{opt.label[language] || opt.label.en}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Specific Restaurants Filter (Explicit requirement: Aba Jifar Bunna, Habesha Kitchen, etc.) */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <span>Registered Merchants in Asela</span>
          <span className="text-[10px] text-zinc-400 font-mono">({merchants.length})</span>
        </label>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {merchants.map((merchant) => {
            const isSelected = filters.merchantIds.includes(merchant.id);
            return (
              <button
                key={merchant.id}
                onClick={() => toggleMerchant(merchant.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left border ${
                  isSelected
                    ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] font-bold'
                    : 'border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm">{merchant.logo}</span>
                  <span className="truncate">{merchant.name[language] || merchant.name.en}</span>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center shrink-0 text-[10px]">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Max Price
          </label>
          <span className="text-xs font-extrabold text-[#6A1B9A] dark:text-[#BA68C8] font-mono">
            Up to {filters.maxPrice} ETB
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={1000}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => onChangeFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#6A1B9A] cursor-pointer"
        />

        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
          <span>50 ETB</span>
          <span>500 ETB</span>
          <span>1,000 ETB</span>
        </div>
      </div>

      {/* 4. Minimum Rating Filter */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
          <button
            onClick={() => onChangeFilters({ ...filters, minRating: 0 })}
            className={`py-1.5 px-2 rounded-xl border text-center transition ${
              filters.minRating === 0
                ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onChangeFilters({ ...filters, minRating: 4.0 })}
            className={`py-1.5 px-2 rounded-xl border text-center flex items-center justify-center gap-1 transition ${
              filters.minRating === 4.0
                ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <Star className="w-3 h-3 text-[#FF9800] fill-[#FF9800]" />
            <span>4.0+</span>
          </button>
          <button
            onClick={() => onChangeFilters({ ...filters, minRating: 4.8 })}
            className={`py-1.5 px-2 rounded-xl border text-center flex items-center justify-center gap-1 transition ${
              filters.minRating === 4.8
                ? 'bg-[#6A1B9A] text-white border-[#6A1B9A]'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <Star className="w-3 h-3 text-[#FF9800] fill-[#FF9800]" />
            <span>4.8+</span>
          </button>
        </div>
      </div>

      {/* 5. Distance / Asela Zone Filter */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Asela Delivery Zones
        </label>
        <div className="space-y-1">
          {zoneOptions.map((z) => {
            const isSelected = filters.zone === z.id;
            return (
              <button
                key={z.id}
                onClick={() => onChangeFilters({ ...filters, zone: z.id as any })}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition ${
                  isSelected
                    ? 'bg-[#009688]/10 text-[#009688] font-bold border border-[#009688]/30'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <span>{z.label}</span>
                <span className="text-[10px] text-zinc-400">{z.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
