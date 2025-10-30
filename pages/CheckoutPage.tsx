
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CheckoutPage: React.FC = () => {
    const { state: cartItems, dispatch } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (cartItems.length === 0 && !isSubmitting) {
        navigate('/');
        return null;
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            dispatch({ type: 'CLEAR_CART' });
            navigate('/confirmation');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto">
             <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">Shipping & Payment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                            <input className="w-full p-3 border rounded-md" type="text" id="name" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
                            <input className="w-full p-3 border rounded-md" type="text" id="address" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="card">Card Number</label>
                            <input className="w-full p-3 border rounded-md" type="text" id="card" placeholder="**** **** **** ****" required />
                        </div>
                        <div className="flex space-x-4 mb-6">
                            <div className="flex-1">
                                <label className="block text-gray-700 mb-2" htmlFor="expiry">Expiry</label>
                                <input className="w-full p-3 border rounded-md" type="text" id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 mb-2" htmlFor="cvc">CVC</label>
                                <input className="w-full p-3 border rounded-md" type="text" id="cvc" placeholder="123" required />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#F9A825] text-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 disabled:bg-gray-400 transition-colors"
                        >
                            {isSubmitting ? 'Placing Order...' : `Place Your Order & Pay $${total.toFixed(2)}`}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">{item.title} x {item.quantity}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t space-y-2">
                         <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                         <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                         <div className="flex justify-between font-bold text-xl"><span>Total</span><span>${total.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
