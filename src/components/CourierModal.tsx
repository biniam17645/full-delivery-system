import React, { useState } from 'react';
import { 
  X, 
  Bike, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Smartphone,
  MapPin,
  Calendar
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface CourierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'apply';
}

export const CourierModal: React.FC<CourierModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'apply'
}) => {
  const [mode, setMode] = useState<'signin' | 'apply'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+251 9');
  const [vehicle, setVehicle] = useState<'bicycle' | 'motorbike'>('bicycle');
  const [hasSmartphone, setHasSmartphone] = useState(true);
  const [kebele, setKebele] = useState('Kebele 02');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              {mode === 'apply' ? 'Application Submitted!' : 'Welcome Back, Courier!'}
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {mode === 'apply'
                ? `Thank you, ${fullName || 'Rider'}. We have received your courier application for Asela. Our fleet manager will contact you at ${phone} to pick up your thermal delivery backpack.`
                : 'Redirecting to your courier dispatch dashboard...'}
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-900 text-xs font-bold text-left space-y-1">
              <div>🚴 Daily Asela Task Earnings: 35–45 ETB per delivery + 100% tips</div>
              <div>📍 Courier Depot: Kebele 02, next to Asela Stadium gate</div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-[#6A1B9A] text-white font-bold text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1.5">
              <BrandLogo size="md" variant="horizontal" />
              <h3 className="text-2xl font-extrabold text-gray-900 pt-2">
                {mode === 'apply' ? 'Join Kech as a Courier Rider' : 'Courier / Driver Sign In'}
              </h3>
              <p className="text-xs text-gray-500">
                {mode === 'apply'
                  ? 'Ride your bicycle or motorbike and earn daily income delivering in Asela.'
                  : 'Check your today deliveries, completed tasks, and Telebirr balance.'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex p-1 rounded-xl bg-gray-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('apply')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'apply' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
                }`}
              >
                Apply as Courier (New)
              </button>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'signin' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
                }`}
              >
                Courier Sign In
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
              {mode === 'apply' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dawit Bekele Tolosa"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700">Delivery Vehicle</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setVehicle('bicycle')}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                          vehicle === 'bicycle'
                            ? 'border-[#6A1B9A] bg-purple-50 text-[#6A1B9A]'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        <Bike className="w-5 h-5 text-[#FF9800]" />
                        <div>
                          <div className="font-extrabold text-xs">Bicycle</div>
                          <div className="text-[10px] text-gray-500">Popular in Asela</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setVehicle('motorbike')}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                          vehicle === 'motorbike'
                            ? 'border-[#6A1B9A] bg-purple-50 text-[#6A1B9A]'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        <span className="text-lg">🛵</span>
                        <div>
                          <div className="font-extrabold text-xs">Motorbike</div>
                          <div className="text-[10px] text-gray-500">Speed / Longer trips</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700">Preferred Neighborhood in Asela</label>
                    <select
                      value={kebele}
                      onChange={(e) => setKebele(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#6A1B9A] focus:outline-none bg-white"
                    >
                      <option value="Kebele 01">Kebele 01 (Stadium / Post)</option>
                      <option value="Kebele 02">Kebele 02 (Downtown Market)</option>
                      <option value="Kebele 03">Kebele 03 (Arsi University)</option>
                      <option value="Kebele 04">Kebele 04 / Gonde Area</option>
                      <option value="All Asela">All Asela Zones</option>
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-gray-700">Phone Number (Telebirr / CBE registered)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 922 456 789"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none font-mono"
                />
              </div>

              {mode === 'signin' && (
                <div className="space-y-1">
                  <label className="text-gray-700">Courier PIN</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter 4-digit PIN"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#FF9800] hover:bg-[#F57C00] text-gray-950 font-extrabold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>{mode === 'apply' ? 'Submit Courier Application' : 'Sign In as Courier'}</span>
                      <ArrowRight className="w-4 h-4 text-gray-950" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Free delivery backpack &amp; safety helmet provided</span>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
