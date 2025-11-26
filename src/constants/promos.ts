import { cartProduct } from "@/types/cart";

export const promotions: cartProduct[] = [
  {
    id: 1,
    name: "Weekend Special",
    description: "20% off all pizzas",
    price: 15.99, // Assign a base price
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec4b79eb6b3?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    isPromo: true,
    discount: 20,
  },
  {
    id: 2,
    name: "Combo Deal",
    description: "Burger + Fries + Drink for $19.99",
    price: 19.99,
    category: "Combo",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 5, // $5 off
  },
  {
    id: 3,
    name: "Free Delivery",
    description: "Orders over $35",
    price: 35, // Base order price
    category: "Delivery",
    image:
      "https://images.unsplash.com/photo-1606755962772-83d111d7de80?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    isPromo: true,
  },
  {
    id: 4,
    name: "Dessert Delight",
    description: "Buy 1 Get 1 Free on all desserts",
    price: 6.99, // Base dessert price
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1599785209707-0b48b69f3c9b?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: true,
  },
  {
    id: 5,
    name: "Seafood Feast",
    description: "25% off all seafood platters",
    price: 29.99, // Base price
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1617196034012-f7a2b0b3641e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: true,
    discount: 25,
  },
  {
    id: 6,
    name: "Morning Refresh",
    description: "Get 10% off all smoothies and drinks",
    price: 4.99, // Base drink price
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1567665363-32c3be869cf9?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    isPromo: true,
    discount: 10,
  },
];
