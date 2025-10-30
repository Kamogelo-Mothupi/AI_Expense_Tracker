
import React from 'react';
import { Link } from 'react-router-dom';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const OrderConfirmationPage: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-xl">
            <div className="flex justify-center mb-4">
                <CheckCircleIcon />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Thank You for Your Order!</h1>
            <p className="text-gray-600 text-lg mb-6">
                Your order has been placed successfully. You will receive an email confirmation shortly.
            </p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderConfirmationPage;
