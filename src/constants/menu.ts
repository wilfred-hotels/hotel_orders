export const combinedFeaturedAndMenuItems = [
  // Truffle Margherita Pizza (from featuredItems)
  {
    id: 1,
    name: "Truffle Margherita Pizza",
    description:
      "Handcrafted pizza with truffle oil, fresh mozzarella, and basil",
    price: 18.99,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec4b79eb6b3?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    isPromo: true,
    discount: 15,
  },
  // Gourmet Beef Burger (from featuredItems)
  {
    id: 2,
    name: "Gourmet Beef Burger",
    description:
      "Premium beef patty with aged cheddar, caramelized onions, and special sauce",
    price: 16.99,
    category: "burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: false,
  },
  // Lobster Carbonara (from featuredItems)
  {
    id: 3,
    name: "Lobster Carbonara",
    description: "Creamy pasta with fresh lobster, parmesan, and black pepper",
    price: 24.99,
    category: "pasta",
    image:
      "https://images.unsplash.com/photo-1603074091655-f2d66b4a2e77?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    isPromo: true,
    discount: 20,
  },
  // Chocolate Lava Cake (from featuredItems)
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    price: 8.99,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1599785209707-0b48b69f3c9b?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: false,
  },
  // Caesar Salad (from featuredItems)
  {
    id: 5,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, and classic dressing",
    price: 12.99,
    category: "salad",
    image:
      "https://images.unsplash.com/photo-1566843976395-c90c9937ed9d?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // Fresh Lemonade (from featuredItems)
  {
    id: 6,
    name: "Fresh Lemonade",
    description: "Homemade with fresh lemons, mint, and honey",
    price: 5.99,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1567665363-32c3be869cf9?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    isPromo: true,
    discount: 25,
  },
  // Grilled Salmon (from featuredItems)
  {
    id: 7,
    name: "Grilled Salmon",
    description: "Atlantic salmon with herbs, lemon, and seasonal vegetables",
    price: 22.99,
    category: "seafood",
    image:
      "https://images.unsplash.com/photo-1617196034012-f7a2b0b3641e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: false,
  },
  // Veggie Delight Pizza (from menuItems - different image URL)
  {
    id: 2,
    name: "Veggie Delight Pizza",
    description: "Artisanal pizza with seasonal vegetables and vegan cheese",
    price: 15.99,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1594007658507-88ec0d947b79?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // Pepperoni Feast Pizza (from menuItems)
  {
    id: 3,
    name: "Pepperoni Feast Pizza",
    description: "Classic pepperoni pizza with extra cheese",
    price: 17.99,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1594007658414-1f9aa3c30d3e?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 10,
  },
  // Chicken Avocado Burger (from menuItems)
  {
    id: 5,
    name: "Chicken Avocado Burger",
    description: "Grilled chicken, avocado, lettuce, and tomato on brioche",
    price: 15.49,
    category: "burger",
    image:
      "https://images.unsplash.com/photo-1606755962772-83d111d7de80?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: true,
    discount: 20,
  },
  // BBQ Bacon Burger (from menuItems)
  {
    id: 6,
    name: "BBQ Bacon Burger",
    description: "Beef patty with BBQ sauce, crispy bacon, and cheddar",
    price: 17.49,
    category: "burger",
    image:
      "https://images.unsplash.com/photo-1598514982822-0f58f4e518e8?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: false,
  },
  // Spaghetti Bolognese (from menuItems - different image URL)
  {
    id: 8,
    name: "Spaghetti Bolognese",
    description: "Traditional spaghetti with rich beef Bolognese sauce",
    price: 14.99,
    category: "pasta",
    image:
      "https://images.unsplash.com/photo-1627395465693-3a6c7f7c6b70?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: false,
  },
  // Pesto Fusilli (from menuItems)
  {
    id: 9,
    name: "Pesto Fusilli",
    description: "Fusilli pasta tossed in homemade basil pesto and pine nuts",
    price: 13.99,
    category: "pasta",
    image:
      "https://images.unsplash.com/photo-1601050690554-25dbdb8a5b4a?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // Chocolate Lava Cake (from menuItems - different image URL)
  {
    id: 10,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    price: 8.99,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: false,
  },
  // Strawberry Cheesecake (from menuItems)
  {
    id: 11,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake topped with fresh strawberries",
    price: 9.49,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: true,
    discount: 15,
  },
  // Tiramisu (from menuItems - different image URL)
  {
    id: 12,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso and mascarpone cream",
    price: 8.49,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1625245609473-2b0b4ad5133c?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    isPromo: false,
  },
  // Caesar Salad (from menuItems - different image URL)
  {
    id: 13,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, and classic dressing",
    price: 12.99,
    category: "salad",
    image:
      "https://images.unsplash.com/photo-1566843977298-80f3ec3e9356?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // Greek Salad (from menuItems - different image URL)
  {
    id: 14,
    name: "Greek Salad",
    description: "Tomatoes, cucumbers, olives, feta cheese, and red onion",
    price: 11.99,
    category: "salad",
    image:
      "https://images.unsplash.com/photo-1598514982781-6456bfe9a8b5?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 10,
  },
  // Quinoa Avocado Salad (from menuItems)
  {
    id: 15,
    name: "Quinoa Avocado Salad",
    description:
      "Healthy quinoa salad with avocado, cherry tomatoes, and herbs",
    price: 13.49,
    category: "salad",
    image:
      "https://images.unsplash.com/photo-1598514982781-6456bfe9a8b5?auto=format&fit=crop&w=400&q=80", // Note: This URL is used for two different salads in menuItems, likely an error. Using the provided one.
    rating: 4.8,
    isPromo: false,
  },
  // Grilled Salmon (from menuItems - different image URL)
  {
    id: 16,
    name: "Grilled Salmon",
    description: "Atlantic salmon with herbs, lemon, and seasonal vegetables",
    price: 22.99,
    category: "seafood",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb21?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: false,
  },
  // Shrimp Scampi (from menuItems)
  {
    id: 17,
    name: "Shrimp Scampi",
    description: "Sautéed shrimp with garlic, butter, and lemon over pasta",
    price: 21.99,
    category: "seafood",
    image:
      "https://images.unsplash.com/photo-1603073933545-3f6c9f7e73f3?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 15,
  },
  // Fresh Lemonade (from menuItems - different image URL)
  {
    id: 18,
    name: "Fresh Lemonade",
    description: "Homemade with fresh lemons, mint, and honey",
    price: 5.99,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1572441710550-9a8c1c3a9877?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    isPromo: true,
    discount: 25,
  },
  // Mango Smoothie (from menuItems - different image URL)
  {
    id: 19,
    name: "Mango Smoothie",
    description: "Refreshing smoothie with ripe mangoes and yogurt",
    price: 6.49,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1601043110261-1cfeb1a13d2d?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // Iced Coffee (from menuItems - different image URL)
  {
    id: 20,
    name: "Iced Coffee",
    description: "Chilled coffee with milk and a hint of vanilla",
    price: 4.99,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: false,
  },
  // Pepperoni Pizza (from featuredItems)
  {
    id: 15,
    name: "Pepperoni Pizza",
    description: "Classic pizza with pepperoni, mozzarella, and tomato sauce",
    price: 16.99,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec4b79eb6b3?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: false,
  },
  // Cheeseburger Deluxe (from featuredItems)
  {
    id: 16,
    name: "Cheeseburger Deluxe",
    description: "Juicy beef burger with cheddar, lettuce, and pickles",
    price: 15.99,
    category: "burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 10,
  },
  // Pesto Pasta (from featuredItems)
  {
    id: 17,
    name: "Pesto Pasta",
    description: "Pasta tossed in basil pesto, pine nuts, and parmesan",
    price: 18.49,
    category: "pasta",
    image:
      "https://images.unsplash.com/photo-1603074091655-f2d66b4a2e77?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    isPromo: false,
  },
  // Creme Brulee (from featuredItems)
  {
    id: 18,
    name: "Creme Brulee",
    description: "Rich custard dessert topped with caramelized sugar",
    price: 9.49,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1599785209707-0b48b69f3c9b?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    isPromo: true,
    discount: 15,
  },
  // Fresh Green Salad (from featuredItems)
  {
    id: 19,
    name: "Fresh Green Salad",
    description: "Mixed greens, cherry tomatoes, cucumbers, and vinaigrette",
    price: 10.99,
    category: "salad",
    image:
      "https://images.unsplash.com/photo-1566843976395-c90c9937ed9d?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    isPromo: false,
  },
  // BBQ Chicken Wings (from featuredItems)
  {
    id: 20,
    name: "BBQ Chicken Wings",
    description: "Spicy and tangy chicken wings with BBQ sauce",
    price: 14.99,
    category: "burger",
    image:
      "https://images.unsplash.com/photo-1606755962772-83d111d7de80?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    isPromo: true,
    discount: 10,
  },
];
