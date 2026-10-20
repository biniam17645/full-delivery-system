import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Star, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

interface MerchantsPageProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  onOpenKdsPortal?: () => void;
}

export const MerchantsPage: React.FC<MerchantsPageProps> = ({ onNotify, onOpenKdsPortal }) => {
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Cafe');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Kebele 02 (Posta Bet)');
  const [dailyCapacity, setDailyCapacity] = useState('30 - 60 orders/day');
  const [currentDelivery, setCurrentDelivery] = useState('No current delivery service');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !phone) return;

    setSubmitted(true);
    onNotify(
      'success',
      'Merchant Application Submitted',
      `Thank you, ${ownerName}! "${businessName}" has been received for KECH Merchant Partnership in Asela.`
    );
  };

  return (
    <section className="bg-gray-50 pb-20 animate-in fade-in duration-300">
      {/* Merchant Hero */}
      <div className="bg-gradient-to-r from-purple-950 via-kechPurple to-purple-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-3.5 py-1.5 bg-kechTeal/20 border border-kechTeal/40 text-kechTeal text-xs font-bold rounded-full uppercase tracking-wider">
              KECH Merchant Partnership
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Grow Your Restaurant or Retail Store in <span className="text-kechOrange">Asela</span>
            </h1>
            <p className="mt-4 text-purple-200 text-base sm:text-lg">
              Reach thousands of hungry customers, boost daily sales, and leave the bicycle logistics completely to us.
            </p>
            {onOpenKdsPortal && (
              <div className="mt-6">
                <button
                  onClick={onOpenKdsPortal}
                  className="bg-kechOrange hover:bg-kechOrangeDark text-white px-6 py-3 rounded-xl font-extrabold text-xs shadow-lg transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Launch Merchant Kitchen KDS Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        {/* ================= 1. MERCHANT BENEFITS & GROWTH HIGHLIGHTS ================= */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-kechPurple/10 text-kechPurple flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 text-base mb-1">Expanded Reach</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect with thousands of households, university staff, and offices across all Asela kebeles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-kechOrange/10 text-kechOrange flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 text-base mb-1">Zero Commission Intro</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              0% commission for the first 30 days for founding partner restaurants and bakeries in Asela.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 text-base mb-1">Real-Time Analytics</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Track revenue, popular dishes, customer reviews, and kitchen prep times in real time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-kechTeal/10 text-kechTeal flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 text-base mb-1">Express Dispatch</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No need to hire delivery staff. Dedicated bicycle couriers arrive the moment food is ready.
            </p>
          </div>
        </div>

        {/* ================= 2. MERCHANT ANALYTICS DASHBOARD PREVIEW ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-8">
          <div>
            <span className="px-3 py-1 bg-kechPurple/10 text-kechPurple rounded-full text-xs font-bold uppercase tracking-wider">
              Analytics Demo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              Merchant Growth & Performance Dashboard
            </h2>
            <p className="text-xs text-gray-500">
              Sample live metrics from a registered restaurant in Asela (Ras Hotel Restaurant).
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
              <span className="text-xs font-bold text-kechPurple uppercase">Monthly Revenue via KECH</span>
              <div className="text-3xl font-black text-gray-900 mt-1">
                84,520 <span className="text-kechOrange text-base">ETB</span>
              </div>
              <div className="mt-3 w-full bg-purple-200 h-2 rounded-full overflow-hidden">
                <div className="bg-kechPurple h-full w-4/5" />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">82% of monthly target reached</span>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
              <span className="text-xs font-bold text-kechOrange uppercase">Monthly Order Volume</span>
              <div className="text-3xl font-black text-gray-900 mt-1">
                512 <span className="text-gray-500 text-base font-normal">deliveries</span>
              </div>
              <div className="mt-3 w-full bg-orange-200 h-2 rounded-full overflow-hidden">
                <div className="bg-kechOrange h-full w-3/4" />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">+28% growth vs last month</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-800 uppercase">Average Customer Rating</span>
              <div className="text-3xl font-black text-gray-900 mt-1 flex items-center gap-2">
                <span>4.85</span>
                <span className="text-amber-500 text-xl">★★★★★</span>
              </div>
              <span className="text-[10px] text-emerald-700 mt-3 block font-semibold">
                Based on 388 verified local orders
              </span>
            </div>
          </div>

          {/* Top Selling Items Table */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
              <h4 className="font-extrabold text-sm text-gray-800">
                Top Performing Dishes & Items
              </h4>
              <span className="text-xs text-gray-500">Last 30 Days</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {[
                { name: 'Special Asela Beef Tibs', orders: 184, revenue: '58,880 ETB', reorder: '72%' },
                { name: 'Traditional Claypot Jebena Bunna', orders: 142, revenue: '7,100 ETB', reorder: '88%' },
                { name: 'Chilalo Double Cheese Burger', orders: 98, revenue: '19,600 ETB', reorder: '64%' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-kechPurple/10 text-kechPurple font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-600">
                    <span>{item.orders} orders</span>
                    <span className="font-black text-kechPurple">{item.revenue}</span>
                    <span className="text-emerald-600 font-bold hidden sm:inline">{item.reorder} repeat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 3. PARTNER ONBOARDING APPLICATION FORM ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-kechOrange/10 text-kechOrangeDark rounded-full text-xs font-bold uppercase tracking-wider">
              Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              Apply for Merchant Partnership
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Start selling to online customers across Asela within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-3xl bg-purple-50 border border-purple-200 text-center animate-in zoom-in-95">
              <CheckCircle className="w-14 h-14 text-kechPurple mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto">
                Thank you, {ownerName}. Our Asela Merchant Onboarding Specialist will visit "{businessName}" to photograph menu items and set up your KDS tablet terminal.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-kechPurple text-white rounded-xl text-xs font-bold hover:bg-kechPurpleDark transition"
              >
                Register Another Business
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Business / Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Soljam Hotel Restaurant"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Business Category
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                    <option value="Bakery & Pastry">Bakery & Pastry</option>
                    <option value="Supermarket / Grocery">Supermarket / Grocery</option>
                    <option value="Pharmacy / Retail">Pharmacy / Retail</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Owner / Manager Name</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Marta Kebede"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 911..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location in Asela</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="Kebele 01 (Stadium)">Kebele 01 (Near Stadium)</option>
                    <option value="Kebele 02 (Posta Bet)">Kebele 02 (Posta Bet / Commercial Bank)</option>
                    <option value="Kebele 03 (University)">Kebele 03 (Arsi University Gate)</option>
                    <option value="Kebele 04 (Market)">Kebele 04 (Old Market Square)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Daily Order Capacity</label>
                  <select
                    value={dailyCapacity}
                    onChange={(e) => setDailyCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="15 - 30 orders/day">15 - 30 orders/day</option>
                    <option value="30 - 60 orders/day">30 - 60 orders/day</option>
                    <option value="60+ orders/day">60+ orders/day (High Volume)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-kechPurple hover:bg-kechPurpleDark text-white font-extrabold py-3.5 rounded-xl shadow-lg transition cursor-pointer transform active:scale-98"
              >
                Submit Merchant Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
