import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import { X, ChevronDown, ChevronRight, Globe } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { setActivePage, setSelectedCategoryFilter, setSelectedSubcategoryFilter, currency, setCurrency } = useShop();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const navigateTo = (page: any, catId: string | null = null, subId: string | null = null) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategoryFilter(subId);
    setActivePage(page);
    onClose();
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategory(prev => (prev === catId ? null : catId));
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-r border-[#E7E2DA]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E7E2DA]">
          <div>
            <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#1A1A1A]">ATELIER VÉRITÉ</span>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-[#8C827A]">Haute Prêt-à-Porter</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#1A1A1A] hover:bg-[#EAE5D9]/60 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Main Primary Navigation Links */}
          <div className="space-y-3 pb-6 border-b border-[#E7E2DA]">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full text-left font-serif text-3xl text-[#1A1A1A] hover:text-[#B89758] transition-colors py-1 flex items-center justify-between group"
            >
              <span>Shop</span>
              <span className="text-[10px] tracking-widest uppercase font-sans text-[#8C827A] group-hover:text-[#B89758]">Ready-to-Wear</span>
            </button>
            <button
              onClick={() => navigateTo('lookbook')}
              className="w-full text-left font-serif text-3xl text-[#1A1A1A] hover:text-[#B89758] transition-colors py-1 flex items-center justify-between group"
            >
              <span>Lookbook</span>
              <span className="text-[10px] tracking-widest uppercase font-sans text-[#8C827A] group-hover:text-[#B89758]">Campaign 2026</span>
            </button>
          </div>

          {/* Secondary Maison Links */}
          <div className="space-y-2.5 pb-6 border-b border-[#E7E2DA] text-xs uppercase tracking-[0.2em] font-medium text-[#736B63]">
            <button
              onClick={() => navigateTo('home')}
              className="w-full text-left hover:text-[#1A1A1A] transition-colors py-1 flex items-center justify-between"
            >
              <span>Home Edition</span>
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="w-full text-left hover:text-[#1A1A1A] transition-colors py-1 flex items-center justify-between"
            >
              <span>Our Story &amp; Heritage</span>
            </button>
            <button
              onClick={() => navigateTo('journal')}
              className="w-full text-left hover:text-[#1A1A1A] transition-colors py-1 flex items-center justify-between"
            >
              <span>The Atelier Journal</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full text-left hover:text-[#1A1A1A] transition-colors py-1 flex items-center justify-between"
            >
              <span>Contact &amp; Concierge &rarr;</span>
            </button>
          </div>

          {/* Curated Categories Accordion */}
          <div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-semibold mb-3">
              <span>Core Collections</span>
              <button 
                onClick={() => navigateTo('shop')}
                className="text-[10px] text-[#B89758] hover:underline"
              >
                All Archive &rarr;
              </button>
            </div>
            <div className="space-y-1">
              {CATEGORIES.filter(c => ['outerwear', 'knitwear', 'dresses', 'trousers'].includes(c.id)).map(category => (
                <div key={category.id} className="border-b border-[#E7E2DA]/50 last:border-0">
                  <div className="flex items-center justify-between py-3">
                    <button
                      onClick={() => navigateTo('shop', category.id)}
                      className="text-left text-sm font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors flex-1"
                    >
                      {category.name}
                    </button>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-[#8C827A] hover:text-[#1A1A1A]"
                      aria-label="Toggle subcategories"
                    >
                      {expandedCategory === category.id ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {expandedCategory === category.id && (
                    <div className="pl-4 pb-3 space-y-2">
                      {category.subcategories.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => navigateTo('shop', category.id, sub.id)}
                          className="block text-left text-xs text-[#6B635B] hover:text-[#1A1A1A] py-1 w-full"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Client Support Links */}
          <div className="pt-4 border-t border-[#E7E2DA] space-y-2 text-xs tracking-wider text-[#7A726A] uppercase">
            <button onClick={() => navigateTo('account')} className="block py-1 hover:text-[#1A1A1A]">Client Account &amp; Order Tracking</button>
            <button onClick={() => navigateTo('size-guide')} className="block py-1 hover:text-[#1A1A1A]">Sizing &amp; Fit Protocol</button>
            <button onClick={() => navigateTo('shipping')} className="block py-1 hover:text-[#1A1A1A]">Complimentary Shipping Policy</button>
            <button onClick={() => navigateTo('faq')} className="block py-1 hover:text-[#1A1A1A]">Frequently Asked Questions</button>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-6 border-t border-[#E7E2DA] bg-[#F4F1EA]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#524B45]">
              <Globe className="w-3.5 h-3.5" />
              <span>Currency</span>
            </div>
            <div className="flex gap-2">
              {(['USD', 'EUR', 'GBP'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`text-xs px-2.5 py-1 rounded transition-colors ${
                    currency === c 
                      ? 'bg-[#1A1A1A] text-[#FAF9F6] font-medium' 
                      : 'bg-[#FAF9F6] text-[#524B45] hover:bg-[#EAE5D9]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
