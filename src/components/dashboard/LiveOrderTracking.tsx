import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Bike, 
  ChefHat, 
  Package, 
  PartyPopper, 
  ArrowLeft,
  Navigation,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ActiveOrder, PageType } from '../../types/navigation';

interface LiveOrderTrackingProps {
  order: ActiveOrder | null;
  onAdvanceOrderStatus?: (orderId: string) => void;
  onBackToDashboard: () => void;
}

export const LiveOrderTracking: React.FC<LiveOrderTrackingProps> = ({
  order,
  onAdvanceOrderStatus,
  onBackToDashboard,
}) => {
  const [countdown, setCountdown] = useState<number>(order ? order.estimatedMinutes : 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Default fallback order if opened directly
  const activeOrder: ActiveOrder = order || {
    id: 'ord-demo',
    orderNumber: 'KCH-4829',
    customerName: 'Abebe Bikila',
    customerPhone: '+251 911 234 567',
    deliveryAddress: 'Stadium Area, Villa #14 (Kebele 03), Asela',
    kebele: 'Kebele 03',
    items: [
      { name: 'Special Asela Beef Tibs', quantity: 1, priceBirr: 320, notes: 'Extra spicy, hot awaze' },
      { name: 'Special Habesha Macchiato', quantity: 2, priceBirr: 110, notes: 'Medium sugar' },
    ],
    subtotalBirr: 430,
    deliveryFeeBirr: 25,
    serviceFeeBirr: 10,
    totalBirr: 465,
    paymentMethod: 'telebirr',
    paymentStatus: 'paid',
    status: 'on_the_way',
    placedAt: '12:35 PM',
    estimatedMinutes: 18,
    riderName: 'Dawit Mengistu',
    riderPhone: '+251 912 888 999',
    riderVehicle: 'KECH Eco-Bicycle #07',
    riderRating: 4.95,
    merchantName: 'Ras Hotel Restaurant Asela',
    merchantLocation: 'Central Avenue, Kebele 01',
  };

  const steps = [
    { key: 'order_placed', label: 'Order Placed', icon: CheckCircle2, time: '12:35 PM' },
    { key: 'merchant_preparing', label: 'Merchant Preparing', icon: ChefHat, time: '12:38 PM' },
    { key: 'rider_picked_up', label: 'Rider Picked Up', icon: Package, time: '12:46 PM' },
    { key: 'on_the_way', label: 'On the Way', icon: Bike, time: '12:49 PM' },
    { key: 'delivered', label: 'Delivered', icon: PartyPopper, time: 'Est. 12:55 PM' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === activeOrder.status);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 3; // Default to 'on_the_way'

  const stepMessages: Record<string, string> = {
    order_placed: 'Your order was sent to the kitchen at ' + activeOrder.merchantName,
    merchant_preparing: 'Chef is sizzling your fresh dishes and packing them securely',
    rider_picked_up: `${activeOrder.riderName} loaded your delivery in the insulated KECH backpack`,
    on_the_way: `${activeOrder.riderName} is cycling toward ${activeOrder.kebele} • Arriving soon!`,
    delivered: 'Order handed over safely! Enjoy your fresh meal in Asela.',
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-sm font-bold text-kechPurple hover:text-kechPurpleDark transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurant Catalog</span>
        </button>

        {onAdvanceOrderStatus && (
          <button
            onClick={() => onAdvanceOrderStatus(activeOrder.id)}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-kechOrange/10 text-kechOrangeDark hover:bg-kechOrange/20 border border-kechOrange/30 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Simulate Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Order Status Header */}
      <div className="bg-gradient-to-r from-kechPurpleDark via-kechPurple to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-kechOrange text-white text-xs font-black rounded-lg">
                LIVE DISPATCH
              </span>
              <span className="text-purple-200 text-sm font-semibold">
                Order #{activeOrder.orderNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              {stepMessages[activeOrder.status] || 'Delivery in progress...'}
            </h1>
            <p className="text-purple-200 text-xs sm:text-sm mt-1">
              From <strong className="text-white">{activeOrder.merchantName}</strong> to{' '}
              <strong className="text-white">{activeOrder.deliveryAddress}</strong>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-xs text-purple-200 block uppercase font-bold tracking-wider">
              Estimated Arrival
            </span>
            <div className="text-3xl sm:text-4xl font-black text-kechOrange mt-0.5 flex items-center justify-center gap-1">
              <Clock className="w-6 h-6" />
              <span>{countdown} mins</span>
            </div>
            <span className="text-[11px] text-purple-200 font-medium">Bicycle Courier In Asela</span>
          </div>
        </div>
      </div>

      {/* 5-Step Visual Progress Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md">
        <h2 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-kechPurple" />
          <span>Real-Time Order Lifecycle</span>
        </h2>

        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-1 bg-gray-200 -translate-y-1/2 z-0">
            <div
              className="h-full bg-kechOrange transition-all duration-500"
              style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {steps.map((st, i) => {
              const Icon = st.icon;
              const isPast = i < activeIndex;
              const isCurrent = i === activeIndex;

              return (
                <div
                  key={st.key}
                  className={`flex sm:flex-col items-center gap-3 p-3 rounded-2xl sm:text-center transition ${
                    isCurrent
                      ? 'bg-orange-50 border border-kechOrange/30 sm:bg-transparent sm:border-0'
                      : ''
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm transition shrink-0 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-kechOrange text-white ring-4 ring-kechOrange/20 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-kechOrangeDark'
                          : isPast
                          ? 'text-emerald-700 font-extrabold'
                          : 'text-gray-400'
                      }`}
                    >
                      {st.label}
                    </h4>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{st.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Courier Details + Asela Route Map Graphic */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Courier Details Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-200 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-kechPurple bg-purple-50 px-3 py-1 rounded-full">
              Your Assigned Courier
            </span>

            <div className="flex items-center gap-4 mt-5">
              <div className="w-16 h-16 rounded-2xl bg-kechOrange/10 border-2 border-kechOrange flex items-center justify-center text-3xl shrink-0">
                🚴
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">{activeOrder.riderName}</h3>
                <p className="text-xs text-gray-500 font-medium">{activeOrder.riderVehicle}</p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-kechOrange font-black">★ {activeOrder.riderRating}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-emerald-700 font-semibold">240+ completed trips</span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-1">
              <div className="font-bold text-gray-800">Current Courier Status:</div>
              <p>📍 En route on Stadium Avenue toward Kebele 03. Insulated bag sealed.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={`tel:${activeOrder.riderPhone}`}
              className="py-3 px-4 bg-kechPurple hover:bg-kechPurpleDark text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Call Courier</span>
            </a>
            <button
              onClick={() => alert(`Sending message to courier ${activeOrder.riderName}...`)}
              className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send SMS</span>
            </button>
          </div>
        </div>

        {/* Live Delivery Route Map Illustration */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-200 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Asela Delivery Route Simulation</h3>
              <p className="text-xs text-gray-500">Live coordinates: 7.9572° N, 39.1295° E</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span>GPS Connected</span>
            </span>
          </div>

          <div className="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-700">
            {/* SVG Map Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" fill="none">
              {/* City Grid */}
              <path d="M0 75 H600 M0 150 H600 M0 225 H600" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" />
              <path d="M150 0 V300 M300 0 V300 M450 0 V300" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" />

              {/* Delivery Path */}
              <path
                d="M100 200 Q 250 80 500 150"
                stroke="#FF9800"
                strokeWidth="5"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>

            {/* Merchant Hub Pin (Start) */}
            <div className="absolute left-16 bottom-16 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-kechPurple border-2 border-white flex items-center justify-center text-white text-xs shadow-lg">
                🏪
              </div>
              <span className="text-[10px] font-bold text-white bg-kechPurple/90 px-2 py-0.5 rounded mt-1 shadow">
                {activeOrder.merchantName.split(' ')[0]}
              </span>
            </div>

            {/* Customer Dropoff Pin (End) */}
            <div className="absolute right-16 top-20 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-kechTeal border-2 border-white flex items-center justify-center text-white text-xs shadow-lg">
                🏠
              </div>
              <span className="text-[10px] font-bold text-white bg-kechTeal/90 px-2 py-0.5 rounded mt-1 shadow">
                Your House ({activeOrder.kebele})
              </span>
            </div>

            {/* Moving Bicycle Courier Icon */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-kechOrange flex items-center justify-center text-kechOrange shadow-xl">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-gray-900 bg-white/95 px-2 py-0.5 rounded-full mt-1 border border-kechOrange shadow-md whitespace-nowrap">
                🚴 Dawit (Active)
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Pickup: {activeOrder.merchantLocation}</span>
            <span>Speed: 18 km/h</span>
            <span>Dropoff: {activeOrder.kebele}</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md">
        <h3 className="font-extrabold text-base text-gray-900 mb-4">
          Order Summary & Payment Breakdown
        </h3>

        <div className="divide-y divide-gray-100">
          {activeOrder.items.map((it, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-sm">
              <div>
                <span className="font-bold text-gray-900">
                  {it.quantity}x {it.name}
                </span>
                {it.notes && (
                  <p className="text-xs text-gray-500 italic mt-0.5">Note: {it.notes}</p>
                )}
              </div>
              <span className="font-extrabold text-gray-800">
                {it.priceBirr * it.quantity} ETB
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 mt-4 space-y-1.5 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{activeOrder.subtotalBirr} ETB</span>
          </div>
          <div className="flex justify-between">
            <span>Bicycle Delivery Fee</span>
            <span>{activeOrder.deliveryFeeBirr} ETB</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>{activeOrder.serviceFeeBirr} ETB</span>
          </div>
          <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t">
            <span>Total Paid ({activeOrder.paymentMethod.toUpperCase()})</span>
            <span className="text-kechPurple text-base">{activeOrder.totalBirr} ETB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
