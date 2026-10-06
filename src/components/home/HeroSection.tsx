import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  seasonTag: string;
  title: string;
  desc: string;
  categoryFilter: string;
  atelierNotes: [string, string, string];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Autumn / Winter 2026 Collection',
    title: 'Form, Drapery & Quiet Solitude.',
    desc: 'Sculptural outerwear and whisper-soft Mongolian cashmere engineered with architectural restraint. Hand-finished in the historic workshops of Northern Italy.',
    categoryFilter: 'outerwear',
    atelierNotes: ['100% Traceable Fibers', 'Milan & Biella', 'Numbered Run']
  },
  {
    id: 'slide-02',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Knitwear Edition 04',
    title: 'Tactile Warmth & Architectural Ease.',
    desc: 'Substantial 5-gauge untreated organic wool spun with preserved natural lanolin. Architectural cable motifs crafted for decades of silent composure.',
    categoryFilter: 'knitwear',
    atelierNotes: ['Organic Highland Fleece', 'Seamless Circular Knit', 'Naturally Thermal']
  },
  {
    id: 'slide-03',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Evening Atelier Capsule',
    title: 'Liquid Drape & Nightward Ease.',
    desc: 'Heavyweight 30-momme mulberry silk satin cut diagonally across the grain. Fluid sensuality and graceful motion engineered for candlelit salons.',
    categoryFilter: 'dresses',
    atelierNotes: ['Grade 6A Mulberry Silk', 'Bias Cut Geometry', 'Como Silk Mills']
  }
];

export const HeroSection: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic smooth transition every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlide];

  const handleExplore = () => {
    setSelectedCategoryFilter(activeSlide.categoryFilter);
    setActivePage('shop');
  };

  const handleLookbook = () => {
    setActivePage('lookbook');
  };

  return (
    <section 
      className="relative min-h-[88vh] lg:min-h-[94vh] flex items-end justify-start overflow-hidden bg-[#141414] select-none"
      aria-label="Editorial Campaign"
    >
      {/* Background Images: Automatic Silky Ease-In-Out Crossfade & Subtle Drift */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-[center_35%] filter brightness-[0.76] transition-transform duration-[9000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-[1]" />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-32">
        <div key={currentSlide} className="max-w-2xl space-y-6 animate-fade-up">
          
          {/* Edition Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF9F6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89758] pulse-live" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium">
              {activeSlide.seasonTag}
            </span>
          </div>

          {/* Editorial Title */}
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FAF9F6] tracking-tight leading-[1.08]">
            {activeSlide.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#D4CFC7] font-light leading-relaxed max-w-lg">
            {activeSlide.desc}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={handleExplore}
              className="bg-[#FAF9F6] hover:bg-white text-[#141414] py-4 px-8 text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl hover:shadow-2xl btn-tactile"
            >
              <span>Explore The New Drop</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#141414]" />
            </button>

            <button
              onClick={handleLookbook}
              className="bg-transparent hover:bg-white/10 text-[#FAF9F6] border border-white/40 hover:border-white py-4 px-8 text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 backdrop-blur-sm text-center btn-tactile"
            >
              View Campaign Lookbook
            </button>
          </div>

          {/* Atelier Footnote */}
          <div className="pt-4 flex items-center gap-6 text-[11px] tracking-widest uppercase text-[#B3ACA3]">
            <span>{activeSlide.atelierNotes[0]}</span>
            <span className="w-1 h-1 rounded-full bg-[#B89758]" />
            <span>{activeSlide.atelierNotes[1]}</span>
            <span className="w-1 h-1 rounded-full bg-[#B89758] hidden sm:block" />
            <span className="hidden sm:inline">{activeSlide.atelierNotes[2]}</span>
          </div>
        </div>
      </div>

      {/* Minimalist Hairline Slide Indicator (No Box, No Chevrons, Pure Luxury) */}
      <div className="absolute right-6 sm:right-10 lg:right-16 bottom-16 sm:bottom-20 z-10 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-[1.5px] transition-all duration-500 ${
              idx === currentSlide ? 'w-8 bg-[#B89758]' : 'w-3 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
