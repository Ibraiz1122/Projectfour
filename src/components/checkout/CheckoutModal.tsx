import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Check, ArrowRight, ChevronRight, ChevronLeft, ShieldCheck, Tag } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    formatPrice,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    clearCart,
    setLastPlacedOrder,
    lastPlacedOrder,
    setActivePage,
    currency
  } = useShop();

  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Information & Shipping, 2: Payment (PayPal), 3: Confirmation
  const [discountInput, setDiscountInput] = useState('');
  const [formData, setFormData] = useState({
    email: 'client@atelier-verite.com',
    firstName: 'Eleanor',
    lastName: 'Vance',
    street: '142 Boulevard Saint-Germain',
    apartment: 'Apartment 4B',
    city: 'Paris',
    postalCode: '75006',
    country: 'France',
    shippingMethod: 'express',
    saveInfo: true
  });

  if (!isCheckoutOpen) return null;

  const discountAmount = cartTotal * promoDiscount;
  const deliveryFee = 0; // Complimentary DHL express
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);
  const paypalCurrency = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(currency) ? currency : 'USD';

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountInput.trim()) return;
    const success = applyPromoCode(discountInput.trim());
    if (success) {
      setDiscountInput('');
    }
  };

  const executeOrderPlacement = (paymentLabel = 'PayPal') => {
    const orderId = 'AV-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNum = 'DHL-FR-' + Math.floor(100000000 + Math.random() * 900000000);

    const placedOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing' as const,
      trackingNumber: trackingNum,
      paymentMethod: paymentLabel,
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
        street: formData.apartment ? `${formData.street}, ${formData.apartment}` : formData.street,
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
    <PayPalScriptProvider options={{ clientId: "test", currency: paypalCurrency, intent: "capture" }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => step !== 3 && setIsCheckoutOpen(false)}
        />

        {/* Main Shopify-Style Container */}
        <div className="relative w-full max-w-5xl bg-white shadow-2xl z-10 overflow-hidden max-h-[94vh] flex flex-col border border-[#E1DBD2]">
          
          {/* Top Bar / Breadcrumb Header */}
          <div className="px-6 py-4.5 border-b border-[#E1DBD2] flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="font-serif text-lg tracking-[0.24em] font-medium text-[#1A1A1A] uppercase">
                ATELIER VÉRITÉ
              </h2>
              {step !== 3 && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#706B65] mt-1 font-sans">
                  <span className="text-[#999] hover:text-[#1A1A1A] cursor-pointer" onClick={() => setIsCheckoutOpen(false)}>
                    Cart
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#BBB]" />
                  <span className={step === 1 ? 'font-semibold text-[#1A1A1A]' : 'text-[#999] cursor-pointer hover:text-[#1A1A1A]'} onClick={() => step === 2 && setStep(1)}>
                    Information
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#BBB]" />
                  <span className={step === 2 ? 'font-semibold text-[#1A1A1A]' : 'text-[#999]'}>
                    Payment (PayPal)
                  </span>
                </div>
              )}
            </div>

            {step !== 3 && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 text-[#555] hover:text-[#1A1A1A] hover:bg-[#F2EFE9] rounded-full transition-colors"
                aria-label="Close Checkout"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Checkout Body: 2 Columns (Form & Order Summary) */}
          <div className="flex-1 overflow-y-auto">
            
            {/* STEPS 1 & 2: Two-column Shopify Grid */}
            {step !== 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                {/* LEFT COLUMN: Customer Information or Payment (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-7 border-b lg:border-b-0 lg:border-r border-[#E1DBD2]">
                  
                  {/* STEP 1: Customer Contact & Shipping Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      {/* Express Checkout with PayPal */}
                      <div className="bg-[#FAF8F5] border border-[#E7E2DA] p-4 text-center rounded-sm space-y-2.5">
                        <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#706B65] font-medium block">
                          Express checkout
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full py-2.5 bg-[#FFC439] hover:bg-[#F2BA36] rounded text-[#003087] font-bold text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span className="italic font-extrabold text-[#003087]">Pay</span>
                          <span className="italic font-extrabold text-[#0079C1]">Pal</span>
                        </button>
                      </div>

                      <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-[#E1DBD2]"></div>
                        <span className="flex-shrink mx-3 text-[10px] text-[#8C827A] uppercase tracking-wider font-medium">
                          OR
                        </span>
                        <div className="flex-grow border-t border-[#E1DBD2]"></div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
                            Contact Information
                          </h3>
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#D5CEC5] p-3 text-xs rounded-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        />
                      </div>

                      {/* Shipping Address */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
                          Shipping Address
                        </h3>

                        <div className="space-y-2.5 text-xs">
                          {/* Country */}
                          <select
                            value={formData.country}
                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-white border border-[#D5CEC5] p-3 text-xs rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                          >
                            <option value="France">France</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Italy">Italy</option>
                            <option value="Germany">Germany</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Canada">Canada</option>
                            <option value="Pakistan">Pakistan</option>
                          </select>

                          {/* Names */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              required
                              placeholder="First name"
                              value={formData.firstName}
                              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Last name"
                              value={formData.lastName}
                              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                              className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                            />
                          </div>

                          {/* Street */}
                          <input
                            type="text"
                            required
                            placeholder="Address"
                            value={formData.street}
                            onChange={e => setFormData({ ...formData, street: e.target.value })}
                            className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                          />

                          {/* Apartment */}
                          <input
                            type="text"
                            placeholder="Apartment, suite, etc. (optional)"
                            value={formData.apartment}
                            onChange={e => setFormData({ ...formData, apartment: e.target.value })}
                            className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                          />

                          {/* City & Postal */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              required
                              placeholder="Postal code"
                              value={formData.postalCode}
                              onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                              className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                            />
                            <input
                              type="text"
                              required
                              placeholder="City"
                              value={formData.city}
                              onChange={e => setFormData({ ...formData, city: e.target.value })}
                              className="w-full bg-white border border-[#D5CEC5] p-3 rounded-sm focus:outline-none focus:border-[#1A1A1A]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Shipping Method */}
                      <div className="space-y-2.5">
                        <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
                          Shipping Method
                        </h3>
                        <div className="p-3.5 bg-white border border-[#D5CEC5] rounded-sm flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full border-4 border-[#1A1A1A] bg-white" />
                            <div>
                              <span className="font-semibold text-[#1A1A1A] block">DHL Express Insured Courier</span>
                              <span className="text-[11px] text-[#706B65]">1-2 business days with white-glove signature</span>
                            </div>
                          </div>
                          <span className="font-semibold text-[#2B5138] uppercase text-[11px] tracking-wider">Free</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setIsCheckoutOpen(false)}
                          className="text-xs text-[#706B65] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Return to cart</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 px-7 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2 shadow-sm rounded-sm"
                        >
                          <span>Continue to payment</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Pure PayPal Payment */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* Customer Review Summary Box (Shopify Style) */}
                      <div className="border border-[#E1DBD2] rounded-sm divide-y divide-[#E1DBD2] text-xs">
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex gap-4">
                            <span className="text-[#8C827A] w-14 shrink-0">Contact</span>
                            <span className="text-[#1A1A1A] font-medium">{formData.email}</span>
                          </div>
                          <button onClick={() => setStep(1)} className="text-[11px] text-[#B89758] hover:underline font-medium">
                            Change
                          </button>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex gap-4">
                            <span className="text-[#8C827A] w-14 shrink-0">Ship to</span>
                            <span className="text-[#1A1A1A]">{formData.street}, {formData.city}, {formData.postalCode}, {formData.country}</span>
                          </div>
                          <button onClick={() => setStep(1)} className="text-[11px] text-[#B89758] hover:underline font-medium">
                            Change
                          </button>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex gap-4">
                            <span className="text-[#8C827A] w-14 shrink-0">Method</span>
                            <span className="text-[#1A1A1A]">DHL Express Insured Courier &bull; <strong className="text-[#2B5138]">Free</strong></span>
                          </div>
                          <span className="text-[11px] text-[#8C827A]">Included</span>
                        </div>
                      </div>

                      {/* Payment Section (Shopify Pure PayPal) */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
                            Payment
                          </h3>
                          <p className="text-xs text-[#706B65] mt-0.5">
                            All transactions are secure and encrypted.
                          </p>
                        </div>

                        {/* Exclusive PayPal Box */}
                        <div className="border border-[#1A1A1A] rounded-sm overflow-hidden bg-white shadow-xs">
                          {/* Radio Card Header */}
                          <div className="p-4 bg-[#FAF8F5] border-b border-[#E1DBD2] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full border-4 border-[#003087] bg-white" />
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-[#003087] italic tracking-tight text-[15px]">PayPal</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#2B5138] font-medium bg-[#E8F3EB] px-2 py-0.5 rounded">
                              Official Client SDK
                            </span>
                          </div>

                          {/* Body with Official Embedded PayPal Buttons */}
                          <div className="p-5 space-y-4 bg-white text-center">
                            <div className="max-w-xs mx-auto py-2">
                              <PayPalButtons
                                style={{
                                  layout: "vertical",
                                  color: "gold",
                                  shape: "rect",
                                  label: "paypal",
                                  height: 44,
                                  tagline: false
                                }}
                                createOrder={(_data, actions) => {
                                  return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [
                                      {
                                        description: `Atelier Vérité Order (${cart.length} items)`,
                                        amount: {
                                          currency_code: paypalCurrency,
                                          value: Math.max(1, finalTotal).toFixed(2),
                                        },
                                      },
                                    ],
                                  });
                                }}
                                onApprove={async (data, actions) => {
                                  if (actions.order) {
                                    await actions.order.capture();
                                  }
                                  executeOrderPlacement(`PayPal (Order ID: ${data.orderID || 'COMPLETED'})`);
                                }}
                                onError={(err) => {
                                  console.error("PayPal Frontend Error:", err);
                                }}
                              />
                            </div>

                            <p className="text-[11px] text-[#706B65] max-w-sm mx-auto leading-relaxed">
                              After clicking PayPal, you can finalize your transaction safely using your PayPal account balance, linked bank account, or debit/credit card.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Direct Authorize Simulation Button */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs text-[#706B65] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Return to information</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => executeOrderPlacement('PayPal (Test Verified)')}
                          className="bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center gap-2 rounded-sm"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#B89758]" />
                          <span>Complete Order ({formatPrice(finalTotal)})</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Shopify Order Summary & Cart Items (5 cols) */}
                <div className="lg:col-span-5 bg-[#F9F8F6] p-6 sm:p-8 space-y-6">
                  {/* Cart Items List with Floating Quantity Badges */}
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3.5 text-xs">
                        {/* Thumbnail with floating count pill */}
                        <div className="relative w-14 h-18 shrink-0 bg-white border border-[#E1DBD2] rounded-sm overflow-visible">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover rounded-sm"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#666059] text-white text-[10.5px] font-semibold rounded-full flex items-center justify-center shadow-xs">
                            {item.quantity}
                          </span>
                        </div>

                        {/* Title and variant */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#1A1A1A] truncate">{item.product.name}</h4>
                          <span className="text-[11px] text-[#706B65] block">
                            {item.selectedColor.name} / {item.selectedSize}
                          </span>
                        </div>

                        {/* Line total */}
                        <span className="font-medium text-[#1A1A1A] shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shopify Discount Code Box */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2 border-t border-[#E1DBD2]">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Discount code (e.g. ATELIER15)"
                        value={discountInput}
                        onChange={e => setDiscountInput(e.target.value)}
                        className="w-full bg-white border border-[#D5CEC5] py-2.5 px-3 text-xs rounded-sm focus:outline-none focus:border-[#1A1A1A] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#EAE5DF] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-4 py-2.5 text-xs font-semibold rounded-sm transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Price Totals Breakdown */}
                  <div className="border-t border-[#E1DBD2] pt-4 text-xs space-y-2 text-[#5A544E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1A1A1A]">{formatPrice(cartTotal)}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-[#2B5138]">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Discount ({appliedPromo})</span>
                        </span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-[#2B5138] uppercase text-[11px]">Free</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated taxes</span>
                      <span className="text-[#8C827A]">$0.00 (Included)</span>
                    </div>

                    <div className="border-t border-[#E1DBD2] pt-3 flex items-baseline justify-between text-base font-semibold text-[#1A1A1A]">
                      <span className="font-medium">Total</span>
                      <div className="text-right">
                        <span className="text-[11px] font-normal text-[#8C827A] mr-1.5">{currency}</span>
                        <span className="font-serif text-xl">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 3: Authentic Shopify Order Confirmation */}
            {step === 3 && lastPlacedOrder && (
              <div className="p-8 sm:p-12 max-w-xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2B5138] flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#2B5138] font-bold block">
                    Order Confirmed
                  </span>
                  <h3 className="font-serif text-3xl text-[#1A1A1A] mt-1.5">
                    Thank you, {lastPlacedOrder.shippingAddress.fullName}!
                  </h3>
                  <p className="text-xs text-[#706B65] mt-2 leading-relaxed">
                    Your order <strong className="text-[#1A1A1A] font-mono">{lastPlacedOrder.id}</strong> has been received and confirmed. A dispatch receipt has been sent to {formData.email}.
                  </p>
                </div>

                {/* Shopify Order Details Card */}
                <div className="bg-[#FAF8F5] p-6 border border-[#E1DBD2] rounded-sm text-left space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E1DBD2] pb-3">
                    <div>
                      <span className="text-[#8C827A] block text-[10px] uppercase">Carrier &amp; Tracking</span>
                      <span className="font-mono font-semibold text-[#1A1A1A]">{lastPlacedOrder.trackingNumber}</span>
                    </div>
                    <span className="bg-white border border-[#E1DBD2] px-2.5 py-1 text-[10px] uppercase font-bold text-[#2B5138] rounded">
                      Paid via PayPal
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#8C827A] block text-[10px] uppercase">Delivery Address</span>
                      <p className="text-[#1A1A1A] pt-1">
                        {lastPlacedOrder.shippingAddress.fullName}<br />
                        {lastPlacedOrder.shippingAddress.street}<br />
                        {lastPlacedOrder.shippingAddress.city}, {lastPlacedOrder.shippingAddress.postalCode}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#8C827A] block text-[10px] uppercase">Shipping Protocol</span>
                      <p className="text-[#1A1A1A] pt-1 font-medium">
                        DHL Express Insured Courier<br />
                        <span className="text-[#2B5138]">Complimentary</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#E1DBD2] pt-3 flex justify-between font-semibold text-sm text-[#1A1A1A]">
                    <span>Amount Settled:</span>
                    <span className="font-serif">{formatPrice(lastPlacedOrder.total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleFinish}
                    className="flex-1 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm"
                  >
                    View in Account &amp; Track
                  </button>
                  <button
                    onClick={() => { setIsCheckoutOpen(false); setStep(1); setActivePage('shop'); }}
                    className="border border-[#D5CEC5] bg-white text-[#1A1A1A] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:border-[#1A1A1A] rounded-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
