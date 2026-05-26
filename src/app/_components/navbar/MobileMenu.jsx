"use client";

import React from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiKey, FiFileText, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function MobileMenu({ isMobileMenuOpen }) {
    const { user, logout } = useAuth();

    if (!isMobileMenuOpen) return null;
    
    return (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-lg">
            <div className="px-4 pt-4 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Home</Link>
                <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Shop</Link>
                <Link href="/offers" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Offers</Link>
                <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">About</Link>
            </div>
 
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5 space-x-8">
                    <Link href="/wishlist" className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                        <FiHeart size={28} />
                    </Link>
                    <Link href="/cart" className="relative text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                        <FiShoppingCart size={28} />
                        <span className="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </Link>
                </div>
                <div className="mt-4 px-4 space-y-2">
                    {user ? (
                        <>
                            <div className="px-3 py-2 border-b border-gray-100 mb-2 bg-gray-50/50 rounded-lg">
                                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                                <span className="inline-block mt-1.5 text-[9px] uppercase tracking-wider bg-blue-50 text-[var(--brand-primary)] px-2 py-0.5 rounded font-extrabold border border-blue-100">
                                    {user.type}
                                </span>
                            </div>
                            <Link 
                                href="/orders" 
                                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"
                            >
                                <FiShoppingBag className="mr-3" size={20} /> My Orders
                            </Link>
                            <button 
                                onClick={() => logout()} 
                                className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors text-left focus:outline-none cursor-pointer"
                            >
                                <FiLogOut className="mr-3" size={20} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth?mode=signin" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiKey className="mr-3" size={20} /> Login</Link>
                            <Link href="/auth?mode=signup" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiFileText className="mr-3" size={20} /> Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
