import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useShop();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {notifications.map(n => (
        <div
          key={n.id}
          className="pointer-events-auto bg-[#1A1A1A]/95 backdrop-blur-md text-[#FAF9F6] border border-white/10 shadow-2xl p-4 flex items-start gap-3.5 transition-all duration-300 animate-fade-up"
        >
          <div className="mt-0.5 text-[#B89758]">
            {n.type === 'cart' && <ShoppingBag className="w-4 h-4" />}
            {n.type === 'wishlist' && <Heart className="w-4 h-4 fill-current" />}
            {n.type === 'info' && <Check className="w-4 h-4" />}
          </div>

          <div className="flex-1">
            <h5 className="text-xs uppercase tracking-[0.16em] font-medium text-[#FAF9F6]">{n.message}</h5>
            {n.subMessage && (
              <p className="text-[11px] text-[#A89F91] mt-0.5 leading-snug">{n.subMessage}</p>
            )}
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="text-[#8C827A] hover:text-white transition-colors -mr-1 -mt-1 p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
