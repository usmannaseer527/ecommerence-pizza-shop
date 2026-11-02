import React, { useState } from 'react';

function Login({ isOpen, onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = role === 'admin' || email.includes('admin');
    const userData = { 
      name: name || (isAdmin ? 'Admin Manager' : email.split('@')[0]),
      email: email,
      role: isAdmin ? 'admin' : 'customer'
    };
    
    alert(isAdmin ? 'Logged in as Admin! 👑' : (isSignup ? 'Account created successfully! 🎉' : 'Logged in successfully! 🍕'));
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{isSignup ? 'Create Account ✨' : 'Welcome Back 🍕'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="role-selector">
          <button 
            type="button" 
            className={role === 'customer' ? 'active' : ''} 
            onClick={() => setRole('customer')}
          >
            👤 Customer
          </button>
          <button 
            type="button" 
            className={role === 'admin' ? 'active' : ''} 
            onClick={() => setRole('admin')}
          >
            👑 Admin Access
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Usman Naseer" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder={role === 'admin' ? 'admin@bellapizza.com' : 'user@example.com'} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {role === 'admin' ? 'Access Admin Portal' : (isSignup ? 'Sign Up' : 'Login to Account')}
          </button>

          {role === 'customer' && (
            <p className="auth-switch-text">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Login here' : 'Sign up'}
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;