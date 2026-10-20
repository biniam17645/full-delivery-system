import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  UserPlus, 
  CheckCircle2, 
  LogIn 
} from 'lucide-react';

interface ConsumersPageProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  onLoginSuccess?: () => void;
}

export const ConsumersPage: React.FC<ConsumersPageProps> = ({ onNotify, onLoginSuccess }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const authSectionRef = useRef<HTMLDivElement>(null);

  // Auto cycle carousel slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev % 3) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAuth = () => {
    if (authSectionRef.current) {
      authSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    onNotify('success', 'Sign In Successful', `Welcome back, ${loginEmail}! Taking you to your Customer Dashboard.`);
    if (onLoginSuccess) {
      setTimeout(() => onLoginSuccess(), 600);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupUsername || !signupEmail || !signupPassword) return;
    if (signupPassword !== signupConfirmPassword) {
      onNotify('warning', 'Password Mismatch', 'The passwords entered do not match. Please try again.');
      return;
    }
    onNotify('success', 'Account Created', `Welcome to KECH, ${signupUsername}! Your customer dashboard is ready.`);
    if (onLoginSuccess) {
      setTimeout(() => onLoginSuccess(), 600);
    }
  };

  const handleGoogleAuth = () => {
    onNotify('info', 'Google Integration', 'Authenticated with Google Account! Loading Customer Dashboard...');
    if (onLoginSuccess) {
      setTimeout(() => onLoginSuccess(), 600);
    }
  };

  const handleMockOrder = (itemName: string) => {
    onNotify('success', 'Item Selected', `${itemName} added! Sign in or register to complete your order.`);
    scrollToAuth();
  };

  return (
    <section className="animate-in fade-in duration-300">
      {/* Hero Carousel Area */}
      <div className="relative bg-gradient-to-b from-purple-900 via-kechPurple to-purple-800 text-white pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3.5 py-1.5 bg-kechOrange/20 border border-kechOrange/30 text-kechOrangeLight rounded-full text-xs font-bold uppercase tracking-wider">
              Consumer Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Hot Meals, Drinks, Fashion & Documents <br /><span className="text-kechOrange">Delivered In Minutes</span>
            </h1>
            <p className="text-purple-100 text-base sm:text-lg mt-3">
              One platform for all your daily needs — groceries, cosmetics, fresh food, or urgent office documents.
            </p>
            
            {/* Smooth Scroll Order Now Button */}
            <div className="mt-6">
              <button 
                onClick={scrollToAuth} 
                className="bg-kechOrange hover:bg-kechOrangeDark text-white px-8 py-3.5 rounded-xl font-extrabold shadow-lg hover:shadow-xl transition flex items-center gap-2 mx-auto transform active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order Now</span>
              </button>
            </div>
          </div>

          {/* VISIBLE SVG / CSS ILLUSTRATED CAROUSEL SLIDES */}
          <div className="max-w-4xl mx-auto relative mt-8">
            
            {/* Slide 1: Food & Meals */}
            {currentSlide === 1 && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-center text-white flex flex-col items-center justify-center h-56 shadow-inner">
                    <span className="text-6xl mb-2 select-none">🍔☕</span>
                    <span className="font-extrabold text-lg">Hot Restaurant Meals</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-kechOrange text-white text-xs font-bold rounded-lg uppercase">
                      Fresh Meals
                    </span>
                    <h3 className="text-2xl font-bold mt-2">Burgers, Pastry & Habesha Dishes</h3>
                    <p className="text-purple-100 text-sm mt-2">
                      Order from top local cafes with fast bicycle delivery across Asela.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Drinks & Beverages */}
            {currentSlide === 2 && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-8 text-center text-white flex flex-col items-center justify-center h-56 shadow-inner">
                    <span className="text-6xl mb-2 select-none">🧃🧋</span>
                    <span className="font-extrabold text-lg">Fresh Juices & Drinks</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-kechTeal text-white text-xs font-bold rounded-lg uppercase">
                      Beverages
                    </span>
                    <h3 className="text-2xl font-bold mt-2">Fresh Juices & Smoothies</h3>
                    <p className="text-purple-100 text-sm mt-2">
                      Cold beverages, coffee, and fruit juices delivered straight to your desk.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Fashion, Beauty & Documents */}
            {currentSlide === 3 && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white flex flex-col items-center justify-center h-56 shadow-inner">
                    <span className="text-6xl mb-2 select-none">👗💄📄</span>
                    <span className="font-extrabold text-lg">Fashion & Documents</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-kechPurpleLight text-white text-xs font-bold rounded-lg uppercase">
                      Retail & Express
                    </span>
                    <h3 className="text-2xl font-bold mt-2">Clothes, Beauty & Parcels</h3>
                    <p className="text-purple-100 text-sm mt-2">
                      Send urgent document parcels or buy cosmetics and clothing with ease.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-3 mt-6">
              {[1, 2, 3].map((num) => (
                <button 
                  key={num}
                  onClick={() => setCurrentSlide(num)} 
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentSlide === num ? 'bg-kechOrange scale-125' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${num}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Smooth Gradient Blur Transition Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
      </div>

      {/* LOGIN & SIGNUP AUTHENTICATION SECTION */}
      <div ref={authSectionRef} id="auth-consumer-section" className="py-16 lg:py-24 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Interactive App Mockup & Text */}
            <div className="lg:col-span-6">
              <span className="px-3 py-1 bg-kechPurple/10 text-kechPurple rounded-full text-xs font-bold uppercase tracking-wider">
                Order In Seconds
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
                Access Your KECH Account
              </h2>
              <p className="mt-3 text-gray-600">
                Sign in or create a new account to unlock order tracking, saved addresses, and exclusive discounts.
              </p>

              {/* High-Fidelity Interactive AI App Mockup */}
              <div className="mt-8 bg-gray-900 p-4 rounded-3xl shadow-xl border-4 border-gray-700 max-w-md">
                <div className="bg-white rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-extrabold text-sm text-kechPurple">KECH Consumer</span>
                    <span className="text-xs bg-kechOrange/20 text-kechOrangeDark px-2 py-0.5 rounded-full font-bold">
                      Asela
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100 hover:border-kechOrange/30 transition">
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none">🍕</span>
                        <div>
                          <div className="text-xs font-bold">Fresh Pizza & Burger</div>
                          <div className="text-[10px] text-gray-400">15-20 min • Birr 30 Delivery</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleMockOrder('Fresh Pizza & Burger')}
                        className="bg-kechOrange hover:bg-kechOrangeDark text-white text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer transition"
                      >
                        Order
                      </button>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100 hover:border-kechPurple/30 transition">
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none">🧃</span>
                        <div>
                          <div className="text-xs font-bold">Juice & Coffee Bar</div>
                          <div className="text-[10px] text-gray-400">10-15 min • Birr 25 Delivery</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleMockOrder('Juice & Coffee Bar')}
                        className="bg-kechPurple hover:bg-kechPurpleDark text-white text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer transition"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Auth Form Card (Login / Signup + Google) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 relative z-30">
                
                {/* Tab Switcher */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button 
                    onClick={() => setActiveTab('login')} 
                    className={`flex-1 pb-3 text-center text-lg font-bold border-b-2 transition flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'login'
                        ? 'border-kechPurple text-kechPurple'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <LogIn className="w-5 h-5" /> Login
                  </button>
                  <button 
                    onClick={() => setActiveTab('signup')} 
                    className={`flex-1 pb-3 text-center text-lg font-bold border-b-2 transition flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'signup'
                        ? 'border-kechPurple text-kechPurple'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <UserPlus className="w-5 h-5" /> Signup
                  </button>
                </div>

                {/* LOGIN FORM */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email or Phone Number
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="text" 
                          required 
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="user@kech.com or +251 9..." 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="password" 
                          required 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center text-gray-600 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded text-kechPurple focus:ring-kechPurple mr-2"
                        /> 
                        Remember me
                      </label>
                      <button 
                        type="button" 
                        onClick={() => onNotify('info', 'Password Reset', 'Password recovery link has been sent to your registered contact.')}
                        className="text-kechPurple font-semibold hover:underline cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-kechPurple hover:bg-kechPurpleDark text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
                    >
                      <ArrowRight className="w-5 h-5" /> Sign In to Order
                    </button>
                    
                    <div className="relative my-4 text-center">
                      <span className="bg-white px-3 text-xs text-gray-400 font-semibold uppercase relative z-10">
                        Or continue with
                      </span>
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                    </div>

                    {/* Google Sign In */}
                    <button 
                      type="button" 
                      onClick={handleGoogleAuth} 
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                  </form>
                )}

                {/* SIGNUP FORM */}
                {activeTab === 'signup' && (
                  <form onSubmit={handleSignupSubmit} className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Username
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="text" 
                          required 
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
                          placeholder="johndoe" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email or Phone Number
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="text" 
                          required 
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="user@kech.com or +251 9..." 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="password" 
                          required 
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <CheckCircle2 className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                        <input 
                          type="password" 
                          required 
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple/50"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-kechOrange hover:bg-kechOrangeDark text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
                    >
                      <UserPlus className="w-5 h-5" /> Create Consumer Account
                    </button>

                    <div className="relative my-4 text-center">
                      <span className="bg-white px-3 text-xs text-gray-400 font-semibold uppercase relative z-10">
                        Or sign up with
                      </span>
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                    </div>

                    {/* Google Sign Up */}
                    <button 
                      type="button" 
                      onClick={handleGoogleAuth} 
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Sign up with Google</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
