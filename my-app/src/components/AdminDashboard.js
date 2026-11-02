import React, { useState } from 'react';

function AdminDashboard({ isOpen, onClose, menuItems, setMenuItems }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    { id: '#ORD-9021', customer: 'Ali Khan', items: 'Pepperoni Supreme (x2)', total: 29.98, status: 'Preparing', time: '10 mins ago' },
    { id: '#ORD-9022', customer: 'Sara Ahmed', items: 'Margherita, Garlic Wings', total: 19.98, status: 'Out for Delivery', time: '25 mins ago' },
    { id: '#ORD-9023', customer: 'Hamza Malik', items: 'BBQ Chicken Feast (x1)', total: 15.99, status: 'Pending', time: '5 mins ago' },
  ]);

  if (!isOpen) return null;

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
  };

  const handlePriceChange = (id, newPrice) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, price: parseFloat(newPrice) || 0 } : item));
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header admin-header">
          <h2>👑 Bella Pizza Admin Dashboard</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="admin-stats-bar">
          <div className="stat-card">
            <span>Total Sales</span>
            <h4>${totalRevenue.toFixed(2)}</h4>
          </div>
          <div className="stat-card">
            <span>Active Orders</span>
            <h4>{orders.length}</h4>
          </div>
          <div className="stat-card">
            <span>Pending</span>
            <h4>{orders.filter(o => o.status === 'Pending').length}</h4>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            📦 Live Orders
          </button>
          <button 
            className={activeTab === 'menu' ? 'active' : ''} 
            onClick={() => setActiveTab('menu')}
          >
            🍕 Manage Menu
          </button>
        </div>

        <div className="cart-body admin-body">
          {activeTab === 'orders' ? (
            <div className="admin-orders-list">
              {orders.map((ord) => (
                <div key={ord.id} className="admin-order-card">
                  <div className="order-head">
                    <strong>{ord.id} - {ord.customer}</strong>
                    <span className="order-time">{ord.time}</span>
                  </div>
                  <p className="order-items">{ord.items}</p>
                  <div className="order-foot">
                    <span className="order-total">${ord.total.toFixed(2)}</span>
                    <select 
                      value={ord.status} 
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-menu-management">
              {menuItems.map((item) => (
                <div key={item.id} className="admin-menu-row">
                  <img src={item.image} alt={item.name} />
                  <div className="menu-row-info">
                    <h4>{item.name}</h4>
                    <span>{item.category}</span>
                  </div>
                  <div className="menu-row-price">
                    <label>$</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={item.price} 
                      onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;