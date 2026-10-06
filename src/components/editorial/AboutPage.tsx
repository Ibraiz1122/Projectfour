import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-24">
        
        {/* Editorial Title Stage */}
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C827A] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>The Atelier Manifesto</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.08]">
            In Pursuit of Pure Form &amp; Tactile Permanence.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#59514A] leading-relaxed">
            &ldquo;We do not manufacture novelty. We engineer enduring garments cut from peerless fibers, designed to accompany a life of quiet distinction.&rdquo;
          </p>
        </div>

        {/* Hero Full-Bleed Workshop Photo */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#ECE8DF] border border-[#E7E2DA] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1800&q=85"
            alt="Atelier workshop in Biella"
            className="w-full h-full object-cover object-center filter brightness-[0.95]"
          />
          <div className="absolute bottom-6 right-6 bg-[#FAF9F6]/95 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-medium border border-[#E7E2DA]">
            Biella Workshop, Piedmont &bull; Est. 1984
          </div>
        </div>

        {/* 3 Pillars Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
          <div className="space-y-4">
            <span className="font-serif text-3xl text-[#B89758] block">01</span>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">Material Integrity</h3>
            <p className="text-xs sm:text-sm text-[#59514A] leading-relaxed">
              Every yard of cloth is chosen for its visceral longevity: grade-A Mongolian cashmere with fibers exceeding 38mm, 120-count Egyptian Giza cottons, and worsted wools spun by century-old mills in northern Italy.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-3xl text-[#B89758] block">02</span>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">Sartorial Discipline</h3>
            <p className="text-xs sm:text-sm text-[#59514A] leading-relaxed">
              Our tailoring eschews fusible glue backings and stiff artificial shoulders. We employ floating horsehair canvases and hand-split blind seams that mold to the wearer’s physique with every stride.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-3xl text-[#B89758] block">03</span>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">Quiet Restraint</h3>
            <p className="text-xs sm:text-sm text-[#59514A] leading-relaxed">
              We reject logos, transient micro-trends, and planned obsolescence. An Atelier Vérité coat bought today is crafted to be worn with equal dignity thirty autumns from now.
            </p>
          </div>
        </div>

        {/* Asymmetrical Craft Story Duo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F3EFEA] p-8 sm:p-14 border border-[#E7E2DA]">
          <div className="lg:col-span-5 aspect-[4/5] overflow-hidden bg-[#ECE8DF] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
              alt="Artisanal tailoring draping"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
              The Geography of Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">
              Where River Waters Wash Cashmere to Cloud Softness
            </h2>
            <p className="text-xs sm:text-sm text-[#59514A] leading-relaxed">
              In Biella, near the foothills of the Italian Alps, the mineral composition of glacier-fed glacial runoffs is singularly pure. For generations, local finishers have used this water to wash raw fleece, imparting a signature peach-skin touch impossible to replicate through chemical synthetics.
            </p>
            <p className="text-xs sm:text-sm text-[#59514A] leading-relaxed">
              This geography is our sanctuary. We partner exclusively with multi-generational family guilds that honor generational knowledge above rapid mass-market scale.
            </p>

            <div className="pt-2">
              <button
                onClick={() => { setSelectedCategoryFilter('outerwear'); setActivePage('shop'); }}
                className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2"
              >
                <span>Explore the Handcrafted Pieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
