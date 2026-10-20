import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Zap,
  Sparkles 
} from 'lucide-react';
import { CartItem, LanguageCode, PaymentMethod } from '../types';
import { getTranslation } from '../i18n';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderPlaced: (orderData: {
    paymentMethod: PaymentMethod;
    deliveryAddress: string;
    kebele: string;
    customerPhone: string;
  }) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  language,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced
}) => {
  const t = getTranslation(language);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telebirr');
  const [selectedKebele, setSelectedKebele] = useState<string>('Kebele 03 (Arsi University Main Campus)');
  const [phone, setPhone] = useState<string>('+251911445566');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.selectedVariant?.priceBirr ?? item.product.basePriceBirr;
    if (item.selectedOptions) {
      item.selectedOptions.forEach(opt => {
        itemPrice += opt.extraPrice;
      });
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = cartItems.length > 0 ? 35 : 0;
  const serviceFee = cartItems.length > 0 ? 10 : 0;
  const grandTotal = subtotal + deliveryFee + serviceFee;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      setTimeout(() => {
        onOrderPlaced({
          paymentMethod,
          deliveryAddress: selectedKebele,
          kebele: selectedKebele.split(' ')[0],
          customerPhone: phone
        });
        setOrderSuccess(false);
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#150F22] border border-purple-200 dark:border-purple-900/50 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                {t.customer.cartTitle}
              </h2>
              <span className="text-xs text-zinc-500">
                {cartItems.length} {t.common.items} in Asela order
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success screen animation */}
        {orderSuccess ? (
          <div className="py-12 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#009688]/15 text-[#009688] flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {t.customer.orderSuccessTitle}
            </h3>
            <p className="text-xs text-zinc-500 max-w-xs">
              {t.customer.orderSuccessDesc}
            </p>
            <div className="text-xs font-mono font-bold bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] px-3 py-1.5 rounded-lg border border-[#6A1B9A]/20">
              KCH-ASL-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center text-zinc-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              {t.customer.emptyCart}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Cart Items List */}
            <div className="space-y-2.5">
              {cartItems.map((item, idx) => {
                const itemBase = item.selectedVariant?.priceBirr ?? item.product.basePriceBirr;
                const extraOpts = item.selectedOptions?.reduce((sum, o) => sum + o.extraPrice, 0) || 0;
                const singleUnitPrice = itemBase + extraOpts;

                return (
                  <div
                    key={`cart-item-${idx}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-purple-900/30 text-xs"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="font-extrabold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.product.name[language] || item.product.name.en}
                      </div>
                      {item.selectedVariant && (
                        <div className="text-[10px] text-zinc-500">
                          SKU: {item.selectedVariant.sku} ({item.selectedVariant.name[language] || item.selectedVariant.name.en})
                        </div>
                      )}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[10px] text-[#009688]">
                          {item.selectedOptions.map(o => o.choiceName).join(', ')}
                        </div>
                      )}
                      <div className="font-black text-[#6A1B9A] dark:text-[#BA68C8] mt-0.5">
                        {singleUnitPrice * item.quantity} {t.common.currency}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-l"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-black text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-r"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Asela Delivery Address Picker */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-purple-900/30 text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#009688]" />
                <span>{t.customer.deliveryAddress}</span>
              </label>
              <select
                value={selectedKebele}
                onChange={(e) => setSelectedKebele(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs outline-none cursor-pointer"
              >
                <option value="Kebele 03 (Arsi University Main Campus)">Kebele 03 — Arsi University Main Campus</option>
                <option value="Kebele 02 (Gonde Market & Commercial Square)">Kebele 02 — Gonde Market & Commercial Square</option>
                <option value="Kebele 01 (Asela Stadium & Central Avenue)">Kebele 01 — Asela Stadium & Central Avenue</option>
                <option value="Kebele 04 (Agricultural College & Chilalo Road)">Kebele 04 — Agricultural College & Chilalo Road</option>
              </select>
            </div>

            {/* 3-Tap Payment Selector (Telebirr / CBE Birr / Cash) */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                {t.customer.selectPayment}
              </label>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {/* Telebirr */}
                <button
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'telebirr'
                      ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] ring-2 ring-[#6A1B9A]/30 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-black text-xs text-[#6A1B9A] dark:text-[#BA68C8]">telebirr</span>
                  <span className="text-[10px] text-zinc-500">Instant Pay</span>
                </button>

                {/* CBE Birr */}
                <button
                  onClick={() => setPaymentMethod('cbe_birr')}
                  className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'cbe_birr'
                      ? 'border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-[#BA68C8] ring-2 ring-[#6A1B9A]/30 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-black text-xs text-purple-700 dark:text-purple-300">CBE Birr</span>
                  <span className="text-[10px] text-zinc-500">Commercial Bank</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#FF9800] bg-[#FF9800]/15 text-[#FF9800] ring-2 ring-[#FF9800]/30 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-bold text-xs text-[#FF9800]">Cash / በደረሰ ጊዜ</span>
                  <span className="text-[10px] text-zinc-500">On Delivery</span>
                </button>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-purple-900/30 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t.customer.subtotal}</span>
                <span className="font-semibold">{subtotal} {t.common.currency}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t.customer.deliveryFee} (Asela Zone)</span>
                <span className="font-semibold">{deliveryFee} {t.common.currency}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t.customer.serviceFee}</span>
                <span className="font-semibold">{serviceFee} {t.common.currency}</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-black text-sm text-zinc-900 dark:text-zinc-100">
                <span>{t.common.total}</span>
                <span className="text-[#6A1B9A] dark:text-[#BA68C8]">{grandTotal} {t.common.currency}</span>
              </div>
            </div>
          </div>
        )}

        {/* 3-Tap Checkout Action Button in Dynamic Purple & Fast Orange */}
        {cartItems.length > 0 && !orderSuccess && (
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-2xl bg-[#6A1B9A] hover:bg-[#5A1482] disabled:opacity-50 text-white font-black text-sm shadow-xl shadow-purple-950/30 flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#FF9800] text-[#FF9800]" />
              <span>
                {isSubmitting ? t.common.loading : `${t.customer.placeOrder} • ${grandTotal} ${t.common.currency}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
