import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Trophy } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium">
            <Trophy className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Client Favorites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 font-normal">
            The Most Requested Editions
          </h2>
          <p className="text-xs text-[#7A726A] mt-1.5 max-w-lg">
            Time-tested staples repeatedly acquired by our private patrons across Paris, Milan, and New York.
          </p>
        </div>

        <button
          onClick={() => { setSelectedCategoryFilter(null); setActivePage('shop'); }}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-7 sm:gap-y-10">
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
