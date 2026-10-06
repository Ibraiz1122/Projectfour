import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ArrowRight } from 'lucide-react';

export const CollectionHighlight: React.FC = () => {
  const { openProductDetail, setActivePage, setSelectedCategoryFilter, formatPrice } = useShop();

  const dress = PRODUCTS.find(p => p.id === 'prod-dress-01') || PRODUCTS[3];

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      <div className="relative overflow-hidden bg-[#18181A] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left: Image with dramatic lighting (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85"
              alt="Silk Slip Evening Campaign"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#18181A] hidden lg:block" />
          </div>

          {/* Right: Narrative Box (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-6">
            <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-[#D8D2C7] text-[10px] uppercase tracking-[0.28em] font-medium">
              Capsule Spotlight No. 04
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15]">
              Nocturne in Heavy Mulberry Silk
            </h2>

            <p className="text-xs sm:text-sm text-[#BDB5AB] font-light leading-relaxed">
              Cut on the true bias from 30-momme liquid silk satin. Designed to cascade effortlessly along the curve of the body, crowned by a fluid floor-skimming puddle hem.
            </p>

            <div className="pt-2 flex items-baseline gap-4">
              <span className="font-serif text-2xl text-white">{formatPrice(dress.price)}</span>
              <span className="text-xs text-[#8C827A] uppercase tracking-wider">3 Distinct Shades</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => openProductDetail(dress)}
                className="bg-[#FAF9F6] hover:bg-white text-[#18181A] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Acquire Slip Dress</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { setSelectedCategoryFilter('dresses'); setActivePage('shop'); }}
                className="bg-transparent hover:bg-white/10 border border-white/30 text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
              >
                All Evening Gowns
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
