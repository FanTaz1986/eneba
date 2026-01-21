import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { listAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listAPI.getAll();
        setProducts(response.data.slice(0, 8).map(p => ({
          ...p,
          image: p.image_url
        })));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section with Promo Banner - Eneba Gradient */}
      <section className="bg-gradient-to-r from-eneba-blue to-eneba-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Welcome to ENEBA
              </h1>
              <p className="text-xl mb-2 opacity-95">
                Your favorite games & digital products store
              </p>
              <div className="text-lg font-semibold mb-6">
                🎉 GET UP TO 15% CASHBACK! 💰
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-eneba-blue font-bold px-8 py-4 rounded-lg hover:bg-eneba-light transition text-lg shadow-lg hover:shadow-xl"
              >
                Shop Now <ArrowRight size={24} />
              </Link>
            </div>
            <div className="flex-1 text-center">
              <div className="text-6xl">🎮</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Promo Banners */}
      <section className="py-12" style={{ backgroundColor: '#4815aa' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/shop"
            className="bg-gradient-to-r from-eneba-purple to-blue-600 text-white p-8 rounded-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-2xl font-bold mb-2">Top Games</h3>
            <p className="opacity-90 mb-4">Best-selling games of the month</p>
            <span className="inline-flex items-center gap-2 font-semibold">Shop Now <ArrowRight size={20} /></span>
          </Link>

          <Link
            to="/shop"
            className="bg-gradient-to-r from-eneba-green to-emerald-600 text-white p-8 rounded-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">💰</div>
            <h3 className="text-2xl font-bold mb-2">Cheap Games</h3>
            <p className="opacity-90 mb-4">Unbeatable prices for popular titles</p>
            <span className="inline-flex items-center gap-2 font-semibold">Shop Now <ArrowRight size={20} /></span>
          </Link>
        </div>
        </div>
      </section>

      {/* Recommended Games Section */}
      <section className="py-16" style={{ backgroundColor: '#4815aa' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Recommended for You
              </h2>
              <p className="text-gray-200 mt-2">Based on your preferences</p>
            </div>
            <Link
              to="/shop"
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2 transition"
            >
              See all <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose ENEBA Section */}
      <section className="py-16" style={{ backgroundColor: '#4815aa' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Why Choose ENEBA?
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: '#5a2aa0', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Delivery</h3>
            <p className="text-gray-200">
              Get your digital products instantly after purchase
            </p>
          </div>

          <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: '#5a2aa0', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Best Prices</h3>
            <p className="text-gray-200">
              Competitive pricing with regular discounts
            </p>
          </div>

          <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: '#5a2aa0', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
            <p className="text-gray-200">
              100% secure transactions with buyer protection
            </p>
          </div>

          <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: '#5a2aa0', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-gray-200">
              Join millions of happy gamers worldwide
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16" style={{ backgroundColor: '#4815aa' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Action Games', icon: '⚔️', count: '2,000+ games' },
              { name: 'RPG Games', icon: '🎯', count: '1,500+ games' },
              { name: 'Adventure', icon: '🗺️', count: '1,200+ games' },
              { name: 'Sports', icon: '⚽', count: '800+ games' },
              { name: 'Strategy', icon: '♟️', count: '950+ games' },
              { name: 'Indie Games', icon: '🎨', count: '3,000+ games' },
            ].map((category) => (
              <Link
                key={category.name}
                to="/shop"
                className="p-8 rounded-lg shadow-md hover:shadow-lg transition text-center group"
                style={{ backgroundColor: '#5a2aa0', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm">
                  {category.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get the Latest Deals & News
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter and get exclusive offers delivered to your inbox
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
