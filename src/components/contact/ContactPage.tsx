import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  Clock, 
  MessageCircle, 
  User, 
  Store, 
  Bike 
} from 'lucide-react';

interface ContactPageProps {
  onNotify: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNotify }) => {
  const [inquiryCategory, setInquiryCategory] = useState<'customer' | 'merchant' | 'rider'>('customer');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast are deliveries made in Asela?',
      a: 'Most food and cafe orders are delivered within 15 to 25 minutes! Our bicycle couriers bypass road traffic and operate from strategic hubs located across Kebele 01, 02, and 03.',
    },
    {
      q: 'What are the delivery fees?',
      a: 'We charge a flat 25 ETB bicycle delivery fee for standard local orders across Asela. We also feature free delivery promotions for orders over 500 ETB and exclusive partner discounts.',
    },
    {
      q: 'How can I pay for my order?',
      a: 'We accept Cash on Delivery (pay directly to the rider upon receiving your package), Telebirr QR/instant mobile payment, and Commercial Bank of Ethiopia (CBE Birr).',
    },
    {
      q: 'How do I become a merchant or bicycle rider?',
      a: 'Simply visit our "Businesses" or "KECH Drivers" tabs and fill out the quick 3-minute form. Our Asela onboarding team will contact you within 24 hours to set up your KDS menu or provide your courier gear.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactInfo || !message) return;

    setSubmitted(true);
    const categoryLabels = {
      customer: 'Customer Support',
      merchant: 'Merchant Partnership Inquiry',
      rider: 'Rider Assistance',
    };
    onNotify(
      'success',
      'Support Ticket Submitted',
      `Thank you, ${fullName}! Your ${categoryLabels[inquiryCategory]} ticket (#SUP-${Math.floor(1000 + Math.random() * 9000)}) has been dispatched to Asela support.`
    );
  };

  return (
    <section className="bg-gray-50 pb-20 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-950 via-kechPurple to-purple-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="px-3.5 py-1.5 bg-kechOrange/20 border border-kechOrange/30 text-kechOrangeLight rounded-full text-xs font-bold uppercase tracking-wider">
            24/7 Asela Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-4">
            Get in Touch With <span className="text-kechOrange">KECH Delivery</span>
          </h1>
          <p className="mt-3 text-purple-200 text-sm sm:text-base max-w-xl mx-auto">
            Need help with an ongoing order, merchant partnership, or courier application? Our dedicated team in Asela is ready.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* ================= 1. HUB INFO & OPERATIONAL HOURS ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-kechPurple/10 text-kechPurple flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Direct Phone Line</span>
              <h4 className="font-extrabold text-base text-gray-900 mt-0.5">+251 900 000 000</h4>
              <p className="text-xs text-gray-500 mt-1">Available 7 days a week</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-kechOrange/10 text-kechOrange flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Telegram Support</span>
              <h4 className="font-extrabold text-base text-gray-900 mt-0.5">@kechdelivery</h4>
              <p className="text-xs text-gray-500 mt-1">Instant chat response under 5 mins</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-kechTeal/10 text-kechTeal flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Operational Hours</span>
              <h4 className="font-extrabold text-base text-gray-900 mt-0.5">Mon - Sun: 7 AM - 10 PM</h4>
              <p className="text-xs text-gray-500 mt-1">Asela City Hub, Kebele 02</p>
            </div>
          </div>
        </div>

        {/* ================= 2. INTERACTIVE CATEGORIZED INQUIRY FORM ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Send Us an Inquiry</h2>
            <p className="text-xs text-gray-500 mt-1">
              Select your category so we can direct you to the right department in Asela.
            </p>

            {/* Category Switcher Tabs */}
            <div className="flex justify-center gap-2 mt-5">
              {[
                { id: 'customer', label: 'Customer Support', icon: User },
                { id: 'merchant', label: 'Merchant Inquiries', icon: Store },
                { id: 'rider', label: 'Rider Assistance', icon: Bike },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = inquiryCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setInquiryCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-kechPurple text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-3xl bg-purple-50 border border-purple-200 text-center animate-in zoom-in-95">
              <CheckCircle className="w-14 h-14 text-kechPurple mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Message Received!</h3>
              <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto">
                Thank you, {fullName}. Your inquiry has been submitted. A KECH team member will contact you via {contactInfo}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-kechPurple text-white rounded-xl text-xs font-bold hover:bg-kechPurpleDark transition"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Bikila"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email or Phone Number</label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="abebe@example.com or +251 9..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding delivery coverage in Kebele 04"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kechPurple"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-kechPurple hover:bg-kechPurpleDark text-white font-extrabold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* ================= 3. CATEGORIZED FAQ ACCORDION ================= */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-kechOrange/10 text-kechOrangeDark rounded-full text-xs font-bold uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-gray-900 hover:text-kechPurple transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-kechPurple' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
