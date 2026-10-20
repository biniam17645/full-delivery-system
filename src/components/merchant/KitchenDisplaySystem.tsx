import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bell, 
  DollarSign, 
  ShoppingBag, 
  Layers, 
  Store, 
  ArrowRight,
  Flame,
  Check,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Search
} from 'lucide-react';
import { Product, Merchant } from '../../types';

interface KdsOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    notes?: string;
  }[];
  elapsedMinutes: number;
  status: 'new' | 'preparing' | 'ready' | 'completed';
  type: 'app_delivery' | 'direct_counter';
  totalBirr: number;
  paymentMethod: 'telebirr' | 'cbe_birr' | 'cash';
  paymentVerified: boolean;
  timestamp: string;
}

interface KitchenDisplaySystemProps {
  products: Product[];
  outOfStockItemIds: string[];
  onToggleItemStock: (productId: string) => void;
  onNotify: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
}

export const KitchenDisplaySystem: React.FC<KitchenDisplaySystemProps> = ({
  products,
  outOfStockItemIds,
  onToggleItemStock,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'kds' | 'cashier' | 'inventory'>('kds');
  const [kdsFilter, setKdsFilter] = useState<'all' | 'new' | 'preparing' | 'ready' | 'completed'>('all');
  const [soundAlertEnabled, setSoundAlertEnabled] = useState(true);

  // KDS Orders Queue state
  const [orders, setOrders] = useState<KdsOrder[]>([
    {
      id: 'kds-1',
      orderNumber: 'KCH-4829',
      customerName: 'Abebe Bikila',
      items: [
        { name: 'Special Asela Beef Tibs', quantity: 1, notes: 'Extra spicy awaze, well done' },
        { name: 'Special Habesha Macchiato', quantity: 2, notes: 'Medium sugar' },
      ],
      elapsedMinutes: 3,
      status: 'new',
      type: 'app_delivery',
      totalBirr: 465,
      paymentMethod: 'telebirr',
      paymentVerified: true,
      timestamp: '12:35 PM',
    },
    {
      id: 'kds-2',
      orderNumber: 'KCH-4830',
      customerName: 'Marta Kebede',
      items: [
        { name: 'Chilalo Double Cheese Burger', quantity: 2, notes: 'No onions, extra napkins' },
        { name: 'Fresh Avocado Juice', quantity: 2, notes: 'Cold, with lime slice' },
      ],
      elapsedMinutes: 11,
      status: 'preparing',
      type: 'app_delivery',
      totalBirr: 520,
      paymentMethod: 'cbe_birr',
      paymentVerified: true,
      timestamp: '12:28 PM',
    },
    {
      id: 'kds-3',
      orderNumber: 'POS-019',
      customerName: 'Walk-in Counter Guest',
      items: [
        { name: 'Traditional Claypot Jebena Bunna', quantity: 3, notes: 'With fresh tena adam rue' },
        { name: 'Honey Baklava Pastry', quantity: 3 },
      ],
      elapsedMinutes: 18,
      status: 'ready',
      type: 'direct_counter',
      totalBirr: 210,
      paymentMethod: 'cash',
      paymentVerified: true,
      timestamp: '12:20 PM',
    },
    {
      id: 'kds-4',
      orderNumber: 'KCH-4821',
      customerName: 'Dr. Sisay (Arsi University)',
      items: [
        { name: 'Vegetarian Fasting Beyaynetu Deluxe', quantity: 2, notes: 'Extra shiro portion' },
      ],
      elapsedMinutes: 28,
      status: 'completed',
      type: 'app_delivery',
      totalBirr: 340,
      paymentMethod: 'telebirr',
      paymentVerified: true,
      timestamp: '12:10 PM',
    },
  ]);

  const handleAdvanceStatus = (orderId: string, nextStatus: 'preparing' | 'ready' | 'completed') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    const messages = {
      preparing: 'Order marked as In Preparation. Chef started cooking.',
      ready: 'Order is READY! Bicycle courier dispatched for pickup.',
      completed: 'Order marked completed.',
    };
    onNotify('success', 'KDS Status Updated', messages[nextStatus]);
  };

  const filteredOrders = orders.filter((o) => {
    if (kdsFilter === 'all') return true;
    return o.status === kdsFilter;
  });

  // Analytics for Cashier widget
  const totalSales = orders.reduce((sum, o) => sum + o.totalBirr, 0);
  const completedCount = orders.filter((o) => o.status === 'completed' || o.status === 'ready').length;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-16 animate-in fade-in duration-300">
      {/* Top KDS Terminal Header */}
      <div className="bg-slate-950 border-b border-slate-800 p-4 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-kechPurple flex items-center justify-center font-black text-white text-xl border-2 border-kechOrange">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">
                KECH <span className="text-kechOrange">Kitchen KDS & Cashier POS</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Terminal</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Asela Central Kitchen Hub • Touch-Optimized Interface
            </p>
          </div>
        </div>

        {/* View Switcher: Kitchen View / Cashier & POS / Out of Stock Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('kds')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kds'
                ? 'bg-kechPurple text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-kechOrange" />
            <span>Kitchen Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('cashier')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cashier'
                ? 'bg-kechPurple text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Cashier POS</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-kechPurple text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-kechTeal" />
            <span>Stock Toggles</span>
            {outOfStockItemIds.length > 0 && (
              <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {outOfStockItemIds.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ================= VIEW 1: KITCHEN DISPLAY SYSTEM ================= */}
        {activeTab === 'kds' && (
          <div className="space-y-6">
            {/* Filter Tabs & Incoming Alert Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-3xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'new', label: 'New Orders ⚡' },
                  { id: 'preparing', label: 'In Preparation 🍳' },
                  { id: 'ready', label: 'Ready for Pickup 📦' },
                  { id: 'completed', label: 'Completed ✅' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setKdsFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      kdsFilter === tab.id
                        ? 'bg-kechOrange text-white font-extrabold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>&lt; 5m New</span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block ml-2" />
                <span>5-15m Cook</span>
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block ml-2" />
                <span>&gt; 15m Rush</span>
              </div>
            </div>

            {/* Order Queue Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => {
                // Timer badge color determination
                let timerBadgeBg = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
                if (order.elapsedMinutes >= 15) {
                  timerBadgeBg = 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse';
                } else if (order.elapsedMinutes >= 5) {
                  timerBadgeBg = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
                }

                return (
                  <div
                    key={order.id}
                    className="bg-slate-950 rounded-3xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden"
                  >
                    {/* Top Order Card Header */}
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg text-white">
                              #{order.orderNumber}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              {order.type === 'app_delivery' ? '🚴 KECH App' : '🏪 Counter'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">
                            {order.customerName}
                          </span>
                        </div>

                        {/* Elapsed Timer Badge */}
                        <div
                          className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${timerBadgeBg}`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{order.elapsedMinutes} mins</span>
                        </div>
                      </div>

                      {/* Items List with Modifiers */}
                      <div className="py-4 space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
                            <div className="flex justify-between items-start">
                              <span className="font-extrabold text-sm text-white">
                                <span className="text-kechOrange font-black mr-2">
                                  {item.quantity}x
                                </span>
                                {item.name}
                              </span>
                            </div>
                            {item.notes && (
                              <div className="mt-1.5 text-xs text-amber-300 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 font-medium flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>Note: {item.notes}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="pt-3 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                        <span>Total: <strong className="text-white">{order.totalBirr} ETB</strong></span>
                        <span className="uppercase text-[10px] font-bold text-emerald-400">
                          {order.paymentMethod} • Verified
                        </span>
                      </div>

                      {order.status === 'new' && (
                        <button
                          onClick={() => handleAdvanceStatus(order.id, 'preparing')}
                          className="w-full bg-kechOrange hover:bg-kechOrangeDark text-white font-extrabold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg transform active:scale-98"
                        >
                          <Flame className="w-4 h-4" />
                          <span>Accept & Start Preparing</span>
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleAdvanceStatus(order.id, 'ready')}
                          className="w-full bg-kechPurple hover:bg-kechPurpleLight text-white font-extrabold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg transform active:scale-98"
                        >
                          <CheckCircle2 className="w-4 h-4 text-kechOrange" />
                          <span>Mark Ready for Dispatch</span>
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <div className="p-3 bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 rounded-xl text-center text-xs font-bold">
                          🚴 Rider dispatched • Awaiting handoff
                        </div>
                      )}

                      {order.status === 'completed' && (
                        <div className="p-3 bg-slate-900 text-slate-400 rounded-xl text-center text-xs font-bold">
                          ✅ Order Completed & Closed
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: CASHIER & ORDER MANAGEMENT ================= */}
        {activeTab === 'cashier' && (
          <div className="space-y-6">
            {/* Daily Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Today's Gross Sales
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  {totalSales.toLocaleString()} <span className="text-kechOrange text-lg">ETB</span>
                </div>
                <p className="text-xs text-emerald-400 mt-1">Telebirr & CBE Birr auto-reconciled</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Orders Processed
                </span>
                <div className="text-3xl font-black text-kechOrange mt-1">
                  {orders.length} <span className="text-slate-400 text-base font-normal">orders</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">3 App Deliveries, 1 Counter POS</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Avg Kitchen Prep Time
                </span>
                <div className="text-3xl font-black text-kechTeal mt-1">
                  13.4 <span className="text-slate-400 text-base font-normal">mins</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Target: under 18 mins per order</p>
              </div>
            </div>

            {/* Reconciliation Table */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden">
              <h3 className="font-extrabold text-base text-white mb-4">
                Cashier Order Reconciliation & Payment Logs
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 font-bold">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Channel</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          #{ord.orderNumber}
                        </td>
                        <td className="py-3 px-4">{ord.customerName}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold">
                            {ord.type === 'app_delivery' ? 'KECH Delivery' : 'Direct Counter'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-black text-white">{ord.totalBirr} ETB</td>
                        <td className="py-3 px-4 uppercase font-bold text-slate-300">
                          {ord.paymentMethod}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Verified
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => alert(`Print receipt for Order #${ord.orderNumber}`)}
                            className="text-kechOrange hover:underline font-bold"
                          >
                            Print Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: INVENTORY OUT-OF-STOCK TOGGLE ================= */}
        {activeTab === 'inventory' && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-white">
                Real-Time Menu Inventory & Out-of-Stock Switcher
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Toggle items when kitchen runs out of ingredients. Changes reflect instantly on the customer KECH Delivery app.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => {
                const isOutOfStock = outOfStockItemIds.includes(prod.id);

                return (
                  <div
                    key={prod.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                      isOutOfStock
                        ? 'bg-red-950/20 border-red-900/40'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name.en}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white leading-tight">
                          {prod.name.en}
                        </h4>
                        <span className="text-xs text-kechOrange font-black">
                          {prod.basePriceBirr} ETB
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleItemStock(prod.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isOutOfStock ? (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>Sold Out</span>
                        </>
                      ) : (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>In Stock</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
