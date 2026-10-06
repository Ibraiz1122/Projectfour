import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    formatPrice,
    freeShippingThreshold,
    appliedPromo,
    promoDiscount,
    applyPromoCode,
    openProductDetail,
    setIsCheckoutOpen,
    setActivePage
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const discountAmount = cartTotal * promoDiscount;
  const finalTotal = Math.max(0, cartTotal - discountAmount);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    setActivePage('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E0E]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#E7E2DA] animate-drawer-in">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
            <h3 className="font-serif text-xl text-[#1A1A1A]">Shopping Bag</h3>
            <span className="text-xs text-[#8C827A] font-medium">({cartCount})</span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#EAE5D9]/60 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#F2EDE4] px-6 py-3 border-b border-[#E7E2DA] text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-[#59514A]">
              Add <span className="font-medium text-[#1A1A1A]">{formatPrice(amountToFreeShipping)}</span> more for complimentary express courier.
            </p>
          ) : (
            <p className="text-[#2B5138] font-medium flex items-center gap-1.5">
              <span>You have unlocked complimentary worldwide express courier.</span>
            </p>
          )}
          <div className="w-full bg-[#DFD9CE] h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                amountToFreeShipping === 0 ? 'shimmer-gold' : 'bg-[#1A1A1A]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#C2B8A3]" />
              <h4 className="font-serif text-2xl text-[#1A1A1A]">Your bag is currently empty</h4>
              <p className="text-xs text-[#7A726A] max-w-xs leading-relaxed">
                Discover our signature outerwear, tactile knitwear, and timeless wardrobe investments.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActivePage('shop');
                }}
                className="mt-2 bg-[#1A1A1A] text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-[#E7E2DA]/70 last:border-0">
                {/* Thumbnail */}
                <div 
                  className="w-20 h-26 bg-[#ECE8DF] overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => {
                    openProductDetail(item.product);
                    setIsCartDrawerOpen(false);
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          openProductDetail(item.product);
                          setIsCartDrawerOpen(false);
                        }}
                        className="font-serif text-base text-[#1A1A1A] hover:text-[#B89758] cursor-pointer transition-colors leading-snug"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9E978F] hover:text-[#D9534F] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#7A726A] mt-1">
                      <span>Color: {item.selectedColor.name}</span>
                      <span>&bull;</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>

                    <div className="text-xs font-medium text-[#1A1A1A] mt-1.5">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#DCD5C9] bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-[#1A1A1A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Shopify 1-Click Upsell: Pair with Selection */}
          {cart.length > 0 && !cart.some(item => item.product.id === 'prod-acc-01') && (
            <div className="bg-[#F2EDE4]/70 border border-[#E7E2DA] p-3.5 rounded-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E2DA]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B89758]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#59514A]">
                    Pair With Your Silhouette
                  </span>
                </div>
                <span className="text-[10px] text-[#2B5138] font-medium">+ Free Courier</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=400&q=80"
                    alt="Scottish Cashmere Scarf"
                    className="w-11 h-14 object-cover border border-[#E7E2DA] shrink-0"
                  />
                  <div>
                    <h5 className="font-serif text-xs text-[#1A1A1A] line-clamp-1">The Scottish Cashmere Scarf</h5>
                    <span className="text-[11px] font-medium text-[#1A1A1A] block">{formatPrice(440)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const scarf = PRODUCTS.find(p => p.id === 'prod-acc-01');
                    if (scarf) addToCart(scarf, scarf.colors[0], scarf.sizes[0], 1);
                  }}
                  className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-wider transition-colors shrink-0 font-medium active:scale-95"
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E7E2DA] bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#8C827A] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Code (e.g. ATELIER15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-[#FAF9F6] border border-[#DCD5C9] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E2925] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-[#2B5138] bg-[#EEF4EE] px-3 py-1.5 border border-[#D2E4D2]">
                <span>Privilege applied: {appliedPromo} (-15%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Cart Notes (Shopify standard) */}
            <div className="border border-[#E7E2DA] bg-[#FAF9F6] p-3 text-xs">
              <details className="group">
                <summary className="cursor-pointer font-medium text-[#4A433D] flex items-center justify-between select-none">
                  <span>Add order note or gift message</span>
                  <span className="text-[#8C827A] group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>
                <div className="pt-2">
                  <textarea
                    rows={2}
                    placeholder="Special delivery instructions, gift wrapping note, etc."
                    className="w-full p-2 text-xs bg-white border border-[#DCD5C9] focus:outline-none focus:border-[#1A1A1A] resize-none"
                  />
                  <span className="text-[10px] text-[#8C827A] block mt-1">Saved automatically to order manifest.</span>
                </div>
              </details>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#6B635B] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#1A1A1A]">{formatPrice(cartTotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#2B5138]">
                  <span>Courtesy Reduction</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Delivery</span>
                <span>{amountToFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}</span>
              </div>
              <div className="flex justify-between text-xs text-[#8C827A]">
                <span>Taxes &amp; Duties</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-medium text-[#1A1A1A] pt-2 border-t border-[#E7E2DA]">
                <span>Estimated Total</span>
                <span className="font-sans text-base font-semibold">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Action buttons & Express Checkout (Shopify OS 2.0 standard) */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 group shadow-md btn-tactile"
              >
                <span>Check out &bull; {formatPrice(finalTotal)}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Express Checkout Options */}
              <div className="space-y-1.5 pt-1">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#E7E2DA]"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-[#8C827A] uppercase tracking-wider">or instant express checkout</span>
                  <div className="flex-grow border-t border-[#E7E2DA]"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-2 bg-[#5A31F4] hover:bg-[#4922dc] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm btn-tactile"
                  >
                    <span>shop</span>
                    <span className="font-light bg-white text-[#5A31F4] px-1 py-0.2 rounded text-[10px] font-bold">Pay</span>
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-2 bg-black hover:bg-[#222] text-white text-xs font-medium rounded flex items-center justify-center gap-1 transition-colors shadow-sm btn-tactile"
                  >
                    <span>Apple Pay</span>
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleViewFullCart}
                className="w-full bg-transparent border border-[#DCD5C9] hover:border-[#1A1A1A] text-[#1A1A1A] py-2 px-4 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors"
              >
                View Cart ({cartCount})
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C827A] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89758]" />
              <span>SSL 256-bit Encrypted &bull; 30-Day Money Back Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
