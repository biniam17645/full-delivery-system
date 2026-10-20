import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Quote, 
  ThumbsUp, 
  Sparkles, 
  MessageSquarePlus,
  X,
  MapPin
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  orderedItem: string;
  comment: string;
  helpfulCount: number;
}

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      name: 'Sara Tilahun',
      role: 'Student, Arsi University Main Campus',
      location: 'Kebele 03, Asela',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '2 days ago',
      orderedItem: 'Jebena Bunna & Fresh Croissant from Gonde Cafe',
      comment: 'Kech Deliveries is an absolute lifesaver during exams! Having hot claypot coffee and snacks delivered right to the campus gate in under 20 minutes is incredible. The bicycle courier was super polite.',
      helpfulCount: 24,
    },
    {
      id: 'rev-2',
      name: 'Dr. Michael Getachew',
      role: 'Staff Physician, Asela Referral Hospital',
      location: 'Kebele 01, Asela',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '3 days ago',
      orderedItem: 'Special Siga Tibs & Injera from Ras Hotel',
      comment: 'Our clinical department regularly orders lunch from Ras Hotel through Kech. The food arrives steaming hot, nicely packaged, and the 35 ETB delivery fee is very reasonable. Highly recommend to everyone in town.',
      helpfulCount: 19,
    },
    {
      id: 'rev-3',
      name: 'Bethlehem Assefa',
      role: 'High School Teacher',
      location: 'Kebele 02, Central Market',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '1 week ago',
      orderedItem: 'Mount Chilalo Pure White Honey & Produce',
      comment: 'I love that I can order 100% organic Chilalo white honey and grocery staples without having to walk through the crowded market. Bicycle delivery is green, quiet, and avoids road blocks.',
      helpfulCount: 15,
    },
    {
      id: 'rev-4',
      name: 'Yonas Kebede',
      role: 'Local Retailer & Resident',
      location: 'Gonde / Kebele 04',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '2 weeks ago',
      orderedItem: 'Special Beyaynetu Fasting Platter',
      comment: 'Super easy to order directly on the web from my laptop. Kech keeps the whole family satisfied when we have guests over. The delivery status tracking is very accurate.',
      helpfulCount: 11,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('Kebele 02, Asela');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: newName,
      role: 'Verified Asela Resident',
      location: newLocation,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: newRating,
      date: 'Just now',
      orderedItem: 'Local Cafe Order',
      comment: newComment,
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewName('');
      setNewComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#6A1B9A] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9800]" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Loved by Thousands Across Asela
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              See what students, medical staff, teachers, and families say about Kech Deliveries.
            </p>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-xs shrink-0">
            <div className="text-center border-r border-gray-100 pr-4">
              <div className="text-3xl font-black text-gray-900 font-mono">4.9</div>
              <div className="flex items-center gap-0.5 text-[#FF9800] mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FF9800]" />
                ))}
              </div>
            </div>

            <div className="text-left space-y-1">
              <div className="text-xs font-bold text-gray-900">Over 5,000+ Orders</div>
              <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>98.4% On-Time Arrival</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-bold text-[#6A1B9A] hover:underline cursor-pointer flex items-center gap-1 pt-0.5"
              >
                <MessageSquarePlus className="w-3 h-3 text-[#FF9800]" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* User Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-purple-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm sm:text-base text-gray-900">
                          {rev.name}
                        </span>
                        <span title="Verified Customer">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#009688]" />
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{rev.role}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#FF9800]" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-[#FF9800]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF9800]" />
                    ))}
                  </div>
                </div>

                {/* Ordered Item Badge */}
                <div className="px-3 py-1.5 rounded-xl bg-purple-50/70 border border-purple-100/60 text-[11px] font-bold text-[#6A1B9A] flex items-center gap-1.5">
                  <span className="text-gray-400">Ordered:</span>
                  <span className="text-gray-800">{rev.orderedItem}</span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{rev.date}</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#009688]" />
                  <span>{rev.helpfulCount} people found this helpful</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-7 space-y-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-black text-gray-900">Thank you for your review!</h4>
                  <p className="text-xs text-gray-500">Your feedback helps improve delivery across Asela.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-3 text-xs font-bold text-gray-700">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-900">Share Your Kech Experience</h3>
                    <p className="text-xs text-gray-500 font-normal">Tell Asela about your food, bunna, or goods delivery.</p>
                  </div>

                  <div className="space-y-1">
                    <label>Your Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Almaz Bekele"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#6A1B9A] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>Your Asela Kebele / Area</label>
                    <select
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#6A1B9A] focus:outline-none bg-white font-medium"
                    >
                      <option value="Kebele 01, Asela">Kebele 01 (Post Office / Stadium)</option>
                      <option value="Kebele 02, Asela">Kebele 02 (Central Market)</option>
                      <option value="Kebele 03, Asela">Kebele 03 (Arsi University)</option>
                      <option value="Kebele 04, Asela">Kebele 04 / Gonde Area</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label>Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`p-1.5 rounded-lg border text-sm transition cursor-pointer ${
                            newRating >= star ? 'border-[#FF9800] bg-amber-50 text-[#FF9800]' : 'border-gray-200 text-gray-400'
                          }`}
                        >
                          ★ {star}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label>Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="How was your delivery speed, food temperature, or courier service?"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-normal focus:border-[#6A1B9A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
