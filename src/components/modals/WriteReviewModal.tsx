import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const WriteReviewModal: React.FC = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, addNewReview, selectedProduct } = useShop();

  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [text, setText] = useState('');
  const [productName, setProductName] = useState(selectedProduct ? selectedProduct.name : PRODUCTS[0].name);
  const [fitRating, setFitRating] = useState<'True to Size' | 'Slightly Generous' | 'Fitted'>('True to Size');

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !headline || !text) return;

    addNewReview({
      author,
      location: location || 'Private Client',
      product: productName,
      stars,
      headline,
      text: `${text} (Fit: ${fitRating})`
    });

    // Reset and close
    setAuthor('');
    setLocation('');
    setHeadline('');
    setText('');
    setIsReviewModalOpen(false);
  };

  const ratingLabels = ['Unsatisfactory', 'Fair', 'Pleasing', 'Very Good', 'Perfection / Atelier Benchmark'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0E0E0E]/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsReviewModalOpen(false)}
      />

      {/* Modal Dialog with smooth luxury glide */}
      <div className="relative w-full max-w-xl bg-[#FAF9F6] border border-[#E7E2DA] shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#B89758]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C827A] font-semibold block">
                Patron Circle Voice
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">
                Submit Verified Feedback
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#EAE5D9] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          
          {/* Star Rating Selector */}
          <div className="bg-white p-4 border border-[#E7E2DA] text-center space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-[#59514A] font-medium block">
              Overall Experience &amp; Garment Drape
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => {
                const active = (hoverStars !== null ? hoverStars : stars) >= num;
                return (
                  <button
                    key={num}
                    type="button"
                    onMouseEnter={() => setHoverStars(num)}
                    onMouseLeave={() => setHoverStars(null)}
                    onClick={() => setStars(num)}
                    className="p-1 text-[#B89758] transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${num} stars`}
                  >
                    <Star className={`w-6 h-6 ${active ? 'fill-current' : 'stroke-current fill-transparent'}`} />
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-[#8C827A] font-medium italic block">
              {ratingLabels[(hoverStars !== null ? hoverStars : stars) - 1]}
            </span>
          </div>

          {/* Product Select */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1">
              Garment Reviewed
            </label>
            <select
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
            >
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Fit assessment */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1.5">
              Fit &amp; Sizing Accuracy
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Fitted', 'True to Size', 'Slightly Generous'] as const).map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFitRating(option)}
                  className={`py-2 px-2 text-center border font-medium transition-colors ${
                    fitRating === option
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#59514A] border-[#DCD5C9] hover:border-[#1A1A1A]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Patron Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1">
                Your Full Name / Alias *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lady Vivienne S."
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1">
                City &amp; Country
              </label>
              <input
                type="text"
                placeholder="e.g. Zurich, Switzerland"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1">
              Review Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. A generational coat that turns heads discreetly."
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#4A433D] font-medium mb-1">
              Detailed Impressions &amp; Material Quality *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the tactile handfeel, drape, and packaging presentation..."
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full bg-white border border-[#DCD5C9] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] resize-none"
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[#8C827A] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
            <span>Authenticated with encrypted Judge.me &amp; Shopify Verified Patron badge.</span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md btn-tactile"
            >
              Publish Verified Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
