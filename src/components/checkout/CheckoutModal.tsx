import React, { useEffect, useRef, useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { AlertCircle, Check, ChevronDown, ExternalLink, ShoppingBag, Tag, X } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons, PayPalMarks, FUNDING } from '@paypal/react-paypal-js';
import type { Order } from '../../types';

const COUNTRIES: Array<[code: string, name: string]> = [
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['FR', 'France'],
  ['IT', 'Italy'],
  ['DE', 'Germany'],
  ['AE', 'United Arab Emirates'],
  ['CA', 'Canada'],
  ['PK', 'Pakistan'],
];

// Currencies PayPal can settle in; anything else is charged in USD
const PAYPAL_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD'];
const SAVED_INFO_KEY = 'atelier_checkout_info';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutForm {
  email: string;
  newsletter: boolean;
  country: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  phone: string;
  saveInfo: boolean;
}

type RequiredField = 'email' | 'lastName' | 'street' | 'city' | 'postalCode';

const EMPTY_FORM: CheckoutForm = {
  email: '',
  newsletter: false,
  country: 'United States',
  firstName: '',
  lastName: '',
  street: '',
  apartment: '',
  city: '',
  postalCode: '',
  phone: '',
  saveInfo: true,
};

const loadSavedForm = (): CheckoutForm => {
  try {
    const saved = localStorage.getItem(SAVED_INFO_KEY);
    return saved ? { ...EMPTY_FORM, ...JSON.parse(saved) } : EMPTY_FORM;
  } catch {
    return EMPTY_FORM;
  }
};

const validate = (form: CheckoutForm): Partial<Record<RequiredField, string>> => {
  const errors: Partial<Record<RequiredField, string>> = {};
  if (!form.email.trim()) errors.email = 'Enter an email';
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email';
  if (!form.lastName.trim()) errors.lastName = 'Enter a last name';
  if (!form.street.trim()) errors.street = 'Enter an address';
  if (!form.city.trim()) errors.city = 'Enter a city';
  if (!form.postalCode.trim()) errors.postalCode = 'Enter a ZIP / postal code';
  return errors;
};

/* ---------- Form primitives ---------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

// Shopify-style floating label: placeholder while empty, small label on top once filled
const Field: React.FC<FieldProps> = ({ id, label, value, onChange, onBlur, error, type = 'text', autoComplete }) => (
  <div>
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={label}
        autoComplete={autoComplete}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`peer w-full h-[50px] rounded-md border bg-white px-3 pt-[18px] pb-1 text-sm text-[#1A1A1A] outline-none transition-[border-color,box-shadow] placeholder:text-[#8A8580] placeholder-shown:py-0 ${
          error
            ? 'border-[#D72C0D] shadow-[0_0_0_1px_#D72C0D]'
            : 'border-[#DCD8D3] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A]'
        }`}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-[7px] text-[11px] text-[#73706B] transition-all duration-150 peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1"
      >
        {label}
      </label>
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D72C0D]">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const Checkbox: React.FC<{ id: string; checked: boolean; onChange: (checked: boolean) => void; children: React.ReactNode }> = ({
  id,
  checked,
  onChange,
  children,
}) => (
  <label htmlFor={id} className="flex items-center gap-2.5 text-sm text-[#1A1A1A] cursor-pointer select-none">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="w-[18px] h-[18px] rounded-[4px] accent-[#1A1A1A] cursor-pointer"
    />
    {children}
  </label>
);

const RadioDot: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span
    aria-hidden="true"
    className={`w-[18px] h-[18px] rounded-full shrink-0 bg-white transition-[border-width] ${
      checked ? 'border-[6px] border-[#1A1A1A]' : 'border border-[#BDB8B2]'
    }`}
  />
);

/* ---------- Order summary ---------- */

interface SummaryLine {
  id: string;
  name: string;
  image: string;
  variant: string;
  quantity: number;
  lineTotal: number;
}

interface OrderSummaryProps {
  lines: SummaryLine[];
  subtotal: number;
  discount: number;
  promoCode: string | null;
  shippingCost: number | null;
  total: number;
  formatPrice: (price: number) => string;
  currencyCode: string;
  chargeNote?: string;
  discountForm?: React.ReactNode;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  lines,
  subtotal,
  discount,
  promoCode,
  shippingCost,
  total,
  formatPrice,
  currencyCode,
  chargeNote,
  discountForm,
}) => {
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {lines.map(line => (
          <li key={line.id} className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-lg border border-[#DCD8D3] bg-white overflow-hidden">
                <img src={line.image} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 rounded-full bg-[#5C5955] text-white text-[11px] font-medium flex items-center justify-center">
                {line.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] leading-snug line-clamp-2">{line.name}</p>
              <p className="text-xs text-[#73706B] mt-0.5">{line.variant}</p>
            </div>
            <span className="text-sm text-[#1A1A1A] shrink-0">{formatPrice(line.lineTotal)}</span>
          </li>
        ))}
      </ul>

      {discountForm}

      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-[#1A1A1A]">
            Subtotal <span className="text-[#73706B]">· {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </dt>
          <dd className="text-[#1A1A1A]">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="flex items-center gap-1.5 text-[#1A1A1A]">
              Order discount
              {promoCode && (
                <span className="inline-flex items-center gap-1 text-xs text-[#73706B]">
                  <Tag className="w-3 h-3" />
                  {promoCode}
                </span>
              )}
            </dt>
            <dd className="text-[#1A1A1A]">−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-[#1A1A1A]">Shipping</dt>
          <dd className={shippingCost === null ? 'text-[#73706B] text-[13px]' : 'text-[#1A1A1A]'}>
            {shippingCost === null ? 'Enter shipping address' : shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
          </dd>
        </div>
        <div className="flex justify-between items-baseline pt-3">
          <dt className="text-[19px] font-semibold text-[#1A1A1A]">Total</dt>
          <dd className="flex items-baseline gap-2">
            <span className="text-xs text-[#73706B]">{currencyCode}</span>
            <span className="text-[19px] font-semibold text-[#1A1A1A]">{formatPrice(total)}</span>
          </dd>
        </div>
        {chargeNote && <p className="text-xs text-[#73706B] leading-relaxed">{chargeNote}</p>}
      </dl>
    </div>
  );
};

/* ---------- Checkout ---------- */

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    formatPrice,
    convertPrice,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    clearCart,
    setLastPlacedOrder,
    lastPlacedOrder,
    setActivePage,
    setActivePolicy,
    freeShippingThreshold,
    currency,
  } = useShop();

  const [step, setStep] = useState<'checkout' | 'confirmed'>('checkout');
  const [form, setForm] = useState<CheckoutForm>(loadSavedForm);
  const [touched, setTouched] = useState<Partial<Record<RequiredField, boolean>>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [shippingMethodId, setShippingMethodId] = useState<'express' | 'priority'>('express');
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Totals (all in USD; formatPrice/convertPrice handle display currency)
  const shippingMethods = [
    {
      id: 'express' as const,
      name: 'DHL Express',
      detail: '1–2 business days · Signature on delivery',
      price: cartTotal >= freeShippingThreshold ? 0 : 25,
    },
    {
      id: 'priority' as const,
      name: 'DHL Priority Overnight',
      detail: 'Next business day when ordered before 2pm CET',
      price: 60,
    },
  ];
  const shippingMethod = shippingMethods.find(m => m.id === shippingMethodId) ?? shippingMethods[0];
  const discountAmount = cartTotal * promoDiscount;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingMethod.price);

  const chargeCurrency = PAYPAL_CURRENCIES.includes(currency) ? currency : 'USD';
  const chargeAmount = chargeCurrency === currency ? convertPrice(finalTotal) : Math.round(finalTotal);
  const chargeNote =
    chargeCurrency !== currency
      ? `${currency} prices are shown for reference. Your payment will be processed in USD ($${chargeAmount.toLocaleString()}).`
      : undefined;

  const errors = validate(form);
  const isFormValid = Object.keys(errors).length === 0;
  const visibleError = (field: RequiredField) => (showAllErrors || touched[field] ? errors[field] : undefined);

  // PayPal holds on to its callbacks, so they read the latest checkout state from this ref
  const latest = useRef({ form, cart, cartTotal, discountAmount, finalTotal, shippingMethod, isFormValid, errors, chargeAmount, chargeCurrency });
  useEffect(() => {
    latest.current = { form, cart, cartTotal, discountAmount, finalTotal, shippingMethod, isFormValid, errors, chargeAmount, chargeCurrency };
  });

  // Lock page scroll and support Escape while checkout is open
  useEffect(() => {
    if (!isCheckoutOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) setIsCheckoutOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isCheckoutOpen, isProcessing, setIsCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const updateForm = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));
  const touch = (field: RequiredField) => () => setTouched(prev => ({ ...prev, [field]: true }));

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    if (step === 'confirmed') setStep('checkout');
  };

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const code = discountInput.trim();
    if (!code) return;
    if (applyPromoCode(code)) {
      setDiscountInput('');
      setDiscountError('');
    } else {
      setDiscountError('Enter a valid discount code');
    }
  };

  // Shows every error and moves focus to the first invalid field
  const revealErrors = () => {
    setShowAllErrors(true);
    const firstInvalid = (['email', 'lastName', 'street', 'city', 'postalCode'] as RequiredField[]).find(
      f => latest.current.errors[f]
    );
    if (firstInvalid) document.getElementById(`checkout-${firstInvalid}`)?.focus();
  };

  const placeOrder = (paymentLabel: string) => {
    const snap = latest.current;
    const f = snap.form;
    const address = {
      fullName: `${f.firstName} ${f.lastName}`.trim(),
      street: f.apartment ? `${f.street}, ${f.apartment}` : f.street,
      city: f.city,
      postalCode: f.postalCode,
      country: f.country,
    };

    const order: Order = {
      id: 'AV-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      trackingNumber: 'Assigned at dispatch',
      paymentMethod: paymentLabel,
      email: f.email,
      items: snap.cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity,
      })),
      subtotal: snap.cartTotal,
      discount: snap.discountAmount,
      shippingCost: snap.shippingMethod.price,
      shippingMethod: snap.shippingMethod.name,
      total: snap.finalTotal,
      shippingAddress: address,
    };

    try {
      if (f.saveInfo) localStorage.setItem(SAVED_INFO_KEY, JSON.stringify(f));
      else localStorage.removeItem(SAVED_INFO_KEY);
    } catch {
      // Saving details is a convenience only
    }

    setLastPlacedOrder(order);
    clearCart();
    setIsProcessing(false);
    setStep('confirmed');
    document.getElementById('checkout-scroll')?.scrollTo({ top: 0 });
  };

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test';
  const orderDescription = `Atelier Vérité order (${cart.reduce((n, i) => n + i.quantity, 0)} items)`;

  const discountForm = (
    <div>
      <form onSubmit={handleApplyDiscount} className="flex gap-3">
        <div className="flex-1">
          <Field
            id="checkout-discount"
            label="Discount code"
            value={discountInput}
            onChange={v => {
              setDiscountInput(v);
              if (discountError) setDiscountError('');
            }}
            error={discountError}
          />
        </div>
        <button
          type="submit"
          disabled={!discountInput.trim()}
          className="h-[50px] px-5 rounded-md text-sm font-medium transition-colors border disabled:bg-[#EDEBE8] disabled:border-[#DCD8D3] disabled:text-[#8A8580] disabled:cursor-not-allowed bg-[#1A1A1A] border-[#1A1A1A] text-white hover:bg-black"
        >
          Apply
        </button>
      </form>
      {appliedPromo && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#E9E7E3] pl-2.5 pr-1.5 py-1 text-[13px] text-[#1A1A1A]">
          <Tag className="w-3.5 h-3.5 text-[#5C5955]" />
          {appliedPromo}
          <button
            type="button"
            onClick={removePromoCode}
            className="p-0.5 rounded text-[#5C5955] hover:text-[#1A1A1A] hover:bg-black/5"
            aria-label={`Remove discount ${appliedPromo}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );

  // Summary data for either the live cart or the confirmed order
  const isConfirmed = step === 'confirmed' && lastPlacedOrder;
  const summaryProps: OrderSummaryProps = isConfirmed
    ? {
        lines: lastPlacedOrder.items.map((it, idx) => ({
          id: `${it.productId}-${idx}`,
          name: it.name,
          image: it.image,
          variant: `${it.color} / ${it.size}`,
          quantity: it.quantity,
          lineTotal: it.price * it.quantity,
        })),
        subtotal: lastPlacedOrder.subtotal ?? lastPlacedOrder.total,
        discount: lastPlacedOrder.discount ?? 0,
        promoCode: null,
        shippingCost: lastPlacedOrder.shippingCost ?? 0,
        total: lastPlacedOrder.total,
        formatPrice,
        currencyCode: currency,
      }
    : {
        lines: cart.map(item => ({
          id: item.id,
          name: item.product.name,
          image: item.product.images[0],
          variant: `${item.selectedColor.name} / ${item.selectedSize}`,
          quantity: item.quantity,
          lineTotal: item.product.price * item.quantity,
        })),
        subtotal: cartTotal,
        discount: discountAmount,
        promoCode: appliedPromo,
        shippingCost: shippingMethod.price,
        total: finalTotal,
        formatPrice,
        currencyCode: currency,
        chargeNote,
        discountForm,
      };

  const sectionTitle = 'text-[19px] font-semibold text-[#1A1A1A] mb-3.5';

  const paypalButtonStyle = { layout: 'vertical' as const, shape: 'rect' as const, height: 50, tagline: false };

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: chargeCurrency, intent: 'capture', components: 'buttons,marks' }}>
      <div
        id="checkout-scroll"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="fixed inset-0 z-50 bg-white overflow-y-auto font-sans text-[#1A1A1A] animate-fade-up [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans"
      >
        {/* Header */}
        <header className="border-b border-[#E6E3DF] bg-white">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 h-[68px] sm:h-[76px] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                closeCheckout();
                setActivePage('home');
              }}
              className="font-serif text-[20px] sm:text-[22px] tracking-[0.2em] font-medium uppercase text-[#1A1A1A]"
            >
              Atelier Vérité
            </button>
            <button
              type="button"
              onClick={closeCheckout}
              className="p-2 -mr-2 text-[#1A1A1A] hover:text-[#5C5955] transition-colors"
              aria-label={isConfirmed ? 'Close' : 'Back to bag'}
            >
              {isConfirmed ? <X className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile order summary toggle */}
        <div className="lg:hidden bg-[#F5F4F2] border-b border-[#E6E3DF]">
          <button
            type="button"
            onClick={() => setIsSummaryOpen(o => !o)}
            aria-expanded={isSummaryOpen}
            className="w-full max-w-[600px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-1.5 text-[#1A1A1A]">
              {isSummaryOpen ? 'Hide order summary' : 'Show order summary'}
              <ChevronDown className={`w-4 h-4 transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`} />
            </span>
            <span className="text-[17px] font-semibold">{formatPrice(summaryProps.total)}</span>
          </button>
          {isSummaryOpen && (
            <div className="max-w-[600px] mx-auto px-5 sm:px-8 pb-6 pt-1">
              <OrderSummary {...summaryProps} />
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] min-h-[calc(100vh-77px)]">
          {/* Main column */}
          <main className="flex lg:justify-end">
            <div className="w-full max-w-[600px] mx-auto lg:mx-0 px-5 sm:px-8 lg:pl-10 lg:pr-14 py-8 lg:py-10">
              {isConfirmed ? (
                /* ---------- Thank you ---------- */
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="text-sm text-[#73706B]">Confirmation #{lastPlacedOrder.id.replace('AV-', '')}</p>
                      <h1 className="text-[24px] font-semibold leading-tight">
                        Thank you{lastPlacedOrder.shippingAddress.fullName ? `, ${lastPlacedOrder.shippingAddress.fullName.split(' ')[0]}` : ''}!
                      </h1>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#DCD8D3] p-5">
                    <h2 className="text-base font-semibold">Your order is confirmed</h2>
                    <p className="text-sm text-[#5C5955] mt-1.5 leading-relaxed">
                      You’ll receive a confirmation email at {lastPlacedOrder.email} with your order number shortly.
                      We’ll email you again with tracking details once your order ships from Biella.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#DCD8D3] p-5">
                    <h2 className="text-base font-semibold mb-4">Order details</h2>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 text-sm">
                      <div>
                        <h3 className="font-medium mb-1">Contact information</h3>
                        <p className="text-[#5C5955] break-words">{lastPlacedOrder.email}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Payment method</h3>
                        <p className="text-[#5C5955]">
                          {lastPlacedOrder.paymentMethod} · {formatPrice(lastPlacedOrder.total)}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Shipping address</h3>
                        <address className="not-italic text-[#5C5955] leading-relaxed">
                          {lastPlacedOrder.shippingAddress.fullName}
                          <br />
                          {lastPlacedOrder.shippingAddress.street}
                          <br />
                          {lastPlacedOrder.shippingAddress.postalCode} {lastPlacedOrder.shippingAddress.city}
                          <br />
                          {lastPlacedOrder.shippingAddress.country}
                        </address>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Shipping method</h3>
                        <p className="text-[#5C5955]">{lastPlacedOrder.shippingMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-sm text-[#5C5955]">
                      Need help?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          closeCheckout();
                          setActivePage('contact');
                        }}
                        className="text-[#1A1A1A] underline underline-offset-2"
                      >
                        Contact us
                      </button>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          closeCheckout();
                          setActivePage('account');
                        }}
                        className="h-[50px] px-5 rounded-md border border-[#DCD8D3] text-sm font-medium hover:border-[#1A1A1A] transition-colors"
                      >
                        View order
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeCheckout();
                          setActivePage('shop');
                        }}
                        className="h-[50px] px-6 rounded-md bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                      >
                        Continue shopping
                      </button>
                    </div>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                /* ---------- Empty bag ---------- */
                <div className="py-16 text-center">
                  <h1 className="text-[22px] font-semibold">Your bag is empty</h1>
                  <p className="text-sm text-[#5C5955] mt-2">Add something to your bag to check out.</p>
                  <button
                    type="button"
                    onClick={() => {
                      closeCheckout();
                      setActivePage('shop');
                    }}
                    className="mt-6 h-[50px] px-6 rounded-md bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                /* ---------- Checkout form ---------- */
                <div>
                  {/* Contact */}
                  <section className="mb-9">
                    <h2 className={sectionTitle}>Contact</h2>
                    <div className="space-y-3">
                      <Field
                        id="checkout-email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={v => updateForm('email', v)}
                        onBlur={touch('email')}
                        error={visibleError('email')}
                      />
                      <Checkbox id="checkout-newsletter" checked={form.newsletter} onChange={v => updateForm('newsletter', v)}>
                        Email me with news and offers
                      </Checkbox>
                    </div>
                  </section>

                  {/* Delivery */}
                  <section className="mb-9">
                    <h2 className={sectionTitle}>Delivery</h2>
                    <div className="space-y-3">
                      <div className="relative">
                        <label htmlFor="checkout-country" className="pointer-events-none absolute left-3 top-[7px] text-[11px] text-[#73706B]">
                          Country/Region
                        </label>
                        <select
                          id="checkout-country"
                          autoComplete="country-name"
                          value={form.country}
                          onChange={e => updateForm('country', e.target.value)}
                          className="w-full h-[50px] appearance-none rounded-md border border-[#DCD8D3] bg-white px-3 pt-[18px] pb-1 text-sm outline-none focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] cursor-pointer"
                        >
                          {COUNTRIES.map(([code, name]) => (
                            <option key={code} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5955]" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field
                          id="checkout-firstName"
                          label="First name (optional)"
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={v => updateForm('firstName', v)}
                        />
                        <Field
                          id="checkout-lastName"
                          label="Last name"
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={v => updateForm('lastName', v)}
                          onBlur={touch('lastName')}
                          error={visibleError('lastName')}
                        />
                      </div>

                      <Field
                        id="checkout-street"
                        label="Address"
                        autoComplete="address-line1"
                        value={form.street}
                        onChange={v => updateForm('street', v)}
                        onBlur={touch('street')}
                        error={visibleError('street')}
                      />
                      <Field
                        id="checkout-apartment"
                        label="Apartment, suite, etc. (optional)"
                        autoComplete="address-line2"
                        value={form.apartment}
                        onChange={v => updateForm('apartment', v)}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field
                          id="checkout-city"
                          label="City"
                          autoComplete="address-level2"
                          value={form.city}
                          onChange={v => updateForm('city', v)}
                          onBlur={touch('city')}
                          error={visibleError('city')}
                        />
                        <Field
                          id="checkout-postalCode"
                          label="Postal code"
                          autoComplete="postal-code"
                          value={form.postalCode}
                          onChange={v => updateForm('postalCode', v)}
                          onBlur={touch('postalCode')}
                          error={visibleError('postalCode')}
                        />
                      </div>

                      <Field
                        id="checkout-phone"
                        label="Phone (optional)"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={v => updateForm('phone', v)}
                      />

                      <Checkbox id="checkout-save" checked={form.saveInfo} onChange={v => updateForm('saveInfo', v)}>
                        Save this information for next time
                      </Checkbox>
                    </div>
                  </section>

                  {/* Shipping method */}
                  <section className="mb-9">
                    <h2 className={sectionTitle}>Shipping method</h2>
                    <div role="radiogroup" aria-label="Shipping method" className="rounded-md border border-[#DCD8D3]">
                      {shippingMethods.map((method, idx) => {
                        const checked = method.id === shippingMethodId;
                        return (
                          <label
                            key={method.id}
                            className={`relative flex items-center gap-3 px-4 py-4 text-sm cursor-pointer transition-colors ${
                              idx > 0 ? 'border-t border-[#DCD8D3]' : ''
                            } ${idx === 0 ? 'rounded-t-md' : ''} ${idx === shippingMethods.length - 1 ? 'rounded-b-md' : ''} ${
                              checked ? 'bg-[#F7F6F4] shadow-[inset_0_0_0_1px_#1A1A1A]' : 'hover:bg-[#FAFAF9]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="shipping-method"
                              value={method.id}
                              checked={checked}
                              onChange={() => setShippingMethodId(method.id)}
                              className="sr-only"
                            />
                            <RadioDot checked={checked} />
                            <span className="flex-1">
                              <span className="block text-[#1A1A1A]">{method.name}</span>
                              <span className="block text-[13px] text-[#73706B] mt-0.5">{method.detail}</span>
                            </span>
                            <span className="font-medium text-[#1A1A1A]">
                              {method.price === 0 ? 'FREE' : formatPrice(method.price)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {cartTotal < freeShippingThreshold && (
                      <p className="mt-2.5 text-[13px] text-[#73706B]">
                        DHL Express is free on orders over {formatPrice(freeShippingThreshold)}.
                      </p>
                    )}
                  </section>

                  {/* Payment */}
                  <section className="mb-6">
                    <h2 className="text-[19px] font-semibold text-[#1A1A1A]">Payment</h2>
                    <p className="text-sm text-[#73706B] mt-1 mb-3.5">All transactions are secure and encrypted.</p>

                    <div className="rounded-md border border-[#DCD8D3] overflow-hidden">
                      <div className="flex items-center gap-3 px-4 h-[54px] bg-[#F7F6F4] shadow-[inset_0_0_0_1px_#1A1A1A] rounded-t-md">
                        <RadioDot checked />
                        <span className="flex-1 text-sm text-[#1A1A1A]">PayPal</span>
                        <PayPalMarks fundingSource={FUNDING.PAYPAL} className="h-[22px] flex items-center" />
                      </div>
                      <div className="bg-[#F5F4F2] border-t border-[#DCD8D3] px-6 py-6 text-center">
                        <ExternalLink className="w-9 h-9 mx-auto text-[#8A8580]" strokeWidth={1.25} />
                        <p className="text-sm text-[#3F3C39] mt-3 max-w-sm mx-auto leading-relaxed">
                          After clicking “Pay with PayPal”, you will be redirected to PayPal to complete your purchase securely.
                          You can pay with your PayPal balance, bank account, or debit/credit card.
                        </p>
                      </div>
                    </div>
                  </section>

                  {paymentError && (
                    <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-md border border-[#F1C1B8] bg-[#FDF2F0] px-4 py-3 text-sm text-[#8E1F0B]">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {paymentError}
                    </div>
                  )}

                  {!isFormValid && showAllErrors && (
                    <p className="mb-3 text-sm text-[#D72C0D]">Please complete the highlighted fields above.</p>
                  )}

                  {/* Pay button (rendered by PayPal so card/PayPal data never touches our page) */}
                  <div className="min-h-[50px]">
                    <PayPalButtons
                      fundingSource={FUNDING.PAYPAL}
                      style={{ ...paypalButtonStyle, color: 'gold', label: 'pay' }}
                      onClick={(_data, actions) => {
                        setPaymentError('');
                        if (!latest.current.isFormValid) {
                          revealErrors();
                          return actions.reject();
                        }
                        return actions.resolve();
                      }}
                      createOrder={(_data, actions) => {
                        const snap = latest.current;
                        return actions.order.create({
                          intent: 'CAPTURE',
                          application_context: { brand_name: 'Atelier Vérité', shipping_preference: 'NO_SHIPPING' },
                          purchase_units: [
                            {
                              description: orderDescription,
                              amount: { currency_code: snap.chargeCurrency, value: snap.chargeAmount.toFixed(2) },
                            },
                          ],
                        });
                      }}
                      onApprove={async (_data, actions) => {
                        setIsProcessing(true);
                        try {
                          if (actions.order) await actions.order.capture();
                          placeOrder('PayPal');
                        } catch {
                          setIsProcessing(false);
                          setPaymentError('Your payment couldn’t be completed. Please try again.');
                        }
                      }}
                      onError={() => setPaymentError('Your payment couldn’t be processed. Please try again.')}
                    />
                  </div>

                  {import.meta.env.DEV && (
                    <button
                      type="button"
                      onClick={() => (isFormValid ? placeOrder('Test payment') : revealErrors())}
                      className="mt-3 w-full text-center text-xs text-[#8A8580] underline underline-offset-2 hover:text-[#1A1A1A]"
                    >
                      Simulate successful payment (development only)
                    </button>
                  )}

                  {/* Policies */}
                  <nav aria-label="Store policies" className="mt-10 pt-4 border-t border-[#E6E3DF] flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                    {([
                      ['returns', 'Refund policy'],
                      ['shipping', 'Shipping policy'],
                      ['privacy', 'Privacy policy'],
                      ['terms', 'Terms of service'],
                    ] as const).map(([policy, label]) => (
                      <button
                        key={policy}
                        type="button"
                        onClick={() => setActivePolicy(policy)}
                        className="text-[#1A1A1A] underline underline-offset-2 decoration-[#BDB8B2] hover:decoration-[#1A1A1A]"
                      >
                        {label}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </main>

          {/* Order summary (desktop) */}
          <aside className="hidden lg:block bg-[#F5F4F2] border-l border-[#E6E3DF]" aria-label="Order summary">
            <div className="sticky top-0 max-w-[460px] pl-12 pr-10 py-10">
              <OrderSummary {...summaryProps} />
            </div>
          </aside>
        </div>

        {/* Processing overlay */}
        {isProcessing && (
          <div className="fixed inset-0 z-10 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3" role="status">
            <span className="w-8 h-8 rounded-full border-2 border-[#DCD8D3] border-t-[#1A1A1A] animate-spin" />
            <p className="text-sm text-[#3F3C39]">Processing your payment…</p>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};
