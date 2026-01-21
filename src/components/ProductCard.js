import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  // Calculate original price based on discount
  const originalPrice = product.discount 
    ? product.price / (1 - product.discount / 100) 
    : null;

  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-purple-400" style={{ backgroundColor: '#5a2aa0' }}>
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-eneba-light to-gray-200 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x200'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge - Eneba Orange */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-eneba-orange text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
            -{product.discount}%
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-xs font-semibold">
          {product.category}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-eneba-light transition shadow-md"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-eneba-purple text-eneba-purple' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-base text-white mb-2 line-clamp-2 h-14">
          {product.name}
        </h3>

        {/* Region Badge */}
        {product.region && (
          <div className="inline-block bg-blue-100 text-eneba-blue text-xs px-2 py-1 rounded mb-2 font-semibold">
            🌍 {product.region}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating || 4)
                    ? 'fill-eneba-orange text-eneba-orange'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-200">
            {product.rating?.toFixed(1)} ({product.reviews || 0})
          </span>
        </div>

        {/* Likes/Engagement */}
        {product.likes && (
          <div className="text-xs text-gray-300 mb-3 font-medium">
            ❤️ {product.likes.toLocaleString()} people like this
          </div>
        )}
        {/* Pricing */}
        <div className="mb-4 pb-4 border-b border-purple-300">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-eneba-blue">
              €{product.price?.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-300 line-through">
                €{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Cashback Info - Eneba Green */}
          {product.discount > 0 && (
            <div className="text-xs text-eneba-green font-semibold mt-2">
              💰 Save €{(originalPrice - product.price).toFixed(2)}
            </div>
          )}
        </div>

        {/* CTA Button - Eneba Blue */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-eneba-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-2 shadow-md hover:shadow-lg"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <Link
          to={`/product/${product.id}`}
          className="w-full block text-center bg-purple-400 hover:bg-purple-300 text-white font-semibold py-2 rounded-lg transition text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
