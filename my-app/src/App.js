import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Cart from './components/Cart';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import './App.css';

const INITIAL_PIZZA_MENU = [
  { 
    id: 1, 
    name: 'Pepperoni Supreme', 
    category: 'Signature Pizzas', 
    price: 14.99, 
    rating: 4.9, 
    description: 'Double pepperoni, extra mozzarella cheese, signature tomato sauce.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600' 
  },
  { 
    id: 2, 
    name: 'Classic Margherita', 
    category: 'Signature Pizzas', 
    price: 11.99, 
    rating: 4.8, 
    description: 'Fresh mozzarella, basil leaves, extra virgin olive oil, San Marzano sauce.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600' 
  },
  { 
    id: 3, 
    name: 'BBQ Chicken Feast', 
    category: 'Signature Pizzas', 
    price: 15.99, 
    rating: 4.7, 
    description: 'Grilled chicken, smoky BBQ drizzle, red onions, and fresh cilantro.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600' 
  },
  { 
    id: 4, 
    name: 'Truffle Mushroom Special', 
    category: 'Signature Pizzas', 
    price: 16.99, 
    rating: 4.9, 
    description: 'Sauteed wild mushrooms, white truffle oil, parmesan & mozzarella.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600' 
  },
  { 
    id: 5, 
    name: 'Garlic Parmesan Wings', 
    category: 'Sides & Drinks', 
    price: 7.99, 
    rating: 4.6, 
    description: 'Crispy oven-baked wings coated in garlic parmesan glaze.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600' 
  },
  { 
    id: 6, 
    name: 'Cheesy Garlic Breadsticks', 
    category: 'Sides & Drinks', 
    price: 5.99, 
    rating: 4.8, 
    description: 'Freshly baked breadsticks stuffed with melted mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600' 
  },
  { 
    id: 7, 
    name: 'Chocolate Lava Cake', 
    category: 'Desserts', 
    price: 6.49, 
    rating: 4.9, 
    description: 'Warm chocolate cake with a molten fudge chocolate center.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600' 
  },
  { 
    id: 8, 
    name: 'Iced Italian Lemonade', 
    category: 'Sides & Drinks', 
    price: 3.49, 
    rating: 4.5, 
    description: 'Refreshing sparkling lemonade made with real lemons.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600' 
  }
];

function App() {
  const [menuItems, setMenuItems] = useState(INITIAL_PIZZA_MENU);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const filteredMenu = menuItems.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setIsCartOpen={setIsCartOpen}
        user={user}
        setIsLoginOpen={setIsLoginOpen}
        setIsAdminOpen={setIsAdminOpen}
      />

      <Header />

      <main className="main-content" id="menu">
        <div className="section-title">
          <h2>Explore Our Menu</h2>
          <p>Hand-crafted pizzas baked fresh upon every order</p>
        </div>

        <div className="product-grid">
          {filteredMenu.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-image-wrapper">
                <img src={product.image} alt={product.name} />
                <span className="category-badge">{product.category}</span>
              </div>
              <div className="product-info">
                <div className="card-header-row">
                  <h3>{product.name}</h3>
                  <span className="rating">⭐ {product.rating}</span>
                </div>
                <p className="description">{product.description}</p>
                <div className="card-bottom">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button className="add-btn" onClick={() => handleAddToCart(product)}>
                    + Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Cart
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          if (userData.role === 'admin') setIsAdminOpen(true);
        }}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
      />

      <Footer />
    </div>
  );
}

export default App;