import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export const CategoryBento: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter, setSelectedSubcategoryFilter } = useShop();

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategoryFilter(null);
    setActivePage('shop');
  };

  // Select top 6 distinct categories
  const featuredCats = CATEGORIES.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
            Department Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Shop by Wardrobe Architecture
          </h2>
        </div>

        <button
          onClick={() => { setSelectedCategoryFilter(null); setActivePage('shop'); }}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors"
        >
          <span>View All 10 Categories</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Editorial Grid: Varied aspect ratios for authentic visual rhythm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCats.map((cat, index) => {
          const isLarge = index === 0 || index === 5;
          return (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`group relative overflow-hidden bg-[#ECE8DF] cursor-pointer transition-all ${
                isLarge ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] filter brightness-[0.92]"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Text Information */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8D2C7] font-medium block mb-1">
                  {cat.subcategories.length} Specialized Subcategories
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#ECE8DF] mt-1.5 opacity-90 line-clamp-2 leading-relaxed max-w-sm">
                  {cat.tagline}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#B89758] group-hover:text-white transition-colors">
                  <span>Explore Silhouette</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
