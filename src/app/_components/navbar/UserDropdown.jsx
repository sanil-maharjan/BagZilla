"use client";

import React from 'react';
import Link from 'next/link';
import { FiUser, FiKey, FiFileText, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function UserDropdown({ 
    isUserDropdownOpen, 
    toggleUserDropdown, 
    setIsUserDropdownOpen, 
    isAuthPage, 
    authMode, 
    ICON_SIZE 
}) {
    const { user, logout } = useAuth();

    return (
        <div className="relative">
            <button 
                onClick={toggleUserDropdown} 
                className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 focus:outline-none flex items-center gap-1"
                aria-label="User menu"
                suppressHydrationWarning
            >
                <FiUser size={ICON_SIZE} />
                {user ? (
                    <span className="hidden lg:inline text-xs font-bold text-gray-700 max-w-[80px] truncate">
                        {user.name.split(' ')[0]}
                    </span>
                ) : null}
            </button>

            {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 ring-1 ring-black ring-opacity-5 z-50">
                    {user ? (
                        <>
                            <div className="px-4 py-2.5 border-b border-gray-100 mb-1 bg-gray-50/50 rounded-t-xl">
                                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                                <span className="inline-block mt-1.5 text-[9px] uppercase tracking-wider bg-blue-50 text-[var(--brand-primary)] px-2 py-0.5 rounded font-extrabold border border-blue-100">
                                    {user.type}
                                </span>
                            </div>
                            
                            <Link 
                                href="/orders" 
                                className="flex items-center px-4 py-2.5 text-sm dropdown-item-custom" 
                                onClick={() => setIsUserDropdownOpen(false)}
                            >
                                <FiShoppingBag className="mr-3 text-gray-400" size={18} /> My Orders
                            </Link>
                            
                            <div className="border-t border-gray-100 my-1"></div>
                            
                            <button 
                                onClick={() => {
                                    logout();
                                    setIsUserDropdownOpen(false);
                                }} 
                                className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 text-left font-medium focus:outline-none cursor-pointer"
                            >
                                <FiLogOut className="mr-3" size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/auth?mode=signin" 
                                className={`flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signin' ? 'active' : ''}`} 
                                onClick={() => setIsUserDropdownOpen(false)}
                            >
                                <FiKey className="mr-3" size={20} /> Login
                            </Link>
                            <Link 
                                href="/auth?mode=signup" 
                                className={`flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signup' ? 'active' : ''}`} 
                                onClick={() => setIsUserDropdownOpen(false)}
                            >
                                <FiFileText className="mr-3" size={20} /> Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
