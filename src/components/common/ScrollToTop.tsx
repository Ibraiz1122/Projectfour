import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 480) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-7 right-6 sm:right-8 z-40 bg-[#161616]/90 hover:bg-black text-[#FAF9F6] border border-white/20 backdrop-blur-md px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:border-white/40 btn-tactile group animate-fade-up"
    >
      <ArrowUp className="w-3.5 h-3.5 text-[#B89758] group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="hidden sm:inline">Top</span>
    </button>
  );
};
