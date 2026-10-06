import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../../data/editorial';
import type { JournalArticle } from '../../data/editorial';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C827A] font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Atelier Gazette &amp; Essays</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A1A] font-normal leading-[1.08]">
            The Journal &bull; On Materiality &amp; Form
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726A] leading-relaxed">
            Essays on historical textile archaeology, the tactile physics of drapery, and intimate dialogues with our third-generation European master artisans.
          </p>
        </div>

        {/* Selected Article Detail Modal/View */}
        {selectedArticle ? (
          <div className="bg-white p-8 sm:p-14 border border-[#E7E2DA] shadow-xl space-y-8 animate-in fade-in">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs uppercase tracking-widest text-[#7A726A] hover:text-[#1A1A1A] underline underline-offset-4"
            >
              &larr; Return to Journal Archive
            </button>

            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-4 text-xs text-[#8C827A] uppercase tracking-wider">
                <span>{selectedArticle.category}</span>
                <span>&bull;</span>
                <span>{selectedArticle.date}</span>
                <span>&bull;</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden bg-[#ECE8DF]">
              <img src={selectedArticle.heroImage} alt="" className="w-full h-full object-cover" />
            </div>

            <blockquote className="border-l-2 border-[#1A1A1A] pl-6 py-2 my-8">
              <p className="font-serif italic text-2xl text-[#2E2925] leading-relaxed">
                &ldquo;{selectedArticle.quote}&rdquo;
              </p>
              <cite className="block text-xs uppercase tracking-widest text-[#8C827A] mt-2 not-italic">
                &mdash; {selectedArticle.quoteAuthor}
              </cite>
            </blockquote>

            <div className="space-y-6 text-sm text-[#4A433D] leading-relaxed max-w-3xl">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        ) : (
          /* Grid of Articles */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {JOURNAL_ARTICLES.map(art => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#ECE8DF] border border-[#E7E2DA]">
                  <img
                    src={art.heroImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#8C827A] font-medium">
                    <span>{art.category}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] group-hover:text-[#B89758] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#7A726A] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2 text-xs uppercase tracking-widest text-[#1A1A1A] font-medium flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
