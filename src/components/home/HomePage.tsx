import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustBar } from './TrustBar';
import { FeaturedCollection } from './FeaturedCollection';
import { CategoryBento } from './CategoryBento';
import { FeaturedProducts } from './FeaturedProducts';
import { EditorialStory } from './EditorialStory';
import { CollectionHighlight } from './CollectionHighlight';
import { BestSellers } from './BestSellers';
import { CustomerReviews } from './CustomerReviews';
import { LookbookPreview } from './LookbookPreview';
import { NewsletterSection } from './NewsletterSection';
import { RevealOnScroll } from '../common/RevealOnScroll';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full overflow-hidden bg-[#FAF9F6]">
      {/* 01: Hero Banner */}
      <HeroSection />

      {/* 02: Shopify-style Value Props & Trust Bar */}
      <TrustBar />

      {/* 03: New / Seasonal Collection Focus */}
      <RevealOnScroll>
        <FeaturedCollection />
      </RevealOnScroll>

      {/* 04: Shop by Category Bento */}
      <RevealOnScroll>
        <CategoryBento />
      </RevealOnScroll>

      {/* 05: Featured Products Grid */}
      <RevealOnScroll>
        <FeaturedProducts />
      </RevealOnScroll>

      {/* 06: Brand / Editorial Story Spotlight */}
      <RevealOnScroll>
        <EditorialStory />
      </RevealOnScroll>

      {/* 07: Capsule Collection Highlight */}
      <RevealOnScroll>
        <CollectionHighlight />
      </RevealOnScroll>

      {/* 08: Best Sellers */}
      <RevealOnScroll>
        <BestSellers />
      </RevealOnScroll>

      {/* 09: Shopify-style Customer Reviews & Social Proof */}
      <RevealOnScroll>
        <CustomerReviews />
      </RevealOnScroll>

      {/* 10: Campaign Lookbook Preview */}
      <RevealOnScroll>
        <LookbookPreview />
      </RevealOnScroll>

      {/* 11: Email Newsletter Capture */}
      <RevealOnScroll>
        <NewsletterSection />
      </RevealOnScroll>
    </main>
  );
};
