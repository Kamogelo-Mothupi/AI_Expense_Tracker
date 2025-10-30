
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem, onUpdate: (id: number, quantity: number) => void, onRemove: (id: number) => void }> = ({ item, onUpdate, onRemove }) => {
    return (
        <div className="flex items-center py-4">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-md mr-4" />
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm mr-2">Qty:</label>
                    <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => onUpdate(item.id, parseInt(e.target.value, 10))}
                        className="w-16 p-1 border rounded-md text-center bg-gray-100"
                    >
                        {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline text-sm ml-4">Remove</button>
                </div>
            </div>
            <p className="font-semibold text-lg w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    );
};

const CartPage: React.FC = () => {
    const { state: cartItems, dispatch } = useCart();

    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const handleRemoveItem = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-1 text-gray-800">Shopping Cart</h1>
                    <hr className="mb-4"/>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">Your cart is empty.</p>
                            <Link to="/" className="mt-4 inline-block bg-[#131921] text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                       <div className="divide-y divide-gray-200">
                           {cartItems.map(item => (
                               <CartItemRow key={item.id} item={item} onUpdate={handleUpdateQuantity} onRemove={handleRemoveItem} />
                           ))}
                       </div>
                    )}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                             <div className="flex justify-between py-1">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Tax (8%):</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 text-xl font-bold border-t mt-2">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className={cartItems.length > 0 ? '' : 'pointer-events-none'}>
                            <button disabled={cartItems.length === 0} className="w-full mt-6 bg-[#F9A825] text-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
