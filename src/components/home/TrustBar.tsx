import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const perks = [
    {
      icon: <Truck className="w-4 h-4 text-[#B89758]" />,
      title: 'Complimentary Shipping',
      description: 'On all orders exceeding $500'
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#B89758]" />,
      title: 'Effortless 30-Day Returns',
      description: 'Doorstep collection & exchanges'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#B89758]" />,
      title: 'Artisanal Authenticity',
      description: 'Hand-finished in Northern Italy'
    },
    {
      icon: <Headphones className="w-4 h-4 text-[#B89758]" />,
      title: 'Private Client Concierge',
      description: 'Bespoke tailoring advice & care'
    }
  ];

  return (
    <section className="border-y border-[#E7E2DA] bg-[#F7F4EE] py-4.5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {perks.map((perk, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white border border-[#E7E2DA] shadow-xs shrink-0">
              {perk.icon}
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] leading-tight">
                {perk.title}
              </h4>
              <p className="text-[11px] text-[#7A726A] mt-0.5 leading-tight">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
