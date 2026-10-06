import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setActivePage, 
    setSelectedCategoryFilter, 
    setSelectedSubcategoryFilter,
    currency,
    setCurrency,
    setActivePolicy 
  } = useShop();

  const navigateTo = (page: any, catId: string | null = null, subId: string | null = null) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategoryFilter(subId);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#161616] text-[#FAF9F6] border-t border-[#262626]">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#262626]">
          
          {/* Column 1: Brand & Maison Signature (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              className="cursor-pointer select-none inline-block" 
              onClick={() => navigateTo('home')}
            >
              <h3 className="font-serif text-2xl tracking-[0.24em] font-medium text-[#FAF9F6] uppercase m-0">
                ATELIER VÉRITÉ
              </h3>
              <span className="block text-[9px] tracking-[0.38em] uppercase text-[#8C827A] mt-0.5">
                Haute Prêt-à-Porter &bull; Paris &bull; Biella
              </span>
            </div>

            <p className="text-xs text-[#9E978F] leading-relaxed max-w-sm pt-1">
              Sculptural outerwear and pure Mongolian cashmere engineered with architectural restraint. Hand-finished in the historic workshops of Northern Italy.
            </p>

            <div className="pt-2 text-[10px] tracking-[0.25em] uppercase text-[#736B63] flex flex-wrap gap-x-3 gap-y-1">
              <span>Paris</span>
              <span>&bull;</span>
              <span>Milano</span>
              <span>&bull;</span>
              <span>Tokyo</span>
              <span>&bull;</span>
              <span>New York</span>
            </div>
          </div>

          {/* Column 2: Collections (2 or 3 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#E6E0D6]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  All Ready-to-Wear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'outerwear')} className="hover:text-white transition-colors">
                  Tailored Outerwear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'knitwear')} className="hover:text-white transition-colors">
                  Cashmere Knitwear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'dresses')} className="hover:text-white transition-colors">
                  Dresses &amp; Gowns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'trousers')} className="hover:text-white transition-colors">
                  Architectural Trousers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care & Concierge */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#E6E0D6]">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors font-medium text-[#FAF9F6]">
                  Contact &amp; Concierge &rarr;
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Client Portal &amp; Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-white transition-colors">
                  Complimentary Courier
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns')} className="hover:text-white transition-colors">
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('size-guide')} className="hover:text-white transition-colors">
                  Sizing Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Maison & Stories (About, Journal, Lookbook, Home) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#E6E0D6]">
              Maison &amp; Stories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Story &amp; Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">
                  The Atelier Journal &amp; Gazette
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('lookbook')} className="hover:text-white transition-colors">
                  Campaign Lookbooks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home Edition
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Country Selector, Legal & Smooth Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7A726A]">
          {/* Country/Currency Selector (Shopify standard) */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-[#A89F91]">Region &amp; Currency:</span>
            <div className="flex items-center gap-1.5 bg-[#252525] px-2.5 py-1 rounded border border-white/10 text-xs text-[#EDE8DF]">
              <span>
                {currency === 'USD' ? '🇺🇸' : currency === 'EUR' ? '🇪🇺' : currency === 'GBP' ? '🇬🇧' : currency === 'AED' ? '🇦🇪' : currency === 'CAD' ? '🇨🇦' : '🇵🇰'}
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-[#EDE8DF] font-medium text-xs focus:outline-none cursor-pointer"
                aria-label="Footer select currency"
              >
                <option value="USD" className="bg-[#1A1A1A] text-white">United States (USD $)</option>
                <option value="EUR" className="bg-[#1A1A1A] text-white">European Union (EUR €)</option>
                <option value="GBP" className="bg-[#1A1A1A] text-white">United Kingdom (GBP £)</option>
                <option value="AED" className="bg-[#1A1A1A] text-white">United Arab Emirates (AED د.إ)</option>
                <option value="CAD" className="bg-[#1A1A1A] text-white">Canada (CAD CA$)</option>
                <option value="PKR" className="bg-[#1A1A1A] text-white">Pakistan (PKR Rs)</option>
              </select>
            </div>
          </div>

          <div className="text-[11px]">
            &copy; {new Date().getFullYear()} ATELIER VÉRITÉ PARIS S.A. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-5 text-[11px] tracking-wider uppercase">
            <button onClick={() => setActivePolicy('privacy')} className="hover:text-white transition-colors">
              Privacy
            </button>
            <button onClick={() => setActivePolicy('terms')} className="hover:text-white transition-colors">
              Terms
            </button>
            <button onClick={() => setActivePolicy('shipping')} className="hover:text-white transition-colors">
              Shipping
            </button>
            <button onClick={() => setActivePolicy('returns')} className="hover:text-white transition-colors">
              Returns
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#B89758] hover:text-white transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

