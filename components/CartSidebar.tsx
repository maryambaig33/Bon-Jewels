import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <h2 className="font-serif text-2xl text-stone-900">Your Selection</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
              <X size={24} className="text-stone-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Your bag is currently empty.</p>
                <button onClick={onClose} className="text-gold-600 underline hover:text-gold-700">Continue Shopping</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fade-in">
                  <div className="w-20 h-20 bg-stone-100 shrink-0 rounded overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-stone-900 font-medium line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-stone-500 mt-1">{item.material}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gold-600 font-medium">${item.price.toLocaleString()}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-600 uppercase tracking-widest text-sm">Total</span>
                <span className="font-serif text-2xl text-stone-900">${total.toLocaleString()}</span>
              </div>
              <Button className="w-full uppercase tracking-widest">Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};