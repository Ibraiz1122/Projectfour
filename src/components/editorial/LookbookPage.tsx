import React from 'react';
import { useShop } from '../../context/ShopContext';
import { LOOKBOOK_LOOKS } from '../../data/editorial';
import { PRODUCTS } from '../../data/products';
import { Camera, MapPin, ArrowRight } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { openProductDetail } = useShop();

  const handleItemClick = (productId: string) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      openProductDetail(prod);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-24">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C827A] font-medium">
            <Camera className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Seasonal Visual Archive</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A1A] font-normal leading-[1.08]">
            Lookbook Editions &bull; Volume 08
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726A] leading-relaxed">
            Explorations in proportion, natural sunlight, and tactile draping photographed across Northern Italy and Lake Como on medium-format 35mm film. Click any garment in the looks below to inspect its tailoring specifications.
          </p>
        </div>

        {/* Looks List */}
        <div className="space-y-32">
          {LOOKBOOK_LOOKS.map((look, index) => (
            <div key={look.id} className="space-y-8">
              
              {/* Image with Hotspots */}
              <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden bg-[#ECE8DF] border border-[#E7E2DA] shadow-xl group">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.96]"
                />

                {/* Hotspot Pins */}
                {look.items.map((item, itemIdx) => {
                  const targetProd = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div
                      key={itemIdx}
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => targetProd && openProductDetail(targetProd)}
                        className="group/pin relative flex items-center justify-center"
                        aria-label={`View ${item.label}`}
                      >
                        {/* Pulsing ring */}
                        <span className="w-6 h-6 rounded-full bg-white/40 animate-ping absolute" />
                        {/* Core pin */}
                        <span className="w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-white shadow-md relative z-10 hover:scale-125 transition-transform" />

                        {/* Hover Tooltip Card */}
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#FAF9F6]/95 backdrop-blur-md p-3 border border-[#E7E2DA] shadow-xl whitespace-nowrap opacity-0 group-hover/pin:opacity-100 pointer-events-none transition-opacity z-30">
                          <span className="text-[9px] uppercase tracking-wider text-[#8C827A] block">Featured Silhouette</span>
                          <span className="font-serif text-sm font-medium text-[#1A1A1A] block">{item.label}</span>
                          <span className="text-[10px] text-[#B89758] font-medium mt-1 flex items-center gap-1">
                            Inspect Piece &rarr;
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* Location Badge */}
                <div className="absolute bottom-6 left-6 bg-[#1A1A1A]/85 backdrop-blur-md px-3.5 py-1.5 text-white text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>{look.location}</span>
                </div>
              </div>

              {/* Look Info & Garment List */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-2">
                <div className="space-y-2 max-w-lg">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
                    Plate No. {index + 1} &bull; {look.season}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
                    {look.title}
                  </h2>
                  <p className="text-xs text-[#7A726A] leading-relaxed">
                    {look.subtitle} Photography by {look.photographer}.
                  </p>
                </div>

                {/* Featured in this Shot Links */}
                <div className="bg-white p-5 border border-[#E7E2DA] space-y-3 min-w-[280px]">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C827A] font-medium block border-b border-[#E7E2DA] pb-2">
                    In This Composition
                  </span>
                  <div className="space-y-2 text-xs">
                    {look.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={() => handleItemClick(item.productId)}
                        className="w-full text-left flex items-center justify-between text-[#2E2925] hover:text-[#B89758] transition-colors py-1 group"
                      >
                        <span className="truncate pr-2">{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8C827A] group-hover:translate-x-1 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
