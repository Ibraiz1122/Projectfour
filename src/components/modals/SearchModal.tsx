import React, { useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    openProductDetail,
    formatPrice,
    setActivePage,
    setSelectedCategoryFilter
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const queryClean = searchQuery.toLowerCase().trim();

  const filteredProducts = PRODUCTS.filter(p => {
    if (!queryClean) return false;
    return (
      p.name.toLowerCase().includes(queryClean) ||
      p.subtitle.toLowerCase().includes(queryClean) ||
      p.materials.toLowerCase().includes(queryClean) ||
      p.description.toLowerCase().includes(queryClean)
    );
  });

  const matchingCategories = CATEGORIES.filter(c => {
    if (!queryClean) return false;
    return (
      c.name.toLowerCase().includes(queryClean) ||
      c.subcategories.some(s => s.name.toLowerCase().includes(queryClean))
    );
  });

  const popularSearches = ['Cashmere Overcoat', 'Wide Leg Wool', 'Silk Slip Dress', 'Poplin Shirt', 'Italian Loafers', 'French Lambskin'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/60 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Window with smooth luxury glide */}
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[80vh] animate-fade-up">
        {/* Search Input Bar */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center gap-4 bg-white">
          <Search className="w-5 h-5 text-[#8C827A]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by garment, silhouette, or fabric (e.g. Cashmere, Worsted Wool)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-lg text-[#1A1A1A] placeholder-[#9E978F] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#8C827A] hover:text-[#1A1A1A]"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-widest text-[#7A726A] hover:text-[#1A1A1A] px-2 py-1 border border-[#E7E2DA]"
          >
            ESC
          </button>
        </div>

        {/* Search Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* If no query yet, show popular terms and categories */}
          {!queryClean && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block mb-3">
                  Trending Sartorial Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-xs bg-[#F2EDE4] hover:bg-[#E6E0D5] text-[#2C2723] px-3.5 py-1.5 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block mb-3">
                  Browse Key Departments
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORIES.slice(0, 6).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.id);
                        setActivePage('shop');
                        setIsSearchOpen(false);
                      }}
                      className="text-left p-3 border border-[#E7E2DA] hover:border-[#1A1A1A] bg-white transition-all group"
                    >
                      <h4 className="font-serif text-sm text-[#1A1A1A] group-hover:text-[#B89758]">{cat.name}</h4>
                      <p className="text-[10px] text-[#8C827A] mt-0.5">{cat.subcategories.length} subcategories</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results: Categories match */}
          {queryClean && matchingCategories.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block mb-3">
                Matching Departments ({matchingCategories.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryFilter(cat.id);
                      setActivePage('shop');
                      setIsSearchOpen(false);
                    }}
                    className="text-left p-3 border border-[#E7E2DA] hover:border-[#1A1A1A] bg-white flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-serif text-base text-[#1A1A1A] group-hover:text-[#B89758] block">{cat.name}</span>
                      <span className="text-[10px] text-[#8C827A]">{cat.tagline}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results: Products match */}
          {queryClean && filteredProducts.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block mb-3">
                Matching Garments ({filteredProducts.length})
              </span>
              <div className="divide-y divide-[#E7E2DA]">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      openProductDetail(prod);
                      setIsSearchOpen(false);
                    }}
                    className="py-3 flex items-center gap-4 cursor-pointer hover:bg-white px-2 transition-colors group"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-14 h-18 object-cover bg-[#ECE8DF] shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-base text-[#1A1A1A] group-hover:text-[#B89758] transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-[#7A726A] line-clamp-1">{prod.subtitle}</p>
                      <span className="text-xs font-medium text-[#1A1A1A] mt-1 block">
                        {formatPrice(prod.price)}
                      </span>
                    </div>
                    <CornerDownLeft className="w-4 h-4 text-[#8C827A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {queryClean && filteredProducts.length === 0 && matchingCategories.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A]">No Direct Matches</span>
              <h3 className="font-serif text-2xl text-[#1A1A1A]">We could not locate &ldquo;{searchQuery}&rdquo;</h3>
              <p className="text-xs text-[#7A726A] max-w-md mx-auto">
                Try searching for broader terms such as &ldquo;Coat&rdquo;, &ldquo;Wool&rdquo;, &ldquo;Silk&rdquo;, or explore our permanent collection catalog.
              </p>
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setActivePage('shop');
                  setIsSearchOpen(false);
                }}
                className="mt-4 bg-[#1A1A1A] text-white px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-black transition-colors"
              >
                Browse Entire Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
