import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-none overflow-hidden hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-100">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Quick Add Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white text-stone-900 p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold-500 hover:text-white shadow-lg"
          aria-label="Add to Cart"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="p-5 text-center">
        <p className="text-xs tracking-widest text-stone-500 uppercase mb-1">{product.category}</p>
        <h3 
          className="font-serif text-lg font-medium text-stone-900 mb-2 cursor-pointer hover:text-gold-600 transition-colors"
          onClick={() => onView(product)}
        >
          {product.name}
        </h3>
        <p className="text-gold-600 font-sans font-bold">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};