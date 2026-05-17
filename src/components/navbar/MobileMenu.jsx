import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiKey, FiFileText } from 'react-icons/fi';

export default function MobileMenu({ isMobileMenuOpen }) {
    if (!isMobileMenuOpen) return null;
    
    return (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-lg">
            <div className="px-4 pt-4 pb-3 space-y-1">
                <NavLink to="/" end className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Home</NavLink>
                <NavLink to="/shop" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Shop</NavLink>
                <NavLink to="/offers" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Offers</NavLink>
                <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">About</NavLink>
            </div>

            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5 space-x-8">
                    <NavLink to="/wishlist" className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                        <FiHeart size={28} />
                    </NavLink>
                    <NavLink to="/cart" className="relative text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                        <FiShoppingCart size={28} />
                        <span className="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </NavLink>
                </div>
                <div className="mt-4 px-4 space-y-2">
                    <NavLink to="/auth?mode=signin" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiKey className="mr-3" size={20} /> Login</NavLink>
                    <NavLink to="/auth?mode=signup" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiFileText className="mr-3" size={20} /> Register</NavLink>
                </div>
            </div>
        </div>
    );
}
