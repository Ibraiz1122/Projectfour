import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Heart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, setActivePage } = useShop();

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-[#E7E2DA] pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
              Curated Selections
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
              Your Private Wishlist
            </h1>
          </div>
          <span className="text-xs text-[#7A726A] uppercase tracking-wider font-medium">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Garment Saved' : 'Garments Saved'}
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 border border-[#E7E2DA] bg-white p-8 max-w-2xl mx-auto">
            <Heart className="w-10 h-10 text-[#C2B8A3] mx-auto" />
            <h3 className="font-serif text-3xl text-[#1A1A1A]">Your wishlist is currently unadorned</h3>
            <p className="text-xs sm:text-sm text-[#7A726A] max-w-md mx-auto leading-relaxed">
              Save your favorite silhouettes while browsing to monitor stock availability and build your seasonal capsule wardrobe.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="mt-4 bg-[#1A1A1A] hover:bg-black text-white px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition-colors"
            >
              Explore Ready-to-Wear
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-12">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
