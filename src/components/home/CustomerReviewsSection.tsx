import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../../types/navigation';

const reviewsData: ReviewItem[] = [
  {
    id: '1',
    rating: 5,
    text: '"KECH DELIVERY is ridiculously fast! Ordering lunch to our university department takes less than 20 minutes."',
    author: 'Abebe T.',
    role: 'Asela Resident',
  },
  {
    id: '2',
    rating: 5,
    text: '"Our café food revenue doubled since partnering with KECH. Their bicycle riders are polite and punctual."',
    author: 'Marta K.',
    role: 'Café Owner',
  },
  {
    id: '3',
    rating: 5,
    text: '"Riding with KECH gives me complete schedule freedom and reliable daily earnings on my own bike."',
    author: 'Dawit M.',
    role: 'Delivery Rider',
  },
  {
    id: '4',
    rating: 5,
    text: '"I needed urgent documents sent across town during peak working hours. KECH delivered them in under 15 minutes! Lifesaver."',
    author: 'Bethlehem G.',
    role: 'Office Administrator',
  },
  {
    id: '5',
    rating: 5,
    text: '"The real-time bicycle tracking is super accurate. I can watch my hot coffee and pastries make their way to my doorstep."',
    author: 'Yonas H.',
    role: 'Student & Local Consumer',
  },
  {
    id: '6',
    rating: 5,
    text: '"Our local retail store expanded to dozens of new buyers in Asela effortlessly. The merchant setup was seamless!"',
    author: 'Sara B.',
    role: 'Boutique Owner',
  },
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-purple-900 via-kechPurple to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 bg-kechOrange/20 border border-kechOrange/30 text-kechOrangeLight rounded-full text-xs font-bold uppercase tracking-wider">
            Community Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">What People Say About KECH</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <div 
              key={review.id} 
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 hover:border-kechOrange/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-kechOrange mb-3 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kechOrange text-kechOrange" />
                  ))}
                </div>
                <p className="text-purple-100 text-sm italic mb-6 leading-relaxed">{review.text}</p>
              </div>
              <div>
                <div className="font-bold text-sm text-white">{review.author}</div>
                <div className="text-xs text-purple-300">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
