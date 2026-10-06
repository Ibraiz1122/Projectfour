import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { setActivePage, setSelectedCategoryFilter, setSelectedSubcategoryFilter } = useShop();

  if (!isOpen) return null;

  const handleCategoryClick = (catId: string, subId?: string) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategoryFilter(subId || null);
    setActivePage('shop');
    onClose();
  };

  // 4 Core Curated Categories
  const primaryCategories = CATEGORIES.filter(c => 
    ['outerwear', 'knitwear', 'dresses', 'trousers'].includes(c.id)
  );

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#FAF9F6]/98 backdrop-blur-2xl border-b border-[#E7E2DA] shadow-2xl z-40 py-8 animate-hotspot-reveal text-left"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3.5 mb-7">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium">
              Curated Wardrobe Architecture
            </span>
          </div>
          <button 
            onClick={() => { setSelectedCategoryFilter(null); setSelectedSubcategoryFilter(null); setActivePage('shop'); onClose(); }}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors"
          >
            <span>Explore Entire Shop</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Clean Columns + 1 Editorial Feature Card */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Left: 4 Focused Categories (9 cols) */}
          <div className="col-span-8 lg:col-span-9 grid grid-cols-4 gap-6">
            {primaryCategories.map((category) => (
              <div key={category.id} className="space-y-3">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-left font-serif text-base xl:text-lg font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors block border-b border-[#E7E2DA]/80 pb-1.5 w-full"
                >
                  {category.name}
                </button>
                <ul className="space-y-2 text-xs text-[#5C554F]">
                  {category.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => handleCategoryClick(category.id, sub.id)}
                        className="text-left text-[#6E665F] hover:text-[#1A1A1A] hover:underline underline-offset-4 transition-colors w-full"
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Editorial Seasonal Spotlight Card (3 cols) */}
          <div 
            onClick={() => { setSelectedCategoryFilter('outerwear'); setActivePage('shop'); onClose(); }}
            className="col-span-4 lg:col-span-3 bg-[#F2EDE4] p-4 border border-[#E7E2DA] cursor-pointer group hover:border-[#1A1A1A] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#ECE8DF] mb-3">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=85"
                alt="Seasonal Cashmere Capsule"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
              Seasonal Focus
            </span>
            <h4 className="font-serif text-base text-[#1A1A1A] group-hover:text-[#B89758] transition-colors mt-0.5">
              The Biella Cashmere Capsule
            </h4>
            <p className="text-[11px] text-[#7A726A] mt-1 line-clamp-2">
              Double-faced overcoats hand-finished in Northern Italy.
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#B89758] font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>View Capsule</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-8 pt-5 border-t border-[#E7E2DA] flex items-center justify-between text-xs text-[#7A726A]">
          <p className="tracking-wide">
            Complimentary worldwide express courier on private orders above $500. Handcrafted in Biella &amp; Florence.
          </p>
          <div className="flex gap-6 tracking-widest uppercase text-[11px] font-medium">
            <button onClick={() => { setActivePage('lookbook'); onClose(); }} className="hover:text-[#1A1A1A]">Lookbook</button>
            <button onClick={() => { setActivePage('about'); onClose(); }} className="hover:text-[#1A1A1A]">Our Story</button>
            <button onClick={() => { setActivePage('size-guide'); onClose(); }} className="hover:text-[#1A1A1A]">Sizing Guide</button>
          </div>
        </div>
      </div>
    </div>
  );
};
