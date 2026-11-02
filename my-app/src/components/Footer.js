import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🍕 Bella Pizza</h3>
          <p>Delivering hot, oven-fresh pizzas made with authentic Italian recipes and premium ingredients.</p>
        </div>
        <div className="footer-section">
          <h4>Opening Hours</h4>
          <p>Mon - Thu: 11:00 AM - 11:00 PM</p>
          <p>Fri - Sun: 11:00 AM - 01:00 AM</p>
        </div>
        <div className="footer-section">
          <h4>Delivery Hotline</h4>
          <p className="phone-number">📞 +1 800-BELLA-PIZZA</p>
          <p>Address: 42 Italian Avenue, Food District</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Bella Pizza Craft & Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;