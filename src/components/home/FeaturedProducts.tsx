import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'outerwear' | 'knitwear' | 'footwear'>('all');

  const filtered = PRODUCTS.filter(p => {
    if (activeTab === 'all') return p.isFeatured;
    return p.categoryId === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
            The Permanent Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Signature Silhouettes
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 text-xs pb-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'outerwear', label: 'Outerwear' },
            { id: 'knitwear', label: 'Cashmere Knits' },
            { id: 'footwear', label: 'Footwear' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 uppercase tracking-[0.16em] text-[10px] sm:text-[11px] font-medium transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-[#F2EDE4] text-[#59514A] hover:bg-[#E6E0D5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards (2 columns on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-12">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-16 text-center">
        <button
          onClick={() => { setSelectedCategoryFilter(null); setActivePage('shop'); }}
          className="inline-flex items-center gap-3 bg-transparent border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] py-4 px-10 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 group"
        >
          <span>View Entire 40-Subcategory Archive</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
