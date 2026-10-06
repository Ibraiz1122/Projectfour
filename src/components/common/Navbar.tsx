import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setSelectedCategoryFilter,
    setSelectedSubcategoryFilter,
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartDrawerOpen,
    setIsSearchOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 25);

          // Smart directional scroll: smoothly hide on scroll-down, reveal on scroll-up
          if (currentScrollY > 120) {
            if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
              setIsVisible(false);
              setIsMegaMenuOpen(false);
            } else if (lastScrollY - currentScrollY > 5) {
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);

          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalScroll) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigateTo = (page: any, catId: string | null = null) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategoryFilter(null);
    setActivePage(page);
    setIsMegaMenuOpen(false);
  };

  const navLinks = [
    { id: 'shop', label: 'Shop', action: () => navigateTo('shop') },
    { id: 'collections', label: 'Collections', isDropdown: true },
  ];

  return (
    <>
      {/* Top Privilege / Announcement Bar */}
      <aside 
        aria-label="Announcement" 
        className="bg-[#1A1A1A] text-[#EDE8DF] text-[11px] py-2 px-4 sm:px-6 tracking-[0.16em] uppercase transition-colors border-b border-black/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left message */}
          <div className="flex items-center gap-2.5 text-[#EDE8DF] text-[10px] sm:text-[11px] font-normal tracking-[0.16em] truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89758] shrink-0"></span>
            <span className="truncate">Complimentary Worldwide Express Courier on Orders Above $500</span>
          </div>

          {/* Right currency selector & atelier note */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-[#A89F91] text-[10px]">
              <span>Paris &bull; Biella</span>
              <span className="w-1 h-1 rounded-full bg-[#A89F91]"></span>
              <span>Limited Editions</span>
            </div>
            
            {/* Shopify Markets Currency Selector */}
            <div className="flex items-center gap-1.5 bg-[#252525] px-2 py-0.5 rounded border border-white/10 text-[10px] text-[#EDE8DF]">
              <span className="text-xs">
                {currency === 'USD' ? '🇺🇸' : currency === 'EUR' ? '🇪🇺' : currency === 'GBP' ? '🇬🇧' : currency === 'AED' ? '🇦🇪' : currency === 'CAD' ? '🇨🇦' : '🇵🇰'}
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-[#EDE8DF] font-medium text-[10px] uppercase tracking-wider focus:outline-none cursor-pointer"
                aria-label="Select currency"
              >
                <option value="USD" className="bg-[#1A1A1A] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#1A1A1A] text-white">EUR (€)</option>
                <option value="GBP" className="bg-[#1A1A1A] text-white">GBP (£)</option>
                <option value="AED" className="bg-[#1A1A1A] text-white">AED (د.إ)</option>
                <option value="CAD" className="bg-[#1A1A1A] text-white">CAD ($)</option>
                <option value="PKR" className="bg-[#1A1A1A] text-white">PKR (Rs)</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          !isVisible ? '-translate-y-full shadow-none' : 'translate-y-0'
        } ${
          isScrolled 
            ? 'bg-[#FAF9F6]/92 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border-b border-[#E7E2DA]/90 py-3' 
            : 'bg-[#FAF9F6] border-b border-[#E7E2DA]/80 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. LEFT: Brand Name & Logo (+ Mobile Hamburger) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1 text-[#1A1A1A] hover:text-[#B89758] transition-colors flex items-center gap-1.5 group"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1A1A1A] group-hover:text-[#B89758] hidden xs:inline">
                Menu
              </span>
            </button>

            {/* Brand Logo & Name */}
            <div 
              className="cursor-pointer select-none group text-left" 
              onClick={() => navigateTo('home')}
            >
              <h1 className="font-serif text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] tracking-[0.22em] font-medium text-[#1A1A1A] uppercase group-hover:opacity-85 transition-opacity m-0 whitespace-nowrap">
                ATELIER VÉRITÉ
              </h1>
              <span className="block text-[8px] sm:text-[8.5px] tracking-[0.38em] uppercase text-[#8C827A] -mt-0.5 group-hover:text-[#B89758] transition-colors">
                Paris &bull; Biella
              </span>
            </div>
          </div>

          {/* 2. CENTER: Focused Editorial Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-10 xl:gap-14 text-[12px] tracking-[0.24em] xl:tracking-[0.28em] uppercase font-medium text-[#2E2925] mx-auto">
            {navLinks.map(link => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.id}
                    className="relative py-1"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className={`flex items-center gap-1 py-1 transition-colors group ${
                        isMegaMenuOpen ? 'text-[#B89758]' : 'hover:text-[#B89758]'
                      }`}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                    >
                      <span>Collections</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#B89758]' : 'text-[#8C827A] group-hover:text-[#B89758]'}`} />
                    </button>
                  </div>
                );
              }

              const isActive = activePage === link.id;

              return (
                <button
                  key={link.id}
                  onClick={link.action}
                  className={`relative py-1 transition-colors ${
                    isActive 
                      ? 'text-[#1A1A1A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B89758]' 
                      : 'text-[#504840] hover:text-[#1A1A1A] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#B89758] after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* 3. RIGHT: Actions (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4 xl:gap-5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#1A1A1A] hover:text-[#B89758] transition-colors flex items-center gap-1.5 group btn-tactile"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="hidden xl:inline text-[11px] tracking-widest uppercase font-medium text-[#7A726A] group-hover:text-[#1A1A1A]">
                Search
              </span>
            </button>

            {/* Client Account */}
            <button
              onClick={() => navigateTo('account')}
              className={`p-1.5 hover:text-[#B89758] transition-colors hidden sm:block btn-tactile ${
                activePage === 'account' ? 'text-[#B89758]' : 'text-[#1A1A1A]'
              }`}
              aria-label="Client Account"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`p-1.5 hover:text-[#B89758] transition-colors relative btn-tactile ${
                activePage === 'wishlist' ? 'text-[#B89758]' : 'text-[#1A1A1A]'
              }`}
              aria-label="Saved Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#141414] text-[#FAF9F6] border border-[#B89758]/50 text-[9px] font-mono font-medium flex items-center justify-center rounded-full leading-none shadow-xs animate-badge-pop">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 text-[#1A1A1A] hover:text-[#B89758] transition-colors relative flex items-center gap-1.5 group btn-tactile"
              aria-label="Shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#141414] text-[#B89758] border border-[#B89758]/60 text-[9px] font-mono font-semibold flex items-center justify-center rounded-full leading-none shadow-xs animate-badge-pop">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-[11px] tracking-widest uppercase font-medium text-[#7A726A] group-hover:text-[#1A1A1A]">
                Bag ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          onClose={() => setIsMegaMenuOpen(false)} 
        />
        {/* Subtle Luxury Golden Thread Scroll Indicator */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 h-[1.5px] bg-[#B89758] transition-[width] duration-150 ease-out pointer-events-none opacity-90"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

