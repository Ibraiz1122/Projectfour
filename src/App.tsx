import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationToast } from './components/common/NotificationToast';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AccountPage } from './components/account/AccountPage';

import { AboutPage } from './components/editorial/AboutPage';
import { LookbookPage } from './components/editorial/LookbookPage';
import { JournalPage } from './components/editorial/JournalPage';

import { 
  ContactPage, 
  FAQPage, 
  ShippingPolicyPage, 
  ReturnsPage, 
  LegalPage 
} from './components/support/SupportPages';
import { SizeGuidePage } from './components/support/SizeGuidePage';

import { SearchModal } from './components/modals/SearchModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PolicyModal } from './components/modals/PolicyModal';
import { WriteReviewModal } from './components/modals/WriteReviewModal';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'about':
        return <AboutPage />;
      case 'lookbook':
        return <LookbookPage />;
      case 'journal':
        return <JournalPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'shipping':
        return <ShippingPolicyPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'privacy':
        return <LegalPage type="privacy" />;
      case 'terms':
        return <LegalPage type="terms" />;
      case 'size-guide':
        return <SizeGuidePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Page Body with Soft Monograph Dissolve */}
      <main className="flex-1 w-full overflow-hidden">
        <div key={activePage} className="page-transition">
          {renderActivePage()}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Monogram Scroll-to-Top Button */}
      <ScrollToTop />

      {/* Global Interactive Overlays */}
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <CheckoutModal />
      <PolicyModal />
      <WriteReviewModal />
      <NotificationToast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
};

export default App;
