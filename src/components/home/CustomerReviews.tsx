import React, { useRef, useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Star, CheckCircle, PenLine, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { reviewsList, setIsReviewModalOpen } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active page index
    const totalCards = reviewsList.length;
    const scrollFraction = scrollLeft / (scrollWidth - clientWidth || 1);
    const calculatedIndex = Math.min(
      Math.floor(scrollFraction * totalCards),
      totalCards - 1
    );
    setActiveIndex(Math.max(0, calculatedIndex));
  };

  useEffect(() => {
    checkScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [reviewsList]);

  const scrollByAmount = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth : 360;
    const gap = 28; // gap between cards
    const scrollDistance = (cardWidth + gap) * (window.innerWidth >= 1024 ? 2 : 1);

    container.scrollBy({
      left: direction === 'next' ? scrollDistance : -scrollDistance,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA] relative">
      {/* Header with Title and Chevron Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E7E2DA]">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[#B89758] mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
            Patron Acclaim &bull; 4.9 / 5.0 Rating ({1400 + reviewsList.length}+ Verified Clients)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
            Words from the Atelier Circle
          </h2>
        </div>

        {/* Action Bar: Write Review + Chevrons Cluster */}
        <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-2 shadow-xs btn-tactile"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>

          {/* Luxury Chevron Navigation Buttons */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E7E2DA]">
            <button
              onClick={() => scrollByAmount('prev')}
              disabled={!canScrollPrev}
              aria-label="Previous customer reviews"
              className={`w-11 h-11 rounded-full border border-[#D5CEC5] flex items-center justify-center transition-all duration-300 btn-tactile shadow-xs ${
                canScrollPrev
                  ? 'text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] cursor-pointer'
                  : 'text-[#C4BCB3] border-[#E7E2DA] opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollByAmount('next')}
              disabled={!canScrollNext}
              aria-label="Next customer reviews"
              className={`w-11 h-11 rounded-full border border-[#D5CEC5] flex items-center justify-center transition-all duration-300 btn-tactile shadow-xs ${
                canScrollNext
                  ? 'text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] cursor-pointer'
                  : 'text-[#C4BCB3] border-[#E7E2DA] opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Carousel Wrapper with Side Overlay Controls */}
      <div className="relative group">
        {/* Floating Side Chevron Left (Visible on desktop hover) */}
        {canScrollPrev && (
          <button
            onClick={() => scrollByAmount('prev')}
            aria-label="Scroll reviews left"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#D5CEC5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] shadow-xl items-center justify-center transition-all duration-300 btn-tactile opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Floating Side Chevron Right (Visible on desktop hover) */}
        {canScrollNext && (
          <button
            onClick={() => scrollByAmount('next')}
            aria-label="Scroll reviews right"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#D5CEC5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] shadow-xl items-center justify-center transition-all duration-300 btn-tactile opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 lg:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 pt-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="snap-start shrink-0 w-[88vw] sm:w-[380px] lg:w-[calc(33.333%-19px)] bg-white p-7 sm:p-8 border border-[#E7E2DA] flex flex-col justify-between shadow-xs hover:border-[#1A1A1A] hover:shadow-md transition-all duration-300 relative group/card"
            >
              {/* Subtle luxury quote watermark */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#E7E2DA]/50 pointer-events-none group-hover/card:text-[#B89758]/20 transition-colors" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-1 text-[#B89758]">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A] font-medium leading-snug pt-1">
                  &ldquo;{rev.headline}&rdquo;
                </h3>
                <p className="text-xs sm:text-[13px] text-[#59514A] leading-relaxed font-light">
                  {rev.text}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E2DA]/80 space-y-1 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#1A1A1A] tracking-tight">{rev.author}</span>
                  <CheckCircle className="w-3 h-3 text-[#2B5138]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#2B5138] font-medium ml-0.5">Verified</span>
                </div>
                <div className="text-[11px] text-[#8C827A] flex items-center justify-between pt-0.5">
                  <span>{rev.location}</span>
                  <span className="italic text-[#8C827A] truncate max-w-[170px]">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Bar Indicators at Bottom */}
      <div className="flex items-center justify-between pt-8 border-t border-[#E7E2DA]/60 mt-4">
        {/* Counter */}
        <span className="text-[11px] font-mono tracking-widest text-[#8C827A]">
          0{Math.min(activeIndex + 1, reviewsList.length)} <span className="text-[#C4BCB3]">/</span> 0{reviewsList.length}
        </span>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {reviewsList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 bg-[#1A1A1A]'
                  : 'w-1.5 bg-[#D5CEC5] hover:bg-[#8C827A]'
              }`}
            />
          ))}
        </div>

        {/* Inline Mobile Chevron Hints */}
        <div className="flex items-center gap-1 sm:hidden">
          <button
            onClick={() => scrollByAmount('prev')}
            disabled={!canScrollPrev}
            className="p-1 text-[#1A1A1A] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollByAmount('next')}
            disabled={!canScrollNext}
            className="p-1 text-[#1A1A1A] disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
