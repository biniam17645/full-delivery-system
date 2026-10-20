import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MapPin, 
  ShieldCheck,
  Building,
  Mail
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface MerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
}

export const MerchantModal: React.FC<MerchantModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'register'
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [cafeName, setCafeName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('+251 9');
  const [category, setCategory] = useState('cafe');
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
              {mode === 'register' ? 'Application Received!' : 'Welcome Back!'}
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {mode === 'register' 
                ? `Thank you for registering "${cafeName || 'your business'}". The Kech Asela merchant team will call ${phone} within 2 business hours to verify your menu and dispatch onboarding.`
                : 'Redirecting to your Kech Merchant Management Portal...'}
            </p>
            <div className="p-4 rounded-2xl bg-purple-50 text-[#6A1B9A] text-xs font-bold text-left space-y-1">
              <div>📍 Asela Merchant Support Center</div>
              <div>📞 Helpline: +251 911 445 566 (Kebele 02, Post Office Road)</div>
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
                {mode === 'register' ? 'Register Your Cafe / Restaurant' : 'Merchant Portal Sign In'}
              </h3>
              <p className="text-xs text-gray-500">
                {mode === 'register' 
                  ? 'Start accepting delivery orders from thousands of Asela residents.'
                  : 'Manage incoming orders, update menu items, and view daily payouts.'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex p-1 rounded-xl bg-gray-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'register' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
                }`}
              >
                Become a Partner (Register)
              </button>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'signin' ? 'bg-white text-[#6A1B9A] shadow-xs' : 'text-gray-600'
                }`}
              >
                Sign In to Portal
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
              {mode === 'register' && (
                <>
                  <div className="space-y-1">
                    <label className="text-gray-700">Cafe / Restaurant Name</label>
                    <input
                      type="text"
                      required
                      value={cafeName}
                      onChange={(e) => setCafeName(e.target.value)}
                      placeholder="e.g. Asela Bunna Roastery"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700">Owner or Manager Name</label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Abebe Bekele"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-gray-700">Business Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#6A1B9A] focus:outline-none bg-white"
                      >
                        <option value="cafe">Cafe &amp; Roastery</option>
                        <option value="restaurant">Ethiopian Restaurant</option>
                        <option value="bakery">Bakery &amp; Pastry</option>
                        <option value="supermarket">Grocery / Mart</option>
                        <option value="hotel">Hotel Dining</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-700">Asela Location</label>
                      <select
                        value={kebele}
                        onChange={(e) => setKebele(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#6A1B9A] focus:outline-none bg-white"
                      >
                        <option value="Kebele 01">Kebele 01 (Post / Stadium)</option>
                        <option value="Kebele 02">Kebele 02 (Downtown)</option>
                        <option value="Kebele 03">Kebele 03 (Arsi Campus)</option>
                        <option value="Kebele 04">Kebele 04 / Gonde</option>
                      </select>
                    </div>
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
                  placeholder="+251 911 234 567"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none font-mono"
                />
              </div>

              {mode === 'signin' && (
                <div className="space-y-1">
                  <label className="text-gray-700">Password / PIN</label>
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
                  className="w-full py-3.5 rounded-2xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-extrabold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{mode === 'register' ? 'Submit Partner Application' : 'Sign In to Merchant Hub'}</span>
                      <ArrowRight className="w-4 h-4 text-[#FF9800]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero commission for your first 30 days in Asela</span>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
