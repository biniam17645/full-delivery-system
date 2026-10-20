import React from 'react';
import { 
  X, 
  Bike, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Navigation, 
  Sparkles 
} from 'lucide-react';
import { Order, Delivery, DriverLocation, LanguageCode } from '../types';
import { getTranslation } from '../i18n';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  delivery: Delivery | null;
  driver: DriverLocation | null;
  language: LanguageCode;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  order,
  delivery,
  driver,
  language
}) => {
  const t = getTranslation(language);

  if (!isOpen || !order) return null;

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', completed: true },
    { 
      key: 'prep', 
      label: 'Kitchen Preparing', 
      completed: order.status !== 'pending' 
    },
    { 
      key: 'courier', 
      label: 'Courier Dispatched', 
      completed: order.status === 'assigned_to_driver' || order.status === 'out_for_delivery' || order.status === 'delivered' 
    },
    { 
      key: 'delivered', 
      label: 'Delivered', 
      completed: order.status === 'delivered' 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.customer.trackOrder}
            </span>
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
              {order.orderNumber}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Estimated Arrival Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-emerald-100 font-medium">{t.customer.estimatedArrival}</div>
            <div className="text-2xl font-black">15 - 20 {t.common.min}</div>
            <div className="text-[11px] text-emerald-200">Asela Zone A Express</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <Bike className="w-6 h-6 animate-bounce" />
          </div>
        </div>

        {/* Asela Interactive Route Visualizer */}
        <div className="relative h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex flex-col justify-between p-3.5 text-white font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Navigation className="w-3.5 h-3.5 animate-spin" />
              <span>Live PostGIS GPS Stream (Asela)</span>
            </span>
            <span>Speed: 18 km/h</span>
          </div>

          {/* Visual Route Mock */}
          <div className="relative my-auto flex items-center justify-between px-6">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-sm shadow-lg shadow-emerald-500/40">
                🏪
              </div>
              <span className="text-[10px] text-zinc-400 mt-1 font-sans">{order.merchantName}</span>
            </div>

            <div className="flex-1 relative mx-3 h-1 bg-zinc-800 rounded">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-amber-400 w-2/3 rounded animate-pulse" />
              <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-lg text-[10px]">
                🚲
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-sm shadow-lg shadow-amber-500/40">
                📍
              </div>
              <span className="text-[10px] text-zinc-400 mt-1 font-sans">You (Campus)</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 text-center font-sans">
            Bicycle Courier traversing Kebele 02 to Arsi University Gate 2
          </div>
        </div>

        {/* Driver Card */}
        {driver && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                🚲
              </div>
              <div>
                <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <span>{driver.driverName}</span>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded">
                    ★ 4.9
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  Kech Certified Courier • Asela Central
                </div>
              </div>
            </div>

            <a
              href="tel:+251911445566"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow transition active:scale-95"
              title="Call Courier"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-2 pt-1">
          {steps.map((st, sIdx) => (
            <div key={st.key} className="flex items-center gap-3 text-xs">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                st.completed 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
              }`}>
                {st.completed ? '✓' : sIdx + 1}
              </div>
              <span className={`font-semibold ${st.completed ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
