import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="py-24 lg:py-32 bg-[#F3EFEA] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Asymmetrical Image Duo (6 columns) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
            <div className="col-span-7 overflow-hidden bg-[#ECE8DF] aspect-[3/4] shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85"
                alt="Atelier tailoring process"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="col-span-5 overflow-hidden bg-[#ECE8DF] aspect-[4/5] -mb-6 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
                alt="Architectural silhouette in wool"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right: Editorial Narrative (6 columns) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
                The Atelier Manifesto
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mt-3 font-normal leading-[1.15]">
                We build for the quiet hours, when form is everything.
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#59514A] leading-relaxed">
              <p>
                In an era dominated by fleeting runway cycles and planned obsolescence, Atelier Vérité operates with deliberate slowness. We believe that true luxury does not shout with overt logos or ephemeral novelty.
              </p>
              <p>
                Every garment begins with the raw fiber: unbleached organic virgin wools from Biella, double-faced Mongolian cashmere hand-split at 1.5mm, and full-grain French lambskin vegetable-tanned with mimosa bark.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-3 gap-6 border-t border-[#DCD5C9]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] block">100%</span>
                <span className="text-[10px] tracking-wider uppercase text-[#8C827A] mt-1 block">Traceable European Mills</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] block">40+</span>
                <span className="text-[10px] tracking-wider uppercase text-[#8C827A] mt-1 block">Hours Hand Finishing</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] block">Zero</span>
                <span className="text-[10px] tracking-wider uppercase text-[#8C827A] mt-1 block">Synthetic Fusings</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('about')}
                className="group inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] py-3.5 px-7 text-xs uppercase tracking-[0.22em] font-medium transition-colors shadow-md btn-tactile"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
