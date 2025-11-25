export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Necklace' | 'Ring' | 'Earrings' | 'Bracelet' | 'Watch';
  description: string;
  material: string;
  image: string;
  gemstone?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'home' | 'shop' | 'about' | 'product-detail';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}