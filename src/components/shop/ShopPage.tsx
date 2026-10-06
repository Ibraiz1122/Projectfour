import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../common/ProductCard';
import { SlidersHorizontal, X, ChevronDown, Grid, LayoutGrid, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedSubcategoryFilter,
    setSelectedSubcategoryFilter,
  } = useShop();

  // Local filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [columnCount, setColumnCount] = useState<2 | 3 | 4>(3);

  // Active Category details
  const currentCategory = CATEGORIES.find(c => c.id === selectedCategoryFilter);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === selectedSubcategoryFilter);

  // Available sizes across catalog
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '36', '38', '40', '42', 'One Size'];

  // Toggle size
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategoryFilter(null);
    setSelectedSubcategoryFilter(null);
    setSelectedSizes([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategoryFilter && p.categoryId !== selectedCategoryFilter) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategoryFilter && p.subcategoryId !== selectedSubcategoryFilter) {
        return false;
      }
      // Sizes filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // Price range filter
      if (selectedPriceRange === 'under-500' && p.price >= 500) return false;
      if (selectedPriceRange === '500-1000' && (p.price < 500 || p.price > 1000)) return false;
      if (selectedPriceRange === 'over-1000' && p.price <= 1000) return false;
      // In stock
      if (inStockOnly && p.stockCount <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategoryFilter, selectedSubcategoryFilter, selectedSizes, selectedPriceRange, inStockOnly, sortBy]);

  const activeFiltersCount = 
    (selectedCategoryFilter ? 1 : 0) +
    (selectedSubcategoryFilter ? 1 : 0) +
    selectedSizes.length +
    (selectedPriceRange ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="border-b border-[#E7E2DA] pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
                {currentCategory ? `Department / ${currentCategory.name}` : 'The Complete Archive'}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
                {currentSubcategory 
                  ? currentSubcategory.name 
                  : currentCategory 
                    ? currentCategory.name 
                    : 'The Sartorial Collection'}
              </h1>
              <p className="text-xs sm:text-sm text-[#7A726A] mt-2 max-w-2xl leading-relaxed">
                {currentSubcategory
                  ? currentSubcategory.description
                  : currentCategory
                    ? currentCategory.description
                    : 'A comprehensive repertoire of tailored outerwear, featherweight cashmere, fluid bias silks, and hand-finished footwear engineered for enduring poise.'}
              </p>
            </div>

            <div className="text-xs text-[#8C827A] font-medium">
              Showing <span className="text-[#1A1A1A] font-semibold">{filteredProducts.length}</span> of {PRODUCTS.length} Silhouettes
            </div>
          </div>

          {/* Subcategory Pills (if a category is selected) */}
          {currentCategory && (
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-[#E7E2DA]/60 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
              <button
                onClick={() => setSelectedSubcategoryFilter(null)}
                className={`text-xs px-3.5 py-1.5 transition-all shrink-0 ${
                  selectedSubcategoryFilter === null
                    ? 'bg-[#1A1A1A] text-white font-medium'
                    : 'bg-[#F2EDE4] text-[#59514A] hover:bg-[#E6E0D5]'
                }`}
              >
                All {currentCategory.name}
              </button>
              {currentCategory.subcategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategoryFilter(sub.id)}
                  className={`text-xs px-3.5 py-1.5 transition-all shrink-0 ${
                    selectedSubcategoryFilter === sub.id
                      ? 'bg-[#1A1A1A] text-white font-medium'
                      : 'bg-[#F2EDE4] text-[#59514A] hover:bg-[#E6E0D5]'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter & Sorting Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E2DA]">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#F2EDE4] hover:bg-[#E6E0D5] px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#1A1A1A]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Desktop Clear filters button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-[#8C827A] hover:text-[#1A1A1A] underline underline-offset-4"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Right: Layout Switcher & Sorting */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Column Switcher (desktop) */}
            <div className="hidden md:flex items-center gap-1 text-[#8C827A]">
              <span className="text-[11px] uppercase tracking-wider mr-1">View:</span>
              <button
                onClick={() => setColumnCount(2)}
                className={`p-1.5 transition-colors ${columnCount === 2 ? 'text-[#1A1A1A]' : 'hover:text-[#1A1A1A]'}`}
                title="2 columns"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumnCount(3)}
                className={`p-1.5 transition-colors ${columnCount === 3 ? 'text-[#1A1A1A]' : 'hover:text-[#1A1A1A]'}`}
                title="3 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#8C827A] hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#DCD5C9] px-3.5 py-1.5 text-xs text-[#1A1A1A] pr-8 focus:outline-none focus:border-[#1A1A1A] appearance-none cursor-pointer"
                >
                  <option value="featured">Editorial Curation</option>
                  <option value="newest">Newest Editions</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Client Acclaim</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C827A] absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar (desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Desktop Filter Sidebar (3 columns) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            
            {/* Category Directory Tree */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A] pb-3 border-b border-[#E7E2DA]">
                Department (10)
              </h4>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => { setSelectedCategoryFilter(null); setSelectedSubcategoryFilter(null); }}
                    className={`text-left w-full transition-colors ${
                      selectedCategoryFilter === null ? 'font-semibold text-[#1A1A1A]' : 'text-[#6B635B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    All Collections ({PRODUCTS.length})
                  </button>
                </li>
                {CATEGORIES.map(cat => {
                  const count = PRODUCTS.filter(p => p.categoryId === cat.id).length;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => { setSelectedCategoryFilter(cat.id); setSelectedSubcategoryFilter(null); }}
                        className={`text-left w-full flex items-center justify-between transition-colors ${
                          selectedCategoryFilter === cat.id ? 'font-semibold text-[#1A1A1A]' : 'text-[#6B635B] hover:text-[#1A1A1A]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#A89F91]">({count})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sizing Filter */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A] pb-3 border-b border-[#E7E2DA]">
                Proportions &amp; Sizes
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {allSizes.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                        isSelected 
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                          : 'bg-white text-[#59514A] border-[#DCD5C9] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Ranges */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A] pb-3 border-b border-[#E7E2DA]">
                Price Bracket
              </h4>
              <div className="mt-4 space-y-2 text-xs">
                {[
                  { id: null, label: 'All Values' },
                  { id: 'under-500', label: 'Under $500' },
                  { id: '500-1000', label: '$500 — $1,000' },
                  { id: 'over-1000', label: 'Over $1,000' },
                ].map(item => (
                  <label
                    key={String(item.id)}
                    className="flex items-center gap-2.5 cursor-pointer text-[#59514A] hover:text-[#1A1A1A]"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === item.id}
                      onChange={() => setSelectedPriceRange(item.id)}
                      className="accent-[#1A1A1A]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#59514A] hover:text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#1A1A1A] w-4 h-4"
                />
                <span>Available for Immediate Dispatch</span>
              </label>
            </div>
          </aside>

          {/* Product Grid (9 columns) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 border border-[#E7E2DA] bg-white p-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A]">No Matches Found</span>
                <h3 className="font-serif text-3xl text-[#1A1A1A]">No silhouettes match your current criteria</h3>
                <p className="text-xs text-[#7A726A] max-w-md mx-auto">
                  Try broadening your size selection, removing price constraints, or explore our complete 10-department directory.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 bg-[#1A1A1A] text-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div 
                className={`grid gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-12 ${
                  columnCount === 2 
                    ? 'grid-cols-2 sm:grid-cols-2' 
                    : 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div 
            className="fixed inset-0 bg-[#0E0E0E]/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2DA]">
              <h3 className="font-serif text-xl text-[#1A1A1A]">Refine Silhouettes</h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="py-6 border-b border-[#E7E2DA] space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#8C827A] font-semibold block">
                Departments
              </span>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => { setSelectedCategoryFilter(null); setSelectedSubcategoryFilter(null); }}
                  className={`block w-full text-left py-1 ${selectedCategoryFilter === null ? 'font-semibold text-[#1A1A1A]' : 'text-[#6B635B]'}`}
                >
                  All Archive ({PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategoryFilter(cat.id); setSelectedSubcategoryFilter(null); }}
                    className={`block w-full text-left py-1 ${selectedCategoryFilter === cat.id ? 'font-semibold text-[#1A1A1A]' : 'text-[#6B635B]'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div className="py-6 border-b border-[#E7E2DA] space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#8C827A] font-semibold block">
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium border ${
                      selectedSizes.includes(size) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#59514A] border-[#DCD5C9]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 space-y-3 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#1A1A1A] text-white py-3 text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full text-xs text-[#8C827A] underline py-1"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
