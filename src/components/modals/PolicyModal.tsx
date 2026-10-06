import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, ShieldCheck, Truck, RotateCcw, FileText, CheckCircle } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy } = useShop();

  if (!activePolicy) return null;

  const policyData = {
    shipping: {
      title: 'Worldwide Courier & Dispatch Protocol',
      badge: 'DHL Express & Ferruccio White Glove',
      icon: <Truck className="w-5 h-5 text-[#B89758]" />,
      content: (
        <div className="space-y-6 text-xs text-[#59514A] leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">1. Compliment Worldwide Delivery</h4>
            <p>
              Every acquisition exceeding $500 is presented with complimentary worldwide express courier transit via DHL Express Air or private concierge consignment. All shipments are fully insured at declared commercial value against loss or transit damage.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">2. Dispatch Timelines</h4>
            <p>
              In-stock silhouettes are inspected by our master clothiers in Biella or Paris and dispatched within 24 to 48 business hours. You will receive an encrypted manifest with live tracking credentials as soon as your garment leaves the atelier.
            </p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li><strong>Europe &amp; United Kingdom:</strong> 1–2 business days via Express Air.</li>
              <li><strong>North America (US &amp; Canada):</strong> 2–3 business days with direct customs pre-clearance.</li>
              <li><strong>Middle East &amp; Asia-Pacific:</strong> 3–4 business days with climate-controlled packaging.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">3. Customs, Duties &amp; Taxes</h4>
            <p>
              For patrons in the United States, EU, United Kingdom, and UAE, all import duties and taxes are calculated and collected directly at checkout—ensuring zero surprise fees upon door delivery.
            </p>
          </section>
        </div>
      )
    },
    returns: {
      title: 'Effortless 30-Day Returns & Exchanges',
      badge: 'Pre-Paid Courier Return Label Included',
      icon: <RotateCcw className="w-5 h-5 text-[#B89758]" />,
      content: (
        <div className="space-y-6 text-xs text-[#59514A] leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">1. Our Discretionary Guarantee</h4>
            <p>
              We want you to treasure every silhouette in your wardrobe. You are cordially welcome to return or exchange any unworn, unwashed garment within 30 calendar days of delivery, complete with original fabric labels and security ribbon intact.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">2. Complimentary Doorstep Collection</h4>
            <p>
              Every shipment box includes an adhesive pre-printed DHL return manifest. Simply arrange a complimentary courier pickup through our Client Concierge portal or deposit at any DHL authorized salon.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">3. Reimbursement Protocol</h4>
            <p>
              Upon receipt and inspection by our textile conservators in Paris, your full refund will be credited back to your original payment method (PayPal) within 3 to 5 business days.
            </p>
          </section>
        </div>
      )
    },
    privacy: {
      title: 'Private Patron Data & Security Protocol',
      badge: 'RGPD / GDPR & 256-Bit SSL Safeguarded',
      icon: <ShieldCheck className="w-5 h-5 text-[#B89758]" />,
      content: (
        <div className="space-y-6 text-xs text-[#59514A] leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">1. Sacred Patron Confidentiality</h4>
            <p>
              Atelier Vérité operates strictly on discretionary privacy. We never monetize, rent, or distribute client contact credentials or sizing measurements to external advertising networks or data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">2. Encrypted Transaction Ledger</h4>
            <p>
              All payments are processed through enterprise PCI-DSS Level 1 tokenized encryption (Shopify Payments &amp; Stripe infrastructure). Your raw financial details never touch our local database servers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">3. Your Privacy Rights</h4>
            <p>
              In accordance with European GDPR protocols, patrons retain the unconditional right to request a complete record of stored client data or to request permanent erasure from our digital registry at any time.
            </p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Terms of Haute Prêt-à-Porter Service',
      badge: 'Parisian Haute Commerce Standard',
      icon: <FileText className="w-5 h-5 text-[#B89758]" />,
      content: (
        <div className="space-y-6 text-xs text-[#59514A] leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">1. Limited Edition Authenticity</h4>
            <p>
              Every garment crafted by Atelier Vérité is produced in limited capsule batches using strictly certified Italian and Mongolian mills. Each purchase constitutes an authentic edition registered to your patron manifest.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">2. Sizing &amp; Tailoring Care</h4>
            <p>
              Garments are cut to European standard architectural drape. Natural fibers including double-faced cashmere and mulberry silk must be treated in accordance with garment care protocols specified on the internal woven label.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base text-[#1A1A1A]">3. Governing Jurisdiction</h4>
            <p>
              These conditions of acquisition are governed in accordance with French commercial law, with jurisdiction vested in the Commercial Courts of Paris, France.
            </p>
          </section>
        </div>
      )
    }
  };

  const activeData = policyData[activePolicy];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/70 backdrop-blur-md transition-opacity"
        onClick={() => setActivePolicy(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden max-h-[85vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            {activeData.icon}
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C827A] font-semibold block">
                {activeData.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">
                {activeData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActivePolicy(null)}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#EAE5D9] rounded-full transition-colors"
            aria-label="Close policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeData.content}

          <div className="p-4 bg-[#F2EDE4] border border-[#E7E2DA] rounded flex items-center gap-3 text-xs text-[#2B5138]">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#2B5138]" />
            <span>Certified verified according to Shopify Global Commerce Standards.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E7E2DA] bg-white flex justify-end">
          <button
            onClick={() => setActivePolicy(null)}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider hover:bg-black transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
