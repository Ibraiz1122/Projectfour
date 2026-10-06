import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, ShieldCheck, Check, Lock, ArrowRight, CreditCard } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    formatPrice,
    promoDiscount,
    appliedPromo,
    clearCart,
    setLastPlacedOrder,
    lastPlacedOrder,
    setActivePage
  } = useShop();

  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping, 2: Delivery & Payment, 3: Success
  const [formData, setFormData] = useState({
    email: 'client@atelier-verite.com',
    firstName: 'Eleanor',
    lastName: 'Vance',
    street: '142 Boulevard Saint-Germain',
    city: 'Paris',
    postalCode: '75006',
    country: 'France',
    shippingMethod: 'express',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••'
  });

  if (!isCheckoutOpen) return null;

  const discountAmount = cartTotal * promoDiscount;
  const deliveryFee = formData.shippingMethod === 'express' ? 0 : 25;
  const finalTotal = Math.max(0, cartTotal - discountAmount + (cartTotal >= 500 ? 0 : deliveryFee));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = 'AV-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNum = 'DHL-FR-' + Math.floor(100000000 + Math.random() * 900000000);

    const placedOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing' as const,
      trackingNumber: trackingNum,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity
      })),
      total: finalTotal,
      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      }
    };

    setLastPlacedOrder(placedOrder);
    setStep(3);
    clearCart();
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setActivePage('account');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/70 backdrop-blur-md transition-opacity"
        onClick={() => step !== 3 && setIsCheckoutOpen(false)}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#B89758]" />
            <div>
              <span className="font-serif text-xl tracking-[0.16em] uppercase font-medium text-[#1A1A1A]">
                Atelier Vérité Private Checkout
              </span>
              <span className="text-[10px] tracking-widest text-[#8C827A] block">
                Encrypted Client Portal &bull; Step {step} of 3
              </span>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-[#1A1A1A] hover:bg-[#EAE5D9] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* STEP 1: Shipping & Client Contact */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                {/* Shopify Express Checkout Banner */}
                <div className="bg-white border border-[#E7E2DA] p-4 text-center space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A726A] font-medium block">
                    Express checkout
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-2.5 bg-[#5A31F4] hover:bg-[#4922dc] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>shop</span>
                      <span className="font-light bg-white text-[#5A31F4] px-1 py-0.2 rounded text-[10px] font-bold">Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-2.5 bg-black hover:bg-[#222] text-white text-xs font-medium rounded flex items-center justify-center gap-1 transition-colors shadow-sm"
                    >
                      <span>Apple Pay</span>
                    </button>
                  </div>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#E7E2DA]"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#8C827A] uppercase tracking-wider">or continue with private details</span>
                  <div className="flex-grow border-t border-[#E7E2DA]"></div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Contact &amp; Shipping Address</h3>
                  <p className="text-xs text-[#7A726A] mt-1">Please provide your private dispatch coordinates.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                      Email for Order Protocol &amp; Tracking
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                      Street Address &amp; Suite
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={e => setFormData({ ...formData, street: e.target.value })}
                      className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#4A433D] mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Shipping &amp; Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Order Manifest Summary */}
              <div className="lg:col-span-5 bg-white p-6 border border-[#E7E2DA] space-y-4">
                <h4 className="font-serif text-lg text-[#1A1A1A] pb-2 border-b border-[#E7E2DA]">
                  Bag Review ({cart.length} items)
                </h4>
                <div className="space-y-3 max-h-56 overflow-y-auto divide-y divide-[#E7E2DA]">
                  {cart.map(item => (
                    <div key={item.id} className="pt-2 flex items-center gap-3">
                      <img src={item.product.images[0]} alt="" className="w-12 h-16 object-cover bg-[#ECE8DF]" />
                      <div className="flex-1 text-xs">
                        <div className="font-serif text-sm text-[#1A1A1A]">{item.product.name}</div>
                        <div className="text-[#8C827A]">{item.selectedColor.name} &bull; Size {item.selectedSize}</div>
                        <div className="font-medium text-[#1A1A1A]">{formatPrice(item.product.price * item.quantity)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E7E2DA] pt-3 text-xs space-y-1">
                  <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(cartTotal)}</span></div>
                  {appliedPromo && <div className="flex justify-between text-[#2B5138]"><span>Courtesy ({appliedPromo}):</span><span>-{formatPrice(discountAmount)}</span></div>}
                  <div className="flex justify-between font-serif text-base pt-2 font-medium"><span>Estimated Total:</span><span>{formatPrice(finalTotal)}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Options & Payment */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Courier &amp; Settlement</h3>
                  <p className="text-xs text-[#7A726A] mt-1">Select your preferred courier service and payment method.</p>
                </div>

                {/* Shipping Method Radio */}
                <div className="space-y-3">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A433D]">
                    Courier Protocol
                  </label>
                  <label className="flex items-center justify-between p-3.5 bg-white border border-[#DCD5C9] cursor-pointer text-xs">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        value="express" 
                        checked={formData.shippingMethod === 'express'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                        className="accent-[#1A1A1A]" 
                      />
                      <div>
                        <strong className="block text-[#1A1A1A]">DHL Express Insured Courier</strong>
                        <span className="text-[#7A726A]">1-2 business days with white-glove signature delivery</span>
                      </div>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">Complimentary</span>
                  </label>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4 pt-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A433D]">
                    Settlement Method (Demo)
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 border text-xs text-center font-medium transition-colors ${
                        formData.paymentMethod === 'card' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#4A433D] border-[#DCD5C9]'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                      className={`p-3 border text-xs text-center font-medium transition-colors ${
                        formData.paymentMethod === 'applepay' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#4A433D] border-[#DCD5C9]'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'concierge' })}
                      className={`p-3 border text-xs text-center font-medium transition-colors ${
                        formData.paymentMethod === 'concierge' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#4A433D] border-[#DCD5C9]'
                      }`}
                    >
                      Atelier Invoice
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="bg-white p-4 border border-[#DCD5C9] space-y-3 text-xs">
                      <div>
                        <label className="block text-[10px] uppercase text-[#7A726A] mb-1">Card Number</label>
                        <div className="flex items-center gap-2 border border-[#DCD5C9] p-2 bg-[#FAF9F6]">
                          <CreditCard className="w-4 h-4 text-[#8C827A]" />
                          <input type="text" readOnly value={formData.cardNumber} className="bg-transparent flex-1 focus:outline-none text-xs" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] uppercase text-[#7A726A] mb-1">Expires</label>
                          <input type="text" readOnly value={formData.cardExpiry} className="w-full border border-[#DCD5C9] p-2 bg-[#FAF9F6] text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-[#7A726A] mb-1">Security Code</label>
                          <input type="text" readOnly value={formData.cardCvc} className="w-full border border-[#DCD5C9] p-2 bg-[#FAF9F6] text-xs" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-[#DCD5C9] bg-white text-[#1A1A1A] py-3.5 text-xs uppercase tracking-wider font-medium hover:border-[#1A1A1A]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#B89758]" />
                    <span>Authorize &amp; Place Order ({formatPrice(finalTotal)})</span>
                  </button>
                </div>
              </div>

              {/* Order Manifest Summary */}
              <div className="lg:col-span-5 bg-white p-6 border border-[#E7E2DA] space-y-4">
                <h4 className="font-serif text-lg text-[#1A1A1A] pb-2 border-b border-[#E7E2DA]">
                  Recipient Coordinates
                </h4>
                <div className="text-xs text-[#59514A] space-y-1">
                  <p className="font-semibold text-[#1A1A1A]">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.street}</p>
                  <p>{formData.city}, {formData.postalCode}</p>
                  <p>{formData.country}</p>
                  <p className="text-[#8C827A] pt-1">{formData.email}</p>
                </div>
                <div className="border-t border-[#E7E2DA] pt-3 text-xs space-y-1">
                  <div className="flex justify-between"><span>Garment Subtotal:</span><span>{formatPrice(cartTotal)}</span></div>
                  {appliedPromo && <div className="flex justify-between text-[#2B5138]"><span>Courtesy ({appliedPromo}):</span><span>-{formatPrice(discountAmount)}</span></div>}
                  <div className="flex justify-between"><span>Courier Delivery:</span><span>Complimentary</span></div>
                  <div className="flex justify-between font-serif text-lg pt-3 border-t border-[#E7E2DA] font-medium">
                    <span>Total Settled:</span>
                    <span className="font-sans font-semibold">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 3 && lastPlacedOrder && (
            <div className="py-12 max-w-xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8 text-[#B89758]" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
                  Order Successfully Authorized
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mt-2">
                  Thank you, {lastPlacedOrder.shippingAddress.fullName}
                </h3>
                <p className="text-xs text-[#7A726A] mt-2 max-w-md mx-auto leading-relaxed">
                  Your order manifest <strong className="text-[#1A1A1A] font-mono">{lastPlacedOrder.id}</strong> has been transmitted to our Italian atelier. A confirmation notice has been sent to {formData.email}.
                </p>
              </div>

              {/* Order Card */}
              <div className="bg-white p-6 border border-[#E7E2DA] text-left space-y-4">
                <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3 text-xs">
                  <div>
                    <span className="text-[#8C827A] block">Tracking Identification</span>
                    <span className="font-mono font-medium text-[#1A1A1A]">{lastPlacedOrder.trackingNumber}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">Status</span>
                    <span className="text-[#2B5138] font-medium">{lastPlacedOrder.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {lastPlacedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img src={item.image} alt="" className="w-10 h-14 object-cover bg-[#ECE8DF]" />
                      <div className="flex-1">
                        <div className="font-serif text-sm text-[#1A1A1A]">{item.name}</div>
                        <div className="text-[#8C827A]">{item.color} &bull; Size {item.size} &bull; Qty {item.quantity}</div>
                      </div>
                      <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E7E2DA] pt-3 flex justify-between text-xs font-semibold">
                  <span>Total Settled:</span>
                  <span>{formatPrice(lastPlacedOrder.total)}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleFinish}
                  className="flex-1 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  View in Client Account &amp; Track
                </button>
                <button
                  onClick={() => { setIsCheckoutOpen(false); setStep(1); setActivePage('shop'); }}
                  className="border border-[#DCD5C9] bg-white text-[#1A1A1A] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:border-[#1A1A1A]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
