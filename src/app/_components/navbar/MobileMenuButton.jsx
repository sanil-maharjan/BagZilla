import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function MobileMenuButton({ isMobileMenuOpen, toggleMobileMenu }) {
    return (
        <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isMobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
            </button>
        </div>
    );
}
