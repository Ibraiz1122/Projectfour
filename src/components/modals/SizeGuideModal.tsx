import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Check } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C827A] font-medium block">
              Atelier Measurement Protocol
            </span>
            <h3 className="font-serif text-2xl text-[#1A1A1A] mt-0.5">Sizing & Tailoring Guide</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#EAE5D9] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#7A726A]">
              Measurements reflect true anatomical proportions. If in between sizes, we recommend selecting based on shoulder breadth.
            </p>
            <div className="flex border border-[#DCD5C9] bg-white text-xs">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-medium transition-colors ${unit === 'cm' ? 'bg-[#1A1A1A] text-white' : 'text-[#59514A]'}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 font-medium transition-colors ${unit === 'inches' ? 'bg-[#1A1A1A] text-white' : 'text-[#59514A]'}`}
              >
                IN
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#E7E2DA] bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F6F3ED] border-b border-[#E7E2DA] text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Standard</th>
                  <th className="py-3 px-4 font-semibold">EU / IT</th>
                  <th className="py-3 px-4 font-semibold">Bust / Chest</th>
                  <th className="py-3 px-4 font-semibold">Waist</th>
                  <th className="py-3 px-4 font-semibold">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2DA] text-[#4A433D]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]">XS</td>
                  <td className="py-3 px-4">34 / 38</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '82 - 85 cm' : '32 - 33.5 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '64 - 67 cm' : '25 - 26.5 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '90 - 93 cm' : '35.5 - 36.5 in'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]">S</td>
                  <td className="py-3 px-4">36 / 40</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '86 - 89 cm' : '34 - 35 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '68 - 71 cm' : '27 - 28 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '94 - 97 cm' : '37 - 38 in'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]">M</td>
                  <td className="py-3 px-4">38 / 42</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '90 - 94 cm' : '35.5 - 37 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '72 - 76 cm' : '28.5 - 30 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '98 - 102 cm' : '38.5 - 40 in'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]">L</td>
                  <td className="py-3 px-4">40 / 44</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '95 - 99 cm' : '37.5 - 39 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '77 - 81 cm' : '30.5 - 32 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '103 - 107 cm' : '40.5 - 42 in'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]">XL</td>
                  <td className="py-3 px-4">42 / 46</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '100 - 105 cm' : '39.5 - 41.5 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '82 - 87 cm' : '32.5 - 34.5 in'}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? '108 - 113 cm' : '42.5 - 44.5 in'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Advice notes */}
          <div className="bg-[#F2EDE4] p-4 border border-[#E7E2DA] space-y-2 text-xs text-[#59514A]">
            <h4 className="font-serif text-sm text-[#1A1A1A] font-medium">Bespoke Fitting Notes:</h4>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#B89758] mt-0.5 shrink-0" />
              <span>Tailored Outerwear features a relaxed shoulder engineered specifically to layer over sweaters and blazers.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#B89758] mt-0.5 shrink-0" />
              <span>Silk Slip Dresses are bias-cut, expanding gently along your hip curves for a natural silhouette drape.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#B89758] mt-0.5 shrink-0" />
              <span>Trousers include a 4cm generous interior blind hem allowing effortless adjustment by your local tailor.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
