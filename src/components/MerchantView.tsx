import React, { useState } from 'react';
import { 
  Store, 
  ChefHat, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Layers, 
  Plus, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';
import { Merchant, Order, Product, LanguageCode } from '../types';
import { getTranslation } from '../i18n';

interface MerchantViewProps {
  language: LanguageCode;
  merchants: Merchant[];
  orders: Order[];
  products: Product[];
  onAcceptOrder: (orderId: string) => void;
  onMarkReady: (orderId: string) => void;
  onToggleProductAvailability: (productId: string) => void;
}

export const MerchantView: React.FC<MerchantViewProps> = ({
  language,
  merchants,
  orders,
  products,
  onAcceptOrder,
  onMarkReady,
  onToggleProductAvailability
}) => {
  const t = getTranslation(language);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(merchants[0]?.id || 'merch-ras-hotel');
  const [merchantTab, setMerchantTab] = useState<'kitchen' | 'menu' | 'finances'>('kitchen');

  const currentMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];
  const merchantOrders = orders.filter(o => o.merchantId === selectedMerchantId);
  const merchantProducts = products.filter(p => p.merchantId === selectedMerchantId);

  // Financial calculations
  const totalRevenue = merchantOrders.reduce((sum, o) => sum + o.subtotalBirr, 0);
  const kechCommission = totalRevenue * (currentMerchant.commissionRate || 0.20);
  const netPayout = totalRevenue - kechCommission;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Merchant Header Bar & Store Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
            {currentMerchant.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                {currentMerchant.name[language] || currentMerchant.name.en}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {currentMerchant.isOpen ? 'Open & Receiving' : 'Paused'}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              {currentMerchant.location.addressText} • Rate: {(currentMerchant.commissionRate * 100).toFixed(0)}% Commission
            </p>
          </div>
        </div>

        {/* Store selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-zinc-400 font-semibold hidden sm:inline">Active Merchant:</span>
          <select
            value={selectedMerchantId}
            onChange={(e) => setSelectedMerchantId(e.target.value)}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
          >
            {merchants.map(m => (
              <option key={m.id} value={m.id}>
                {m.name[language] || m.name.en} ({m.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Financial Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            {t.merchant.todayRevenue}
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
            {totalRevenue.toFixed(2)} {t.common.currency}
          </div>
          <div className="text-[11px] text-zinc-400 mt-0.5">Across {merchantOrders.length} orders</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20">
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            {t.merchant.kechCommission}
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            -{kechCommission.toFixed(2)} {t.common.currency}
          </div>
          <div className="text-[11px] text-amber-700/70 dark:text-amber-400/70 mt-0.5">
            Fixed {(currentMerchant.commissionRate * 100).toFixed(0)}% Asela platform rate
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
          <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            {t.merchant.netPayout}
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {netPayout.toFixed(2)} {t.common.currency}
          </div>
          <div className="text-[11px] text-emerald-700/70 dark:text-emerald-400/70 mt-0.5">
            Auto-settled to CBE / Telebirr
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setMerchantTab('kitchen')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            merchantTab === 'kitchen'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>{t.merchant.kitchenDisplay}</span>
          <span className="w-5 h-5 rounded-full bg-black/20 text-[11px] flex items-center justify-center font-mono">
            {merchantOrders.length}
          </span>
        </button>

        <button
          onClick={() => setMerchantTab('menu')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            merchantTab === 'menu'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t.merchant.menuManagement} ({merchantProducts.length})</span>
        </button>
      </div>

      {/* Tab: Kitchen Display System */}
      {merchantTab === 'kitchen' && (
        <div className="space-y-4">
          {merchantOrders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">No active kitchen orders right now</h3>
              <p className="text-xs text-zinc-500">New orders placed by customers in Asela will ring here instantly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {merchantOrders.map((order) => {
                const isPending = order.status === 'pending';
                const isPreparing = order.status === 'preparing';
                const isReady = order.status === 'ready_for_pickup' || order.status === 'assigned_to_driver' || order.status === 'out_for_delivery';

                return (
                  <div
                    key={order.id}
                    className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div>
                          <span className="font-mono text-xs font-black text-emerald-600 dark:text-emerald-400">
                            {order.orderNumber}
                          </span>
                          <div className="text-[11px] text-zinc-400">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isPending 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                            : isPreparing
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      {/* Items ticket */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-xs flex items-start justify-between">
                            <div>
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {item.quantity}x {item.productName}
                              </span>
                              {item.selectedOptionsSnapshot && item.selectedOptionsSnapshot.length > 0 && (
                                <div className="text-[10px] text-amber-600 dark:text-amber-400 pl-4">
                                  {item.selectedOptionsSnapshot.map((s: any) => `${s.group}: ${s.choice}`).join(' | ')}
                                </div>
                              )}
                            </div>
                            <span className="font-mono text-zinc-600 dark:text-zinc-400">
                              {item.totalPriceBirr} {t.common.currency}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs flex justify-between font-bold">
                        <span>Total Payable</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{order.subtotalBirr} {t.common.currency}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2">
                      {isPending && (
                        <button
                          onClick={() => onAcceptOrder(order.id)}
                          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <ChefHat className="w-4 h-4" />
                          <span>{t.merchant.acceptOrder}</span>
                        </button>
                      )}

                      {isPreparing && (
                        <button
                          onClick={() => onMarkReady(order.id)}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{t.merchant.markReady}</span>
                        </button>
                      )}

                      {isReady && (
                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          ✓ Ready for Courier Pickup
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Menu & Inventory Manager */}
      {merchantTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {t.merchant.menuManagement}
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              Unified Schema: Food Modifiers + Retail SKUs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchantProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      prod.productType === 'retail' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {prod.productType === 'retail' ? 'Retail SKU / Inventory' : 'Kitchen Food Item'}
                    </span>
                    <button
                      onClick={() => onToggleProductAvailability(prod.id)}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    >
                      {prod.isAvailable ? (
                        <span className="text-emerald-600 dark:text-emerald-400">● Active</span>
                      ) : (
                        <span className="text-rose-500">○ Off Menu</span>
                      )}
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {prod.name[language] || prod.name.en}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {prod.description[language] || prod.description.en}
                  </p>

                  {/* Food options count or retail variants */}
                  <div className="mt-2 text-[11px] text-zinc-400">
                    {prod.productType === 'food' ? (
                      <span>Modifiers: {prod.optionGroups?.length || 0} groups (Sugar, Milk, Injera)</span>
                    ) : (
                      <span>SKU: {prod.sku || 'N/A'} • Stock: {prod.stockQuantity}</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="font-black text-sm text-zinc-900 dark:text-zinc-100">
                    {prod.basePriceBirr} {t.common.currency}
                  </span>
                  <button
                    onClick={() => onToggleProductAvailability(prod.id)}
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                  >
                    Toggle Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
