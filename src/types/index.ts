export type Stage = 'all' | 'newborn' | 'explorer' | 'foodie' | 'toddler';

export type Category = 'All' | 'Apparel & Sleep' | 'Feeding & Mealtime' | 'Sensory & Play' | 'Care & Nursery';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  stage: 'newborn' | 'explorer' | 'foodie' | 'toddler';
  category: 'Apparel & Sleep' | 'Feeding & Mealtime' | 'Sensory & Play' | 'Care & Nursery';
  image: string;
  secondaryImage?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  colors: ProductColor[];
  sizes?: string[];
  badge?: string;
  description: string;
  mamaHighlight: string;
  materials: string[];
  safety: string;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
