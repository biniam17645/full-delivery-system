import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  IdCard, 
  Smartphone, 
  Bike, 
  CheckCircle, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Navigation, 
  Phone, 
  UploadCloud, 
  Sliders,
  Sparkles
} from 'lucide-react';

interface RidersPageProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
}

export const RidersPage: React.FC<RidersPageProps> = ({ onNotify }) => {
  // Earnings Calculator State
  const [tripsPerDay, setTripsPerDay] = useState<number>(14);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  // Payout calculation: base 40 ETB + average 15 ETB tip = 55 ETB per trip
  const payoutPerTrip = 55;
  const estimatedDaily = tripsPerDay * payoutPerTrip;
  const estimatedWeekly = estimatedDaily * daysPerWeek;
  const estimatedMonthly = Math.round(estimatedWeekly * 4.33);

  // Active Rider Duty Preview State
  const [isRiderOnline, setIsRiderOnline] = useState(true);
  const [activeDeliveryStatus, setActiveDeliveryStatus] = useState<'assigned' | 'picked_up' | 'delivered'>('assigned');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kebele, setKebele] = useState('Kebele 01');
  const [nationalId, setNationalId] = useState('');
  const [hasBicycle, setHasBicycle] = useState(true);
  const [phoneType, setPhoneType] = useState('Android');
  const [shiftPreference, setShiftPreference] = useState('Flexible / Full-Time');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !nationalId) return;

    setSubmitted(true);
    onNotify(
      'success',
      'Rider Application Received',
      `Welcome ${fullName}! Your rider profile has been registered with KECH Dispatch in Asela.`
    );
  };

  return (
    <section className="bg-gray-50 pb-20 animate-in fade-in duration-300">
      {/* Rider Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-kechPurple to-purple-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-3.5 py-1.5 bg-kechOrange/20 border border-kechOrange/30 text-kechOrangeLight rounded-full text-xs font-bold uppercase tracking-wider">
              KECH Express Rider Program
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Ride, Deliver & Earn On Your Terms in <span className="text-kechOrange">Asela</span>
            </h1>
            <p className="mt-4 text-purple-200 text-base sm:text-lg">
              Deliver food, coffee, and local parcels on your own bicycle. Enjoy flexible hours, weekly mobile payouts, and free rider safety gear.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        {/* ================= 1. INTERACTIVE EARNINGS CALCULATOR ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-3 py-1 bg-kechOrange/10 text-kechOrangeDark rounded-full text-xs font-bold uppercase tracking-wider">
                  Income Estimator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                  Calculate Your Delivery Earnings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Average payout is 55 ETB per trip (delivery fee + customer tips in Asela).
                </p>
              </div>

              {/* Slider 1: Trips per day */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-700">Estimated Deliveries Per Day:</span>
                  <span className="text-kechPurple text-lg font-black">{tripsPerDay} trips</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tripsPerDay}
                  onChange={(e) => setTripsPerDay(Number(e.target.value))}
                  className="w-full accent-kechPurple cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>5 trips (Part-time)</span>
                  <span>15 trips (Regular)</span>
                  <span>30 trips (Power Rider)</span>
                </div>
              </div>

              {/* Slider 2: Days per week */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-700">Working Days Per Week:</span>
                  <span className="text-kechOrange text-lg font-black">{daysPerWeek} days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-kechOrange cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>1 day</span>
                  <span>4 days</span>
                  <span>7 days</span>
                </div>
              </div>
            </div>

            {/* Results Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-purple-900 to-kechPurple text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-700 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold text-kechOrange tracking-wider">
                  Estimated Take-Home Pay
                </span>
                <div className="mt-4">
                  <span className="text-xs text-purple-200 block font-semibold">Daily Projection</span>
                  <div className="text-3xl font-black text-white">
                    {estimatedDaily.toLocaleString()} <span className="text-lg text-kechOrange">ETB / day</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-700/60">
                  <span className="text-xs text-purple-200 block font-semibold">Monthly Estimated Earnings</span>
                  <div className="text-4xl font-black text-kechOrange mt-0.5">
                    {estimatedMonthly.toLocaleString()} <span className="text-xl text-white">ETB</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-700/60 text-xs text-purple-200 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero fuel cost! 100% of delivery earnings go into your pocket.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. ACTIVE RIDER DUTY DASHBOARD PREVIEW ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="px-3 py-1 bg-kechTeal/10 text-kechTeal rounded-full text-xs font-bold uppercase tracking-wider">
                Rider App Demo
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">
                Active Rider Duty & Dispatch Console
              </h2>
              <p className="text-xs text-gray-500">
                Live simulation of the mobile app used by KECH couriers across Asela.
              </p>
            </div>

            {/* Online / Offline Toggle */}
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
              <span className="text-xs font-bold text-gray-700">Duty Status:</span>
              <button
                onClick={() => setIsRiderOnline(!isRiderOnline)}
                className={`px-4 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  isRiderOnline
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isRiderOnline ? 'bg-white animate-ping' : 'bg-gray-500'}`} />
                <span>{isRiderOnline ? 'Online (Receiving Drops)' : 'Offline (Resting)'}</span>
              </button>
            </div>
          </div>

          {/* Active Trip Assignment Card */}
          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-7 p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-kechOrange uppercase tracking-wider">
                    ⚡ New Trip Assignment #KCH-4829
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Payout: 55 ETB
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-kechPurple text-white flex items-center justify-center shrink-0 text-sm">
                      🏪
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Pickup Location</span>
                      <h4 className="font-bold text-sm text-white">Gonde Cafe & Roastery</h4>
                      <p className="text-xs text-slate-300">Near Asela Main Post Office, Kebele 02</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-kechTeal text-white flex items-center justify-center shrink-0 text-sm">
                      🏠
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Dropoff Customer</span>
                      <h4 className="font-bold text-sm text-white">Dr. Sisay • Stadium Area</h4>
                      <p className="text-xs text-slate-300">Villa #14, Green Gate, Kebele 03 (Call upon arrival)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Simulation Action */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveDeliveryStatus('picked_up');
                      onNotify('info', 'Package Collected', 'Insulated backpack loaded. Head to customer dropoff.');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeDeliveryStatus === 'picked_up'
                        ? 'bg-kechOrange text-white'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    1. Arrived & Picked Up
                  </button>
                  <button
                    onClick={() => {
                      setActiveDeliveryStatus('delivered');
                      onNotify('success', 'Trip Completed!', '55 ETB credited to your KECH Courier balance.');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeDeliveryStatus === 'delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    2. Mark Delivered
                  </button>
                </div>

                <a
                  href="tel:+251911234567"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
              </div>
            </div>

            {/* Asela City Route Illustration */}
            <div className="md:col-span-5 bg-purple-50 rounded-3xl p-6 border border-purple-100 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 mb-2">Live Turn-by-Turn Route</h4>
                <p className="text-xs text-gray-600">
                  Total distance: 1.8 km (approx. 9 mins on bicycle).
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-purple-200 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-kechPurple shrink-0" />
                    <span>Turn left from Post Office onto Central Avenue (400m)</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-purple-200 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-kechOrange shrink-0" />
                    <span>Follow stadium wall straight into Kebele 03 (1.2km)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-200/60 text-xs text-gray-500 font-medium">
                ⚡ Safe bicycle lanes recognized along Stadium Road.
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. ADVANTAGE CARDS ("WHY RIDE WITH KECH") ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Why Couriers Love Riding With KECH
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Building a cleaner, healthier, and financially empowering future for Asela youth.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-kechPurple/10 text-kechPurple flex items-center justify-center mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Flexible Schedule</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Work whenever you want. Turn the app online for an hour or ride full shifts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-kechOrange/10 text-kechOrange flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Eco-Friendly Fleet</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Zero fuel emissions. Bicycle deliveries keep you fit while earning good income.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Fast Payouts</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct transfers to your Telebirr or CBE account daily or weekly without delay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-kechTeal/10 text-kechTeal flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Rider Support & Gear</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Free insulated delivery backpack, high-visibility helmet, and raincoat provided.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. ONBOARDING & REGISTRATION FORM ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-kechPurple/10 text-kechPurple rounded-full text-xs font-bold uppercase tracking-wider">
              Join The Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              Apply to Become a KECH Bicycle Rider
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Takes less than 3 minutes. Our Asela onboarding team will contact you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
              <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-emerald-900">Application Submitted!</h3>
              <p className="text-xs text-emerald-700 mt-2 max-w-md mx-auto">
                Thank you, {fullName}. We received your application for {kebele}, Asela. Please have your National ID ready when our dispatch team calls {phoneNumber}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dawit Mengistu"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+251 912..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Asela Kebele / Area</label>
                  <select
                    value={kebele}
                    onChange={(e) => setKebele(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="Kebele 01">Kebele 01 (Arada / Stadium)</option>
                    <option value="Kebele 02">Kebele 02 (Posta Bet / Center)</option>
                    <option value="Kebele 03">Kebele 03 (University Road)</option>
                    <option value="Kebele 04">Kebele 04 (Old Market)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">National ID / Resident Card #</label>
                  <input
                    type="text"
                    required
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="e.g. ASL-882194"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
              </div>

              {/* Equipment Checklist & Shift */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Smartphone Type</label>
                  <select
                    value={phoneType}
                    onChange={(e) => setPhoneType(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="Android">Android Smartphone</option>
                    <option value="iOS">Apple iPhone (iOS)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Shift Availability</label>
                  <select
                    value={shiftPreference}
                    onChange={(e) => setShiftPreference(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple bg-white"
                  >
                    <option value="Morning">Morning (7:00 AM - 1:00 PM)</option>
                    <option value="Afternoon">Afternoon (1:00 PM - 7:00 PM)</option>
                    <option value="Evening">Evening (5:00 PM - 10:00 PM)</option>
                    <option value="Flexible / Full-Time">Full-Time / Flexible</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="hasBikeCheck"
                  checked={hasBicycle}
                  onChange={(e) => setHasBicycle(e.target.checked)}
                  className="rounded text-kechOrange focus:ring-kechOrange"
                />
                <label htmlFor="hasBikeCheck" className="text-xs font-bold text-gray-700 cursor-pointer">
                  I have my own working bicycle ready for deliveries in Asela
                </label>
              </div>

              {/* Document Upload Simulation */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
                <UploadCloud className="w-6 h-6 text-kechPurple mx-auto mb-1" />
                <span className="text-xs font-bold text-gray-700 block">
                  Upload National ID Card Scan / Photo
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG or PDF up to 5MB</p>
                <input
                  type="file"
                  id="idDoc"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0].name);
                      onNotify('info', 'Document Attached', e.target.files[0].name);
                    }
                  }}
                />
                <label
                  htmlFor="idDoc"
                  className="inline-block mt-2 px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-kechPurple cursor-pointer"
                >
                  {uploadedFile ? `Attached: ${uploadedFile}` : 'Choose File'}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-kechOrange hover:bg-kechOrangeDark text-white font-extrabold py-3.5 rounded-xl shadow-lg transition cursor-pointer transform active:scale-98"
              >
                Submit Rider Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
