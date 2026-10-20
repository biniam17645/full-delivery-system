import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  ShoppingBag, 
  Filter, 
  Star, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ChevronDown, 
  SlidersHorizontal,
  Layers,
  LogOut,
  Navigation,
  Utensils,
  Coffee,
  Store,
  X
} from 'lucide-react';
import { Merchant, Product } from '../../types';
import { CartItem, ActiveOrder, PageType } from '../../types/navigation';
import { MerchantMenuModal } from './MerchantMenuModal';
import { CartSlideOver } from './CartSlideOver';

interface CustomerDashboardProps {
  merchants: Merchant[];
  products: Product[];
  cart: CartItem[];
  activeOrder: ActiveOrder | null;
  onAddToCart: (product: Product, quantity: number, notes: string, options: string[]) => void;
  onUpdateCartQuantity: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: ActiveOrder) => void;
  onViewLiveOrder: () => void;
  onLogout: () => void;
  outOfStockItemIds: string[];
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  merchants,
  products,
  cart,
  activeOrder,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onClearCart,
  onPlaceOrder,
  onViewLiveOrder,
  onLogout,
  outOfStockItemIds,
}) => {
  // State
  const [selectedLocation, setSelectedLocation] = useState('Arada Subcity - Kebele 01');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState<number | null>(null);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedMerchantForMenu, setSelectedMerchantForMenu] = useState<Merchant | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const aselaLocations = [
    'Arada Subcity - Kebele 01',
    'Posta Bet Square - Kebele 02',
    'Stadium Area - Kebele 03',
    'Old Market Area - Kebele 04',
    'Arsi University Main Campus',
    'Chilalo Mountain View Zone',
  ];

  const categoryPills = [
    { id: 'All', label: 'All', icon: Sparkles },
    { id: 'Habesha Food', label: 'Habesha Food', icon: Utensils },
    { id: 'Cafes & Coffee', label: 'Cafes & Coffee', icon: Coffee },
    { id: 'Fast Food', label: 'Fast Food', icon: Utensils },
    { id: 'Pastry & Bakery', label: 'Pastry & Bakery', icon: Coffee },
    { id: 'Groceries', label: 'Groceries', icon: Store },
    { id: 'Beauty & Retail', label: 'Beauty & Retail', icon: Layers },
  ];

  // Filtering merchants
  const filteredMerchants = useMemo(() => {
    return merchants.filter((m) => {
      // Search matches merchant name or products
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesMerchant = m.name.en.toLowerCase().includes(query);
        const matchesProduct = products.some(
          (p) => p.merchantId === m.id && p.name.en.toLowerCase().includes(query)
        );
        if (!matchesMerchant && !matchesProduct) return false;
      }

      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Cafes & Coffee' && m.category !== 'cafe') return false;
        if (selectedCategory === 'Habesha Food' && m.category !== 'restaurant' && m.category !== 'hotel') return false;
        if (selectedCategory === 'Groceries' && m.category !== 'supermarket') return false;
        if (selectedCategory === 'Fast Food' && !m.name.en.toLowerCase().includes('burger')) return false;
      }

      // Rating filter
      if (minRating && m.rating < minRating) return false;

      // Delivery time filter
      if (maxDeliveryTime && m.preparationTimeMinutes > maxDeliveryTime) return false;

      // Free delivery filter
      if (freeDeliveryOnly && m.rating < 4.8) return false; // simulated free delivery condition

      return true;
    });
  }, [merchants, products, searchQuery, selectedCategory, minRating, maxDeliveryTime, freeDeliveryOnly]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-16 animate-in fade-in duration-300">
      {/* Top Header & Search Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Location Selector */}
            <div className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-2xl border border-gray-200 cursor-pointer transition shrink-0">
              <MapPin className="w-4 h-4 text-kechOrange shrink-0" />
              <div className="text-left text-xs">
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Deliver to
                </span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent font-extrabold text-gray-800 text-xs outline-none cursor-pointer pr-2"
                >
                  {aselaLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-xl relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, macchiato, burgers, honey, groceries in Asela..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-kechPurple/40 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Action Buttons: Cart Drawer & Live Order */}
            <div className="flex items-center gap-2 justify-end">
              {activeOrder && (
                <button
                  onClick={onViewLiveOrder}
                  className="bg-purple-100 hover:bg-purple-200 text-kechPurple font-extrabold text-xs px-3 py-2 rounded-xl border border-purple-300 transition flex items-center gap-1.5 cursor-pointer animate-pulse"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Track Order #{activeOrder.orderNumber}</span>
                </button>
              )}

              {/* Cart Drawer Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative bg-kechOrange hover:bg-kechOrangeDark text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 bg-white text-kechOrange font-black rounded-full flex items-center justify-center text-[11px] shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Logout button */}
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-kechPurple hover:bg-gray-100 rounded-xl transition cursor-pointer"
                title="Log out of Customer Dashboard"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center justify-between gap-4">
          {/* Horizontal Scrolling Pill Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-1">
            {categoryPills.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-kechPurple text-white shadow-md'
                      : 'bg-white hover:bg-purple-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Drawer Toggle Button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
              filterDrawerOpen || minRating || maxDeliveryTime || freeDeliveryOnly
                ? 'bg-kechOrange text-white border-kechOrange'
                : 'bg-white text-gray-700 border-gray-200 hover:border-kechPurple'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Expandable Filter Drawer */}
        {filterDrawerOpen && (
          <div className="mt-4 p-4 bg-white rounded-3xl border border-gray-200 shadow-md animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {/* Rating Filter */}
                <div>
                  <span className="font-bold text-gray-700 block mb-1">Customer Rating:</span>
                  <div className="flex gap-1.5">
                    {[null, 4.5, 4.8].map((rate) => (
                      <button
                        key={rate === null ? 'all' : rate}
                        onClick={() => setMinRating(rate)}
                        className={`px-3 py-1 rounded-lg border font-bold transition cursor-pointer ${
                          minRating === rate
                            ? 'bg-kechPurple text-white border-kechPurple'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {rate === null ? 'All' : `${rate}+ ★`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <span className="font-bold text-gray-700 block mb-1">Max Speed:</span>
                  <div className="flex gap-1.5">
                    {[null, 15, 20].map((mins) => (
                      <button
                        key={mins === null ? 'all' : mins}
                        onClick={() => setMaxDeliveryTime(mins)}
                        className={`px-3 py-1 rounded-lg border font-bold transition cursor-pointer ${
                          maxDeliveryTime === mins
                            ? 'bg-kechPurple text-white border-kechPurple'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {mins === null ? 'Any Time' : `< ${mins} mins`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Free Delivery */}
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="freeDelivery"
                    checked={freeDeliveryOnly}
                    onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                    className="rounded text-kechOrange focus:ring-kechOrange"
                  />
                  <label htmlFor="freeDelivery" className="font-bold text-gray-700 cursor-pointer">
                    Free Delivery Only
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  setMinRating(null);
                  setMaxDeliveryTime(null);
                  setFreeDeliveryOnly(false);
                }}
                className="text-xs text-gray-500 hover:text-red-500 font-bold cursor-pointer underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant & Shop Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              Registered Merchants in Asela ({filteredMerchants.length})
            </h2>
            <p className="text-xs text-gray-500">
              Delivered quickly to {selectedLocation}
            </p>
          </div>
        </div>

        {filteredMerchants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8">
            <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 text-base">No merchants found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search query or reset the active category filters.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                onClick={() => setSelectedMerchantForMenu(merchant)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-kechPurple/40 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer group transform hover:-translate-y-1"
              >
                {/* Cover Image */}
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={merchant.coverImage}
                    alt={merchant.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Logo badge */}
                  <div className="absolute top-3 left-3 w-11 h-11 bg-white/95 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-gray-100">
                    {merchant.logo}
                  </div>
                  {/* Delivery Speed Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-kechOrange" />
                    <span>{merchant.preparationTimeMinutes}-{merchant.preparationTimeMinutes + 10} min</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-black text-base text-gray-900 group-hover:text-kechPurple transition">
                        {merchant.name.en}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-extrabold shrink-0 border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{merchant.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{merchant.location.kebele || 'Asela'} • {merchant.category.toUpperCase()}</span>
                    </p>

                    {merchant.featuredDishes && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {merchant.featuredDishes.slice(0, 3).map((dish, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-purple-50 text-kechPurple font-semibold px-2 py-0.5 rounded-md"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-700">
                      Bicycle Delivery: 25 ETB
                    </span>
                    <span className="text-kechOrange group-hover:underline flex items-center gap-1">
                      <span>View Menu</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Merchant Menu Modal */}
      {selectedMerchantForMenu && (
        <MerchantMenuModal
          merchant={selectedMerchantForMenu}
          products={products}
          onClose={() => setSelectedMerchantForMenu(null)}
          onAddToCart={onAddToCart}
          outOfStockItemIds={outOfStockItemIds}
        />
      )}

      {/* Slide-out Cart & Checkout Drawer */}
      <CartSlideOver
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onClearCart={onClearCart}
        onPlaceOrder={onPlaceOrder}
        currentLocation={selectedLocation}
      />
    </div>
  );
};
