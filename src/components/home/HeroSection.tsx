import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Plus, X } from 'lucide-react';

interface CampaignSlide {
  id: string;
  image: string;
  seasonTag: string;
  title: string;
  desc: string;
  categoryFilter: string;
  lookLabel: string;
  productId: string;
  hotspot: {
    top: string;
    left: string;
  };
  atelierNotes: string[];
}

const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: 'campaign-01',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Autumn / Winter 2026 Collection',
    title: 'Form, Drapery & Quiet Solitude.',
    desc: 'Sculptural outerwear and whisper-soft Mongolian cashmere engineered with architectural restraint. Hand-finished in the historic workshops of Northern Italy.',
    categoryFilter: 'outerwear',
    lookLabel: 'Look 01 • Cashmere Greatcoat',
    productId: 'prod-coat-01',
    hotspot: { top: '54%', left: '44%' },
    atelierNotes: ['100% Traceable Fibers', 'Milan & Biella', 'Numbered Edition Run']
  },
  {
    id: 'campaign-02',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Knitwear Edition 04',
    title: 'Tactile Warmth & Architectural Ease.',
    desc: 'Substantial 5-gauge untreated organic wool spun with preserved natural lanolin. Architectural cable motifs crafted for decades of silent composure.',
    categoryFilter: 'knitwear',
    lookLabel: 'Look 02 • Cable Heritage Knit',
    productId: 'prod-knit-01',
    hotspot: { top: '48%', left: '50%' },
    atelierNotes: ['Highland Organic Fleece', 'Seamless Circular Knit', 'Naturally Thermal']
  },
  {
    id: 'campaign-03',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2200&q=90',
    seasonTag: 'Evening Atelier Capsule',
    title: 'Liquid Drape & Nightward Ease.',
    desc: 'Heavyweight 30-momme mulberry silk satin cut diagonally across the grain. Fluid sensuality and graceful motion engineered for candlelit salons.',
    categoryFilter: 'dresses',
    lookLabel: 'Look 03 • The Bias Silk Slip',
    productId: 'prod-dress-01',
    hotspot: { top: '52%', left: '50%' },
    atelierNotes: ['Grade 6A Mulberry Silk', 'Bias Cut Geometry', 'Lake Como Mills']
  }
];

export const HeroSection: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter, openProductDetail, addToCart, formatPrice } = useShop();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHotspotCard, setShowHotspotCard] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const hotspotRef = useRef<HTMLDivElement>(null);

  const activeSlide = CAMPAIGN_SLIDES[currentSlideIndex];
  const activeProduct = PRODUCTS.find(p => p.id === activeSlide.productId) || PRODUCTS[0];

  // Auto rotation timer (6.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % CAMPAIGN_SLIDES.length);
      setShowHotspotCard(false);
      setProgressKey(prev => prev + 1);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused, currentSlideIndex]);

  // Close hotspot card when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hotspotRef.current && !hotspotRef.current.contains(e.target as Node)) {
        setShowHotspotCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setShowHotspotCard(false);
    setProgressKey(prev => prev + 1);
  };

  const nextSlide = () => {
    goToSlide((currentSlideIndex + 1) % CAMPAIGN_SLIDES.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlideIndex - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length);
  };

  const handleExplore = () => {
    setSelectedCategoryFilter(activeSlide.categoryFilter);
    setActivePage('shop');
  };

  const handleLookbook = () => {
    setActivePage('lookbook');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProduct) {
      const selectedSize = activeProduct.sizes[1] || activeProduct.sizes[0] || 'M';
      const selectedColor = activeProduct.colors[0];
      addToCart(activeProduct, selectedColor, selectedSize);
      setShowHotspotCard(false);
    }
  };

  return (
    <section 
      className="relative min-h-[88vh] lg:min-h-[94vh] flex items-end justify-start overflow-hidden bg-[#141414] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Editorial Campaign Carousel"
    >
      {/* Background Editorial Images with Soft Crossfade & Ken Burns */}
      {CAMPAIGN_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-[center_35%] filter brightness-[0.74] transition-transform duration-[10000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Subtle luxury gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-[1]" />

      {/* Interactive Editorial Garment Marker */}
      <div 
        ref={hotspotRef}
        style={{ top: activeSlide.hotspot.top, left: activeSlide.hotspot.left }}
        className="absolute z-30 transition-all duration-700 pointer-events-auto"
      >
        {/* Luxury Architectural Crosshair Pin */}
        <button
          onClick={() => setShowHotspotCard(prev => !prev)}
          className="relative flex items-center gap-2.5 focus:outline-none group p-1"
          aria-label="View look specifications"
        >
          {/* Circular Architectural Pin with Smooth Rotating Crosshair */}
          <div className="w-8 h-8 rounded-full bg-white/95 text-[#141414] shadow-2xl border border-white/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Plus
              className={`w-3.5 h-3.5 transition-transform duration-300 stroke-[2.2] ${
                showHotspotCard ? 'rotate-45' : 'rotate-0'
              }`}
            />
          </div>

          {/* Understated Editorial Plaque on Hover (No AI Emojis) */}
          {!showHotspotCard && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-black/85 backdrop-blur-md border border-white/20 text-[#FAF9F6] text-[10px] uppercase tracking-[0.24em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]" />
              <span>Look Specification</span>
            </div>
          )}
        </button>

        {/* Haute Editorial Specification Card */}
        {showHotspotCard && activeProduct && (
          <div className="absolute left-0 sm:left-10 -top-24 sm:-top-16 w-80 sm:w-96 bg-[#141414]/98 backdrop-blur-2xl border border-white/20 p-5 shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-40 animate-hotspot-reveal text-left">
            {/* Top Bar: Haute Spec & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#D4CFC7] font-medium">
                  Atelier Look Specification
                </span>
              </div>
              <button 
                onClick={() => setShowHotspotCard(false)}
                className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                aria-label="Close look specification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Product Detail Layout */}
            <div className="flex gap-4 pt-4">
              <div 
                className="relative w-24 h-32 shrink-0 overflow-hidden bg-stone-900 border border-white/10 cursor-pointer group/thumb"
                onClick={() => openProductDetail(activeProduct)}
              >
                <img 
                  src={activeProduct.images[0]} 
                  alt={activeProduct.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-transparent transition-colors" />
              </div>

              <div className="flex flex-col justify-between min-w-0 flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#B89758] font-medium block">
                    {activeSlide.seasonTag}
                  </span>
                  <h4 
                    onClick={() => openProductDetail(activeProduct)}
                    className="font-serif text-base text-[#FAF9F6] font-normal leading-snug line-clamp-2 hover:text-[#B89758] cursor-pointer transition-colors pt-0.5"
                  >
                    {activeProduct.name}
                  </h4>
                  <p className="text-[11px] text-[#A69F94] line-clamp-1 font-light pt-0.5">
                    {activeProduct.subtitle || activeProduct.materials}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-sm font-medium text-[#FAF9F6]">
                    {formatPrice(activeProduct.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2.5 pt-4 mt-3 border-t border-white/10">
              <button
                onClick={() => openProductDetail(activeProduct)}
                className="bg-[#FAF9F6] hover:bg-white text-black py-2.5 px-3 text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-200 text-center flex items-center justify-center gap-1.5 btn-tactile"
              >
                <span>View Garment</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={handleQuickAdd}
                className="border border-white/30 hover:border-white text-[#FAF9F6] hover:bg-white/10 py-2.5 px-3 text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-200 text-center flex items-center justify-center gap-1.5 btn-tactile"
              >
                <ShoppingBag className="w-3 h-3 text-[#B89758]" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-32">
        <div key={currentSlideIndex} className="max-w-2xl space-y-6 animate-fade-up">
          
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

      {/* Editorial Slide Navigation & Progress Bar Bar (Bottom Right) */}
      <div className="absolute right-6 sm:right-10 lg:right-16 bottom-16 sm:bottom-20 z-20 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Look Identifier and Controls */}
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-md border border-white/15 px-4 py-2 rounded-sm text-[#FAF9F6]">
          <span className="font-mono text-xs tracking-widest text-[#B89758]">
            0{currentSlideIndex + 1} <span className="text-white/40">/</span> 0{CAMPAIGN_SLIDES.length}
          </span>
          <span className="w-[1px] h-3.5 bg-white/20" />
          <span className="text-[10px] tracking-wider uppercase text-stone-300 hidden sm:inline max-w-[150px] truncate">
            {activeSlide.lookLabel}
          </span>
          <div className="flex items-center gap-1.5 pl-1">
            <button
              onClick={prevSlide}
              aria-label="Previous look"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next look"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Hairline Progress Timer Bar */}
        <div className="w-36 sm:w-44 h-[2px] bg-white/20 overflow-hidden rounded-full">
          <div
            key={progressKey}
            style={{
              animation: isPaused ? 'none' : 'slide-timer 6.5s linear forwards',
              backgroundColor: '#B89758'
            }}
            className="h-full w-full origin-left"
          />
        </div>

        {/* Direct Slide Dots */}
        <div className="flex items-center gap-2 pt-1">
          {CAMPAIGN_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-300 ${
                idx === currentSlideIndex 
                  ? 'w-6 bg-[#B89758]' 
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
