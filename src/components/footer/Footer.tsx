import React, { useState } from 'react';
import { PageType } from '../../types/navigation';

interface FooterProps {
  navigateTo: (page: PageType) => void;
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo, onSubscribeNewsletter }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribeNewsletter(email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center space-x-2 mb-4 cursor-pointer select-none"
            >
              <div className="w-8 h-8 bg-kechPurple rounded-lg flex items-center justify-center text-white font-bold border border-kechOrange">
                K
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                KECH<span className="text-kechOrange"> DELIVERY</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Fast and reliable logistics connecting consumers, merchants, and riders in Asela.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-kechOrange transition cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('consumers')} 
                  className="hover:text-kechOrange transition cursor-pointer text-left"
                >
                  Consumers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('riders')} 
                  className="hover:text-kechOrange transition cursor-pointer text-left"
                >
                  KECH Drivers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('merchants')} 
                  className="hover:text-kechOrange transition cursor-pointer text-left"
                >
                  Businesses
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-kechOrange transition cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#privacy" className="hover:text-kechOrange transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-kechOrange transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Newsletter</h5>
            <p className="text-sm text-gray-400 mb-3">Stay updated with fresh deals in Asela.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                className="px-3 py-2 bg-gray-800 rounded-l-lg text-sm w-full focus:outline-none text-white border border-transparent focus:border-kechPurple"
              />
              <button 
                type="submit" 
                className="bg-kechOrange text-white px-4 rounded-r-lg font-bold hover:bg-kechOrangeDark transition cursor-pointer"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; 2026 KECH DELIVERY. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
