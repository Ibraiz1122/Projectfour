import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, ProductColor, ActivePage, Order } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastNotification {
  id: string;
  message: string;
  subMessage?: string;
  type: 'cart' | 'wishlist' | 'info';
}

interface ShopContextType {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  openProductDetail: (product: Product) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (categoryId: string | null) => void;
  selectedSubcategoryFilter: string | null;
  setSelectedSubcategoryFilter: (subcategoryId: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'PKR';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'PKR') => void;
  formatPrice: (price: number) => string;

  // Policy Modal
  activePolicy: 'shipping' | 'returns' | 'privacy' | 'terms' | null;
  setActivePolicy: (policy: 'shipping' | 'returns' | 'privacy' | 'terms' | null) => void;

  // Reviews
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  reviewsList: Array<{
    id: string;
    author: string;
    location: string;
    product: string;
    stars: number;
    headline: string;
    text: string;
    date: string;
    verified: boolean;
  }>;
  addNewReview: (review: { author: string; location: string; product: string; stars: number; headline: string; text: string }) => void;

  // Notifications
  notifications: ToastNotification[];
  removeNotification: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'PKR', { symbol: string; rate: number; label: string; flag: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)', flag: '🇺🇸' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', flag: '🇬🇧' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)', flag: '🇦🇪' },
  CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD ($)', flag: '🇨🇦' },
  PKR: { symbol: 'Rs ', rate: 278.0, label: 'PKR (Rs)', flag: '🇵🇰' },
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string | null>(null);

  // Cart & Wishlist persistence with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : ['prod-coat-01', 'prod-dress-01'];
    } catch {
      return ['prod-coat-01', 'prod-dress-01'];
    }
  });

  // UI States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Currency & Promo
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'PKR'>('USD');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Policy Modal
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'returns' | 'privacy' | 'terms' | null>(null);

  // Reviews
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: 'Camille de Laurent',
      location: 'Paris, France',
      product: 'Cashmere Greatcoat in Noir',
      stars: 5,
      headline: 'The drape and weight are truly museum-grade.',
      text: 'Having worn bespoke overcoats for two decades, this double-faced cashmere stands on its own. The shoulder construction feels weightless yet substantial.',
      date: 'October 2, 2026',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Julian Sterling',
      location: 'London, UK',
      product: 'Chunky Ribbed Cashmere Turtleneck',
      stars: 5,
      headline: 'Sublime tactile warmth and timeless poise.',
      text: 'Delivered in a shaped cedar box within 48 hours. The gauge of the Mongolian cashmere is noticeably superior to conventional luxury houses.',
      date: 'September 28, 2026',
      verified: true
    },
    {
      id: 'rev-3',
      author: 'Elena Rossi',
      location: 'Milan, Italy',
      product: 'The Pleated Wool Wide-Leg Trouser',
      stars: 5,
      headline: 'Fluid architecture that moves like liquid mercury.',
      text: 'The drape of this Italian wool serge is exceptional. Unquestionably the centerpiece of my everyday tailoring this season.',
      date: 'September 15, 2026',
      verified: true
    },
    {
      id: 'rev-4',
      author: 'Astrid Lindqvist',
      location: 'Stockholm, Sweden',
      product: 'The Structured Wool Serge Blazer',
      stars: 5,
      headline: 'Roped shoulders with immaculate balance.',
      text: 'The pitch of the sleeve and the roll of the lapel rival Savile Row. Wore it across three time zones without a single wrinkle.',
      date: 'October 4, 2026',
      verified: true
    },
    {
      id: 'rev-5',
      author: 'Kenji Takahashi',
      location: 'Tokyo, Japan',
      product: 'The 30mm Silk Satin Bias Slip Dress',
      stars: 5,
      headline: 'Sensory perfection in heavy Mulberry silk.',
      text: 'Purchased for a private gala. The sheen has none of the artificial shine of synthetic blends—it reflects ambient candlelight with deep liquid brilliance.',
      date: 'September 22, 2026',
      verified: true
    },
    {
      id: 'rev-6',
      author: 'Marcus Vance',
      location: 'New York, USA',
      product: 'The Raw Silk Camp Collar Shirt',
      stars: 5,
      headline: 'Effortless quiet luxury at its peak.',
      text: 'The slubbed texture of the noil silk gives it an organic, lived-in sophistication. Drapes like a dream with linen or heavy wool trousers.',
      date: 'September 10, 2026',
      verified: true
    }
  ]);

  const addNewReview = (newRev: { author: string; location: string; product: string; stars: number; headline: string; text: string }) => {
    const created = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true
    };
    setReviewsList(prev => [created, ...prev]);
    addNotification('Review Published', `Thank you ${newRev.author}, your verified feedback is live!`, 'info');
  };

  // Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Sync cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  const addNotification = (message: string, subMessage?: string, type: 'cart' | 'wishlist' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 5);
    setNotifications(prev => [...prev.slice(-3), { id, message, subMessage, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    setQuickViewProduct(null);
  };

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const cartItemId = `${product.id}-${color.name}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedColor: color, selectedSize: size, quantity }];
    });
    addNotification('Added to Bag', `${product.name} (${color.name}, Size ${size})`, 'cart');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ATELIER15' || clean === 'VERITE15') {
      setAppliedPromo(clean);
      setPromoDiscount(0.15); // 15% off
      addNotification('Privilege Code Applied', '15% courtesy reduction applied to your bag', 'info');
      return true;
    } else if (clean === 'COMPLIMENTARY' || clean === 'VIP20') {
      setAppliedPromo(clean);
      setPromoDiscount(0.20);
      addNotification('VIP Privilege Applied', '20% courtesy reduction applied', 'info');
      return true;
    }
    addNotification('Invalid Code', 'The code entered has expired or is invalid', 'info');
    return false;
  };

  const toggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'Garment';
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addNotification('Removed from Wishlist', prodName, 'wishlist');
        return prev.filter(id => id !== productId);
      } else {
        addNotification('Saved to Wishlist', prodName, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 500;

  const formatPrice = (price: number): string => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = Math.round(price * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        openProductDetail,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedSubcategoryFilter,
        setSelectedSubcategoryFilter,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        currency,
        setCurrency,
        formatPrice,
        activePolicy,
        setActivePolicy,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewsList,
        addNewReview,
        notifications,
        removeNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
