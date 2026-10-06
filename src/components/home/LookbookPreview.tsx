import React from 'react';
import { useShop } from '../../context/ShopContext';
import { LOOKBOOK_LOOKS } from '../../data/editorial';
import { ArrowRight, Camera } from 'lucide-react';

export const LookbookPreview: React.FC = () => {
  const { setActivePage } = useShop();

  const looks = LOOKBOOK_LOOKS.slice(0, 2);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#E7E2DA]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C827A] font-medium">
            <Camera className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Seasonal Visual Story</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Lookbook Edition 08
          </h2>
          <p className="text-xs text-[#7A726A] mt-1.5 max-w-lg">
            Captured on 35mm film across the Brutalist marble quarries and alpine valleys of Northern Italy.
          </p>
        </div>

        <button
          onClick={() => setActivePage('lookbook')}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#B89758] transition-colors"
        >
          <span>View Complete Lookbook</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {looks.map((look) => (
          <div
            key={look.id}
            onClick={() => setActivePage('lookbook')}
            className="group cursor-pointer space-y-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE8DF]">
              <img
                src={look.image}
                alt={look.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />

              <div className="absolute bottom-4 left-4 bg-[#FAF9F6]/95 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-medium border border-[#E7E2DA]">
                {look.location}
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
                  {look.season}
                </span>
                <h3 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#B89758] transition-colors mt-1">
                  {look.title}
                </h3>
                <p className="text-xs text-[#7A726A] mt-1 max-w-sm">
                  {look.subtitle}
                </p>
              </div>

              <div className="text-xs uppercase tracking-widest text-[#B89758] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
                <span>View Shot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
