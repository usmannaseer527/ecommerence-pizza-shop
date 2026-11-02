import React from 'react';

function Header() {
  return (
    <header className="pizza-hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-tag">🔥 Hot & Fresh Italian Oven</span>
          <h1>Authentic Handcrafted Pizza</h1>
          <p>Made with 100% Mozzarella & Imported Italian Tomatoes. Delivered Fast to Your Doorstep!</p>
          <a href="#menu" className="hero-btn">Explore Full Menu</a>
        </div>
      </div>
    </header>
  );
}

export default Header;