import React, { useState } from 'react';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  aspectRatio = 'portrait' 
}) => {
  const { 
    openProductDetail, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice, 
    setQuickViewProduct,
    addToCart 
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use first size
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, selectedColor, defaultSize, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative flex flex-col cursor-pointer"
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with secondary hover image */}
      <div 
        className={`relative w-full overflow-hidden bg-[#ECE8DF] ${
          aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
        }`}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            product.images[1] && isHovered ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
            }`}
          />
        )}

        {/* Badges: New or Sale (Minimalist luxury typography) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNewArrival && (
            <span className="bg-[#FAF9F6]/90 backdrop-blur-sm text-[#1A1A1A] text-[9px] uppercase tracking-[0.25em] font-medium px-2 py-0.5 border border-[#E7E2DA]">
              New Edition
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#1A1A1A] text-[#FAF9F6] text-[9px] uppercase tracking-[0.25em] font-medium px-2 py-0.5">
              Archive Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-300 z-10 btn-tactile ${
            isFavorite 
              ? 'bg-[#1A1A1A] text-white shadow-sm' 
              : 'bg-[#FAF9F6]/85 backdrop-blur-sm text-[#1A1A1A] hover:bg-[#FAF9F6] hover:scale-105 opacity-90 sm:opacity-80 sm:group-hover:opacity-100'
          }`}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current animate-heart-pop text-[#B89758]' : ''}`} />
        </button>

        {/* Mobile Quick Add Floating Button (visible on touch screens) */}
        <button
          onClick={handleQuickAdd}
          className="sm:hidden absolute bottom-2.5 right-2.5 p-2 bg-[#1A1A1A]/90 backdrop-blur-sm text-[#FAF9F6] rounded-full shadow-md z-10 btn-tactile"
          aria-label="Quick add to bag"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>

        {/* Desktop Quick Action Overlay (Smooth glide-up on hover) */}
        <div className="hidden sm:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/55 via-black/20 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] items-center justify-between gap-2 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-[#FAF9F6]/95 hover:bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm btn-tactile"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] p-2 transition-colors flex items-center justify-center shadow-sm btn-tactile"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 space-y-1.5">
        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-200 ${
                  selectedColor.name === color.name 
                    ? 'ring-1 ring-offset-1 ring-[#1A1A1A] scale-110 animate-swatch-active' 
                    : 'border-[#CCC5B9] opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C827A] ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-base text-[#1A1A1A] group-hover:text-[#B89758] transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Subtitle / Material hint */}
        <p className="text-[11px] text-[#7A726A] line-clamp-1">
          {product.subtitle}
        </p>

        {/* Rating & Review Count (Shopify Style) */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#7A726A] pt-0.5">
          <div className="flex items-center text-[#B89758]">
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="font-medium text-[#1A1A1A]">{product.rating || 4.9}</span>
          <span className="text-[#A89F91]">({product.reviewCount || 24})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-xs font-semibold tracking-wide text-[#1A1A1A]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-[#9E978F] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
