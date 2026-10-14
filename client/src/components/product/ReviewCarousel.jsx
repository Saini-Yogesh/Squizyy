import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { getReviews } from '../../services/api';

const ReviewCarousel = ({ productSlug }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getReviews(productSlug)
      .then(data => {
        if (data && data.length > 0) setReviews(data);
      })
      .catch(err => console.warn('Could not load reviews:', err));
  }, [productSlug]);

  if (!reviews.length) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-white/50 border-y-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} className="fill-amber-400 stroke-amber-500" />
            ))}
          </div>
          <h2 className="font-champ text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
            Loved by 1,000+ Aussies & Americans
          </h2>
          <p className="mt-2 text-sm md:text-base font-mono text-foreground/75">
            4.9 / 5.0 Average Customer Rating Across 1,000+ Verified Buyers
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden p-2">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((rev, idx) => (
                <div key={idx} className="w-full shrink-0 px-4">
                  <div className="bg-background rounded-3xl border-4 border-foreground p-8 md:p-10 shadow-md flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 mb-3">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={18} className="fill-amber-400 stroke-amber-500" />
                        ))}
                      </div>
                      <h4 className="font-champ text-xl md:text-2xl uppercase text-foreground mb-3">
                        "{rev.title}"
                      </h4>
                      <p className="text-foreground/85 text-base md:text-lg leading-relaxed font-normal">
                        "{rev.content}"
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-foreground/15 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-champ text-base uppercase text-foreground">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">
                            <CheckCircle size={12} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-foreground/60">{rev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Controls */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-foreground bg-white text-foreground hover:bg-accent-purple transition-all flex items-center justify-center shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft size={22} />
              </button>
              <div className="flex items-center gap-1.5 font-mono text-sm">
                <span className="font-bold">{currentIndex + 1}</span>
                <span className="opacity-50">/</span>
                <span>{reviews.length}</span>
              </div>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-foreground bg-white text-foreground hover:bg-accent-purple transition-all flex items-center justify-center shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ReviewCarousel;
