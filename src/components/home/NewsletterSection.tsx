import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-4xl mx-auto text-center">
      <div className="space-y-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C827A] font-medium block">
          Private Correspondence
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          The Atelier Gazette
        </h2>
        <p className="text-xs sm:text-sm text-[#7A726A] max-w-md mx-auto leading-relaxed">
          Dispatched bi-weekly. Intimate discussions on textile archaeology, private preview invitations, and unlisted archive drops.
        </p>

        {submitted ? (
          <div className="pt-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2.5 p-4 bg-[#F2EDE4] border border-[#DCD5C9] text-xs text-[#2E2925]">
              <Check className="w-4 h-4 text-[#B89758]" />
              <span>Your invitation has been registered. Welcome to the circle.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your private email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-[#DCD5C9] px-4 py-3.5 text-xs text-[#1A1A1A] placeholder-[#9E978F] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 group shrink-0"
              >
                <span>Request Entry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <span className="block text-[10px] text-[#A89F91] mt-3 tracking-wide">
              We respect your quiet solitude. You may revoke membership at any moment.
            </span>
          </form>
        )}
      </div>
    </section>
  );
};
