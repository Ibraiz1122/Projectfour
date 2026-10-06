import React, { useState } from 'react';

export const SizeGuidePage: React.FC = () => {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Atelier Measurements
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A1A] mt-2 font-normal">
            Sizing &amp; Anatomical Fit Protocol
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726A] mt-2 max-w-xl leading-relaxed">
            Our garments are tailored with architectural precision. Use the guide below to determine your ideal size across coats, knitwear, trousers, and gowns.
          </p>
        </div>

        {/* Unit Switcher */}
        <div className="flex justify-end">
          <div className="flex border border-[#DCD5C9] bg-white text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1.5 font-medium transition-colors ${unit === 'cm' ? 'bg-[#1A1A1A] text-white' : 'text-[#59514A]'}`}
            >
              Centimeters (CM)
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1.5 font-medium transition-colors ${unit === 'inches' ? 'bg-[#1A1A1A] text-white' : 'text-[#59514A]'}`}
            >
              Inches (IN)
            </button>
          </div>
        </div>

        {/* Master Measurement Table */}
        <div className="border border-[#E7E2DA] bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F6F3ED] border-b border-[#E7E2DA] text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 font-semibold">Standard</th>
                <th className="py-4 px-6 font-semibold">IT / FR</th>
                <th className="py-4 px-6 font-semibold">UK</th>
                <th className="py-4 px-6 font-semibold">US</th>
                <th className="py-4 px-6 font-semibold">Chest / Bust</th>
                <th className="py-4 px-6 font-semibold">Waist</th>
                <th className="py-4 px-6 font-semibold">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E2DA] text-[#4A433D]">
              <tr>
                <td className="py-4 px-6 font-medium text-[#1A1A1A]">XS</td>
                <td className="py-4 px-6">38 / 34</td>
                <td className="py-4 px-6">6</td>
                <td className="py-4 px-6">2</td>
                <td className="py-4 px-6">{unit === 'cm' ? '82 - 85 cm' : '32 - 33.5 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '64 - 67 cm' : '25 - 26.5 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '90 - 93 cm' : '35.5 - 36.5 in'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-[#1A1A1A]">S</td>
                <td className="py-4 px-6">40 / 36</td>
                <td className="py-4 px-6">8</td>
                <td className="py-4 px-6">4</td>
                <td className="py-4 px-6">{unit === 'cm' ? '86 - 89 cm' : '34 - 35 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '68 - 71 cm' : '27 - 28 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '94 - 97 cm' : '37 - 38 in'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-[#1A1A1A]">M</td>
                <td className="py-4 px-6">42 / 38</td>
                <td className="py-4 px-6">10</td>
                <td className="py-4 px-6">6</td>
                <td className="py-4 px-6">{unit === 'cm' ? '90 - 94 cm' : '35.5 - 37 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '72 - 76 cm' : '28.5 - 30 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '98 - 102 cm' : '38.5 - 40 in'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-[#1A1A1A]">L</td>
                <td className="py-4 px-6">44 / 40</td>
                <td className="py-4 px-6">12</td>
                <td className="py-4 px-6">8</td>
                <td className="py-4 px-6">{unit === 'cm' ? '95 - 99 cm' : '37.5 - 39 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '77 - 81 cm' : '30.5 - 32 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '103 - 107 cm' : '40.5 - 42 in'}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-[#1A1A1A]">XL</td>
                <td className="py-4 px-6">46 / 42</td>
                <td className="py-4 px-6">14</td>
                <td className="py-4 px-6">10</td>
                <td className="py-4 px-6">{unit === 'cm' ? '100 - 105 cm' : '39.5 - 41.5 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '82 - 87 cm' : '32.5 - 34.5 in'}</td>
                <td className="py-4 px-6">{unit === 'cm' ? '108 - 113 cm' : '42.5 - 44.5 in'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tailoring & Fitting Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-[#F3EFEA] border border-[#E7E2DA] space-y-2">
            <h4 className="font-serif text-lg text-[#1A1A1A]">Outerwear Fit</h4>
            <p className="text-xs text-[#59514A] leading-relaxed">
              Cut with an intentionally relaxed armhole and drop shoulder to layer smoothly over chunky sweaters without bunching.
            </p>
          </div>
          <div className="p-6 bg-[#F3EFEA] border border-[#E7E2DA] space-y-2">
            <h4 className="font-serif text-lg text-[#1A1A1A]">Bias Silk Dresses</h4>
            <p className="text-xs text-[#59514A] leading-relaxed">
              Engineered with 45-degree angle grainlines that stretch and expand naturally to follow your movement.
            </p>
          </div>
          <div className="p-6 bg-[#F3EFEA] border border-[#E7E2DA] space-y-2">
            <h4 className="font-serif text-lg text-[#1A1A1A]">Italian Cordwaining</h4>
            <p className="text-xs text-[#59514A] leading-relaxed">
              Footwear runs true to European sizing. Soft calfskin linings naturally mold to the contour of your foot after 2-3 wears.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
