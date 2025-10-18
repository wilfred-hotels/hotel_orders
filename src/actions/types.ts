// Central shared types for action modules
export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

export type OrderItem = {
  productId: number;
  quantity: number;
  name?: string;
  price?: number;
};

export type Order = {
  id: number;
  items: Array<{ productId: number; quantity: number; name?: string; price?: number }>;
  total: number;
  source?: string;
};

export type Hotel = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  description?: string;
  workersCount?: number;
};

export type User = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  hotelId?: string;
};

export type LoginResult = {
  access_token?: string;
  refresh_token?: string;
  expiresIn?: number;
  user?: User;
  status?: string;
  message?: string;
};

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
};
