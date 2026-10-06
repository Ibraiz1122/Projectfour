import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
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

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F6] min-h-[70vh] flex flex-col items-center justify-center py-20 px-6 text-center">
        <ShoppingBag className="w-12 h-12 text-[#B89758] mb-4" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium">Atelier Bag</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mt-2 mb-3">Your shopping bag is empty</h1>
        <p className="text-xs sm:text-sm text-[#7A726A] max-w-md mb-8 leading-relaxed">
          Explore our collection of tailored cashmere outerwear, fine Italian knitwear, and timeless wardrobe staples.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-4 text-xs uppercase tracking-[0.24em] font-medium transition-colors shadow-lg"
        >
          Explore Complete Archive
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Page Title */}
        <div className="border-b border-[#E7E2DA] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
              Private Order Manifest
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
              Your Shopping Bag
            </h1>
          </div>
          <span className="text-xs text-[#7A726A] uppercase tracking-wider font-medium">
            {cartCount} {cartCount === 1 ? 'Garment' : 'Garments'} Selected
          </span>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-[#F2EDE4] p-5 border border-[#E7E2DA] mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#B89758] shrink-0" />
            <div>
              {amountToFreeShipping > 0 ? (
                <p className="text-[#4A433D]">
                  Add <strong className="text-[#1A1A1A]">{formatPrice(amountToFreeShipping)}</strong> more to your order to unlock complimentary worldwide express courier.
                </p>
              ) : (
                <p className="text-[#2B5138] font-medium">
                  Your order qualifies for complimentary worldwide express courier with insurance.
                </p>
              )}
            </div>
          </div>
          <div className="w-full sm:w-48 bg-[#DFD9CE] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1A1A1A] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Layout: Items (8 cols) + Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-[#E7E2DA] border-y border-[#E7E2DA]">
              {cart.map(item => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  {/* Image & Title */}
                  <div className="flex gap-5 items-center">
                    <div 
                      className="w-24 sm:w-28 aspect-[3/4] bg-[#ECE8DF] overflow-hidden shrink-0 cursor-pointer"
                      onClick={() => openProductDetail(item.product)}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
                        {item.product.season}
                      </span>
                      <h3 
                        onClick={() => openProductDetail(item.product)}
                        className="font-serif text-lg sm:text-xl text-[#1A1A1A] hover:text-[#B89758] cursor-pointer transition-colors leading-snug"
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-[#7A726A] flex items-center gap-3 pt-1">
                        <span>Color: <strong>{item.selectedColor.name}</strong></span>
                        <span>&bull;</span>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      </div>
                      <span className="text-xs font-semibold text-[#1A1A1A] block pt-1">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-2 sm:pt-0">
                    <div className="flex items-center border border-[#DCD5C9] bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 text-xs font-medium text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-sm font-medium text-[#1A1A1A] min-w-[80px] text-right">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#9E978F] hover:text-[#D9534F] transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActivePage('shop')}
                className="text-xs uppercase tracking-widest text-[#7A726A] hover:text-[#1A1A1A] underline underline-offset-4"
              >
                &larr; Continue Exploring Silhouettes
              </button>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-[#E7E2DA] space-y-6 shadow-sm">
            <h3 className="font-serif text-2xl text-[#1A1A1A] pb-3 border-b border-[#E7E2DA]">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#6B635B] font-medium block">
                Privilege Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8C827A] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. ATELIER15"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-[#FAF9F6] border border-[#DCD5C9] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-[#2B5138] bg-[#EEF4EE] px-3 py-2 border border-[#D2E4D2]">
                <span>Privilege applied: {appliedPromo} (-15%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-3 text-xs text-[#6B635B] border-t border-[#E7E2DA] pt-4">
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
                <span>{amountToFreeShipping === 0 ? 'Complimentary' : '$25.00'}</span>
              </div>

              <div className="flex justify-between text-xs text-[#8C827A]">
                <span>Taxes &amp; Duties</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-base font-serif font-medium text-[#1A1A1A] pt-3 border-t border-[#E7E2DA]">
                <span>Total Amount</span>
                <span className="font-sans text-lg font-semibold">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Shopify-style Checkout CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-4 px-6 text-xs uppercase tracking-[0.24em] font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Check out &bull; {formatPrice(finalTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] rounded transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                title="Instant Checkout with PayPal"
              >
                <span className="text-[11px] font-semibold text-[#003087] uppercase tracking-wider mr-1">Instant Checkout with</span>
                <span className="font-sans font-black italic text-[#003087] text-base leading-none tracking-tight">Pay</span>
                <span className="font-sans font-black italic text-[#0079C1] text-base leading-none tracking-tight">Pal</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#E7E2DA] space-y-2 text-[11px] text-[#8C827A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B89758] shrink-0" />
                <span>SSL 256-bit Encrypted &bull; 30-Day Money Back Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Taxes, customs and shipping calculated in accordance with your delivery destination at checkout.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
