
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Logo, ShoppingCartIcon, SearchIcon } from './Icons';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    const { state: cartItems } = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate();
    
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/'); // Navigate to product list page on search
    };

    return (
        <header className="bg-[#131921] sticky top-0 z-50 text-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between space-x-4">
                <Link to="/" className="py-2">
                    <Logo />
                </Link>
                
                <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search ShopSphere..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 px-4 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
                    />
                    <button type="submit" className="bg-[#F9A825] h-10 px-4 rounded-r-md flex items-center justify-center hover:bg-yellow-500 transition-colors">
                        <SearchIcon />
                    </button>
                </form>

                <nav className="flex items-center space-x-6">
                    <NavLink to="/admin" className="text-sm hover:underline hidden md:block">
                        Admin
                    </NavLink>
                    <Link to="/cart" className="relative flex items-center space-x-1 hover:underline">
                        <span className="absolute -top-1 -left-2.5 text-lg font-bold text-[#F9A825]">{totalItems}</span>
                        <ShoppingCartIcon />
                        <span className="hidden lg:block mt-2">Cart</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
