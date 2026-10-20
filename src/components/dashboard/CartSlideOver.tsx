import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CartItem, ActiveOrder } from '../../types/navigation';

interface CartSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: ActiveOrder) => void;
  currentLocation: string;
}

export const CartSlideOver: React.FC<CartSlideOverProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  currentLocation,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'telebirr' | 'cbe_birr'>('telebirr');
  const [customerName, setCustomerName] = useState('Abebe Bikila');
  const [customerPhone, setCustomerPhone] = useState('+251 911 234 567');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.priceBirr * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;
  const serviceFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: ActiveOrder = {
      id: 'ord-' + Date.now(),
      orderNumber: 'KCH-' + Math.floor(1000 + Math.random() * 9000),
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || '+251 900 000 000',
      deliveryAddress: `${currentLocation} ${deliveryNotes ? '(' + deliveryNotes + ')' : ''}`,
      kebele: currentLocation.split('-')[1]?.trim() || 'Kebele 01',
      items: cart.map((c) => ({
        name: c.name,
        quantity: c.quantity,
        priceBirr: c.priceBirr,
        notes: c.customizationNotes,
      })),
      subtotalBirr: subtotal,
      deliveryFeeBirr: deliveryFee,
      serviceFeeBirr: serviceFee,
      totalBirr: total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending_cash' : 'paid',
      status: 'order_placed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 20,
      riderName: 'Dawit Mengistu',
      riderPhone: '+251 912 888 999',
      riderVehicle: 'KECH Eco-Bicycle #07',
      riderRating: 4.95,
      merchantName: cart[0]?.merchantName || 'Asela Partner Merchant',
      merchantLocation: 'Central Asela Hub',
    };

    onPlaceOrder(newOrder);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-purple-50/50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-kechPurple text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Your Cart</h3>
                <span className="text-xs text-gray-500 font-medium">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} from Asela
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30 text-kechPurple" />
                <h4 className="font-bold text-gray-700 text-base">Your cart is empty</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Add fresh meals, coffee, pastries, or groceries from Asela restaurants to start your order.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3 items-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-sm text-gray-900 truncate">
                        {item.name}
                      </h5>
                      <span className="text-xs text-kechPurple font-extrabold">
                        {item.priceBirr} ETB
                      </span>
                      {item.customizationNotes && (
                        <p className="text-[10px] text-gray-500 truncate italic mt-0.5">
                          "{item.customizationNotes}"
                        </p>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-gray-200 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-200 space-y-4">
                {/* Delivery Location Preview */}
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-kechPurple shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-kechPurple block">Delivering To:</span>
                    <span className="text-gray-700">{currentLocation}</span>
                  </div>
                </div>

                {/* Contact and Gate Notes */}
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Customer Name & Phone
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Full Name"
                        className="px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-kechPurple"
                      />
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-kechPurple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Drop-off Notes / Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Near Arada Pharmacy, green gate, call on arrival"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-kechPurple"
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('telebirr')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                        paymentMethod === 'telebirr'
                          ? 'border-kechOrange bg-orange-50 text-kechOrangeDark ring-2 ring-kechOrange/30'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">📱</span>
                      <span>Telebirr</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cbe_birr')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                        paymentMethod === 'cbe_birr'
                          ? 'border-purple-600 bg-purple-50 text-kechPurple ring-2 ring-purple-600/30'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">🏦</span>
                      <span>CBE Birr</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-600/30'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">💵</span>
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">{subtotal} ETB</span>
                </div>
                <div className="flex justify-between">
                  <span>Bicycle Delivery Fee</span>
                  <span className="font-bold text-gray-800">{deliveryFee} ETB</span>
                </div>
                <div className="flex justify-between">
                  <span>KECH Tech Service Fee</span>
                  <span className="font-bold text-gray-800">{serviceFee} ETB</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Due</span>
                  <span className="text-kechPurple font-black text-base">{total} ETB</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-kechOrange hover:bg-kechOrangeDark text-white font-extrabold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
              >
                <span>Place Delivery Order • {total} ETB</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
