export interface cartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isPromo: boolean;
  discount?: number;
}

export interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

