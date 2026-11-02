import React from 'react';

function Navbar({ cartCount, searchTerm, setSearchTerm, activeCategory, setActiveCategory, setIsCartOpen, user, setIsLoginOpen, setIsAdminOpen }) {
  const categories = ['All', 'Signature Pizzas', 'Sides & Drinks', 'Desserts'];

  return (
    <nav className="pizza-nav">
      <div className="nav-container">
        <div className="logo">
          <h2>🍕 Bella Pizza</h2>
        </div>

        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search pizza, sides..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="categories-menu">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="nav-right-actions">
          {user && user.role === 'admin' ? (
            <button className="admin-btn-nav" onClick={() => setIsAdminOpen(true)}>
              👑 Admin Panel
            </button>
          ) : (
            <button className="auth-btn-nav" onClick={() => setIsLoginOpen(true)}>
              👤 {user ? user.name : 'Login'}
            </button>
          )}

          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Basket
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;