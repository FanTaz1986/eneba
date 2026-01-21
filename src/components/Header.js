import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Store, Search, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { listAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const categories = ['Games', 'Gift Cards', 'DLCs', 'Pre-orders', 'Cheap Games'];

  // Handle search with debounce
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        setShowSearchDropdown(false);
        return;
      }

      try {
        setIsSearching(true);
        const response = await listAPI.search(searchTerm);
        setSearchResults(response.data.slice(0, 5)); // Show top 5 results
        setShowSearchDropdown(true);
      } catch (error) {
        console.error('❌ Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setShowSearchDropdown(false);
      setSearchTerm('');
    }
  };

  return (
    <header style={{ backgroundColor: '#4815aa' }} className="shadow-lg sticky top-0 z-50">
      {/* Top Banner - Eneba Purple */}
      <div className="bg-white bg-opacity-20 text-white text-sm py-2 px-4 text-center font-semibold">
        🎉 GET UP TO 15% CASHBACK! Limited time offer
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo - Eneba Blue */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-80 transition">
            <Store size={32} />
            <span>ENEBA</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 mx-8 relative">
            <input
              type="text"
              placeholder="Search games, gift cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowSearchDropdown(true)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eneba-blue transition bg-eneba-light"
            />
            <button type="submit" className="absolute right-3 top-3 text-gray-500 hover:text-eneba-blue transition">
              {isSearching ? (
                <div className="animate-spin">
                  <Search size={20} />
                </div>
              ) : (
                <Search size={20} />
              )}
            </button>

            {/* Search Dropdown Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-2 shadow-xl z-10 max-h-64 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop?search=${encodeURIComponent(searchTerm)}`}
                    onClick={() => {
                      setShowSearchDropdown(false);
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-eneba-light border-b last:border-b-0 transition"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-eneba-dark truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-eneba-blue">
                      ${product.price}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-white hover:text-eneba-blue transition font-medium">
              <Home size={20} />
              <span className="text-sm">Home</span>
            </Link>

            <Link to="/shop" className="flex items-center gap-1 text-white hover:text-eneba-blue transition font-medium">
              <Store size={20} />
              <span className="text-sm">Shop</span>
            </Link>

            <button className="flex items-center gap-1 text-white hover:text-eneba-blue transition font-medium">
              <User size={20} />
              <span className="text-sm">Account</span>
            </button>

            <Link to="/cart" className="relative flex items-center gap-1 text-white hover:text-eneba-blue transition font-medium">
              <ShoppingCart size={20} />
              <span className="text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-eneba-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-eneba-dark"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Category Navigation */}
        <div className="flex gap-4 overflow-x-auto pb-2 border-t border-gray-200 pt-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/shop`}
              className="text-white hover:text-eneba-blue hover:underline transition whitespace-nowrap text-sm font-semibold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-eneba-light border-t p-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eneba-blue transition"
            />
            <button type="submit" className="absolute right-3 top-3">
              <Search size={16} className="text-gray-500 hover:text-eneba-blue" />
            </button>
          </form>
          <Link to="/" className="block py-2 text-white hover:text-eneba-blue font-medium transition">
            Home
          </Link>
          <Link to="/shop" className="block py-2 text-white hover:text-eneba-blue font-medium transition">
            Shop
          </Link>
          <Link to="/cart" className="block py-2 text-white hover:text-eneba-blue font-medium transition">
            Cart ({cartCount})
          </Link>
          <button className="block py-2 text-white hover:text-eneba-blue w-full text-left font-medium transition">
            Account
          </button>
        </div>
      )}
    </header>
  );
}
