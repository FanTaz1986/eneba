import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { listAPI, productsAPI } from '../services/api';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [sortBy, setSortBy] = useState('relevant');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await listAPI.getAll();
        const data = response.data;
        
        // Map database fields to component fields
        const mappedProducts = data.map((product) => ({
          ...product,
          image: product.image_url, // Map image_url to image
        }));
        
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
        
        // Extract unique categories from products
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Make sure backend is running on port 5000!');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search with backend fuzzy search
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let results = [];
        
        if (searchTerm.trim() === '') {
          // No search term, apply only category filter
          results = products;
        } else {
          // Use backend fuzzy search
          console.log('🔍 Searching for:', searchTerm);
          const response = await listAPI.search(searchTerm);
          console.log('✅ Search results:', response.data);
          results = response.data;
        }
        
        // Apply category filter if selected
        if (selectedCategory !== 'All') {
          results = results.filter((p) => p.category === selectedCategory);
        }
        
        // Apply sorting
        if (sortBy === 'price-low') {
          results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'discount') {
          results.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        } else if (sortBy === 'rating') {
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'likes') {
          results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        }
        
        const mappedResults = results.map((product) => ({
          ...product,
          image: product.image_url,
        }));
        
        setFilteredProducts(mappedResults);
      } catch (error) {
        console.error('❌ Error searching products:', error);
        toast.error('Search failed: ' + (error.message || 'Unknown error'));
      }
    };

    // Debounce search to avoid too many API calls
    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, products, sortBy]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#4815aa' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Games Store</h1>
          <p className="text-gray-200">
            {filteredProducts.length} games available
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search games, regions, categories... (fuzzy search enabled)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eneba-blue focus:ring-1 focus:ring-eneba-blue bg-white transition"
            />
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Filter size={16} /> Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-white text-eneba-blue shadow-md'
                    : 'bg-opacity-20 bg-white text-white border-2 border-white hover:bg-opacity-40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border-2 border-gray-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-eneba-blue font-semibold transition"
            >
              <option value="relevant">Sort: Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Best Discount</option>
              <option value="rating">Top Rated</option>
              <option value="likes">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-gray-200 mt-4">Loading games...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Results Count */}
            <div className="mt-12 text-center text-white font-semibold">
              Showing {filteredProducts.length} games
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white text-xl mb-2 font-bold">No games found</p>
            <p className="text-gray-200">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
