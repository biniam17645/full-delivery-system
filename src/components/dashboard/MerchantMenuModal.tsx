import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Plus, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Merchant, Product, ProductOptionChoice } from '../../types';

interface MerchantMenuModalProps {
  merchant: Merchant | null;
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes: string, options: string[]) => void;
  outOfStockItemIds: string[];
}

export const MerchantMenuModal: React.FC<MerchantMenuModalProps> = ({
  merchant,
  products,
  onClose,
  onAddToCart,
  outOfStockItemIds,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedChoices, setSelectedChoices] = useState<Record<string, ProductOptionChoice>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  if (!merchant) return null;

  const merchantProducts = products.filter((p) => p.merchantId === merchant.id);

  const handleOpenCustomize = (product: Product) => {
    if (outOfStockItemIds.includes(product.id)) return;
    setSelectedProduct(product);
    setQuantity(1);
    setNotes('');
    const defaultChoices: Record<string, ProductOptionChoice> = {};
    if (product.optionGroups) {
      product.optionGroups.forEach((grp) => {
        if (grp.choices.length > 0) {
          defaultChoices[grp.id] = grp.choices[0];
        }
      });
    }
    setSelectedChoices(defaultChoices);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProduct) return;
    const optionsList = Object.values(selectedChoices).map((c) => c.name.en);
    onAddToCart(selectedProduct, quantity, notes, optionsList);
    setAddedAnimationId(selectedProduct.id);
    setSelectedProduct(null);
    setTimeout(() => setAddedAnimationId(null), 2000);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (outOfStockItemIds.includes(product.id)) return;
    onAddToCart(product, 1, '', []);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Modal Header Banner */}
        <div className="relative h-48 bg-gradient-to-r from-kechPurple to-purple-900 text-white shrink-0">
          <img
            src={merchant.coverImage}
            alt={merchant.name.en}
            className="w-full h-full object-cover opacity-40"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-lg border-2 border-kechOrange">
              {merchant.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">{merchant.name.en}</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-kechOrange text-white">
                  Verified Merchant
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-kechOrange text-kechOrange" />
                  {merchant.rating} ({merchant.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {merchant.preparationTimeMinutes}-{merchant.preparationTimeMinutes + 10} min
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {merchant.location.kebele || 'Asela'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-extrabold text-lg text-gray-900">
              Menu & Available Dishes ({merchantProducts.length})
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              Prepared fresh in Asela
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {merchantProducts.map((prod) => {
              const isOutOfStock = outOfStockItemIds.includes(prod.id);
              const isRecentlyAdded = addedAnimationId === prod.id;

              return (
                <div
                  key={prod.id}
                  onClick={() => !isOutOfStock && handleOpenCustomize(prod)}
                  className={`p-3.5 rounded-2xl border transition flex gap-3 cursor-pointer ${
                    isOutOfStock
                      ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                      : 'bg-white border-gray-200 hover:border-kechPurple/40 hover:shadow-md'
                  }`}
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name.en}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm text-gray-900 leading-snug">
                          {prod.name.en}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {prod.description.en}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-kechPurple">
                        {prod.basePriceBirr} ETB
                      </span>

                      {isOutOfStock ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600">
                          Sold Out
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(prod, e)}
                          className={`p-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                            isRecentlyAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-kechOrange hover:bg-kechOrangeDark text-white'
                          }`}
                        >
                          {isRecentlyAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{isRecentlyAdded ? 'Added' : 'Add'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customization Sub-Modal / Drawer */}
        {selectedProduct && (
          <div className="p-6 bg-purple-50/80 border-t border-purple-100 flex flex-col gap-4 animate-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-base text-kechPurple">
                  Customize: {selectedProduct.name.en}
                </h4>
                <p className="text-xs text-gray-600">
                  {selectedProduct.basePriceBirr} ETB each
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            {/* Special Instructions Note */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Special Kitchen Note (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Extra spicy, no onions, pack dressing on side"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
              />
            </div>

            {/* Quantity and Add CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-sm flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-sm flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleConfirmAddToCart}
                className="bg-kechOrange hover:bg-kechOrangeDark text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • {selectedProduct.basePriceBirr * quantity} ETB</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
