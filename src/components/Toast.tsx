import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'cart' | 'wishlist';
  onAction?: () => void;
  actionText?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'cart',
  onAction,
  actionText,
}) => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#0F172A] text-white py-3 px-4 rounded-2xl shadow-xl border border-sky-200/20 flex items-center gap-3 animate-slideUp text-xs font-medium max-w-sm">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${type === 'cart' ? 'bg-[#0284C7] text-white' : 'bg-[#EC4899] text-white'}`}>
        {type === 'cart' ? <ShoppingBag className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5 fill-current" />}
      </div>
      <div className="flex-1 truncate">{message}</div>
      {onAction && actionText && (
        <button
          type="button"
          onClick={onAction}
          className="text-[#38BDF8] hover:underline font-bold shrink-0 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
