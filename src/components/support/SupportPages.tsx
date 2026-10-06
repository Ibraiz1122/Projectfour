import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Private Client Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A1A] mt-2 font-normal">
            Consult With Our Atelier Advisors
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726A] mt-2 max-w-xl leading-relaxed">
            Whether inquiring about custom proportions, limited archived runs, or booking a private salon appointment in Paris, our advisors are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E7E2DA] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-[#B89758] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#7A726A] max-w-sm mx-auto">
                  A senior client advisor will review your notes and respond within four business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B635B] mb-1">First Name</label>
                    <input required type="text" className="w-full border border-[#DCD5C9] p-3 focus:outline-none focus:border-[#1A1A1A]" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B635B] mb-1">Last Name</label>
                    <input required type="text" className="w-full border border-[#DCD5C9] p-3 focus:outline-none focus:border-[#1A1A1A]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B635B] mb-1">Email Address</label>
                  <input required type="email" className="w-full border border-[#DCD5C9] p-3 focus:outline-none focus:border-[#1A1A1A]" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B635B] mb-1">Nature of Inquiry</label>
                  <select className="w-full border border-[#DCD5C9] p-3 bg-white focus:outline-none focus:border-[#1A1A1A]">
                    <option>Sartorial Fit &amp; Sizing Consultation</option>
                    <option>Private Showroom Appointment</option>
                    <option>Archived Piece Sourcing</option>
                    <option>Consignment &amp; Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B635B] mb-1">Your Message</label>
                  <textarea rows={5} required placeholder="Detail your request or specific garment reference..." className="w-full border border-[#DCD5C9] p-3 focus:outline-none focus:border-[#1A1A1A]" />
                </div>

                <button type="submit" className="w-full bg-[#1A1A1A] hover:bg-black text-white py-4 uppercase tracking-[0.2em] font-medium text-xs transition-colors">
                  Submit Private Consultation Request
                </button>
              </form>
            )}
          </div>

          {/* Showroom Addresses */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F3EFEA] p-8 border border-[#E7E2DA] space-y-6 text-xs text-[#59514A]">
              <h3 className="font-serif text-2xl text-[#1A1A1A]">Maison Salons</h3>
              
              <div className="space-y-1 border-b border-[#DCD5C9] pb-4">
                <span className="font-semibold text-[#1A1A1A] block">Paris Saint-Germain</span>
                <p>142 Boulevard Saint-Germain, 75006 Paris</p>
                <p className="text-[#8C827A] pt-1">By private appointment only</p>
              </div>

              <div className="space-y-1 border-b border-[#DCD5C9] pb-4">
                <span className="font-semibold text-[#1A1A1A] block">Milan Montenapoleone</span>
                <p>Via Montenapoleone 18, 20121 Milano</p>
                <p className="text-[#8C827A] pt-1">Tuesday &ndash; Saturday, 10:00 &ndash; 19:00</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#1A1A1A] block">New York Madison</span>
                <p>780 Madison Avenue, New York, NY 10065</p>
                <p className="text-[#8C827A] pt-1">Client stylist suite available</p>
              </div>
            </div>

            <div className="p-6 border border-[#E7E2DA] space-y-3 text-xs bg-white">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B89758]" />
                <span>concierge@atelier-verite.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B89758]" />
                <span>+33 (0) 1 42 68 88 00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Atelier Vérité approach garment sizing and proportions?',
      a: 'Our garments are proportioned around classic European couture metrics with deliberate drape. Coats and blazers feature a relaxed shoulder engineered to layer over knits without constraint. For precise shoulder, chest, and sleeve measurements, please reference our Sizing Atelier or contact client concierge.'
    },
    {
      q: 'Where are your textiles and cashmere sourced?',
      a: 'We source raw double-faced cashmere exclusively from free-roaming herds on the Mongolian steppes. The fibers are woven and hand-finished in Biella and Prato, Italy. Our shirting cotton is 120-count Egyptian Giza, and our leathers are vegetable-tanned in Normandy and Tuscany.'
    },
    {
      q: 'How is international courier shipping managed?',
      a: 'All orders are consigned to DHL Express with full door-to-door transit insurance. Deliveries within Europe arrive within 1-2 business days; North America and Asia arrive in 2-3 business days. All orders above $500 receive complimentary express shipping.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer complimentary 30-day doorstep collection worldwide. Garments must remain unworn with original atelier security ribbons intact and stored in their linen preservation dust bags.'
    },
    {
      q: 'Do you offer bespoke tailoring or alterations?',
      a: 'All our trousers include an unpressed 4cm blind hem designed for custom lengthening or shortening. Clients visiting our Paris, Milan, or New York salons are entitled to complimentary in-house tailoring adjustments.'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Client Assistance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Frequently Answered Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726A] mt-2 leading-relaxed">
            Essential protocols regarding tailoring, material preservation, courier dispatch, and atelier practices.
          </p>
        </div>

        <div className="divide-y divide-[#E7E2DA] border-y border-[#E7E2DA] bg-white">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="font-serif text-lg sm:text-xl text-[#1A1A1A] font-medium">
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#8C827A] transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="mt-3 text-xs sm:text-sm text-[#59514A] leading-relaxed pr-8 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Logistics &amp; Courier
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Complimentary Insured Courier Protocol
          </h1>
        </div>

        <div className="bg-white p-8 sm:p-12 border border-[#E7E2DA] space-y-6 text-xs sm:text-sm text-[#59514A] leading-relaxed">
          <h3 className="font-serif text-2xl text-[#1A1A1A]">Worldwide White-Glove Dispatch</h3>
          <p>
            Atelier Vérité partners exclusively with DHL Express Global to ensure that your hand-tailored garments travel in temperature-regulated containers with full maritime and aeronautical insurance coverage.
          </p>

          <h4 className="font-serif text-lg text-[#1A1A1A]">Complimentary Courier Threshold</h4>
          <p>
            Orders exceeding $500 (or equivalent in EUR / GBP) qualify for complimentary priority express courier. For orders below this threshold, a flat $25 archival shipping surcharge applies.
          </p>

          <h4 className="font-serif text-lg text-[#1A1A1A]">Garment Preservation Packaging</h4>
          <p>
            Each overcoat and blazer is hung upon a bespoke steam-bent Italian cedar hanger and enclosed within an unbleached organic linen dust carrier bag. Garments are shipped flat within reinforced rigid carton cases to avoid crushing lapels.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ReturnsPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Satisfaction Guarantee
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
            Returns &amp; Doorstep Exchanges
          </h1>
        </div>

        <div className="bg-white p-8 sm:p-12 border border-[#E7E2DA] space-y-6 text-xs sm:text-sm text-[#59514A] leading-relaxed">
          <h3 className="font-serif text-2xl text-[#1A1A1A]">30-Day Doorstep Courier Collection</h3>
          <p>
            We recognize that inspecting a garment in the quietude of your own home is the truest test of craftsmanship. You have 30 days from parcel receipt to initiate an exchange or return.
          </p>

          <h4 className="font-serif text-lg text-[#1A1A1A]">Condition Standards</h4>
          <p>
            To honor our artisans and subsequent patrons, garments must remain unwashed, unworn, and unaltered, with the Atelier security seal attached. Footwear soles must show no signs of outdoor scuffing.
          </p>

          <h4 className="font-serif text-lg text-[#1A1A1A]">Simultaneous Size Exchanges</h4>
          <p>
            Should you desire an alternative size, our concierge will dispatch the replacement immediately upon carrier pickup booking, eliminating waiting periods.
          </p>
        </div>
      </div>
    </div>
  );
};

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
            Maison Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
            {type === 'privacy' ? 'Privacy & Confidentiality Protocol' : 'Terms of Atelier Service'}
          </h1>
        </div>

        <div className="bg-white p-8 sm:p-12 border border-[#E7E2DA] space-y-6 text-xs sm:text-sm text-[#59514A] leading-relaxed">
          <p>
            Effective Date: Autumn Equinox 2026. Atelier Vérité operates with stringent adherence to European General Data Protection Regulation (GDPR) standards.
          </p>
          <p>
            We do not monetize patron personal data, selling zero records to advertising exchanges. Your coordinates and measurement profiles are stored within encrypted partitions solely for sartorial fulfillment.
          </p>
          <p>
            All intellectual rights, photographic campaigns, and silhouette architectures are the exclusive property of Atelier Vérité Paris S.A.
          </p>
        </div>
      </div>
    </div>
  );
};
