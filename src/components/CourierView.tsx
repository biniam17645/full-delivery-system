import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Shield, 
  Smartphone, 
  Radio, 
  AlertCircle,
  Zap,
  Compass
} from 'lucide-react';
import { Order, Delivery, DriverLocation, LanguageCode } from '../types';
import { getTranslation } from '../i18n';

interface CourierViewProps {
  language: LanguageCode;
  orders: Order[];
  deliveries: Delivery[];
  drivers: DriverLocation[];
  onAcceptDelivery: (orderId: string) => void;
  onUpdateDeliveryStatus: (deliveryId: string, nextStatus: 'package_picked_up' | 'delivered') => void;
}

export const CourierView: React.FC<CourierViewProps> = ({
  language,
  orders,
  deliveries,
  drivers,
  onAcceptDelivery,
  onUpdateDeliveryStatus
}) => {
  const t = getTranslation(language);
  const [selectedDriver, setSelectedDriver] = useState<string>('usr-drv-2'); // Abdi Tolosa (available)
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'fleet'>('available');

  const currentDriver = drivers.find(d => d.driverId === selectedDriver) || drivers[0];

  // Orders that need a driver
  const availableOrders = orders.filter(o => 
    o.status === 'confirmed_by_merchant' || 
    o.status === 'preparing' || 
    o.status === 'ready_for_pickup'
  );

  // Active delivery in progress
  const activeDeliveriesList = deliveries.filter(d => 
    d.status === 'heading_to_pickup' || 
    d.status === 'package_picked_up' || 
    d.status === 'in_transit' ||
    d.status === 'driver_assigned'
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Top Banner & Driver Profile Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            {currentDriver.vehicleType === 'bicycle' ? <Bike className="w-7 h-7" /> : <Navigation className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black">{currentDriver.driverName}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{currentDriver.isOnline ? 'Online (Ready)' : 'Offline'}</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              {currentDriver.vehicleType === 'bicycle' ? t.courier.bicycle : t.courier.motorbike} • Asela Central Fleet
            </p>
          </div>
        </div>

        {/* Switch courier simulator profile */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Today's Payout</div>
            <div className="text-lg font-black text-emerald-400">
              380 {t.common.currency} <span className="text-xs font-normal text-zinc-400">(8 drops)</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700 text-xs">
            <span className="text-[10px] text-zinc-400 px-2 font-mono">Driver:</span>
            {drivers.map(d => (
              <button
                key={d.driverId}
                onClick={() => setSelectedDriver(d.driverId)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  selectedDriver === d.driverId
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {d.driverName.split(' ')[0]} ({d.vehicleType === 'bicycle' ? '🚲' : '🛵'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'available'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{t.courier.availableJobs}</span>
          <span className="w-5 h-5 rounded-full bg-black/20 text-[11px] flex items-center justify-center font-mono">
            {availableOrders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'active'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{t.courier.activeDelivery}</span>
          <span className="w-5 h-5 rounded-full bg-black/20 text-[11px] flex items-center justify-center font-mono">
            {activeDeliveriesList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'fleet'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Asela Fleet Radar ({drivers.length})</span>
        </button>
      </div>

      {/* Content for Available Jobs */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {availableOrders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">All Asela Orders Dispatched!</h3>
              <p className="text-xs text-zinc-500">Stand by in Kebele 02 / Stadium square for incoming orders.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableOrders.map((order) => {
                const distanceKm = 2.4;
                const courierPayout = order.deliveryFeeBirr;

                return (
                  <div
                    key={order.id}
                    className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4 hover:border-emerald-500/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {order.items.length} items
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                          +{courierPayout} {t.common.currency}
                        </div>
                        <div className="text-[10px] text-zinc-400">Driver Task Rate</div>
                      </div>
                    </div>

                    {/* Route Info */}
                    <div className="space-y-2.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            {t.courier.pickupAt}
                          </div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            {order.merchantName}
                          </div>
                        </div>
                      </div>

                      <div className="border-l border-dashed border-zinc-300 dark:border-zinc-700 ml-1.5 pl-3 py-1 flex items-center gap-4 text-[11px] text-zinc-500">
                        <span>~{distanceKm} km ride</span>
                        <span>•</span>
                        <span>~12-15 mins</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            {t.courier.dropoffAt}
                          </div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            {order.deliveryAddress.addressText}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            Customer: {order.customerName} ({order.customerPhone})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order summary */}
                    <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                      <span>Order Value: {order.totalAmountBirr} {t.common.currency}</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Payment: {order.paymentMethod === 'telebirr' ? 'Telebirr (Paid)' : order.paymentMethod === 'cbe_birr' ? 'CBE Birr (Paid)' : 'Cash (Collect)'}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onAcceptDelivery(order.id)}
                        className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{t.courier.acceptJob}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Content for Active Deliveries */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeDeliveriesList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <Bike className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">No active delivery run</h3>
              <p className="text-xs text-zinc-500">Switch to "Available Delivery Runs" to accept a new task in Asela.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveriesList.map((del) => {
                const linkedOrder = orders.find(o => o.id === del.orderId);
                const isPickedUp = del.status === 'package_picked_up' || del.status === 'in_transit';

                return (
                  <div
                    key={del.id}
                    className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-500/40 shadow-xl space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                          Live Active Run
                        </span>
                        <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                          {linkedOrder ? linkedOrder.orderNumber : del.id}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          {isPickedUp ? '🚴 On the way to Customer' : '🏪 Heading to Merchant for Pickup'}
                        </span>
                      </div>
                    </div>

                    {/* Step Tracker */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className={`p-3 rounded-2xl border ${
                        !isPickedUp 
                          ? 'border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold' 
                          : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                      }`}>
                        <div className="text-[10px] uppercase">Step 1: Pickup</div>
                        <div className="text-sm font-black mt-1">{del.pickupAddressText}</div>
                      </div>

                      <div className={`p-3 rounded-2xl border ${
                        isPickedUp 
                          ? 'border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold' 
                          : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                      }`}>
                        <div className="text-[10px] uppercase">Step 2: Dropoff</div>
                        <div className="text-sm font-black mt-1">{del.dropoffAddressText}</div>
                      </div>
                    </div>

                    {/* Asela Simulated GPS Coordinate Card */}
                    <div className="p-4 rounded-2xl bg-zinc-950 text-white font-mono text-xs space-y-2 border border-zinc-800">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>Asela Spatial Telemetry (PostGIS Point)</span>
                        </span>
                        <span>Bearing: 42° NE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>Courier Lat/Lng: <span className="text-emerald-400">7.9590° N, 39.1305° E</span></div>
                        <div>Target Lat/Lng: <span className="text-emerald-400">7.9650° N, 39.1350° E</span></div>
                      </div>
                    </div>

                    {/* Next Action Button */}
                    <div className="pt-2">
                      {!isPickedUp ? (
                        <button
                          onClick={() => onUpdateDeliveryStatus(del.id, 'package_picked_up')}
                          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{t.courier.markPickedUp}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateDeliveryStatus(del.id, 'delivered')}
                          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{t.courier.markDelivered} (Complete Task)</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Content for Fleet Radar */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drivers.map((drv) => (
            <div
              key={drv.driverId}
              className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                    {drv.vehicleType === 'bicycle' ? '🚲' : '🛵'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{drv.driverName}</h4>
                    <span className="text-[11px] text-zinc-500 capitalize">{drv.vehicleType}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  drv.isAvailable 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                }`}>
                  {drv.isAvailable ? 'Available' : 'Busy on Run'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-1">
                <div className="text-zinc-500 text-[10px]">Asela PostGIS Coordinates</div>
                <div className="text-zinc-800 dark:text-zinc-200 font-bold">
                  {drv.latitude.toFixed(4)}° N, {drv.longitude.toFixed(4)}° E
                </div>
                <div className="text-[10px] text-zinc-400">Last GPS ping: {drv.lastUpdated}</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
