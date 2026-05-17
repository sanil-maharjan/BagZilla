import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiKey, FiFileText } from 'react-icons/fi';

export default function UserDropdown({ 
    isUserDropdownOpen, 
    toggleUserDropdown, 
    setIsUserDropdownOpen, 
    isAuthPage, 
    authMode, 
    ICON_SIZE 
}) {
    return (
        <div className="relative">
            <button onClick={toggleUserDropdown} className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 focus:outline-none">
                <FiUser size={ICON_SIZE} />
            </button>

            {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-md shadow-lg py-2 border border-gray-100 ring-1 ring-black ring-opacity-5 z-50">
                    <NavLink to="/auth?mode=signin" className={() => `flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signin' ? 'active' : ''}`} onClick={() => setIsUserDropdownOpen(false)}>
                        <FiKey className="mr-3" size={20} /> Login
                    </NavLink>
                    <NavLink to="/auth?mode=signup" className={() => `flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signup' ? 'active' : ''}`} onClick={() => setIsUserDropdownOpen(false)}>
                        <FiFileText className="mr-3" size={20} /> Register
                    </NavLink>
                </div>
            )}
        </div>
    );
}
