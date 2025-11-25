import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Sparkles, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, ViewState } from './types';
import { ProductCard } from './components/ProductCard';
import { StylistChat } from './components/StylistChat';
import { CartSidebar } from './components/CartSidebar';
import { Button } from './components/Button';

const App = () => {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLink = ({ children, to, active }: { children?: React.ReactNode, to: ViewState, active?: boolean }) => (
    <button 
      onClick={() => {
        setView(to);
        setSelectedProduct(null);
        window.scrollTo(0, 0);
      }}
      className={`uppercase tracking-[0.2em] text-sm hover:text-gold-600 transition-colors ${active ? 'text-gold-600 font-bold' : 'text-stone-800'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-stone-50">
      
      {/* Promo Bar */}
      <div className="bg-stone-900 text-gold-200 text-xs text-center py-2 tracking-widest uppercase">
        Complimentary Shipping & Concierge Service on All Orders
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-12">
            <button className="md:hidden p-2"><Menu /></button>
            <div className="hidden md:flex gap-8">
              <NavLink to="home" active={view === 'home'}>Home</NavLink>
              <NavLink to="shop" active={view === 'shop'}>Shop</NavLink>
              <NavLink to="about" active={view === 'about'}>About</NavLink>
            </div>
          </div>

          <div 
            className="font-display text-3xl md:text-4xl text-center cursor-pointer tracking-wider"
            onClick={() => setView('home')}
          >
            Bon Jewels
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="p-2 hover:text-gold-600 transition-colors hidden md:block" onClick={() => setIsChatOpen(true)}>
              <Sparkles size={20} />
            </button>
            <button 
              className="p-2 hover:text-gold-600 transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gold-500 text-white text-[10px] flex items-center justify-center rounded-full">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* VIEW: HOME */}
        {view === 'home' && !selectedProduct && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Luxury Jewelry" 
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-stone-900/50" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <span className="text-gold-300 tracking-[0.3em] uppercase mb-4 animate-slide-up" style={{animationDelay: '0.1s'}}>The Autumn Collection</span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight animate-slide-up" style={{animationDelay: '0.2s'}}>
                  Elegance <br /> <i className="font-serif">Redefined</i>
                </h1>
                <div className="flex gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <Button onClick={() => setView('shop')}>Discover</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-stone-900" onClick={() => setIsChatOpen(true)}>Ask Lumière</Button>
                </div>
              </div>
            </section>

            {/* Featured Categories */}
            <section className="py-24 px-6 container mx-auto">
               <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl mb-4 text-stone-900">Curated Categories</h2>
                <div className="w-24 h-0.5 bg-gold-500 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Necklaces', 'Rings', 'Earrings'].map((cat, idx) => (
                  <div key={idx} className="relative aspect-[3/4] group cursor-pointer overflow-hidden" onClick={() => {
                      setSelectedCategory(cat.slice(0, -1)); // simple plural to singular hack
                      setView('shop');
                    }}>
                    <img 
                      src={`https://source.unsplash.com/random/600x800/?jewelry,${cat}`} 
                      onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600'}
                      alt={cat}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-serif text-3xl text-white italic group-hover:tracking-wider transition-all duration-500">{cat}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Teaser Section */}
            <section className="bg-stone-900 text-white py-24 px-6 overflow-hidden relative">
              <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="md:w-1/2 space-y-6">
                  <div className="flex items-center gap-2 text-gold-400">
                    <Sparkles size={20} />
                    <span className="uppercase tracking-widest text-sm">New Feature</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl leading-tight">Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Lumière</span>, Your Personal Stylist</h2>
                  <p className="text-stone-300 text-lg font-light leading-relaxed">
                    Unsure what to gift or wear for that special occasion? Our AI concierge, Lumière, is trained on the finest gemology and fashion trends to curate a selection just for you.
                  </p>
                  <Button variant="primary" onClick={() => setIsChatOpen(true)}>Start Consultation</Button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                   {/* Abstract representation of AI chat */}
                   <div className="relative w-full max-w-sm aspect-square bg-stone-800 rounded-2xl p-6 shadow-2xl border border-stone-700 rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-600" />
                          <div className="h-8 bg-stone-700 rounded w-3/4 animate-pulse" />
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-full bg-gold-600" />
                          <div className="h-24 bg-stone-700 rounded w-5/6 animate-pulse delay-75" />
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-600" />
                          <div className="h-8 bg-stone-700 rounded w-1/2 animate-pulse delay-150" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: SHOP */}
        {view === 'shop' && !selectedProduct && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                 <h2 className="font-display text-4xl mb-2">The Collection</h2>
                 <p className="text-stone-500 font-serif italic">Handcrafted perfection.</p>
               </div>
               
               {/* Filters */}
               <div className="flex flex-wrap gap-4">
                 {CATEGORIES.map(cat => (
                   <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm tracking-widest uppercase transition-all ${
                      selectedCategory === cat 
                        ? 'bg-stone-900 text-white' 
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-900'
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {filteredProducts.map(product => (
                 <ProductCard 
                    key={product.id} 
                    product={product} 
                    onView={handleViewProduct}
                    onAddToCart={addToCart}
                 />
               ))}
             </div>
          </div>
        )}

        {/* VIEW: PRODUCT DETAIL */}
        {selectedProduct && (
          <div className="animate-fade-in pt-8 pb-24">
            <div className="container mx-auto px-6">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="mb-8 flex items-center text-stone-500 hover:text-stone-900 transition-colors uppercase text-xs tracking-widest"
              >
                ← Back to Collection
              </button>
              
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Image Section */}
                <div className="lg:w-1/2">
                  <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <span className="text-gold-600 uppercase tracking-widest text-sm mb-2">{selectedProduct.category}</span>
                  <h1 className="font-display text-4xl md:text-5xl text-stone-900 mb-6">{selectedProduct.name}</h1>
                  <p className="font-serif text-2xl text-stone-800 mb-8">${selectedProduct.price.toLocaleString()}</p>
                  
                  <div className="space-y-6 mb-12">
                    <p className="text-stone-600 leading-relaxed font-light text-lg">
                      {selectedProduct.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                       <div className="border-t border-stone-200 pt-4">
                         <span className="text-stone-400 block uppercase text-xs tracking-wider mb-1">Material</span>
                         <span className="text-stone-900 font-medium">{selectedProduct.material}</span>
                       </div>
                       {selectedProduct.gemstone && (
                         <div className="border-t border-stone-200 pt-4">
                           <span className="text-stone-400 block uppercase text-xs tracking-wider mb-1">Gemstone</span>
                           <span className="text-stone-900 font-medium">{selectedProduct.gemstone}</span>
                         </div>
                       )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" className="flex-1" onClick={() => addToCart(selectedProduct)}>Add to Bag</Button>
                    <button className="w-14 h-14 border border-stone-200 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-colors">
                      <Sparkles />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ABOUT */}
        {view === 'about' && (
          <div className="container mx-auto px-6 py-24 animate-fade-in text-center max-w-3xl">
             <h1 className="font-display text-5xl mb-8">Our Heritage</h1>
             <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-12" />
             <p className="font-serif text-xl leading-relaxed text-stone-600 mb-8">
               Founded in 1924, Bon Jewels has been the epitome of Parisian elegance for a century. We believe that jewelry is not merely an accessory, but a keeper of memories, a symbol of love, and a piece of art to be cherished for generations.
             </p>
             <p className="font-sans font-light text-lg leading-relaxed text-stone-600">
               Each piece is meticulously handcrafted by our master artisans, ensuring that the soul of the stone is revealed in every cut. With the integration of our new concierge Lumière, we bridge the gap between timeless tradition and modern convenience, ensuring every client finds their perfect match.
             </p>
             <img src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=1200" alt="Atelier" className="mt-12 w-full h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16 border-t border-stone-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="font-display text-2xl">Bon Jewels</h3>
            <p className="text-stone-400 text-sm leading-relaxed">Defining elegance since 1924.<br/>Paris • New York • Tokyo</p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6 text-gold-500">Service</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-white cursor-pointer">Jewelry Care</li>
              <li className="hover:text-white cursor-pointer">Book an Appointment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6 text-gold-500">Legal</h4>
             <ul className="space-y-4 text-stone-400 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Accessibility</li>
            </ul>
          </div>
          <div>
             <h4 className="font-serif text-lg mb-6 text-gold-500">Connect</h4>
             <div className="flex gap-6 mb-6">
               <Instagram className="text-stone-400 hover:text-white cursor-pointer" />
               <Facebook className="text-stone-400 hover:text-white cursor-pointer" />
               <Mail className="text-stone-400 hover:text-white cursor-pointer" />
             </div>
             <div className="flex items-center gap-2 text-stone-400 text-sm">
               <Phone size={14} /> <span>+1 (800) BON-JEWELS</span>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-center text-stone-600 text-xs tracking-widest uppercase">
          © 2024 Bon Jewels. All rights reserved.
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemove={removeFromCart} 
      />
      <StylistChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default App;