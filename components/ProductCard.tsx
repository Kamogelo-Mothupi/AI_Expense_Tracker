
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col border border-gray-200">
        <div className="overflow-hidden p-4 bg-gray-50 flex justify-center items-center h-56">
            <img 
                src={product.image} 
                alt={product.title} 
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-md font-medium text-gray-800 group-hover:text-yellow-700 transition-colors h-12">{product.title}</h3>
          <div className="flex items-center my-2">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs text-gray-500 ml-2">(1,234)</span>
          </div>
          <div className="mt-auto">
            <p className="text-xl font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#F9A825] text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
