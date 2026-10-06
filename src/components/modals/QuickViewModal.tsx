import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsSizeGuideOpen
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const isFavorite = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#1A1A1A] hover:bg-[#EAE5D9] rounded-full transition-colors"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 bg-[#ECE8DF] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 bg-white border shrink-0 overflow-hidden transition-all ${
                    selectedImage === img ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
                {product.season}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-base font-medium text-[#1A1A1A]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E978F] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-[#6B635B] leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <label className="text-[11px] uppercase tracking-[0.18em] text-[#59514A] font-medium block mb-2">
                Color: <span className="text-[#1A1A1A]">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-offset-2 ring-[#1A1A1A] scale-110'
                        : 'border-[#CCC5B9] hover:opacity-100 opacity-80'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-[#59514A] font-medium">
                  Size: <span className="text-[#1A1A1A]">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] text-[#8C827A] hover:text-[#1A1A1A] flex items-center gap-1 underline underline-offset-2"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Atelier</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-all ${
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
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#59514A] font-medium">
                Quantity:
              </span>
              <div className="flex items-center border border-[#DCD5C9] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-xs hover:bg-[#F2EDE4]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-xs hover:bg-[#F2EDE4]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-6 border-t border-[#E7E2DA] space-y-3 mt-4">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#1A1A1A] hover:bg-black text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border border-[#DCD5C9] hover:border-[#1A1A1A] transition-colors ${
                  isFavorite ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => openProductDetail(product)}
              className="w-full text-center text-xs text-[#8C827A] hover:text-[#1A1A1A] py-1 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Editorial Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C827A] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89758]" />
              <span>Complimentary insured shipping on all orders over $500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
