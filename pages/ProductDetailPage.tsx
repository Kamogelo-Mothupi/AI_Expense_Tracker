
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { initialProducts } from '../data/products';
import { useCart } from '../hooks/useCart';
import { StarIcon } from '../components/Icons';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = initialProducts.find(p => p.id === Number(id));
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to products</Link>
        </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };
  
  const handleBuyNow = () => {
    // For MVP, just add selected quantity to cart and go to checkout
    for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        <div className="lg:col-span-4 flex justify-center items-start">
          <img src={product.image} alt={product.title} className="w-full max-w-sm h-auto object-contain rounded-lg" />
        </div>

        <div className="lg:col-span-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{product.title}</h1>
          <div className="flex items-center my-2">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-blue-600 hover:underline ml-2 cursor-pointer">(1,234 ratings)</span>
          </div>
           <hr className="my-4" />
          <div>
            <span className="text-2xl font-bold text-red-700">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 leading-relaxed my-4">{product.description}</p>
        </div>
        
        <div className="lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4">
                 <p className="text-2xl font-bold text-red-700 mb-2">${product.price.toFixed(2)}</p>
                 <p className="text-sm text-gray-600 mb-4">In Stock.</p>
                 <div className="flex items-center space-x-2 mb-4">
                    <label htmlFor="quantity" className="font-semibold text-sm">Qty:</label>
                    <select 
                      id="quantity"
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                      className="p-1 border border-gray-300 rounded-md text-center bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                 </div>
                 <div className="space-y-3">
                     <button
                        onClick={handleAddToCart}
                        className={`w-full py-2.5 px-6 rounded-full font-semibold transition-colors duration-300 ${
                            added ? 'bg-green-500 text-white' : 'bg-[#F9A825] text-gray-900 hover:bg-yellow-500'
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50`}
                     >
                        {added ? 'Added!' : 'Add to Cart'}
                     </button>
                      <button
                        onClick={handleBuyNow}
                        className="w-full py-2.5 px-6 rounded-full font-semibold bg-[#FFA41C] text-gray-900 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-colors"
                     >
                        Buy Now
                     </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
