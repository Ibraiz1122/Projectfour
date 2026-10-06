import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../common/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ChevronRight, 
  Minus, 
  Plus, 
  Check,
  Star,
  Lock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    setIsReviewModalOpen,
    setActivePage,
    setSelectedCategoryFilter,
    setSelectedSubcategoryFilter
  } = useShop();

  // If no product is selected, fallback to first product
  const product = selectedProduct || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'fit' | 'shipping'>('details');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [includeBundleItem, setIncludeBundleItem] = useState(true);

  // Scroll listener for Shopify Sticky Add to Cart Bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFavorite = isInWishlist(product.id);
  const category = CATEGORIES.find(c => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(s => s.id === product.subcategoryId);

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4);
  const bundleComplement = relatedProducts[0] || PRODUCTS.find(p => p.id === 'prod-acc-01') || PRODUCTS[1];

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const handleAddBundleToCart = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    if (includeBundleItem && bundleComplement) {
      addToCart(bundleComplement, bundleComplement.colors[0], bundleComplement.sizes[0], 1);
    }
  };

  const bundleRawTotal = product.price + (bundleComplement?.price || 0);
  const bundleDiscountedTotal = Math.round(bundleRawTotal * 0.90); // 10% bundle privilege

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8C827A] mb-8">
          <button onClick={() => setActivePage('home')} className="hover:text-[#1A1A1A] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3 text-[#B3ACA3]" />
          <button 
            onClick={() => { setSelectedCategoryFilter(null); setSelectedSubcategoryFilter(null); setActivePage('shop'); }} 
            className="hover:text-[#1A1A1A] transition-colors"
          >
            Shop
          </button>
          {category && (
            <>
              <ChevronRight className="w-3 h-3 text-[#B3ACA3]" />
              <button 
                onClick={() => { setSelectedCategoryFilter(category.id); setSelectedSubcategoryFilter(null); setActivePage('shop'); }} 
                className="hover:text-[#1A1A1A] transition-colors"
              >
                {category.name}
              </button>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-[#B3ACA3]" />
          <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#ECE8DF] border border-[#E7E2DA] relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.isNewArrival && (
                <div className="absolute top-4 left-4 bg-[#FAF9F6]/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium border border-[#E7E2DA]">
                  New Edition
                </div>
              )}
            </div>

            {/* Thumbnail Multi-angle Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-[3/4] bg-[#ECE8DF] border overflow-hidden transition-all ${
                      selectedImage === img 
                        ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' 
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Tailoring Specs & Order Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header info */}
            <div className="space-y-2 border-b border-[#E7E2DA] pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium">
                  {subcategory ? subcategory.name : product.season}
                </span>
                <span className="text-[11px] text-[#A89F91] tracking-wider uppercase font-mono">
                  {product.sku}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15]">
                {product.name}
              </h1>

              {/* Shopify-style Rating & Reviews */}
              <div className="flex items-center gap-2 pt-0.5 text-xs text-[#7A726A]">
                <div className="flex items-center gap-0.5 text-[#B89758]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="underline cursor-pointer hover:text-[#1A1A1A] transition-colors"
                >
                  {product.reviewCount || 48} verified reviews (write a review)
                </button>
              </div>

              <p className="text-xs text-[#7A726A]">{product.subtitle}</p>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-2xl font-medium text-[#1A1A1A]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E978F] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
                    Archive Sale
                  </span>
                )}
              </div>

              {/* Live In-Stock Indicator with gentle breathing pulse */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#2B5138] pulse-live"></span>
                <span className="text-[#2B5138] font-medium">In stock, ready to ship</span>
                <span className="text-[#8C827A]">&bull; Dispatched via DHL Express within 24h</span>
              </div>
            </div>

            {/* Color selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.2em] text-[#59514A] font-medium">
                  Color Shade: <strong className="text-[#1A1A1A] font-semibold">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 p-1.5 border transition-all ${
                      selectedColor.name === color.name 
                        ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A] animate-swatch-active' 
                        : 'border-[#DCD5C9] bg-white hover:border-[#1A1A1A]'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 inline-block shrink-0" 
                      style={{ backgroundColor: color.hex }} 
                    />
                    <span className="text-xs text-[#2E2925] pr-2">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.2em] text-[#59514A] font-medium">
                  Select Size: <strong className="text-[#1A1A1A] font-semibold">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-[#8C827A] hover:text-[#1A1A1A] underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Sizing &amp; Fit Protocol</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs uppercase tracking-wider font-medium border text-center transition-all ${
                      selectedSize === size
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#2C2723] border-[#DCD5C9] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#59514A] font-medium">Quantity:</span>
              <div className="flex items-center border border-[#DCD5C9] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-medium text-[#1A1A1A]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Shopify-style Dynamic Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-4 px-6 text-xs uppercase tracking-[0.24em] font-medium flex items-center justify-center gap-2.5 transition-colors shadow-md btn-tactile"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border border-[#DCD5C9] hover:border-[#1A1A1A] transition-colors btn-tactile ${
                    isFavorite ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current animate-heart-pop text-[#B89758]' : ''}`} />
                </button>
              </div>

              {/* Dynamic Express Checkout Button (Shop Pay / Fast Checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#B89758] hover:bg-[#A58447] text-[#141414] py-3.5 px-6 text-xs uppercase tracking-[0.22em] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm btn-tactile"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Buy with Express Checkout</span>
              </button>
            </div>

            {/* Shopify-style Trust & Guarantee Accordion */}
            <div className="pt-4 border-t border-[#E7E2DA] space-y-2.5 text-xs text-[#59514A]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#B89758] shrink-0" />
                <span>Complimentary insured shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#B89758] shrink-0" />
                <span>30-day effortless doorstep returns &amp; exchanges</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B89758] shrink-0" />
                <span>Guaranteed authentic &bull; Certified Italian craftsmanship</span>
              </div>
            </div>

            {/* Tabbed Specification Accordion */}
            <div className="border-t border-[#E7E2DA] pt-6 space-y-4">
              <div className="flex border-b border-[#E7E2DA] text-xs">
                {[
                  { id: 'details', label: 'Details' },
                  { id: 'materials', label: 'Materiality' },
                  { id: 'fit', label: 'Fit & Cut' },
                  { id: 'shipping', label: 'Courier' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-3.5 uppercase tracking-wider text-[11px] font-medium transition-all border-b-2 -mb-[1px] ${
                      activeTab === tab.id
                        ? 'border-[#1A1A1A] text-[#1A1A1A]'
                        : 'border-transparent text-[#8C827A] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#59514A] leading-relaxed pt-2 min-h-[90px]">
                {activeTab === 'details' && (
                  <ul className="space-y-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B89758] mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-3">
                    <p><strong>Primary Fiber:</strong> {product.materials}</p>
                    <p><strong>Care Protocol:</strong> {product.careInstructions}</p>
                  </div>
                )}

                {activeTab === 'fit' && (
                  <div className="space-y-3">
                    <p>{product.fit}</p>
                    <p className="text-[#8C827A]">Model is 179cm / 5ft 10in wearing standard size S (IT 40).</p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>Dispatched via DHL Express from our Biella fulfillment center within 24 hours.</p>
                    <p>Estimated transit: EU (1-2 business days), US &amp; Asia (2-3 business days).</p>
                    <p>Each parcel is presented in custom linen garment bags with shaped cedar hangers.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shopify-style Frequently Paired With (Bundle Builder) */}
            {bundleComplement && (
              <div className="border border-[#E7E2DA] bg-[#F7F5F0] p-5 space-y-4 rounded-sm mt-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-2.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
                    Frequently Paired With
                  </span>
                  <span className="bg-[#2B5138] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                    Save 10% On Ensemble
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Thumbnails combo */}
                  <div className="flex items-center gap-2 shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-16 object-cover border border-[#E7E2DA]"
                    />
                    <span className="text-sm font-semibold text-[#8C827A]">+</span>
                    <img
                      src={bundleComplement.images[0]}
                      alt={bundleComplement.name}
                      className="w-12 h-16 object-cover border border-[#E7E2DA]"
                    />
                  </div>

                  <div className="text-xs space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeBundleItem}
                        onChange={(e) => setIncludeBundleItem(e.target.checked)}
                        className="rounded border-[#DCD5C9] text-[#1A1A1A] focus:ring-0 cursor-pointer"
                        id="bundle-checkbox"
                      />
                      <label htmlFor="bundle-checkbox" className="font-serif text-[#1A1A1A] cursor-pointer font-medium line-clamp-1">
                        Add {bundleComplement.name}
                      </label>
                    </div>
                    <p className="text-[11px] text-[#7A726A] pl-5 truncate">
                      {bundleComplement.subtitle}
                    </p>
                    <div className="pl-5 flex items-baseline gap-2 pt-0.5">
                      <span className="font-semibold text-sm text-[#1A1A1A]">
                        {formatPrice(includeBundleItem ? bundleDiscountedTotal : product.price)}
                      </span>
                      {includeBundleItem && (
                        <span className="text-xs text-[#8C827A] line-through">
                          {formatPrice(bundleRawTotal)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {includeBundleItem ? 'Add Both To Bag' : 'Add Current Garment'} &bull; {formatPrice(includeBundleItem ? bundleDiscountedTotal : product.price)}
                  </span>
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Related Products: Complete the Wardrobe */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E7E2DA]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
                  Harmonious Pairings
                </span>
                <h3 className="font-serif text-3xl text-[#1A1A1A] mt-1">
                  Complete the Wardrobe
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-7 sm:gap-y-10">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Shopify-style Sticky Add to Cart Bar */}
      {showStickyBar && (
        <aside 
          aria-label="Sticky Add to Bag"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E2DA] p-3 sm:py-3.5 sm:px-8 shadow-2xl transition-all duration-300 animate-fade-up"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Product Info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-10 h-12 object-cover border border-[#E7E2DA] shrink-0 hidden sm:block"
              />
              <div className="truncate">
                <h4 className="font-serif text-sm text-[#1A1A1A] font-medium truncate">{product.name}</h4>
                <div className="flex items-center gap-2 text-xs text-[#7A726A]">
                  <span>{formatPrice(product.price)}</span>
                  <span>&bull;</span>
                  <span className="text-[#2B5138] font-medium">In stock</span>
                </div>
              </div>
            </div>

            {/* Right: Size selector & Quick Buy */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="hidden md:flex items-center gap-1.5 border border-[#DCD5C9] bg-[#FAF9F6] px-2 py-1.5 text-xs">
                <span className="text-[#8C827A]">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-transparent font-medium text-[#1A1A1A] focus:outline-none cursor-pointer"
                >
                  {product.sizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2 shadow-sm btn-tactile"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
