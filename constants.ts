import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Aurora Diamond Halo',
    price: 3500,
    category: 'Ring',
    description: 'A stunning 1.5 carat oval diamond surrounded by a halo of brilliant-cut micro diamonds, set in 18k white gold.',
    material: '18k White Gold',
    gemstone: 'Diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Midnight Sapphire Pendant',
    price: 1250,
    category: 'Necklace',
    description: 'A deep blue sapphire teardrop pendant suspended from a delicate gold chain. Perfect for evening wear.',
    material: '14k Yellow Gold',
    gemstone: 'Sapphire',
    image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Eternal Knot Bracelet',
    price: 890,
    category: 'Bracelet',
    description: 'Symbolizing everlasting love, this intricate knot design is crafted from solid rose gold.',
    material: '18k Rose Gold',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Emerald Tear Drop Earrings',
    price: 2100,
    category: 'Earrings',
    description: 'Vibrant Colombian emeralds cut in a pear shape, accented with a diamond cluster.',
    material: 'Platinum',
    gemstone: 'Emerald',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Vintage Pearl Choker',
    price: 650,
    category: 'Necklace',
    description: 'A classic strand of freshwater pearls with a vintage-inspired gold clasp.',
    material: 'Freshwater Pearl',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Obsidian Signet Ring',
    price: 450,
    category: 'Ring',
    description: 'A bold, masculine signet ring featuring a polished slice of black obsidian.',
    material: 'Sterling Silver',
    gemstone: 'Obsidian',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132908680d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    name: 'Celestial Starburst Studs',
    price: 320,
    category: 'Earrings',
    description: 'Tiny starbursts encrusted with pavé diamonds, perfect for everyday sparkle.',
    material: '14k Yellow Gold',
    gemstone: 'Diamond',
    image: 'https://images.unsplash.com/photo-1635767798638-3e252a0a0354?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    name: 'Royal Ruby Cocktail Ring',
    price: 4200,
    category: 'Ring',
    description: 'A statement piece featuring a 3-carat pigeon blood ruby surrounded by baguette diamonds.',
    material: '18k Yellow Gold',
    gemstone: 'Ruby',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
  }
];

export const CATEGORIES = ['All', 'Necklace', 'Ring', 'Earrings', 'Bracelet'];