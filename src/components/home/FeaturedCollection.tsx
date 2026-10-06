import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { openProductDetail, setActivePage, setSelectedCategoryFilter, formatPrice } = useShop();

  const heroItem = PRODUCTS.find(p => p.id === 'prod-coat-01') || PRODUCTS[0];
  const secondaryItem = PRODUCTS.find(p => p.id === 'prod-knit-01') || PRODUCTS[1];

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Seasonal Focus</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 font-normal">
            The Biella Cashmere Capsule
          </h2>
        </div>

        <button
          onClick={() => { setSelectedCategoryFilter('outerwear'); setActivePage('shop'); }}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors self-start md:self-auto"
        >
          <span>View All Outerwear</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Editorial Asymmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Large Editorial Portrait (7 columns) */}
        <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => openProductDetail(heroItem)}>
          <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-[#ECE8DF]">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1400&q=85"
              alt="Cashmere Overcoat Editorial"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>

          {/* Floating Editorial Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md bg-[#FAF9F6]/95 backdrop-blur-md p-4 sm:p-6 border border-[#E7E2DA] shadow-lg">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
              Core Silhouette No. 01
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-[#1A1A1A] mt-1">
              {heroItem.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6B635B] mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
              {heroItem.description}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-[#E7E2DA] pt-2.5 sm:pt-3">
              <span className="text-xs sm:text-sm font-medium text-[#1A1A1A]">{formatPrice(heroItem.price)}</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B89758] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Explore Piece &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Tactile Material Dialogue & Secondary Silhouette (5 columns) */}
        <div className="lg:col-span-5 space-y-10">
          {/* Quote & Philosophy */}
          <div className="space-y-4 border-l-2 border-[#1A1A1A] pl-6">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
              Atelier Note
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#2E2925] leading-relaxed">
              &ldquo;We deliberately eschew stiff synthetic fusings. Our cashmere is constructed to drape with the weight of its own density, creating an organic dialogue with the wearer&rsquo;s movement.&rdquo;
            </p>
            <span className="text-xs uppercase tracking-widest text-[#7A726A] block">
              &mdash; Enzo Valenti, Master Pattern Maker
            </span>
          </div>

          {/* Secondary Garment Card */}
          <div 
            className="bg-[#F4F1EA] p-6 border border-[#E7E2DA] flex gap-5 cursor-pointer group hover:border-[#1A1A1A] transition-all"
            onClick={() => openProductDetail(secondaryItem)}
          >
            <div className="w-28 sm:w-36 aspect-[3/4] bg-[#ECE8DF] overflow-hidden shrink-0">
              <img
                src={secondaryItem.images[0]}
                alt={secondaryItem.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
                  Companion Piece
                </span>
                <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#B89758] transition-colors mt-1">
                  {secondaryItem.name}
                </h4>
                <p className="text-xs text-[#7A726A] mt-1 line-clamp-2">
                  {secondaryItem.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E7E2DA]">
                <span className="text-xs font-semibold text-[#1A1A1A]">{formatPrice(secondaryItem.price)}</span>
                <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Acquire &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
