"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import SearchBar from './SearchBar';
import UserDropdown from './UserDropdown';

export default function DesktopActions({ 
    ICON_SIZE, 
    isUserDropdownOpen, 
    toggleUserDropdown, 
    setIsUserDropdownOpen, 
    isAuthPage, 
    authMode 
}) {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex items-center space-x-5">
            <SearchBar />

            <Link href="/wishlist" className={`text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 ${pathname === '/wishlist' ? 'text-[var(--brand-primary)]' : ''}`}>
                <FiHeart size={ICON_SIZE} />
            </Link>

            <Link href="/cart" className={`relative text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 ${pathname === '/cart' ? 'text-[var(--brand-primary)]' : ''}`}>
                <FiShoppingCart size={ICON_SIZE} />
                <span className="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white">
                    2
                </span>
            </Link>

            <UserDropdown 
                isUserDropdownOpen={isUserDropdownOpen}
                toggleUserDropdown={toggleUserDropdown}
                setIsUserDropdownOpen={setIsUserDropdownOpen}
                isAuthPage={isAuthPage}
                authMode={authMode}
                ICON_SIZE={ICON_SIZE}
            />
        </div>
    );
}
