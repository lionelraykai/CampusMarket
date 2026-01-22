import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Heart, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../data';
import './HomeScreen.css';

const HomeScreen = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <div className="home-brand">
              <div className="brand-logo-wrapper">
                <GraduationCap size={24} color="white" />
              </div>
              <span className="home-brand-name">Campus Marketplace</span>
            </div>
          </div>
          
          <nav className="header-nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">Saved</a>
            <a href="#" className="nav-link">Messages</a>
          </nav>

          <div className="header-right">
            <button className="sell-button" onClick={() => navigate('/sell')}>
              <Plus size={18} />
              <span>Sell Item</span>
            </button>
            <div className="user-profile" onClick={() => { onLogout(); navigate('/'); }}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" 
                alt="Profile" 
                className="profile-img"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        {/* Search Bar Section */}
        <section className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search for textbooks, furniture, electronics..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="search-button">Search</button>
          </div>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <div className="categories-list">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`category-tag ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sort-dropdown">
            <span className="sort-label">Sort by:</span>
            <button className="sort-button">
              Newest First
              <ChevronDown size={16} />
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section className="product-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} className="product-image" />
                <button className={`favorite-button ${product.isFavorite ? 'active' : ''}`}>
                  <Heart size={18} fill={product.isFavorite ? "currentColor" : "none"} />
                </button>
                {product.status && (
                  <span className="product-badge">{product.status}</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-footer">
                  <div className="seller-info">
                    <img src={product.seller.avatar} alt={product.seller.name} className="seller-avatar" />
                    <span className="seller-name">Sold by {product.seller.name}</span>
                  </div>
                  <span className="time-ago">{product.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-nav-btn"><ChevronLeft size={20} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">10</button>
          <button className="page-nav-btn"><ChevronRight size={20} /></button>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
